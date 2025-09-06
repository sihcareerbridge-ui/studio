-- Make sure to create a "host" user in your application first.
-- Then, go to your Supabase Dashboard > Authentication > Users, and copy the User ID.
-- Paste that User ID to replace the '<PASTE_YOUR_HOST_USER_ID_HERE>' placeholder below.

-- Clear existing data to prevent conflicts, but leave students and organizations created by triggers/users
DELETE FROM public.feedback;
DELETE FROM public.content_blocks;
DELETE FROM public.course_modules;
DELETE FROM public.courses;
DELETE FROM public.internships;

-- Define a temporary variable for the host user's ID
-- IMPORTANT: Replace the placeholder with the actual User ID from your Supabase Auth dashboard.
DO $$
DECLARE
    host_user_id uuid := '<PASTE_YOUR_HOST_USER_ID_HERE>';
    innovate_tech_org_id uuid;
    data_driven_org_id uuid;
BEGIN
    -- Get the organization ID associated with the host user.
    -- This assumes the handle_new_user trigger has already created an organization for this host.
    -- If you have multiple orgs, you might need to adjust this logic.
    SELECT id INTO innovate_tech_org_id FROM public.organizations WHERE owner_id = host_user_id LIMIT 1;
    
    -- If the host has no organization yet, you might need to create one manually or adjust the trigger.
    -- For this seed script, we'll proceed assuming one was found. If not, the script will fail at the internship/course insertion.

    -- Insert another organization for variety (owned by the same host for this demo)
    INSERT INTO public.organizations (id, name, logo_url, email, phone, address, bio, verified, owner_id)
    VALUES (uuid_generate_v4(), 'DataDriven Inc.', 'https://picsum.photos/seed/datadriven/200/200', 'contact@datadriven.com', '+1 (555) 789-0123', '456 Data Drive, Analytics City, CA 94043', 'DataDriven Inc. is a leading provider of big data analytics and business intelligence solutions.', true, host_user_id)
    RETURNING id INTO data_driven_org_id;

    -- Insert Internships
    INSERT INTO public.internships (id, title, organization_id, location, duration, description, tags, status) VALUES
    ('int-001', 'Software Engineer Intern', innovate_tech_org_id, 'Remote', '12 Weeks', 'Work on cutting-edge AI projects and collaborate with senior engineers to develop scalable software solutions. This is a great opportunity to gain hands-on experience.', '{"AI", "Python", "React", "Node.js"}', 'Active'),
    ('int-002', 'Data Scientist Intern', data_driven_org_id, 'New York, NY', '10 Weeks', 'Analyze large datasets to extract meaningful insights. Work with our data science team on predictive modeling and data visualization projects.', '{"Data Science", "Python", "SQL", "Tableau"}', 'Active'),
    ('int-003', 'UX/UI Design Intern', innovate_tech_org_id, 'San Francisco, CA', '12 Weeks', 'Design intuitive and engaging user interfaces for our web and mobile applications. Create wireframes, mockups, and prototypes.', '{"UX", "UI", "Figma", "Design Thinking"}', 'Closed'),
    ('int-004', 'Product Manager Intern', data_driven_org_id, 'Remote', '16 Weeks', 'Define product roadmaps, work with engineering and design teams to launch new features, and analyze market trends.', '{"Product Management", "Agile", "JIRA"}', 'Active'),
    ('int-005', 'Marketing Intern', innovate_tech_org_id, 'Austin, TX', '12 Weeks', 'Develop and execute marketing campaigns, manage social media channels, and create engaging content to drive brand awareness.', '{"Marketing", "SEO", "Content Creation"}', 'Active');

    -- Insert Courses
    INSERT INTO public.courses (id, title, provider_id, category, duration, rating, description, tags, status) VALUES
    ('course-01', 'Advanced React Patterns', innovate_tech_org_id, 'Web Development', '8 Weeks', 4.8, 'Deep dive into advanced React concepts including hooks, state management with Redux, and performance optimization.', '{"React", "Frontend", "Web Development"}', 'Active'),
    ('course-02', 'Introduction to Python for Data Science', data_driven_org_id, 'Data Science', '6 Weeks', 4.9, 'A beginner-friendly introduction to Python for data manipulation, analysis, and visualization using libraries like Pandas and Matplotlib.', '{"Python", "Data Science", "Pandas"}', 'Active'),
    ('course-03', 'UI/UX Design Fundamentals', innovate_tech_org_id, 'Design', '10 Weeks', 4.7, 'Learn the principles of user-centered design, create wireframes, and build interactive prototypes using Figma.', '{"UI", "UX", "Figma", "Design"}', 'Inactive'),
    ('course-04', 'Agile Product Management', data_driven_org_id, 'Product Management', '4 Weeks', 4.6, 'Understand the Agile methodology and learn how to manage product backlogs, write user stories, and lead sprint planning.', '{"Product Management", "Agile"}', 'Blocked'),
    ('course-05', 'Backend Development with Node.js', innovate_tech_org_id, 'Web Development', '12 Weeks', 4.8, 'Build scalable and efficient backend systems using Node.js, Express, and MongoDB.', '{"Node.js", "Backend", "JavaScript"}', 'Active');

    -- Insert Modules and Content for Course 1
    WITH course1 AS (SELECT id FROM public.courses WHERE title = 'Advanced React Patterns'),
         module1 AS (INSERT INTO public.course_modules (course_id, title, duration, module_order) SELECT id, 'React Hooks In-Depth', '2 Weeks', 1 FROM course1 RETURNING id),
         module2 AS (INSERT INTO public.course_modules (course_id, title, duration, module_order) SELECT id, 'State Management with Redux', '3 Weeks', 2 FROM course1 RETURNING id)
    INSERT INTO public.content_blocks (module_id, type, title, content, block_order) VALUES
    ((SELECT id FROM module1), 'video', 'useState and useEffect', 'https://youtube.com/watch?v=1', 1),
    ((SELECT id FROM module1), 'text', 'Custom Hooks', 'Custom hooks are a powerful way to reuse stateful logic.', 2),
    ((SELECT id FROM module2), 'video', 'Redux Core Concepts', 'https://youtube.com/watch?v=2', 1),
    ((SELECT id FROM module2), 'quiz', 'Redux Quiz', 'What is the main purpose of a reducer? | To specify how state changes | To hold state | To dispatch actions', 2);

    -- Insert Modules and Content for Course 2
    WITH course2 AS (SELECT id FROM public.courses WHERE title = 'Introduction to Python for Data Science'),
         module3 AS (INSERT INTO public.course_modules (course_id, title, duration, module_order) SELECT id, 'Python Basics', '1 Week', 1 FROM course2 RETURNING id),
         module4 AS (INSERT INTO public.course_modules (course_id, title, duration, module_order) SELECT id, 'Intro to Pandas', '2 Weeks', 2 FROM course2 RETURNING id)
    INSERT INTO public.content_blocks (module_id, type, title, content, block_order) VALUES
    ((SELECT id FROM module3), 'video', 'Variables and Data Types', 'https://youtube.com/watch?v=3', 1),
    ((SELECT id FROM module4), 'text', 'Pandas DataFrames', 'DataFrames are the primary data structure in Pandas.', 1);

END $$;
