export const person = {
  name: "Vraj Raval",
  role: "Full Stack Developer",
  email: "ravalvraj3000@gmail.com",
  phone: "+91 8758227762",
  telephone: "+918758227762",
  linkedin: "https://www.linkedin.com/in/vraj-raval-54790b231/",
  github: "https://github.com/Vraj-Raval",
  website: "https://vrajraval.site/",
  intro: "I build multi-tenant SaaS, fintech, CRM, and EdTech platforms with Next.js, NestJS, and TypeScript.",
  about: "My work spans frontend development, backend architecture, and deployment. At The Bombay Group, I’ve built financial ledger workflows, real-time event pipelines, adaptive video streaming, and payment and KYC integrations. I also manage containerized VPS deployments and support high-concurrency production operations.",
};

export const experience = {
  company: "The Bombay Group",
  role: person.role,
  dates: "May 2025 – Present",
  location: "Vadodara, Gujarat",
  summary: "I develop and deploy platforms for university operations, forex brokerage, and financial education. My work includes multi-tier access control, background reconciliation, and production deployments.",
};

export const education = {
  institution: "Darshan University",
  degree: "B.Tech in Computer Engineering",
  dates: "September 2021 – June 2025",
  location: "Rajkot, Gujarat",
};

export const expertise = [
  ["Languages", ["TypeScript", "JavaScript (ES6+)", "Java", "SQL"]],
  ["Frontend & UI", ["Next.js", "React.js", "Redux", "React Hooks", "React Router", "Tailwind CSS", "shadcn/ui", "Material UI"]],
  ["Backend & architecture", ["NestJS", "Node.js", "Express.js", "Prisma ORM", "REST APIs", "WebSockets (Socket.IO)", "RBAC", "Event queues"]],
  ["Data & queues", ["PostgreSQL", "MySQL", "MongoDB", "Redis", "BullMQ"]],
  ["Integrations", ["Stripe", "Razorpay", "LeanX webhooks", "Sumsub KYC", "Zoom SDK/API", "Google Meet API", "Google Gemini AI"]],
  ["DevOps & tools", ["Docker", "DigitalOcean", "Coolify", "VPS administration", "Cloudflare Turnstile", "Git", "Jira", "Postman"]],
] as const;

type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  features: { title: string; text: string }[];
  technologies: string[];
  diagram: { label: string; nodes: [string, string, string] };
  url?: string;
};

export const projects: Project[] = [
  {
    id: "eonefx",
    name: "Eonefx",
    category: "Fintech / Brokerage infrastructure",
    description: "A forex broker CRM and trading portal with role-based sales workflows, referral commissions, and payment reconciliation.",
    features: [
      { title: "Sales and commissions", text: "Built a hierarchical CRM for managers and sales reps, with multilevel referrals, rebates, and commissions backed by ACID-compliant Prisma transactions." },
      { title: "KYC and payments", text: "Integrated Sumsub for automated and manual KYC review and LeanX for payments, using idempotent webhooks." },
      { title: "Trade events and reconciliation", text: "Used WebSockets, Redis, and BullMQ for trade telemetry and admin alerts. Built wallet audit trails and reconciliation workers to validate deposit and withdrawal transitions." },
    ],
    technologies: ["Next.js", "NestJS", "MySQL", "Prisma", "Redis", "BullMQ", "LeanX", "Sumsub", "Google Meet API", "Cloudflare Turnstile"],
    diagram: { label: "Payment reconciliation", nodes: ["LeanX webhook", "Financial ledger", "BullMQ worker"] },
    url: "https://www.eonefx.com/",
  },
  {
    id: "university",
    name: "University Management System",
    category: "EdTech / Assam Agricultural University",
    description: "A platform for administrators, faculty, and students that brings academic operations and online learning together.",
    features: [
      { title: "Academic operations", text: "Architected and deployed the platform across three role-specific portals, bringing together enrollment, timetables, syllabi, faculty administration, and holiday scheduling." },
      { title: "Online learning", text: "Built adaptive video streaming for an LMS with 50+ courses and 500+ digital publications. Integrated Zoom to schedule lectures and track attendance." },
      { title: "Assessments and notifications", text: "Built a proctored MCQ assessment module, integrated Cloudflare Turnstile on public endpoints, and implemented role-based access and Socket.IO notifications." },
    ],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Socket.IO", "Zoom API", "shadcn/ui", "Cloudflare Turnstile", "Coolify"],
    diagram: { label: "University portals", nodes: ["Administration", "Faculty", "Students"] },
  },
  {
    id: "vervee",
    name: "The Vervee Academy",
    category: "EdTech / Financial education",
    description: "A subscription learning platform for forex, crypto, and commodities education.",
    features: [
      { title: "Curriculum and billing", text: "Architected tiered subscriptions with Stripe billing webhooks and structured video curricula." },
      { title: "Assessment and certification", text: "Built automated multiple-choice evaluations and a Currency Market Certification workflow." },
    ],
    technologies: ["Next.js", "NestJS", "MySQL", "Prisma", "Stripe", "Google Gemini AI", "DigitalOcean"],
    diagram: { label: "Learning workflow", nodes: ["Subscription", "Video courses", "Assessment"] },
    url: "https://app.theverveeacademy.com/",
  },
];
