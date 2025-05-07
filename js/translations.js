// Import real project data
import projectsDataReal from './projects-data.js';

// Translations object with French and English content
export const translations = {
    'fr': {
        // Navigation
        'nav-home': 'Accueil',
        'nav-projects': 'Projets',
        'nav-skills': 'Compétences',
        'nav-experience': 'Expérience',
        'nav-testimonials': 'Témoignages',
        'nav-contact': 'Contact',
        
        // Hero Section
        'hero-title': 'Développeur Web <span class="highlight">Sécurisé</span>',
        'hero-subtitle': 'Co-fondateur de GearConnect et passionné par les technologies web modernes et sécurisées.',
        'hero-description': 'Toujours en quête d\'innovation, je développe également des projets personnels pour explorer de nouvelles technologies et affiner mes compétences.',
        'hero-cta-projects': 'Voir mes projets',
        'hero-cta-contact': 'Me contacter',
        'hero-scroll': 'Défiler',
        
        // Projects Section
        'projects-title': 'Mes Projets',
        'projects-filter-all': 'Tous',
        'projects-filter-web': 'Web',
        'projects-filter-mobile': 'Mobile',
        'projects-filter-design': 'Design',
        'projects-no-results': 'Aucun projet ne correspond à ce filtre.',
        
        // Skills Section
        'skills-title': 'Compétences',
        'skills-frontend': 'Développement Frontend',
        'skills-backend': 'Développement Backend',
        'skills-tools': 'Outils & Technologies',
        
        // Frontend Skills
        'skill-html-title': 'HTML5',
        'skill-html-level': '90',
        'skill-css-title': 'CSS3/SCSS',
        'skill-css-level': '85',
        'skill-js-title': 'JavaScript',
        'skill-js-level': '80',
        'skill-ts-title': 'TypeScript',
        'skill-ts-level': '75',
        'skill-responsive-title': 'Responsive Design',
        'skill-responsive-level': '85',
        
        // Backend Skills
        'skill-php-title': 'PHP',
        'skill-php-level': '75',
        'skill-python-title': 'Python',
        'skill-python-level': '70',
        'skill-sql-title': 'SQL',
        'skill-sql-level': '75',
        'skill-nuxt-title': 'Nuxt.js',
        'skill-nuxt-level': '70',
        
        // Tools Skills
        'skill-git-title': 'Git/GitHub/GitLab',
        'skill-git-level': '85',
        'skill-security-title': 'Sécurité Web',
        'skill-security-level': '80',
        'skill-security-desc': 'OWASP, Auth, Pentesting',
        'skill-ci-title': 'CI/CD',
        'skill-ci-level': '85',
        'skill-ci-desc': 'GitHub Actions, GitLab CI',
        'skill-ide-title': 'Environnements de Dev',
        'skill-ide-level': '85',
        'skill-ide-desc': 'VS Code, IntelliJ, Cursor',
        'skill-jira-title': 'Gestion de Projet',
        'skill-jira-level': '75',
        'skill-jira-desc': 'Jira, Bitbucket, Trello',
        'skill-android-title': 'Dév. Mobile',
        'skill-android-level': '65',
        'skill-android-desc': 'Android Studio, React Native',
        
        // Experience Section
        'experience-title': 'Expérience',
        'experience-1-title': 'Co-Fondateur GearConnect',
        'experience-1-date': '2025 - Présent',
        'experience-1-description': 'Création et développement d\'une startup spécialisée en solutions connectées.',
        'experience-1-item-1': 'Développement de plateformes web sécurisées',
        'experience-1-item-2': 'Gestion de projet et méthodologie Agile',
        'experience-1-item-3': 'Intégration de solutions IoT innovantes',
        
        'experience-2-title': 'Alternant Ingénieur développement logiciel',
        'experience-2-date': '2023 - Présent',
        'experience-2-description': 'Thales - Gestion Réseaux Mobiles.',
        'experience-2-item-1': 'Développement avec Python et Nuxt.js',
        'experience-2-item-2': 'Solutions pour réseaux mobiles sécurisés',
        'experience-2-item-3': 'Travail en équipe sur des projets complexes',
        
        'experience-3-title': 'Entrepreneur - The Valley',
        'experience-3-date': 'Février - Mars 2024',
        'experience-3-description': 'Bootcamp de 2 mois en Californie pour développer Stars Factory.',
        'experience-3-item-1': 'Développement de la première école web 3D pour astronautes',
        'experience-3-item-2': 'Combinaison d\'e-learning et immersion VR',
        'experience-3-item-3': 'Formation en entrepreneuriat et innovation',
        
        'experience-4-title': 'Bénévole Développeur - Hunter',
        'experience-4-date': 'Mars 2024',
        'experience-4-description': 'Développeur bénévole à San Diego, Californie.',
        'experience-4-item-1': 'Apprentissage du MOB programming',
        'experience-4-item-2': 'Travail direct avec des développeurs expérimentés',
        'experience-4-item-3': 'Expérience en développement collaboratif',
        
        'experience-5-title': 'Stagiaire - Thales',
        'experience-5-date': 'Janvier 2019',
        'experience-5-description': 'Stage de découverte au sein d\'une équipe de développeurs.',
        'experience-5-item-1': 'Découverte de l\'environnement de développement professionnel',
        'experience-5-item-2': 'Introduction aux méthodologies Scrum et Agile',
        'experience-5-item-3': 'Première expérience en entreprise',
        
        // Personal Projects Section
        'personal-projects-title': 'Projets Personnels',
        'personal-projects-description': 'En parallèle de mes expériences professionnelles, je développe constamment des projets personnels pour explorer de nouvelles technologies, améliorer mes compétences et donner vie à mes idées innovantes.',
        'personal-project-1-title': 'Applications Web Expérimentales',
        'personal-project-1-description': 'Création d\'applications utilisant les dernières technologies frontend et backend pour tester de nouveaux concepts.',
        'personal-project-2-title': 'Outils de Cybersécurité',
        'personal-project-2-description': 'Développement d\'outils pour améliorer la sécurité des applications web et sensibiliser aux bonnes pratiques.',
        'personal-project-3-title': 'Projets IoT',
        'personal-project-3-description': 'Expérimentation avec des capteurs et des microcontrôleurs pour créer des solutions connectées innovantes.',
        
        // Testimonials Section
        'testimonials-title': 'Témoignages',
        'testimonial-1-text': 'Un développeur passionné avec une vision entrepreneuriale et une expertise solide en développement web sécurisé.',
        'testimonial-1-name': 'André De Sousa',
        'testimonial-1-role': 'Fondateur California Startup Bootcamps',
        'testimonial-2-text': 'Excellente capacité à combiner innovation technique et vision business pour créer des solutions à forte valeur ajoutée.',
        'testimonial-2-name': 'Marie Martin',
        'testimonial-2-role': 'Responsable Innovation Tech',
        
        // Contact Section
        'contact-title': 'Contact',
        'contact-subtitle': 'Discutons de votre projet',
        'contact-description': 'N\'hésitez pas à me contacter pour discuter de vos projets, collaborations ou opportunités dans le domaine du web sécurisé et de l\'IoT.',
        'contact-form-name': 'Nom',
        'contact-form-email': 'Email',
        'contact-form-subject': 'Sujet',
        'contact-form-message': 'Message',
        'contact-form-submit': 'Envoyer',
        'contact-location': 'San Diego, Californie',
        
        // Footer
        'footer-rights': 'Tous droits réservés.'
    },
    'en': {
        // Navigation
        'nav-home': 'Home',
        'nav-projects': 'Projects',
        'nav-skills': 'Skills',
        'nav-experience': 'Experience',
        'nav-testimonials': 'Testimonials',
        'nav-contact': 'Contact',
        
        // Hero Section
        'hero-title': 'Secure <span class="highlight">Web Developer</span>',
        'hero-subtitle': 'GearConnect Co-founder and passionate about modern, secure web technologies.',
        'hero-description': 'Always seeking innovation, I also develop personal projects to explore new technologies and refine my skills.',
        'hero-cta-projects': 'View my projects',
        'hero-cta-contact': 'Contact me',
        'hero-scroll': 'Scroll',
        
        // Projects Section
        'projects-title': 'My Projects',
        'projects-filter-all': 'All',
        'projects-filter-web': 'Web',
        'projects-filter-mobile': 'Mobile',
        'projects-filter-design': 'Design',
        'projects-no-results': 'No projects match this filter.',
        
        // Skills Section
        'skills-title': 'Skills',
        'skills-frontend': 'Frontend Development',
        'skills-backend': 'Backend Development',
        'skills-tools': 'Tools & Technologies',
        
        // Frontend Skills
        'skill-html-title': 'HTML5',
        'skill-html-level': '90',
        'skill-css-title': 'CSS3/SCSS',
        'skill-css-level': '85',
        'skill-js-title': 'JavaScript',
        'skill-js-level': '80',
        'skill-ts-title': 'TypeScript',
        'skill-ts-level': '75',
        'skill-responsive-title': 'Responsive Design',
        'skill-responsive-level': '85',
        
        // Backend Skills
        'skill-php-title': 'PHP',
        'skill-php-level': '75',
        'skill-python-title': 'Python',
        'skill-python-level': '70',
        'skill-sql-title': 'SQL',
        'skill-sql-level': '75',
        'skill-nuxt-title': 'Nuxt.js',
        'skill-nuxt-level': '70',
        
        // Tools Skills
        'skill-git-title': 'Git/GitHub/GitLab',
        'skill-git-level': '85',
        'skill-security-title': 'Web Security',
        'skill-security-level': '80',
        'skill-security-desc': 'OWASP, Auth, Pentesting',
        'skill-ci-title': 'CI/CD',
        'skill-ci-level': '85',
        'skill-ci-desc': 'GitHub Actions, GitLab CI',
        'skill-ide-title': 'Development Environments',
        'skill-ide-level': '85',
        'skill-ide-desc': 'VS Code, IntelliJ, Cursor',
        'skill-jira-title': 'Project Management',
        'skill-jira-level': '75',
        'skill-jira-desc': 'Jira, Bitbucket, Trello',
        'skill-android-title': 'Mobile Development',
        'skill-android-level': '65',
        'skill-android-desc': 'Android Studio, React Native',
        
        // Experience Section
        'experience-title': 'Experience',
        'experience-1-title': 'GearConnect Co-Founder',
        'experience-1-date': '2025 - Present',
        'experience-1-description': 'Creation and development of a startup specialized in connected solutions.',
        'experience-1-item-1': 'Secure web platform development',
        'experience-1-item-2': 'Project management and Agile methodology',
        'experience-1-item-3': 'Innovative IoT solutions integration',
        
        'experience-2-title': 'Software Development Engineer (Apprenticeship)',
        'experience-2-date': '2023 - Present',
        'experience-2-description': 'Thales - Mobile Networks Management.',
        'experience-2-item-1': 'Development with Python and Nuxt.js',
        'experience-2-item-2': 'Solutions for secure mobile networks',
        'experience-2-item-3': 'Team collaboration on complex projects',
        
        'experience-3-title': 'Entrepreneur - The Valley',
        'experience-3-date': 'February - March 2024',
        'experience-3-description': '2-month bootcamp in California to develop Stars Factory.',
        'experience-3-item-1': 'Development of the first 3D web school for astronauts',
        'experience-3-item-2': 'Combining e-learning and VR immersion',
        'experience-3-item-3': 'Training in entrepreneurship and innovation',
        
        'experience-4-title': 'Volunteer Developer - Hunter',
        'experience-4-date': 'March 2024',
        'experience-4-description': 'Volunteer developer in San Diego, California.',
        'experience-4-item-1': 'Learning MOB programming techniques',
        'experience-4-item-2': 'Direct work with experienced developers',
        'experience-4-item-3': 'Collaborative development experience',
        
        'experience-5-title': 'Intern - Thales',
        'experience-5-date': 'January 2019',
        'experience-5-description': 'Discovery internship within a development team.',
        'experience-5-item-1': 'Discovery of professional development environment',
        'experience-5-item-2': 'Introduction to Scrum and Agile methodologies',
        'experience-5-item-3': 'First corporate experience',
        
        // Personal Projects Section
        'personal-projects-title': 'Personal Projects',
        'personal-projects-description': 'In parallel with my professional experiences, I constantly develop personal projects to explore new technologies, improve my skills and bring my innovative ideas to life.',
        'personal-project-1-title': 'Experimental Web Applications',
        'personal-project-1-description': 'Creating applications using the latest frontend and backend technologies to test new concepts.',
        'personal-project-2-title': 'Cybersecurity Tools',
        'personal-project-2-description': 'Developing tools to improve web application security and raise awareness of best practices.',
        'personal-project-3-title': 'IoT Projects',
        'personal-project-3-description': 'Experimenting with sensors and microcontrollers to create innovative connected solutions.',
        
        // Testimonials Section
        'testimonials-title': 'Testimonials',
        'testimonial-1-text': 'A passionate developer with entrepreneurial vision and solid expertise in secure web development.',
        'testimonial-1-name': 'André De Sousa',
        'testimonial-1-role': 'California Startup Bootcamps Founder',
        'testimonial-2-text': 'Excellent ability to combine technical innovation and business vision to create high-value solutions.',
        'testimonial-2-name': 'Marie Martin',
        'testimonial-2-role': 'Tech Innovation Manager',
        
        // Contact Section
        'contact-title': 'Contact',
        'contact-subtitle': 'Let\'s discuss your project',
        'contact-description': 'Feel free to contact me to discuss your projects, collaborations or opportunities in the field of secure web and IoT.',
        'contact-form-name': 'Name',
        'contact-form-email': 'Email',
        'contact-form-subject': 'Subject',
        'contact-form-message': 'Message',
        'contact-form-submit': 'Send',
        'contact-location': 'San Diego, California',
        
        // Footer
        'footer-rights': 'All rights reserved.'
    }
};

// Project data translations - using the real data
export const projectsDataTranslations = projectsDataReal; 