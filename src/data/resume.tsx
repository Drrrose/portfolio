import { Code2, Database, Layout, Server, Settings, Terminal } from "lucide-react";

export const RESUME = {
  name: "Mostafa Ali",
  initials: "MA",
  location: "Heliopolis, Cairo, Egypt",
  locationLink: "https://www.google.com/maps/place/Heliopolis,+Cairo",
  about:
    "Detail-oriented Mid-level Backend Developer with over a year of professional experience in building robust, large-scale web applications using PHP and Laravel. Skilled in database design, RESTful APIs, and frontend integration.",
  summary:
    "Proven track record of managing the full software development lifecycle, from database design to deploying RESTful APIs and integrating frontend technologies like Vue.js and Tailwind CSS. Strong command of OOP, SOLID principles, and design patterns. Skilled in cloud integration (AWS S3, SES) and version control.",
  avatarUrl: "",
  personalWebsiteUrl: "#",
  contact: {
    email: "mostafaali.php@gmail.com",
    tel: "+201011388446",
    social: {
      GitHub: {
        name: "GitHub",
        url: "#",
        icon: Terminal,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "#",
        icon: Code2,
      },
      X: {
        name: "X",
        url: "#",
        icon: Terminal,
      },
    },
  },
  education: [
    {
      school: "Shorouk Academy",
      degree: "Computer Science",
      start: "2021",
      end: "2025",
      grade: "Very Good (Project: Excellent)",
    },
  ],
  work: [
    {
      company: "Remah Digital",
      link: "#",
      badges: [],
      title: "Backend Developer",
      logo: "",
      start: "06/2024",
      end: "11/2025",
      description:
        "Developed scalable web applications using Laravel. Engineered RESTful APIs, established performance metrics, and collaborated on DB design. Built secure, modular CMS for medical clinics (HIPAA compliant), E-commerce platform with RTL support, and Translation Workflow platform.",
    },
    {
      company: "Active4Web",
      link: "#",
      badges: ["Intern"],
      title: "Backend Intern",
      logo: "",
      start: "01/2024",
      end: "06/2024",
      description:
        "Assisted in backend modules using Laravel/MySQL. Debugged and refactored legacy code. Gained RESTful API experience.",
    },
  ],
  skills: [
    "PHP",
    "Laravel",
    "Node.js",
    "Python",
    "MySQL",
    "MongoDB",
    "Redis",
    "Docker",
    "AWS S3",
    "AWS SES",
    "Vue.js",
    "Tailwind CSS",
    "Git",
    "CI/CD",
  ],
  projects: [
    {
      title: "Medical Clinics CMS",
      techStack: ["Laravel", "MySQL", "AWS S3", "Twilio", "AWS SES"],
      description:
        "A secure, multi-lingual, and modular CMS for medical clinics focusing on HIPAA compliance. Features encrypted media storage and secure patient data controls.",
      link: {
        label: "Private Project",
        href: "#",
      },
    },
    {
      title: "E-commerce Platform",
      techStack: ["Laravel", "MySQL"],
      description:
        "Full-stack e-commerce platform with comprehensive product management, order processing, and dynamic promotions. Features full multi-language and RTL support.",
      link: {
        label: "Private Project",
        href: "#",
      },
    },
    {
      title: "SaaS Translation Platform",
      techStack: ["Laravel", "PayPal", "Tap", "Real-time"],
      description:
        "Platform to manage translation workflows, including order creation, dynamic pricing, payment processing, and translator assignment.",
      link: {
        label: "Private Project",
        href: "#",
      },
    },
  ],
} as const;
