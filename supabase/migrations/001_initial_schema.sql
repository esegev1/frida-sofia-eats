-- Frida Sofia Eats - Initial Database Schema
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_display_order ON categories(display_order);

-- ============================================
-- RECIPES TABLE
-- ============================================
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Basic Info
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,

  -- Content Sections
  intro_text TEXT,
  ingredients JSONB NOT NULL DEFAULT '[]',
  instructions JSONB NOT NULL DEFAULT '[]',
  notes TEXT,

  -- Media
  featured_image_url TEXT,
  gallery_images JSONB DEFAULT '[]',
  video_links JSONB DEFAULT '{}',

  -- Recipe Metadata
  prep_time_minutes INTEGER,
  cook_time_minutes INTEGER,
  total_time_minutes INTEGER,
  servings VARCHAR(50),
  difficulty VARCHAR(20) CHECK (difficulty IN ('easy', 'medium', 'hard')),
  cuisine VARCHAR(100),

  -- SEO
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),

  -- Status
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,

  -- Instagram Integration
  instagram_post_id VARCHAR(255),
  instagram_post_url TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_recipes_slug ON recipes(slug);
CREATE INDEX idx_recipes_status ON recipes(status);
CREATE INDEX idx_recipes_published_at ON recipes(published_at DESC);
CREATE INDEX idx_recipes_instagram_post_id ON recipes(instagram_post_id);

-- Full-text search index
CREATE INDEX idx_recipes_search ON recipes
  USING GIN(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- ============================================
-- RECIPE_CATEGORIES (Junction Table)
-- ============================================
CREATE TABLE recipe_categories (
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (recipe_id, category_id)
);

CREATE INDEX idx_recipe_categories_recipe ON recipe_categories(recipe_id);
CREATE INDEX idx_recipe_categories_category ON recipe_categories(category_id);

-- ============================================
-- REVIEWS TABLE (Anonymous)
-- ============================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,

  -- Review Content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  author_name VARCHAR(100),

  -- Moderation
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  ip_hash VARCHAR(64),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reviews_recipe ON reviews(recipe_id);
CREATE INDEX idx_reviews_status ON reviews(status);

-- ============================================
-- NEWSLETTER_SUBSCRIBERS TABLE
-- ============================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- ============================================
-- ADMIN_USERS TABLE
-- ============================================
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- MEDIA TABLE (Image Library)
-- ============================================
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255),
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  mime_type VARCHAR(100),
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  alt_text VARCHAR(500),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_media_uploaded_at ON media(uploaded_at DESC);

-- ============================================
-- INSTAGRAM_WEBHOOK_LOG TABLE
-- ============================================
CREATE TABLE instagram_webhook_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payload JSONB NOT NULL,
  processed BOOLEAN DEFAULT false,
  recipe_id UUID REFERENCES recipes(id),
  error_message TEXT,
  received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_webhook_log ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read published recipes" ON recipes
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public can read approved reviews" ON reviews
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Public can create reviews" ON reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can read recipe_categories" ON recipe_categories
  FOR SELECT USING (true);

CREATE POLICY "Public can read media" ON media
  FOR SELECT USING (true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_recipes_updated_at
  BEFORE UPDATE ON recipes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Calculate average rating for a recipe
CREATE OR REPLACE FUNCTION get_recipe_rating(recipe_uuid UUID)
RETURNS TABLE (average_rating NUMERIC, review_count INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ROUND(AVG(r.rating)::NUMERIC, 1) as average_rating,
    COUNT(*)::INTEGER as review_count
  FROM reviews r
  WHERE r.recipe_id = recipe_uuid AND r.status = 'approved';
END;
$$ LANGUAGE plpgsql;

-- Full-text search function
CREATE OR REPLACE FUNCTION search_recipes(search_query TEXT)
RETURNS SETOF recipes AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM recipes
  WHERE status = 'published'
    AND to_tsvector('english', title || ' ' || COALESCE(description, ''))
        @@ plainto_tsquery('english', search_query)
  ORDER BY published_at DESC;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SEED DATA: Initial Categories
-- ============================================
INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Mains', 'mains', 'Main course recipes for dinner', 1),
  ('Pasta', 'pasta', 'Pasta dishes and noodle recipes', 2),
  ('Chicken', 'chicken', 'Chicken recipes', 3),
  ('Beef', 'beef', 'Beef recipes', 4),
  ('Seafood', 'seafood', 'Seafood and fish recipes', 5),
  ('Soups', 'soups', 'Soups and stews', 6),
  ('Appetizers', 'appetizers', 'Starters and appetizers', 7),
  ('Side Dishes', 'side-dishes', 'Side dishes and accompaniments', 8),
  ('Breakfast', 'breakfast', 'Breakfast and brunch recipes', 9),
  ('Desserts', 'desserts', 'Sweet treats and desserts', 10);
