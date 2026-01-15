// --- DATA ---
const CONTACT = {
    home: { 
        title: "SOFTWARE ENGINEER", 
        status: "OPEN TO WORK",
        level: "ENTRY LEVEL — 2025",
        details: {
        bio: "I’m Yash Patkar, a Backend Software Engineer with hands-on experience working on production APIs using Python and Django REST Framework. I focus on schema design, query optimization, and building reliable backend systems, and I’m comfortable contributing to full-stack features with Vue.js and React when required. I also explore practical LLM integrations to improve development workflows.",
        education: "B.Sc. IT — D. G. Ruparel College (2022–2025)",
        gpa: "9.4 / 10",
        address: "Mumbai, Maharashtra, India 400016",
        achievements: [
            "1st Place — DotTech Hackathon 2025 (DGRUPAREL)",
            "2nd Place — Code Relay Event 2025 (VPPCOEVA)"
        ]
        }
    },

    skills: {
        title: "TECHNICAL ARSENAL",
        hook: "Designing scalable APIs and data-driven backend systems.",
        categories: ["Languages", "Backend", "Databases", "Frontend", "Tools", "Others"], 
        details: [
        { cat: "Languages", items: "Python, Java, C, C++, JavaScript," },
        { cat: "Backend", items: "Django REST Framework, Flask, FastAPI, Node.js, Express.js" },
        { cat: "Databases", items: "PostgreSQL, MySQL, SQLite, Redis" },
        { cat: "Frontend", items: "Vue.js, React.js, HTML, CSS, Tailwind, Bootstrap" },
        { cat: "Tools", items: "Git, GitHub, Linux, Docker, Postman" },
        { cat: "Others", items: "REST APIs, SQL, JSON, Data Structures & Algorithms, OOP, API Performance, Debugging, LangChain" }        
        ]
    },

    experience: [
        { 
            company: "Kuvaka Tech", 
            role: "Backend Engineer", 
            time: "June – July 2025", 
            hook: "Backend development for an email verification system.", 
            details: [ 
            "Developed backend features using Django and REST APIs for an email verification pipeline.",
            "Set up asynchronous background processing using Celery for large verification tasks.",
            "Refactored ORM queries to improve CRUD performance and maintain safe database updates.",
            "Integrated external validation APIs with retry handling for SMTP checks.",
            "Supported manual testing and issue reporting during early development phases."
            ]
        },
        { 
            company: "Levaze Digital", 
            role: "Web Developer", 
            time: "April – June 2024", 
            hook: "Flask backend development for a blogging platform.",
            details: [
            "Built backend modules for a Flask-based blogging system including authentication and OTP flows.",
            "Developed REST API endpoints for user management and content features.",
            "Optimized ORM filters to reduce redundant database queries and improve API performance.",
            "Collaborated with frontend teammates using Git and GitHub for smooth API integration."
            ]
        }
    ],

    projects: [
        { 
            name: "Karzo Ride", 
            tech: "Django REST Framework, PostgreSQL, Vue.js", 
            hook: "Optimizing Ride Search Performance",
            desc: "Backend APIs for ride booking with improved query performance.",
            fullDetails: "Detected slow ride-matching queries and improved performance using `select_related` to reduce unnecessary ORM joins. Reduced API calls using debounced search logic and optimized endpoint handling. Built REST APIs for rides, bookings, authentication, and email validation.",
            link: "https://github.com/yashpatkar/karzo"
        },
        { 
            name: "Turf Booking", 
            tech: "Node.js, Express.js, Sequelize", 
            hook: "Reliable Slot Booking APIs",
            desc: "REST backend for secure slot booking and authentication.",
            fullDetails: "Built APIs for turf listings, availability checks, bookings, and authentication using Express and Sequelize. Designed clear CRUD models and refined validation logic to reduce redundant database queries during slot checks.",
            link: "https://github.com/YashPatkar/TurfBooking",
        },
        { 
            name: "PDF Viewer", 
            tech: "Django Sessions", 
            hook: "Secure In-Browser PDF Viewing",
            desc: "Session-based system for viewing PDFs without downloads.",
            fullDetails: "Built a Django session authentication system allowing students to securely view PDFs directly in the browser. Reduced bandwidth usage by avoiding file downloads and serving PDFs for in-browser rendering.",
            link: "https://github.com/YashPatkar/pdf_viewer"
        }
    ]
};
export default CONTACT;