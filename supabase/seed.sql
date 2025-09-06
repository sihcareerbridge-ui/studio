-- This script is used to seed the database with initial data.
-- It is idempotent, meaning it can be run multiple times without creating duplicate data.

-- //////////////////////////////////////////////
-- /// Organizations
-- //////////////////////////////////////////////

-- Make sure to create a "host" user in your application first.
-- Then, go to your Supabase Dashboard > Authentication > Users, and copy the User ID.
-- Paste that User ID to replace the '<PASTE_YOUR_HOST_USER_ID_HERE>' placeholder below.
insert into
  public.organizations (id, owner_id, name, email, bio, logo_url)
values
  (
    'org-01',
    '023cc7b7-5e33-4a04-b1f7-1e5c327b902d', -- Paste your HOST User ID here
    'InnovateTech',
    'contact@innovatetech.com',
    'InnovateTech is a leading software company focused on AI-driven solutions. We are committed to pushing the boundaries of technology and fostering the next generation of innovators.',
    'https://avatar.vercel.sh/innovatetech.png'
  ),
  (
    'org-02',
    '023cc7b7-5e33-4a04-b1f7-1e5c327b902d', -- Paste your HOST User ID here
    'DataDriven Inc.',
    'hello@datadriven.com',
    'DataDriven Inc. specializes in big data analytics and machine learning. Our mission is to turn data into actionable insights that drive business success.',
    'https://avatar.vercel.sh/datadriven.png'
  )
on conflict (id) do nothing;


-- //////////////////////////////////////////////
-- /// Students
-- //////////////////////////////////////////////

-- The handle_new_user trigger already creates a basic student profile.
-- This command will UPDATE the existing student record with more details.
-- Make sure the student user (ID: 16d5ec4e-ea06-4814-991b-b0119534f57d) exists.
update public.students
set
  name = 'Alex Doe',
  email = 'student@test.com',
  university = 'State University',
  college = 'College of Engineering',
  degree = 'B.Tech',
  branch = 'Computer Science',
  year = 3,
  cgpa = 8.7,
  credits = 125,
  bio = 'A passionate computer science student with a keen interest in AI and web development. Eager to apply my skills in a real-world setting and contribute to innovative projects.',
  resume_url = '/resumes/alex_doe_resume.pdf',
  avatar_url = 'https://i.pravatar.cc/150?u=alexdoe',
  consent = true,
  links = '{
    "twitter": "https://twitter.com/alexdoe",
    "github": "https://github.com/alexdoe",
    "linkedin": "https://linkedin.com/in/alexdoe",
    "kaggle": "https://kaggle.com/alexdoe"
  }'
where id = '16d5ec4e-ea06-4814-991b-b0119534f57d';

insert into public.student_skills (student_id, skill_name)
values
  ('16d5ec4e-ea06-4814-991b-b0119534f57d', 'React'),
  ('16d5ec4e-ea06-4814-991b-b0119534f57d', 'Node.js'),
  ('16d5ec4e-ea06-4814-991b-b0119534f57d', 'Python'),
  ('16d5ec4e-ea06-4B14-991B-B0119534F57D', 'AI'),
  ('16d5ec4e-ea06-4814-991b-b0119534f57d', 'Machine Learning'),
  ('16d5ec4e-ea06-4814-991b-b0119534f57d', 'Databases')
on conflict do nothing;


-- //////////////////////////////////////////////
-- /// Courses
-- //////////////////////////////////////////////
insert into
  public.courses (id, provider_id, title, category, description, duration, rating, tags, status)
