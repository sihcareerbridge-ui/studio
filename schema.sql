-- Users Table to store student profiles
-- This table can be linked to Supabase Auth users via the 'id' column.
CREATE TABLE students (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    university TEXT,
    college TEXT,
    degree TEXT,
    branch TEXT,
    year INT,
    cgpa REAL,
    credits INT,
    bio TEXT,
    resume_url TEXT,
    consent BOOLEAN DEFAULT false,
    links JSONB
);

-- Organizations Table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    bio TEXT,
    verified BOOLEAN DEFAULT false,
    owner_id UUID REFERENCES auth.users(id)
);

-- Internships Table
CREATE TABLE internships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    location TEXT,
    duration TEXT,
    description TEXT,
    tags TEXT[],
    status TEXT DEFAULT 'Inactive', -- Active, Closed, Blocked
    start_date DATE,
    deadline DATE,
    stipend INT
);

-- Courses Table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    provider_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    category TEXT,
    duration TEXT,
    rating REAL,
    description TEXT,
    tags TEXT[],
    status TEXT DEFAULT 'Inactive' -- Active, Inactive, Blocked
);

-- Course Modules Table
CREATE TABLE course_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    duration TEXT,
    module_order INT
);

-- Content Blocks for Modules
CREATE TABLE content_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES course_modules(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'video', 'text', 'quiz'
    title TEXT NOT NULL,
    content TEXT,
    block_order INT
);

-- Student Skills (Many-to-many relationship)
CREATE TABLE student_skills (
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL,
    PRIMARY KEY (student_id, skill_name)
);

-- Applications Table (linking students and internships)
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    internship_id UUID REFERENCES internships(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'Pending Review', -- Pending, Interviewing, Offered, Rejected, Accepted
    fit_score INT,
    applied_at TIMESTAMPTZ DEFAULT now()
);

-- Feedback Table
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    target_type TEXT NOT NULL, -- 'internship' or 'course'
    target_id UUID NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Conversations Table
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id),
    admin_id UUID REFERENCES auth.users(id), -- Assuming admins are also in auth.users
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Messages Table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES auth.users(id),
    content TEXT,
    sent_at TIMESTAMPTZ DEFAULT now()
);

-- Saved Items (for students)
CREATE TABLE saved_items (
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL, -- 'internship' or 'course'
    item_id UUID NOT NULL,
    PRIMARY KEY (student_id, item_type, item_id)
);
