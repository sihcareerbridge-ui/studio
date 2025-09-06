-- Clear existing data in the correct order to avoid foreign key constraints
DELETE FROM public.feedback;
DELETE FROM public.content_blocks;
DELETE FROM public.course_modules;
DELETE FROM public.applications;
DELETE FROM public.courses;
DELETE FROM public.internships;
DELETE FROM public.students;
DELETE FROM public.organizations;

-- Seed Organizations
INSERT INTO public.organizations (id, name, logo_url, email, phone, address, bio, verified, owner_id) VALUES
('a8a7a4f7-3c3e-4d2a-82f7-05c2a8a8a8a8', 'InnovateTech', 'https://picsum.photos/seed/innovate/200/200', 'careers@innovatetech.com', '+1 (555) 123-4567', '123 Tech Avenue, Silicon Valley, CA 94043', 'InnovateTech is a pioneering technology firm at the forefront of artificial intelligence and machine learning solutions.', true, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'),
('b8b7b4f7-3c3e-4d2a-82f7-05c2b8b8b8b8', 'DataDriven Inc.', 'https://picsum.photos/seed/datadriven/200/200', 'hr@datadriven.com', '+1 (555) 987-6543', '456 Data Drive, New York, NY 10001', 'DataDriven Inc. specializes in big data analytics and business intelligence, helping companies make smarter decisions.', true, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'),
('c8c7c4f7-3c3e-4d2a-82f7-05c2c8c8c8c8', 'NextGen Solutions', 'https://picsum.photos/seed/nextgen/200/200', 'apply@nextgenco.io', '+1 (555) 234-5678', '789 Future Way, Austin, TX 78701', 'NextGen Solutions is a fast-growing startup focused on developing cutting-edge SaaS products for the modern enterprise.', true, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13'),
('d8d7d4f7-3c3e-4d2a-82f7-05c2d8d8d8d8', 'CreativeMinds', 'https://picsum.photos/seed/creative/200/200', 'join@creativeminds.design', '+1 (555) 345-6789', '101 Design Street, San Francisco, CA 94107', 'CreativeMinds is a digital design agency that crafts beautiful and intuitive user experiences for web and mobile.', true, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14'),
('e8e7e4f7-3c3e-4d2a-82f7-05c2e8e8e8e8', 'QuantumLeap', 'https://picsum.photos/seed/quantum/200/200', 'info@quantumleap.tech', '+1 (555) 456-7890', '202 Quantum Road, Boston, MA 02110', 'QuantumLeap is a research-focused organization pushing the boundaries of quantum computing and its applications.', true, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15');

-- Seed Internships
INSERT INTO public.internships (id, title, organization_id, location, duration, description, tags, status, stipend) VALUES
('int-001', 'AI/ML Research Intern', 'a8a7a4f7-3c3e-4d2a-82f7-05c2a8a8a8a8', 'Remote', '12 Weeks', 'Work with our top researchers on groundbreaking AI models. This role involves implementing algorithms, running experiments, and contributing to research papers.', '{"AI", "Machine Learning", "Python", "PyTorch"}', 'Active', 5000),
('int-002', 'Data Science Intern', 'b8b7b4f7-3c3e-4d2a-82f7-05c2b8b8b8b8', 'New York, NY', '10 Weeks', 'Analyze large datasets to extract meaningful insights for our clients. You will work with SQL, Python, and data visualization tools to create impactful reports.', '{"Data Science", "SQL", "Python", "Tableau"}', 'Active', 4500),
('int-003', 'Full-Stack Developer Intern', 'c8c7c4f7-3c3e-4d2a-82f7-05c2c8c8c8c8', 'Austin, TX', '16 Weeks', 'Join our agile development team to build and enhance our flagship SaaS product. You will get hands-on experience with both frontend (React) and backend (Node.js) technologies.', '{"React", "Node.js", "TypeScript", "PostgreSQL"}', 'Active', 4800),
('int-004', 'UX/UI Design Intern', 'd8d7d4f7-3c3e-4d2a-82f7-05c2d8d8d8d8', 'San Francisco, CA', '12 Weeks', 'Help us design the future of user interfaces. You will be involved in the entire design process, from user research and wireframing to creating high-fidelity prototypes in Figma.', '{"UX Design", "UI Design", "Figma", "User Research"}', 'Closed', 4200),
('int-005', 'Quantum Computing Intern', 'e8e7e4f7-3c3e-4d2a-82f7-05c2e8e8e8e8', 'Boston, MA', '12 Weeks', 'This is a unique opportunity to work with quantum algorithms. You will learn the fundamentals of quantum computing and apply them to solve complex problems.', '{"Quantum Computing", "Python", "Qiskit"}', 'Active', 5500),
('int-006', 'Software Engineer Intern', 'a8a7a4f7-3c3e-4d2a-82f7-05c2a8a8a8a8', 'Remote', '12 Weeks', 'Join our core engineering team to build scalable and reliable software. You will work on a variety of projects and gain experience with cloud technologies.', '{"Software Engineering", "Go", "AWS", "Docker"}', 'Active', 4800);

-- Seed Courses and Modules
DO $$
DECLARE
    course_id_1 UUID := uuid_generate_v4();
    course_id_2 UUID := uuid_generate_v4();
    course_id_3 UUID := uuid_generate_v4();
    course_id_4 UUID := uuid_generate_v4();
    course_id_5 UUID := uuid_generate_v4();
    module_id UUID;
BEGIN
    -- Course 1
    INSERT INTO public.courses (id, title, provider_id, category, duration, rating, description, tags, status) VALUES
    (course_id_1, 'Advanced React Patterns', 'a8a7a4f7-3c3e-4d2a-82f7-05c2a8a8a8a8', 'Web Development', '8 Weeks', 4.8, 'Deep dive into advanced React concepts like hooks, context, performance optimization, and state management.', '{"React", "Frontend", "Web Development", "JavaScript"}', 'Active');
    
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_1, 'Custom Hooks & Composition', '2 Weeks', 1);
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_1, 'State Management with Zustand', '2 Weeks', 2);
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_1, 'Performance Optimization', '4 Weeks', 3);

    -- Course 2
    INSERT INTO public.courses (id, title, provider_id, category, duration, rating, description, tags, status) VALUES
    (course_id_2, 'Python for Data Science', 'b8b7b4f7-3c3e-4d2a-82f7-05c2b8b8b8b8', 'Data Science', '10 Weeks', 4.9, 'Master Python libraries like Pandas, NumPy, and Scikit-learn to become a proficient data scientist.', '{"Python", "Data Science", "Pandas", "NumPy"}', 'Active');

    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_2, 'Data Manipulation with Pandas', '3 Weeks', 1);
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_2, 'Data Visualization with Matplotlib', '3 Weeks', 2);
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_2, 'Machine Learning with Scikit-learn', '4 Weeks', 3);

    -- Course 3
    INSERT INTO public.courses (id, title, provider_id, category, duration, rating, description, tags, status) VALUES
    (course_id_3, 'UI/UX Design Fundamentals', 'd8d7d4f7-3c3e-4d2a-82f7-05c2d8d8d8d8', 'Design', '6 Weeks', 4.7, 'Learn the core principles of UI/UX design, from user research to creating beautiful and intuitive interfaces.', '{"UI Design", "UX Design", "Figma"}', 'Active');
    
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_3, 'User Research and Personas', '2 Weeks', 1);
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_3, 'Wireframing and Prototyping', '2 Weeks', 2);
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_3, 'Visual Design Principles', '2 Weeks', 3);

    -- Course 4
    INSERT INTO public.courses (id, title, provider_id, category, duration, rating, description, tags, status) VALUES
    (course_id_4, 'Introduction to Product Management', 'c8c7c4f7-3c3e-4d2a-82f7-05c2c8c8c8c8', 'Product Management', '8 Weeks', 4.6, 'Understand the product lifecycle, from ideation and market research to launch and iteration.', '{"Product Management", "Agile", "Roadmapping"}', 'Inactive');
    
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_4, 'The Product Lifecycle', '2 Weeks', 1);
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_4, 'User Stories and Prioritization', '3 Weeks', 2);
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_4, 'Go-to-Market Strategy', '3 Weeks', 3);

    -- Course 5
    INSERT INTO public.courses (id, title, provider_id, category, duration, rating, description, tags, status) VALUES
    (course_id_5, 'Backend Development with Go', 'a8a7a4f7-3c3e-4d2a-82f7-05c2a8a8a8a8', 'Web Development', '12 Weeks', 4.9, 'Learn to build high-performance, concurrent backend systems using the Go programming language.', '{"Go", "Backend", "API", "Concurrency"}', 'Active');
    
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_5, 'Go Fundamentals', '3 Weeks', 1);
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_5, 'Building RESTful APIs', '4 Weeks', 2);
    INSERT INTO public.course_modules (id, course_id, title, duration, module_order) VALUES (uuid_generate_v4(), course_id_5, 'Concurrency in Go', '5 Weeks', 3);

