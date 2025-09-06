-- This script seeds the database with initial data for the CareerMatch platform.
-- It uses Common Table Expressions (CTEs) to handle dependencies between tables,
-- ensuring that foreign key constraints are met by referencing generated UUIDs.

-- Clear existing data in the correct order to avoid foreign key violations
DELETE FROM public.feedback;
DELETE FROM public.saved_items;
DELETE FROM public.applications;
DELETE FROM public.content_blocks;
DELETE FROM public.course_modules;
DELETE FROM public.courses;
DELETE FROM public.internships;
DELETE FROM public.student_skills;
DELETE FROM public.students;
DELETE FROM public.organizations;
DELETE FROM public.users;


-- 1. Seed Users and capture their generated UUIDs
WITH inserted_users AS (
  INSERT INTO public.users (id, email, "role") VALUES
    (gen_random_uuid(), 'student@test.com', 'student'),
    (gen_random_uuid(), 'host@test.com', 'host'),
    (gen_random_uuid(), 'admin@test.com', 'admin')
  RETURNING id, email, "role"
),

-- 2. Seed Organizations, linking them to the host user
inserted_organizations AS (
  INSERT INTO public.organizations (id, name, logo_url, email, phone, address, bio, verified, owner_id)
  SELECT
    gen_random_uuid(),
    'InnovateTech',
    'https://picsum.photos/seed/innovate/200/200',
    'careers@innovatetech.com',
    '+1 (555) 123-4567',
    '123 Tech Avenue, Silicon Valley, CA 94043',
    'InnovateTech is a pioneering technology firm at the forefront of artificial intelligence and machine learning solutions.',
    true,
    (SELECT id FROM inserted_users WHERE email = 'host@test.com')
  UNION ALL
  SELECT
    gen_random_uuid(),
    'DataDriven Inc.',
    'https://picsum.photos/seed/datadriven/200/200',
    'hr@datadriven.com',
    '+1 (555) 987-6543',
    '456 Data Drive, New York, NY 10001',
    'DataDriven Inc. specializes in big data analytics, helping businesses unlock insights and make smarter decisions.',
    true,
    (SELECT id FROM inserted_users WHERE email = 'host@test.com')
  UNION ALL
  SELECT
    gen_random_uuid(),
    'CreativeMinds',
    'https://picsum.photos/seed/creative/200/200',
    'hello@creativeminds.design',
    '+1 (555) 234-5678',
    '789 Design District, Austin, TX 78701',
    'A digital design agency that crafts beautiful and intuitive user experiences for web and mobile applications.',
    false,
    (SELECT id FROM inserted_users WHERE email = 'host@test.com')
  RETURNING id, name
),

-- 3. Seed Students, linking them to the student user
inserted_students AS (
  INSERT INTO public.students (id, name, email, avatar_url, university, college, degree, branch, year, cgpa, credits, bio, resume_url, consent)
  SELECT
    u.id,
    'Alex Doe',
    u.email,
    'https://i.pravatar.cc/150?u=alexdoe',
    'State University',
    'College of Engineering',
    'B.Tech',
    'Computer Science',
    3,
    8.7,
    125,
    'A passionate and driven third-year Computer Science student with a strong foundation in software development and a keen interest in AI and machine learning. Eager to apply my skills in a real-world setting and contribute to innovative projects.',
    '/resumes/alex_doe_resume.pdf',
    true
  FROM inserted_users u WHERE u.email = 'student@test.com'
  RETURNING id, name
),

-- 4. Seed Student Skills, linking to the student created above
inserted_skills AS (
  INSERT INTO public.student_skills (student_id, skill_name)
  SELECT 
    (SELECT id FROM inserted_students WHERE name = 'Alex Doe'),
    skill
  FROM unnest(ARRAY['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Git', 'AI', 'Machine Learning']) AS skill
),

