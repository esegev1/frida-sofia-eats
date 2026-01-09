-- Admin RLS Policies
-- Run this in the Supabase SQL Editor after 001_initial_schema.sql

-- Helper function to check if user is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE email = auth.jwt() ->> 'email'
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- RECIPES ADMIN POLICIES
-- ============================================

-- Admins can read all recipes (including drafts)
CREATE POLICY "Admins can read all recipes" ON recipes
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Admins can insert recipes
CREATE POLICY "Admins can insert recipes" ON recipes
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Admins can update recipes
CREATE POLICY "Admins can update recipes" ON recipes
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins can delete recipes
CREATE POLICY "Admins can delete recipes" ON recipes
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================
-- CATEGORIES ADMIN POLICIES
-- ============================================

-- Admins can insert categories
CREATE POLICY "Admins can insert categories" ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Admins can update categories
CREATE POLICY "Admins can update categories" ON categories
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins can delete categories
CREATE POLICY "Admins can delete categories" ON categories
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================
-- RECIPE_CATEGORIES ADMIN POLICIES
-- ============================================

-- Admins can insert recipe_categories
CREATE POLICY "Admins can insert recipe_categories" ON recipe_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Admins can delete recipe_categories
CREATE POLICY "Admins can delete recipe_categories" ON recipe_categories
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================
-- REVIEWS ADMIN POLICIES
-- ============================================

-- Admins can read all reviews (including pending)
CREATE POLICY "Admins can read all reviews" ON reviews
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Admins can update review status (approve/reject)
CREATE POLICY "Admins can update reviews" ON reviews
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins can delete reviews
CREATE POLICY "Admins can delete reviews" ON reviews
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ============================================
-- MEDIA ADMIN POLICIES
-- ============================================

-- Admins can insert media
CREATE POLICY "Admins can insert media" ON media
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Admins can update media
CREATE POLICY "Admins can update media" ON media
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins can delete media
CREATE POLICY "Admins can delete media" ON media
  FOR DELETE
  TO authenticated
  USING (is_admin());
