export interface SkillGroup {
  cat: string;
  items: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  time: string;
  hook: string;
  details: string[];
}

export interface ProjectEntry {
  name: string;
  tech: string;
  hook: string;
  desc: string;
  fullDetails: string;
  link: string;
  liveUrl?: string;
  status?: string;
  year?: string;
  category?: string;
  image?: string;
  /** Multiple screenshots — first one shown, hover cycles through. Paths under /public (e.g. "/projects/classaccess-1.png") */
  images?: string[];
  tags?: string[];
}

export interface ResumeHome {
  title: string;
  status: string;
  level: string;
  details: {
    bio: string;
    education: string;
    gpa: string;
    address: string;
    achievements: string[];
  };
}

export interface ResumeSkills {
  title: string;
  hook: string;
  categories: string[];
  details: SkillGroup[];
}

export interface Resume {
  home: ResumeHome;
  skills: ResumeSkills;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
}

const CONTACT: Resume = {
  home: {
    title: 'SOFTWARE ENGINEER',
    status: 'OPEN TO WORK',
    level: 'ENTRY LEVEL — 2025',
    details: {
      bio: 'Software Engineer with 1+ year of hands-on experience in automating, developing backend and frontend applications.',
      education: 'B.Sc. IT — D. G. Ruparel College (2022–2025)',
      gpa: '9.40 / 10',
      address: 'Mumbai - 400016, Maharashtra, INDIA',
      achievements: [
        '1st Place — DotTech Hackathon',
        '2nd Place — Code Relay Event',
      ],
    },
  },

  skills: {
    title: 'TECHNICAL ARSENAL',
    hook: 'Designing scalable APIs and data-driven backend systems.',
    categories: ['Languages', 'Backend', 'Databases', 'Frontend', 'DevOps & Tools', 'Backend Concepts', 'AI / LLM'],
    details: [
      { cat: 'Languages', items: 'Python, JavaScript, Java, C/C++' },
      { cat: 'Backend', items: 'Django, Django REST Framework, Flask, FastAPI, Celery, Node.js, Express.js' },
      { cat: 'Databases', items: 'PostgreSQL, MySQL, SQLite, Redis' },
      { cat: 'Frontend', items: 'React.js, Vue.js, HTML, CSS, Tailwind CSS, Bootstrap, Jinja Templates' },
      { cat: 'DevOps & Tools', items: 'Docker, Git, GitHub, Linux, Postman, Render, Vercel, AWS (Basic)' },
      { cat: 'Backend Concepts', items: 'REST APIs, Authentication (JWT), ORM, Query Optimization, Schema Design, Rate Limiting' },
      { cat: 'AI / LLM', items: 'RAG, LlamaIndex, Vector Search, LLM Integration' },
    ],
  },

  experience: [
    {
      company: 'Kuvaka Tech',
      role: 'Backend Engineer',
      time: 'June 2025 – July 2025',
      hook: 'Backend development for an email verification system.',
      details: [
        'Built email verification APIs using Python programming and Django REST Framework, integrating third-party verification APIs with multi-step SMTP validation logic.',
        'Implemented asynchronous background processing using Celery for bulk jobs, retries, and cleanup.',
        'Applied rate limiting, and API debugging to improve system reliability.',
      ],
    },
    {
      company: 'Levaze Digital',
      role: 'Full Stack Web Developer',
      time: 'April 2024 – June 2024',
      hook: 'Server-side rendered web features development.',
      details: [
        'Developed server-side rendered web features using Python, Flask with Jinja templates, HTML, CSS, and JavaScript.',
        'Implemented authentication features including OTP flows and Google OAuth-based signup and login.',
        'Used Git and GitHub for version control, branching, and collaborative development.',
      ],
    },
  ],

  projects: [
    {
      name: 'ClassAccess',
      tech: 'Python, Django REST Framework, React, PostgreSQL',
      hook: 'AI Powered Classroom Platform',
      desc: 'Production-ready AI-powered classroom platform with RAG pipeline and LLM integration.',
      fullDetails:
        'Built Python REST APIs with JWT authentication and role-based access control (RBAC). Integrated Supabase storage with signed URLs for file upload and access management. Implemented RAG pipeline enabling semantic search, page-level retrieval, chunking, and embedding-based retrieval using cloud-based vector storage for scalable AI workflows. Built an LLM-powered question answering system with text preprocessing and metadata handling, solving low-context retrieval issues and achieving 3× faster RAG processing per PDF. Improved system performance and reliability using Redis caching, rate limiting, background jobs, and Docker based deployment on Render and Vercel.',
      link: '',
      status: 'Prod, Live',
      year: '2025',
      category: 'AI / BACKEND ARCHITECTURE',
      tags: ['DJANGO', 'POSTGRES', 'REDIS', 'LLM'],
      images: [],
    },
    {
      name: 'Karzo',
      tech: 'Python, Django REST Framework, Vue.js, MySQL',
      hook: 'Event Ride Sharing Platform',
      desc: 'REST APIs for event-based ride sharing with optimized query performance.',
      fullDetails:
        'Built REST APIs using Python programming and Django REST Framework with JWT authentication. Resolved N+1 query issues using Django ORM. Reduced redundant search API calls using debouncing (10 to 2-4 per request cycle). Integrated OpenAI LLM for automated event description generation.',
      link: 'https://github.com/yashpatkar/karzo',
      year: '2024',
      category: 'LOGISTICS ENGINE',
      tags: ['DJANGO', 'VUE.JS', 'MYSQL'],
      images: [],
    },
    {
      name: 'SpeakUp',
      tech: 'React, TypeScript, Vite, Tailwind CSS, Framer Motion',
      hook: 'Impromptu-speaking trainer',
      desc: 'Spin a topic, beat the clock, speak — 2000+ prompts across 20+ categories with optional local-only recording.',
      fullDetails:
        'A speaking-practice app for thinking on your feet — interview prep, impromptu speaking, or just getting comfortable talking without a script. Pick Quick Speak (spin and talk immediately) or Deep Research (a research timer runs first), choose from 20+ categories spanning finance, tech, philosophy, career, and more, and a slot-machine-style reel spins to a topic from a pool of 2000+ hand-written prompts. A configurable countdown timer runs the session, with a default circular progress-ring view or a "Phone Call" template that mimics an incoming-call screen for realism practice. Recording is opt-in via the in-browser MediaRecorder API — audio stays in memory for that tab only, never uploaded or stored server-side, with a Recordings page to play back, download, or delete takes. Fully responsive with light/dark theming that auto-detects system preference, built with React 19, TypeScript, Vite, and Tailwind CSS v4, deployed on Vercel with a custom subdomain.',
      link: 'https://github.com/YashPatkar/speakup',
      liveUrl: 'https://speakup.yashpatkar.tech',
      status: 'Live',
      year: '2026',
      category: 'INTERACTIVE WEB APP',
      tags: ['REACT', 'TYPESCRIPT', 'VITE', 'TAILWIND', 'FRAMER MOTION'],
      images: ['/projects/speakup-1.png', '/projects/speakup-2.png', '/projects/speakup-3.png'],
    },
    {
      name: 'Likho Hub',
      tech: 'Python, Django, Django Channels, Celery, Redis, React, Vite, Tailwind CSS, React Flow, MCP',
      hook: 'A shared chat hub for AI coding agents',
      desc: 'A team-chat and task hub for AI coding agents (Claude Code, Codex, Cursor) to register, form groups, and hand off work, with a human-readable dashboard.',
      fullDetails:
        'Infrastructure for multi-agent coordination — the same problem this handoff itself demonstrates. Each AI coding agent working across a set of projects registers an Agent Profile (a unique 10-digit id with an assistant-type prefix, so a Claude agent is distinguishable from a Codex or Cursor one at a glance). Agents join or create Groups to post messages, thread replies, @mention each other, attach screenshots, and hand off tasks — all through an MCP server, so any MCP-compatible coding assistant can plug in with zero custom integration work. A Task model lets agents post open work to a pool that others can claim, complete, and verify against a real check command rather than a self-report, with stall detection for abandoned work and human-approval gates for sensitive actions. A React + Tailwind dashboard gives the human a live-updating, read-only view of group chats and presence. Backend is Django with a WebSocket/Celery layer for real-time delivery and durable background loops. Built to solve a concrete problem: multiple AI agents working on the same person\'s different codebases had no way to coordinate, hand off context, or avoid duplicating work.',
      link: '',
      status: 'In progress',
      year: '2026',
      category: 'MULTI-AGENT INFRASTRUCTURE',
      tags: ['PYTHON', 'DJANGO', 'REACT', 'MCP', 'MULTI-AGENT', 'WEBSOCKETS'],
      images: [],
    },
  ],
};

export default CONTACT;
