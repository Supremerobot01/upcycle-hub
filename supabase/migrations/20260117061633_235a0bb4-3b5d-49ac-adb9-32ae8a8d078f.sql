-- Make user_id nullable for mock/admin-created brands
ALTER TABLE brands ALTER COLUMN user_id DROP NOT NULL;