-- Organizations
INSERT INTO organizations (id, name, logo_url, email, phone, address, bio, verified, owner_id)
VALUES
    ('org-01', 'InnovateTech', 'https://picsum.photos/seed/innovate/200/200', 'careers@innovatetech.com', '+1 (555) 123-4567', '123 Tech Avenue, Silicon Valley, CA 94043', 'InnovateTech is a pioneering technology firm at the forefront of artificial intelligence and machine learning solutions.', true, 'user-host-01'),
    ('org-02', 'FutureGadgets', 'https://picsum.photos/seed/gadgets/100/100', 'hr@futuregadgets.com', '+1 (555) 234-5678', '456 Gadget Lane, New York, NY 10001', 'Creators of the next generation of consumer electronics.', true, null),
    ('org-03', 'DataDriven Inc.', 'https://picsum.photos/seed/data/100/100', 'jobs@datadriven.com', '+1 (555) 345-6789', '789 Data Point, San Francisco, CA 94105', 'We turn data into actionable insights.', true, null),
    ('org-04', 'CreativeMinds', 'https://picsum.photos/seed/creative/100/100', 'hello@creativeminds.design', '+1 (555) 456-7890', '101 Design Blvd, Austin, TX 78701', 'A digital design agency with a passion for beautiful and intuitive user experiences.', true, null),
    ('org-05', 'GrowthHackers', 'https://picsum.photos/seed/growth/100/100', 'team@growthhackers.io', '+1 (555) 567-8901', '202 Marketing Way, Remote', 'We help startups achieve exponential growth.', true, null),
    ('org-06', 'Frontend Masters', 'https://picsum.photos/seed/frontend/100/100', 'contact@frontendmasters.com', '+1 (555) 678-9012', '303 UI Street, Remote', 'The best online learning resource for frontend developers.', true, null),
    ('org-07', 'CloudSphere', 'https://picsum.photos/seed/cloud/100/100', 'support@cloudsphere.com', '+1 (555) 789-0123', '404 Cloud Ave, San Francisco, CA 94105', 'Your partner in cloud infrastructure and DevOps.', true, null),
    ('org-08', 'Apptivate', 'https://picsum.photos/seed/app/100/100', 'careers@apptivate.io', '+1 (555) 890-1234', '505 Mobile Dr, New York, NY 10001', 'Building beautiful and functional mobile applications.', true, null);

-- Internships
INSERT INTO internships (id, title, organization_id, location, duration, description, tags, status)
VALUES
    ('int-001', 'Software Engineer Intern', 'org-01', 'Remote', '12 Weeks', 'Work on cutting-edge AI projects and develop scalable software solutions.', '{"AI", "Python", "React"}', 'Active'),
    ('int-002', 'Product Manager Intern', 'org-02', 'New York, NY', '10 Weeks', 'Define product roadmaps, conduct market research, and work with cross-functional teams to launch new features.', '{"Product Management", "Agile", "JIRA"}', 'Active'),
    ('int-003', 'Data Science Intern', 'org-03', 'San Francisco, CA', '16 Weeks', 'Analyze large datasets to extract meaningful insights. Build machine learning models to solve real-world business problems.', '{"Data Science", "Machine Learning", "SQL"}', 'Active'),
    ('int-004', 'UX/UI Design Intern', 'org-04', 'Remote', '12 Weeks', 'Design intuitive and beautiful user interfaces for our mobile and web applications.', '{"UX Design", "UI Design", "Figma"}', 'Closed'),
    ('int-005', 'Marketing Intern', 'org-05', 'Austin, TX', '12 Weeks', 'Develop and execute digital marketing campaigns. Analyze campaign performance and optimize for growth.', '{"Marketing", "SEO", "Social Media"}', 'Active'),
    ('int-006', 'Backend Engineer Intern', 'org-01', 'Remote', '14 Weeks', 'Join our backend team to build and maintain scalable APIs and services that power our core products.', '{"Node.js", "Express", "PostgreSQL"}', 'Closed'),
    ('int-007', 'Cloud DevOps Intern', 'org-07', 'San Francisco, CA', '12 Weeks', 'Work with our DevOps team to automate our cloud infrastructure and deployment pipelines.', '{"AWS", "Docker", "Kubernetes"}', 'Closed'),
    ('int-008', 'Mobile App Developer Intern', 'org-08', 'New York, NY', '12 Weeks', 'Develop new features for our flagship iOS and Android applications using React Native.', '{"React Native", "Firebase", "Mobile Development"}', 'Active'),
    ('int-009', 'Game Development Intern', 'org-02', 'Remote', '16 Weeks', 'This internship has been temporarily blocked by platform administrators.', '{"Unity", "C#", "Game Design"}', 'Blocked'),
    ('int-010', 'Cybersecurity Intern', 'org-01', 'Remote', '12 Weeks', 'This internship posting has been blocked by an administrator.', '{"Cybersecurity", "Networking", "Penetration Testing"}', 'Blocked');

