/*
MemoryOS AI - Database Schema

Tables for the MemoryOS AI marketing platform.
All IDs use UUIDs. Auth is handled by Supabase Auth.
Row Level Security (RLS) examples are included.
*/

-- ============================================
-- PROFILES
-- Separated from Supabase Auth (which stores credentials).
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT DEFAULT '',
    avatar_url TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- COMPANIES
-- Each profile belongs to one or more companies.
-- ============================================
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    industry TEXT DEFAULT '',
    website TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- CUSTOMERS
-- Business customer records owned by a company.
-- ============================================
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    segment TEXT DEFAULT '',
    lifetime_value NUMERIC DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- CAMPAIGNS
-- Marketing campaigns owned by a company.
-- ============================================
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    platform TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'draft',
    budget NUMERIC DEFAULT 0,
    spend NUMERIC DEFAULT 0,
    impressions BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    conversions BIGINT DEFAULT 0,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- REPORTS
-- Generated reports stored per company.
-- ============================================
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    report_type TEXT NOT NULL,
    title TEXT NOT NULL DEFAULT '',
    content JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- UPLOADS
-- Tracks uploaded CSV files per company.
-- ============================================
CREATE TABLE IF NOT EXISTS uploads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    filename TEXT NOT NULL,
    file_path TEXT NOT NULL,
    row_count INTEGER DEFAULT 0,
    column_names TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) EXAMPLES
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own profile
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Companies: owners can manage their own companies
CREATE POLICY "Users can view own companies"
    ON companies FOR SELECT
    USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert own companies"
    ON companies FOR INSERT
    WITH CHECK (auth.uid() = owner_id);

-- Customers: accessible only via company ownership
CREATE POLICY "Users can view own company customers"
    ON customers FOR SELECT
    USING (
        company_id IN (
            SELECT id FROM companies WHERE owner_id = auth.uid()
        )
    );

-- Campaigns: accessible only via company ownership
CREATE POLICY "Users can view own company campaigns"
    ON campaigns FOR SELECT
    USING (
        company_id IN (
            SELECT id FROM companies WHERE owner_id = auth.uid()
        )
    );

-- Reports: accessible only via company ownership
CREATE POLICY "Users can view own company reports"
    ON reports FOR SELECT
    USING (
        company_id IN (
            SELECT id FROM companies WHERE owner_id = auth.uid()
        )
    );

-- Uploads: accessible only via company ownership
CREATE POLICY "Users can view own company uploads"
    ON uploads FOR SELECT
    USING (
        company_id IN (
            SELECT id FROM companies WHERE owner_id = auth.uid()
        )
    );
