-- Make sure to create a "host" user in your application first.
-- Then, go to your Supabase Dashboard > Authentication > Users, and copy the User ID.
-- Paste that User ID to replace the '<PASTE_YOUR_HOST_USER_ID_HERE>' placeholder below.

DO $$
DECLARE
    host_user_id uuid := '<PASTE_YOUR_HOST_USER_ID_HERE>';
    innovate_tech_org_id uuid;
    data_driven_org_id uuid;
    quantum_org_id uuid;
    green_tech_org_id uuid;
    health_ai_org_id uuid;
BEGIN
    -- Step 1: Insert Organizations and capture their new UUIDs
    INSERT INTO public.organizations (name, logo_url, email, phone, address, bio, verified, owner_id)
    VALUES
        ('InnovateTech', 'https://picsum.photos/seed/innovate/200/200', 'careers@innovatetech.com', '+1 (555) 123-4567', '123 Tech Avenue, Silicon Valley, CA 94043', 'InnovateTech is a pioneering technology firm at the forefront of artificial intelligence and machine learning solutions.', true, host_user_id),
        ('DataDriven Inc.', 'https://picsum.photos/seed/datadriven/200/200', 'hr@datadriven.com', '+1 (555) 987-6543', '456 Analytics Way, New York, NY 10001', 'DataDriven Inc. specializes in big data analytics, helping businesses unlock insights and drive growth through data.', true, host_user_id),
        ('QuantumLeap', 'https://picsum.photos/seed/quantum/200/200', 'info@quantumleap.com', '+1 (555) 234-5678', '789 Quantum Lane, Austin, TX 78701', 'QuantumLeap is a research-focused organization developing next-generation quantum computing technologies.', true, host_user_id),
        ('GreenSolutions', 'https://picsum.photos/seed/green/200/200', 'contact@greensolutions.com', '+1 (555) 345-6789', '101 Eco Park, San Francisco, CA 94107', 'GreenSolutions is dedicated to creating sustainable technology for a greener planet, focusing on renewable energy and eco-friendly products.', true, host_user_id),
        ('HealthAI', 'https://picsum.photos/seed/healthai/200/200', 'recruiting@healthai.com', '+1 (555) 456-7890', '210 Wellness Blvd, Boston, MA 02110', 'HealthAI leverages artificial intelligence to revolutionize diagnostics and personalized medicine.', true, host_user_id)
    RETURNING id INTO innovate_tech_org_id, data_driven_org_id, quantum_org_id, green_tech_org_id, health_ai_org_id;

    -- Step 2: Insert Internships, linking them to the organizations
    INSERT INTO public.internships (title, organization_id, location, duration, description, tags, status)
    VALUES
      ('Software Engineer Intern', innovate_tech_org_id, 'Remote', '12 Weeks', 'Work on cutting-edge AI projects, developing new features and improving our machine learning models. A great opportunity to learn from top engineers in the field.', '{"AI", "Python", "React", "Machine Learning"}', 'Active'),
      ('Data Scientist Intern', data_driven_org_id, 'New York, NY', '10 Weeks', 'Analyze large datasets to extract meaningful insights. You will work with our data science team on predictive modeling and data visualization projects.', '{"Data Science", "Python", "SQL", "Tableau"}', 'Active'),
      ('Product Manager Intern', innovate_tech_org_id, 'Remote', '12 Weeks', 'Define product roadmaps, conduct user research, and work with engineering teams to launch new features. Ideal for someone passionate about user experience and business strategy.', '{"Product Management", "Agile", "User Research"}', 'Active'),
      ('UX/UI Designer Intern', data_driven_org_id, 'San Francisco, CA', '12 Weeks', 'Design intuitive and beautiful user interfaces for our web and mobile applications. You will create wireframes, mockups, and prototypes.', '{"UX Design", "UI Design", "Figma", "Prototyping"}', 'Active'),
      ('Quantum Computing Researcher', quantum_org_id, 'Austin, TX', '16 Weeks', 'Join our research team to work on novel quantum algorithms. Requires a strong background in physics and mathematics.', '{"Quantum Computing", "Physics", "Research"}', 'Active'),
      ('Sustainable Tech Engineer', green_tech_org_id, 'San Francisco, CA', '12 Weeks', 'Develop and test new hardware and software for our renewable energy solutions. A hands-on role for a mission-driven engineer.', '{"Sustainability", "Hardware", "IoT"}', 'Active'),
      ('AI in Medicine Intern', health_ai_org_id, 'Remote', '10 Weeks', 'Apply machine learning techniques to medical imaging data to improve diagnostic accuracy. A role with real-world impact.', '{"AI", "Healthcare", "Computer Vision", "Python"}', 'Active');

    -- Step 3: Insert Courses
    INSERT INTO public.courses (title, provider_id, category, duration, rating, description, tags, status)
    VALUES
      ('Advanced React Patterns', innovate_tech_org_id, 'Web Development', '8 weeks', 4.8, 'Master advanced React concepts like hooks, context, and performance optimization.', '{"React", "Frontend", "JavaScript"}', 'Active'),
      ('Python for Data Science', data_driven_org_id, 'Data Science', '10 weeks', 4.9, 'A comprehensive introduction to using Python for data analysis and machine learning.', '{"Python", "Data Science", "Pandas", "NumPy"}', 'Active'),
      ('UI/UX Design Principles', data_driven_org_id, 'Design', '6 weeks', 4.7, 'Learn the fundamental principles of great UI/UX design, from user research to visual hierarchy.', '{"UI/UX", "Design", "Figma"}', 'Active'),
      ('Introduction to Product Management', innovate_tech_org_id, 'Product Management', '8 weeks', 4.6, 'Understand the role of a PM, how to develop a product roadmap, and work with engineering teams.', '{"Product Management", "Business"}', 'Inactive'),
      ('Machine Learning Foundations', innovate_tech_org_id, 'Data Science', '12 weeks', 4.9, 'A deep dive into the core concepts of machine learning and neural networks.', '{"Machine Learning", "AI", "Python"}', 'Active');

END $$;