END $$;

-- Seed a student profile (linked to a placeholder user UUID)
INSERT INTO public.students (id, name, email, avatar_url, university, college, degree, branch, year, cgpa, credits, bio, resume_url, consent) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', 'Alex Doe', 'student@test.com', 'https://i.pravatar.cc/150?u=alexdoe', 'National Institute of Technology', 'School of Computer Science', 'B.Tech', 'Artificial Intelligence', 3, 8.8, 120, 'Aspiring AI Engineer with a passion for building intelligent systems. Eager to apply my skills in a real-world setting.', 'https://example.com/resume.pdf', true);

-- Add skills for the student
INSERT INTO public.student_skills (student_id, skill_name) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', 'React'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', 'Python'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', 'AI'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', 'Machine Learning'),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', 'TypeScript');

-- Seed Feedback
INSERT INTO public.feedback (id, student_id, target_id, target_type, rating, comment, created_at) VALUES
('fb-001', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', 'int-001', 'internship', 5, 'This was an amazing experience! I learned so much about the practical application of AI and the team was incredibly supportive. The mentorship was top-notch.', '2023-10-01 10:00:00'),
('fb-002', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', 'int-001', 'internship', 4, 'Great internship overall. The work was challenging and rewarding. I just wish there were more structured social events to connect with other interns.', '2023-10-02 11:00:00'),
('fb-003', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', 'int-002', 'internship', 3, 'The projects were interesting, but my mentor seemed too busy to provide regular guidance. I had to figure out a lot on my own.', '2023-10-03 12:00:00'),
('fb-004', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', (SELECT id FROM public.courses WHERE title = 'Backend Development with Go'), 'course', 5, 'Fantastic course! The instructor explained complex topics like concurrency in a very clear way. The hands-on projects were extremely helpful.', '2024-01-15 14:00:00'),
('fb-005', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', (SELECT id FROM public.courses WHERE title = 'Backend Development with Go'), 'course', 4, 'Solid content, but some of the quiz questions were a bit ambiguous. It would be great to have a discussion forum for the course.', '2024-01-16 15:00:00');
