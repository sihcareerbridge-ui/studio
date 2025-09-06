-- Make sure to create a "host" user in your application first.
-- The user ID '30f2604e-4d62-4bab-8701-25afc40e89f8' is from the host user you created.

-- Seed Organizations
-- For this demo, all courses and internships will be owned by the same host user.
DO $$
DECLARE
    org_innovate_id uuid := uuid_generate_v4();
    org_datanexus_id uuid := uuid_generate_v4();
    org_quantum_id uuid := uuid_generate_v4();
    org_design_id uuid := uuid_generate_v4();
    org_synergy_id uuid := uuid_generate_v4();
    host_user_id uuid := '30f2604e-4d62-4bab-8701-25afc40e89f8';
BEGIN

INSERT INTO public.organizations (id, name, logo_url, email, phone, address, bio, verified, owner_id) VALUES
(org_innovate_id, 'InnovateTech', 'https://picsum.photos/seed/innovate/200/200', 'contact@innovatetech.com', '123-456-7890', '123 Tech Street, SF, CA', 'A leading tech company.', true, host_user_id),
(org_datanexus_id, 'DataNexus', 'https://picsum.photos/seed/datanexus/200/200', 'info@datanexus.com', '987-654-3210', '456 Data Drive, NY, NY', 'Pioneers in data science.', true, host_user_id),
(org_quantum_id, 'QuantumLeap', 'https://picsum.photos/seed/quantum/200/200', 'hello@quantumleap.ai', '555-555-5555', '789 AI Avenue, Austin, TX', 'Next-gen AI solutions.', true, host_user_id),
(org_design_id, 'DesignWorks', 'https://picsum.photos/seed/design/200/200', 'support@designworks.io', '111-222-3333', '101 Design Blvd, Remote', 'Creative design agency.', true, host_user_id),
(org_synergy_id, 'Synergy Solutions', 'https://picsum.photos/seed/synergy/200/200', 'contact@synergysolutions.dev', '444-555-6666', '210 Synergy Lane, Remote', 'Integrating technology for a better world.', true, host_user_id);

-- Seed Internships
INSERT INTO public.internships (id, title, organization_id, location, duration, description, tags, status) VALUES
(uuid_generate_v4(), 'Software Engineer Intern', org_innovate_id, 'Remote', '12 Weeks', 'Work on cutting-edge AI projects and develop high-impact features for our flagship products.', '{"AI", "Python", "React", "Node.js"}', 'Active'),
(uuid_generate_v4(), 'Data Scientist Intern', org_datanexus_id, 'New York, NY', '10 Weeks', 'Analyze large datasets to extract meaningful insights and build predictive models.', '{"Data Science", "Python", "SQL", "Machine Learning"}', 'Active'),
(uuid_generate_v4(), 'AI Research Intern', org_quantum_id, 'Austin, TX', '16 Weeks', 'Join our research team to push the boundaries of artificial intelligence and publish your findings.', '{"AI", "Research", "PyTorch", "NLP"}', 'Active'),
(uuid_generate_v4(), 'UX/UI Design Intern', org_design_id, 'Remote', '8 Weeks', 'Create intuitive and beautiful user interfaces for our web and mobile applications.', '{"UX", "UI", "Figma", "User Research"}', 'Active'),
(uuid_generate_v4(), 'Product Manager Intern', org_synergy_id, 'San Francisco, CA', '12 Weeks', 'Define product roadmaps, work with engineering teams, and launch new features.', '{"Product Management", "Agile", "JIRA"}', 'Active'),
(uuid_generate_v4(), 'Frontend Developer Intern', org_innovate_id, 'Remote', '12 Weeks', 'Develop and maintain the user interface of our core web applications using modern frontend technologies.', '{"React", "TypeScript", "Next.js"}', 'Active'),
(uuid_generate_v4(), 'Backend Developer Intern', org_datanexus_id, 'New York, NY', '10 Weeks', 'Work on our server-side logic, database management, and API development.', '{"Node.js", "Express", "PostgreSQL"}', 'Closed');

-- Seed Courses and Modules
WITH course_data AS (
    INSERT INTO public.courses (id, title, provider_id, category, duration, rating, description, tags, status) VALUES
    (uuid_generate_v4(), 'Full-Stack Web Development', org_innovate_id, 'Web Development', '12 Weeks', 4.8, 'A comprehensive course on building full-stack web applications with React and Node.js.', '{"React", "Node.js", "Express", "MongoDB"}', 'Active'),
    (uuid_generate_v4(), 'Introduction to Data Science', org_datanexus_id, 'Data Science', '8 Weeks', 4.7, 'Learn the fundamentals of data analysis, visualization, and machine learning with Python.', '{"Python", "Pandas", "NumPy", "Scikit-learn"}', 'Active'),
    (uuid_generate_v4(), 'Advanced UI/UX Design', org_design_id, 'Design', '6 Weeks', 4.9, 'Master advanced design principles, prototyping, and user testing with Figma.', '{"UI", "UX", "Figma", "Prototyping"}', 'Active'),
    (uuid_generate_v4(), 'Agile Product Management', org_synergy_id, 'Product Management', '4 Weeks', 4.6, 'Understand the agile framework and learn how to manage products effectively.', '{"Agile", "Scrum", "Product Management"}', 'Active'),
    (uuid_generate_v4(), 'Deep Learning Specialization', org_quantum_id, 'Data Science', '16 Weeks', 4.9, 'An in-depth specialization on neural networks and deep learning.', '{"AI", "Deep Learning", "TensorFlow"}', 'Inactive'),
    (uuid_generate_v4(), 'React Native Development', org_innovate_id, 'Web Development', '10 Weeks', 4.7, 'Build cross-platform mobile applications using React Native.', '{"React Native", "Mobile Development"}', 'Active')
    RETURNING id, title
)
INSERT INTO public.course_modules (course_id, title, duration, module_order)
SELECT
    c.id,
    m.title,
    m.duration,
    m.module_order
FROM course_data c,
LATERAL (
    VALUES
        ('Introduction', '1 hour', 1),
        ('Core Concepts', '3 hours', 2),
        ('Building a Project', '4 hours', 3),
        ('Advanced Topics', '2 hours', 4)
) AS m(title, duration, module_order);

END $$;
