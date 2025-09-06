-- Clear existing data to prevent conflicts, but leave students and organizations created by triggers/users
DELETE FROM public.feedback;
DELETE FROM public.content_blocks;
DELETE FROM public.course_modules;
DELETE FROM public.courses;
DELETE FROM public.internships;

-- Define a temporary variable for the host user's ID
-- IMPORTANT: This script uses the host user ID you created.
DO $$
DECLARE
    host_user_id uuid := '023cc7b7-5e33-4a04-b1f7-1e5c327b902d';
    student_user_id uuid := '16d5ec4e-ea06-4814-991b-b0119534f57d';
    innovate_tech_org_id uuid;
    data_driven_org_id uuid;
    
    course1_id uuid;
    course2_id uuid;
    course3_id uuid;
    course4_id uuid;
    course5_id uuid;
    
    module1_id uuid;
    module2_id uuid;
    module3_id uuid;
    module4_id uuid;
BEGIN
    -- Get the organization ID associated with the host user.
    SELECT id INTO innovate_tech_org_id FROM public.organizations WHERE owner_id = host_user_id AND name LIKE '%InnovateTech%' LIMIT 1;
    
    -- Insert another organization for variety (owned by the same host for this demo)
    INSERT INTO public.organizations (id, name, logo_url, email, phone, address, bio, verified, owner_id)
    VALUES (uuid_generate_v4(), 'DataDriven Inc.', 'https://picsum.photos/seed/datadriven/200/200', 'contact@datadriven.com', '+1 (555) 789-0123', '456 Data Drive, Analytics City, CA 94043', 'DataDriven Inc. is a leading provider of big data analytics and business intelligence solutions.', true, host_user_id)
    ON CONFLICT (name) DO NOTHING
    RETURNING id INTO data_driven_org_id;

    -- If the second org already exists, find its ID
    IF data_driven_org_id IS NULL THEN
        SELECT id INTO data_driven_org_id FROM public.organizations WHERE name = 'DataDriven Inc.' LIMIT 1;
    END IF;

    -- Insert Internships individually
    INSERT INTO public.internships (id, title, organization_id, location, duration, description, tags, status) VALUES (uuid_generate_v4(), 'Software Engineer Intern', innovate_tech_org_id, 'Remote', '12 Weeks', 'Work on cutting-edge AI projects and collaborate with senior engineers to develop scalable software solutions. This is a great opportunity to gain hands-on experience.', '{"AI", "Python", "React", "Node.js"}', 'Active');
    INSERT INTO public.internships (id, title, organization_id, location, duration, description, tags, status) VALUES (uuid_generate_v4(), 'Data Scientist Intern', data_driven_org_id, 'New York, NY', '10 Weeks', 'Analyze large datasets to extract meaningful insights. Work with our data science team on predictive modeling and data visualization projects.', '{"Data Science", "Python", "SQL", "Tableau"}', 'Active');
    INSERT INTO public.internships (id, title, organization_id, location, duration, description, tags, status) VALUES (uuid_generate_v4(), 'UX/UI Design Intern', innovate_tech_org_id, 'San Francisco, CA', '12 Weeks', 'Design intuitive and engaging user interfaces for our web and mobile applications. Create wireframes, mockups, and prototypes.', '{"UX", "UI", "Figma", "Design Thinking"}', 'Closed');
    INSERT INTO public.internships (id, title, organization_id, location, duration, description, tags, status) VALUES (uuid_generate_v4(), 'Product Manager Intern', data_driven_org_id, 'Remote', '16 Weeks', 'Define product roadmaps, work with engineering and design teams to launch new features, and analyze market trends.', '{"Product Management", "Agile", "JIRA"}', 'Active');
    INSERT INTO public.internships (id, title, organization_id, location, duration, description, tags, status) VALUES (uuid_generate_v4(), 'Marketing Intern', innovate_tech_org_id, 'Austin, TX', '12 Weeks', 'Develop and execute marketing campaigns, manage social media channels, and create engaging content to drive brand awareness.', '{"Marketing", "SEO", "Content Creation"}', 'Active');

    -- Insert Courses individually and capture their IDs
    INSERT INTO public.courses (id, title, provider_id, category, duration, rating, description, tags, status) VALUES (uuid_generate_v4(), 'Advanced React Patterns', innovate_tech_org_id, 'Web Development', '8 Weeks', 4.8, 'Deep dive into advanced React concepts including hooks, state management with Redux, and performance optimization.', '{"React", "Frontend", "Web Development"}', 'Active') RETURNING id INTO course1_id;
    INSERT INTO public.courses (id, title, provider_id, category, duration, rating, description, tags, status) VALUES (uuid_generate_v4(), 'Introduction to Python for Data Science', data_driven_org_id, 'Data Science', '6 Weeks', 4.9, 'A beginner-friendly introduction to Python for data manipulation, analysis, and visualization using libraries like Pandas and Matplotlib.', '{"Python", "Data Science", "Pandas"}', 'Active') RETURNING id INTO course2_id;
    INSERT INTO public.courses (id, title, provider_id, category, duration, rating, description, tags, status) VALUES (uuid_generate_v4(), 'UI/UX Design Fundamentals', innovate_tech_org_id, 'Design', '10 Weeks', 4.7, 'Learn the principles of user-centered design, create wireframes, and build interactive prototypes using Figma.', '{"UI", "UX", "Figma", "Design"}', 'Inactive') RETURNING id INTO course3_id;
    INSERT INTO public.courses (id, title, provider_id, category, duration, rating, description, tags, status) VALUES (uuid_generate_v4(), 'Agile Product Management', data_driven_org_id, 'Product Management', '4 Weeks', 4.6, 'Understand the Agile methodology and learn how to manage product backlogs, write user stories, and lead sprint planning.', '{"Product Management", "Agile"}', 'Blocked') RETURNING id INTO course4_id;
    INSERT INTO public.courses (id, title, provider_id, category, duration, rating, description, tags, status) VALUES (uuid_generate_v4(), 'Backend Development with Node.js', innovate_tech_org_id, 'Web Development', '12 Weeks', 4.8, 'Build scalable and efficient backend systems using Node.js, Express, and MongoDB.', '{"Node.js", "Backend", "JavaScript"}', 'Active') RETURNING id INTO course5_id;

    -- Insert Modules and Content for Course 1
    INSERT INTO public.course_modules (course_id, title, duration, module_order) VALUES (course1_id, 'React Hooks In-Depth', '2 Weeks', 1) RETURNING id INTO module1_id;
    INSERT INTO public.course_modules (course_id, title, duration, module_order) VALUES (course1_id, 'State Management with Redux', '3 Weeks', 2) RETURNING id INTO module2_id;
    
    INSERT INTO public.content_blocks (module_id, type, title, content, block_order) VALUES
    (module1_id, 'video', 'useState and useEffect', 'https://youtube.com/watch?v=1', 1),
    (module1_id, 'text', 'Custom Hooks', 'Custom hooks are a powerful way to reuse stateful logic.', 2),
    (module2_id, 'video', 'Redux Core Concepts', 'https://youtube.com/watch?v=2', 1),
    (module2_id, 'quiz', 'Redux Quiz', 'What is the main purpose of a reducer? | To specify how state changes | To hold state | To dispatch actions', 2);

    -- Insert Modules and Content for Course 2
    INSERT INTO public.course_modules (course_id, title, duration, module_order) VALUES (course2_id, 'Python Basics', '1 Week', 1) RETURNING id INTO module3_id;
    INSERT INTO public.course_modules (course_id, title, duration, module_order) VALUES (course2_id, 'Intro to Pandas', '2 Weeks', 2) RETURNING id INTO module4_id;

    INSERT INTO public.content_blocks (module_id, type, title, content, block_order) VALUES
    (module3_id, 'video', 'Variables and Data Types', 'https://youtube.com/watch?v=3', 1),
    (module4_id, 'text', 'Pandas DataFrames', 'DataFrames are the primary data structure in Pandas.', 1);

    -- Insert Feedback
    INSERT INTO public.feedback (student_id, target_id, target_type, rating, comment, date) VALUES
    (student_user_id, course1_id, 'course', 5, 'This course was amazing! The instructor explained complex concepts in a very clear way. Highly recommended!', '2024-07-20'),
    (student_user_id, course2_id, 'course', 4, 'Great introduction to Python for data science. The section on Pandas was particularly helpful.', '2024-07-18');

END $$;