-- 5. Seed Internships, linking them to their respective organizations
inserted_internships AS (
  INSERT INTO public.internships (id, title, description, location, duration, status, tags, organization_id)
  VALUES
    (gen_random_uuid(), 'AI/ML Research Intern', 'Work on cutting-edge research projects in the field of deep learning and natural language processing. This role involves implementing novel algorithms, conducting experiments, and contributing to publications.', 'Remote', '12 Weeks', 'Active', '{"AI", "Machine Learning", "Python", "PyTorch"}', (SELECT id FROM inserted_organizations WHERE name = 'InnovateTech')),
    (gen_random_uuid(), 'Data Scientist Intern', 'Join our data science team to analyze large datasets, build predictive models, and create insightful visualizations. You will work with real-world data to solve challenging business problems.', 'New York, NY', '10 Weeks', 'Active', '{"Data Science", "Python", "SQL", "Tableau"}', (SELECT id FROM inserted_organizations WHERE name = 'DataDriven Inc.')),
    (gen_random_uuid(), 'UX/UI Design Intern', 'Collaborate with our product team to design intuitive and beautiful user interfaces for our flagship mobile app. You will be involved in the entire design process, from user research to final mockups.', 'Austin, TX', '12 Weeks', 'Active', '{"UX Design", "UI Design", "Figma", "User Research"}', (SELECT id FROM inserted_organizations WHERE name = 'CreativeMinds')),
    (gen_random_uuid(), 'Backend Engineer Intern', 'Help build and maintain the core infrastructure of our platform. You will work with Node.js, PostgreSQL, and AWS to develop scalable and reliable backend services.', 'San Francisco, CA', '12 Weeks', 'Closed', '{"Backend", "Node.js", "SQL", "AWS"}', (SELECT id FROM inserted_organizations WHERE name = 'InnovateTech')),
    (gen_random_uuid(), 'Frontend Developer Intern', 'Develop and enhance the user interface of our web application using React and TypeScript. You will work closely with designers and backend engineers to create a seamless user experience.', 'Remote', '12 Weeks', 'Active', '{"Frontend", "React", "TypeScript", "CSS"}', (SELECT id FROM inserted_organizations WHERE name = 'DataDriven Inc.'))
  RETURNING id, title
),

-- 6. Seed Courses, linking them to organizations
inserted_courses AS (
    INSERT INTO public.courses (id, title, provider_id, category, duration, rating, description, tags, status)
    VALUES
        (gen_random_uuid(), (SELECT id FROM inserted_organizations WHERE name = 'InnovateTech'), 'Introduction to Python for AI', 'Data Science', '6 weeks', 4.8, 'A beginner-friendly course on Python programming, tailored for applications in AI and Machine Learning.', '{"Python", "AI", "Beginner"}', 'Active'),
        (gen_random_uuid(), (SELECT id FROM inserted_organizations WHERE name = 'DataDriven Inc.'), 'Advanced SQL for Data Analysts', 'Data Science', '4 weeks', 4.9, 'Master complex SQL queries, window functions, and performance optimization for large-scale data analysis.', '{"SQL", "Data Analysis", "Advanced"}', 'Active'),
        (gen_random_uuid(), (SELECT id FROM inserted_organizations WHERE name = 'CreativeMinds'), 'UI/UX Design with Figma', 'Design', '8 weeks', 4.7, 'Learn the complete design process from user research to interactive prototypes using Figma.', '{"Figma", "UI Design", "UX Design"}', 'Active')
    RETURNING id, title
),

-- 7. Seed Course Modules
inserted_modules AS (
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order)
    SELECT
        gen_random_uuid(),
        c.id,
        m.title,
        m.duration,
        m.module_order
    FROM
        inserted_courses c,
        (VALUES
            ( 'Introduction to Python for AI', 'Module 1: Python Basics', '2 hours', 1),
            ( 'Introduction to Python for AI', 'Module 2: NumPy and Pandas', '3 hours', 2),
            ( 'UI/UX Design with Figma', 'Module 1: Design Principles', '1.5 hours', 1),
            ( 'UI/UX Design with Figma', 'Module 2: Prototyping in Figma', '2.5 hours', 2)
        ) AS m(course_title, title, duration, module_order)
    WHERE c.title = m.course_title
    RETURNING id, title
)

-- Final SELECT statement to confirm the script ran. This won't return anything to the UI but is good practice.
SELECT 'Seeding Completed Successfully' AS status;