-- Courses
INSERT INTO courses (id, title, provider_id, category, duration, rating, description, tags, status)
VALUES
    ('course-01', 'Advanced React Patterns', 'org-06', 'Web Development', '16 Hours', 4.8, 'Dive deep into advanced React concepts, including hooks, context, and performance.', '{"React", "JavaScript", "Frontend"}', 'Inactive'),
    ('course-02', 'Machine Learning A-Z', 'org-03', 'Data Science', '45 Hours', 4.6, 'A comprehensive introduction to machine learning.', '{"Machine Learning", "Data Science", "Python", "AI"}', 'Active'),
    ('course-03', 'UI Design Principles', 'org-04', 'Design', '25 Hours', 4.7, 'Learn the fundamental principles of user interface design.', '{"UI Design", "UX Design", "Figma"}', 'Active'),
    ('course-04', 'Agile Product Management', 'org-06', 'Product Management', '30 Hours', 4.5, 'Master the Agile framework for product management.', '{"Agile", "Product Management", "Scrum"}', 'Active'),
    ('course-05', 'Node.js and Express: The Complete Guide', 'org-01', 'Web Development', '35 Hours', 4.9, 'Build, test, and deploy real-world REST APIs with Node.js and Express.', '{"Node.js", "Express", "Backend", "PostgreSQL"}', 'Active'),
    ('course-06', 'AWS Certified Cloud Practitioner', 'org-07', 'Web Development', '20 Hours', 4.7, 'Prepare for the AWS Certified Cloud Practitioner exam.', '{"AWS", "Cloud", "DevOps", "Docker"}', 'Blocked'),
    ('course-07', 'Introduction to Generative AI', 'org-01', 'Data Science', '8 Hours', 4.8, 'Explore the world of generative AI, from LLMs to diffusion models.', '{"AI", "Generative AI", "Machine Learning"}', 'Active'),
    ('course-08', 'React Native for Beginners', 'org-08', 'Web Development', '22 Hours', 4.6, 'Learn to build native mobile apps for iOS and Android.', '{"React Native", "Mobile Development", "Firebase"}', 'Active'),
    ('course-09', 'DevOps with Docker', 'org-01', 'Web Development', '18 Hours', 4.8, 'This course has been blocked by an administrator.', '{"Docker", "DevOps", "CI/CD"}', 'Blocked');
    
-- Students
INSERT INTO students (id, name, email, avatar_url, university, college, degree, branch, year, cgpa, credits, bio, resume_url, consent)
VALUES
    ('user-student-01', 'Alex Doe', 'alex.doe@example.com', 'https://i.pravatar.cc/150?u=alexdoe', 'State University', 'College of Engineering', 'B.Tech', 'Computer Science', 3, 8.7, 125, 'Aspiring Full-Stack Developer with a passion for creating intuitive and performant web applications.', 'Alex_Doe_Resume.pdf', true),
    ('user-student-02', 'Ben Carter', 'ben.carter@example.com', 'https://i.pravatar.cc/150?u=bencarter', 'Tech University', 'School of IT', 'B.Sc. IT', 'Information Technology', 4, 8.2, 140, 'Detail-oriented Java developer with experience in building enterprise-level applications.', 'Ben_Carter_Resume.pdf', true),
    ('user-student-03', 'Chloe Davis', 'chloe.davis@example.com', 'https://i.pravatar.cc/150?u=chloedavis', 'Design Institute', 'School of Design', 'B.Des', 'Product Design', 3, 9.1, 110, 'Creative product designer focused on creating user-centric and impactful digital experiences.', 'Chloe_Davis_Resume.pdf', true),
    ('user-student-04', 'David Evans', 'david.evans@example.com', 'https://i.pravatar.cc/150?u=davidevans', 'Data Science College', 'Dept. of Statistics', 'M.Sc.', 'Data Science', 1, 9.5, 40, 'Data scientist with a knack for finding patterns in complex datasets and building predictive models.', 'David_Evans_Resume.pdf', true);

-- Student Skills
INSERT INTO student_skills (student_id, skill_name)
VALUES
    ('user-student-01', 'React'),
    ('user-student-01', 'Node.js'),
    ('user-student-01', 'Python'),
    ('user-student-01', 'SQL'),
    ('user-student-02', 'Java'),
    ('user-student-02', 'Spring'),
    ('user-student-02', 'MySQL'),
    ('user-student-03', 'Figma'),
    ('user-student-03', 'User Research'),
    ('user-student-03', 'Prototyping'),
    ('user-student-04', 'Python'),
    ('user-student-04', 'TensorFlow'),
    ('user-student-04', 'Scikit-learn');
