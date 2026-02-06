// --- DATA ---
const CONTACT = {
    home: { 
        title: "SOFTWARE ENGINEER", 
        status: "OPEN TO WORK",
        level: "ENTRY LEVEL — 2025",
        details: {
        bio: "Software Engineer with 1+ year of hands-on experience in automating, developing backend and frontend applications.",
        education: "B.Sc. IT — D. G. Ruparel College (2022–2025)",
        gpa: "9.40 / 10",
        address: "Mumbai - 400016, Maharashtra, INDIA",
        achievements: [
            "1st Place — DotTech Hackathon",
            "2nd Place — Code Relay Event"
        ]
        }
    },

    skills: {
        title: "TECHNICAL ARSENAL",
        hook: "Designing scalable APIs and data-driven backend systems.",
        categories: ["Languages", "Backend", "Databases", "Frontend", "DevOps & Tools", "Backend Concepts", "AI / LLM"], 
        details: [
        { cat: "Languages", items: "Python, JavaScript, Java, C/C++" },
        { cat: "Backend", items: "Django, Django REST Framework, Flask, FastAPI, Celery, Node.js, Express.js" },
        { cat: "Databases", items: "PostgreSQL, MySQL, SQLite, Redis" },
        { cat: "Frontend", items: "React.js, Vue.js, HTML, CSS, Tailwind CSS, Bootstrap, Jinja Templates" },
        { cat: "DevOps & Tools", items: "Docker, Git, GitHub, Linux, Postman, Render, Vercel, AWS (Basic)" },
        { cat: "Backend Concepts", items: "REST APIs, Authentication (JWT), ORM, Query Optimization, Schema Design, Rate Limiting" },
        { cat: "AI / LLM", items: "RAG, LlamaIndex, Vector Search, LLM Integration" }        
        ]
    },

    experience: [
        { 
            company: "Kuvaka Tech", 
            role: "Backend Engineer", 
            time: "June 2025 – July 2025", 
            hook: "Backend development for an email verification system.", 
            details: [ 
            "Built email verification APIs using Python programming and Django REST Framework, integrating third-party verification APIs with multi-step SMTP validation logic.",
            "Implemented asynchronous background processing using Celery for bulk jobs, retries, and cleanup.",
            "Applied rate limiting, and API debugging to improve system reliability."
            ]
        },
        { 
            company: "Levaze Digital", 
            role: "Full Stack Web Developer", 
            time: "April 2024 – June 2024", 
            hook: "Server-side rendered web features development.",
            details: [
            "Developed server-side rendered web features using Python, Flask with Jinja templates, HTML, CSS, and JavaScript.",
            "Implemented authentication features including OTP flows and Google OAuth-based signup and login.",
            "Used Git and GitHub for version control, branching, and collaborative development."
            ]
        }
    ],

    projects: [
        { 
            name: "ClassAccess", 
            tech: "Python, Django REST Framework, React, PostgreSQL", 
            hook: "AI Powered Classroom Platform",
            desc: "Production-ready AI-powered classroom platform with RAG pipeline and LLM integration.",
            fullDetails: "Built Python REST APIs with JWT authentication and role-based access control (RBAC). Integrated Supabase storage with signed URLs for file upload and access management. Implemented RAG pipeline enabling semantic search, page-level retrieval, chunking, and embedding-based retrieval using cloud-based vector storage for scalable AI workflows. Built an LLM-powered question answering system with text preprocessing and metadata handling, solving low-context retrieval issues and achieving 3× faster RAG processing per PDF. Improved system performance and reliability using Redis caching, rate limiting, background jobs, and Docker based deployment on Render and Vercel.",
            link: "",
            status: "Prod, Live"
        },
        { 
            name: "Karzo", 
            tech: "Python, Django REST Framework, Vue.js, MySQL", 
            hook: "Event Ride Sharing Platform",
            desc: "REST APIs for event-based ride sharing with optimized query performance.",
            fullDetails: "Built REST APIs using Python programming and Django REST Framework with JWT authentication. Resolved N+1 query issues using Django ORM. Reduced redundant search API calls using debouncing (10 to 2-4 per request cycle). Integrated OpenAI LLM for automated event description generation.",
            link: "https://github.com/yashpatkar/karzo"
        }
    ]
};
export default CONTACT;