values
  (
    'course-01', 'org-01', 'Advanced React Patterns', 'Web Development',
    'Dive deep into advanced React concepts, including hooks, context, performance optimization, and state management strategies.',
    '8 hours', 4.8, '{"React", "Frontend", "JavaScript"}', 'Active'
  ),
  (
    'course-02', 'org-01', 'Introduction to Python for AI', 'Data Science',
    'A comprehensive introduction to Python programming for artificial intelligence, covering fundamental libraries like NumPy, Pandas, and Scikit-learn.',
    '12 hours', 4.9, '{"Python", "AI", "Machine Learning"}', 'Active'
  ),
  (
    'course-03', 'org-02', 'UI/UX Design Fundamentals', 'Design',
    'Learn the core principles of user interface and user experience design, from wireframing to prototyping.',
    '6 hours', 4.7, '{"UI", "UX", "Design", "Figma"}', 'Active'
  ),
  (
    'course-04', 'org-02', 'Data Science with Python', 'Data Science',
    'An in-depth course on data science techniques using Python, focusing on data analysis, visualization, and building predictive models.',
    '15 hours', 4.8, '{"Python", "Data Science", "Pandas"}', 'Active'
  ),
  (
    'course-05', 'org-01', 'Backend Development with Node.js', 'Web Development',
    'Build robust and scalable server-side applications with Node.js, Express, and MongoDB.',
    '10 hours', 4.6, '{"Node.js", "Backend", "JavaScript", "API"}', 'Active'
  )
on conflict (id) do nothing;


-- //////////////////////////////////////////////
-- /// Internships
-- //////////////////////////////////////////////
insert into
  public.internships (id, organization_id, title, location, duration, description, tags, status)
values
  (
    'int-01', 'org-01', 'AI Engineer Intern', 'Remote', '12 Weeks',
    'Work on cutting-edge AI projects, developing and implementing machine learning models. A great opportunity to gain hands-on experience in a fast-paced, innovative environment.',
    '{"AI", "Python", "Machine Learning", "PyTorch"}', 'Active'
  ),
  (
    'int-02', 'org-01', 'Frontend Developer Intern (React)', 'New York, NY', '10 Weeks',
    'Join our frontend team to build and enhance user interfaces for our flagship products. You will work with React, TypeScript, and modern web technologies.',
    '{"React", "Frontend", "JavaScript", "TypeScript"}', 'Active'
  ),
  (
    'int-03', 'org-02', 'Data Science Intern', 'San Francisco, CA', '12 Weeks',
    'Analyze large datasets to extract meaningful insights. This role involves data cleaning, exploratory data analysis, and building statistical models to solve real-world problems.',
    '{"Data Science", "Python", "R", "SQL", "Statistics"}', 'Active'
  ),
  (
    'int-04', 'org-02', 'Product Manager Intern', 'Austin, TX', '12 Weeks',
    'Support the product team in defining product roadmaps, gathering requirements, and working with engineering to deliver features that delight users.',
    '{"Product Management", "Agile", "User Research"}', 'Active'
  ),
  (
    'int-05', 'org-01', 'Software Engineer Intern (Backend)', 'Remote', '16 Weeks',
    'Help design, build, and maintain the backend services that power our applications. You will work with Node.js, Docker, and AWS.',
    '{"Backend", "Node.js", "API", "Docker", "AWS"}', 'Active'
  )
on conflict (id) do nothing;


-- //////////////////////////////////////////////
-- /// Feedback
-- //////////////////////////////////////////////
insert into
  public.feedback (id, student_id, target_id, target_type, rating, comment, created_at)
values
  (
    uuid_generate_v4(), '16d5ec4e-ea06-4814-991b-b0119534f57d', 'course-01', 'course', 5,
    'This course was fantastic! The explanations were clear, and the projects were very practical. I learned a lot about advanced React.',
    '2024-06-20T10:00:00Z'
  ),
  (
    uuid_generate_v4(), '16d5ec4e-ea06-4814-991b-b0119534f57d', 'int-02', 'internship', 4,
    'The internship was a great learning experience. The team was supportive, but I wish there was more mentorship in the first few weeks.',
    '2024-05-15T14:30:00Z'
  ),
  (
    uuid_generate_v4(), '16d5ec4e-ea06-4814-991b-b0119534f57d', 'course-02', 'course', 3,
    'The content was good, but the pacing was a bit too fast for a beginner. More introductory material would have been helpful.',
    '2024-07-01T11:00:00Z'
  )
on conflict (id) do nothing;
