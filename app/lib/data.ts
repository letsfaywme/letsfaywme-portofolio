import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGithub,
  FaFigma,
  FaCode,
  FaPaintBrush,
  FaMagic,
  FaPlug,
  FaEye,
  FaTachometerAlt,
  FaMobileAlt,
  FaMobile,
  FaDesktop,
  FaBox,
  FaTh,
  FaAdjust,
  FaPenNib,
  FaCircle,
  FaLayerGroup,
  FaArrowDown,
  FaHandPointer,
  FaExchangeAlt,
  FaMousePointer,
  FaWater,
  FaBars,
  FaToggleOn,
  FaImages,
  FaCertificate,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRoute,
  FaPuzzlePiece,
  FaRecycle,
  FaWindowMaximize,
  FaRocket,
  FaBolt,
  FaLightbulb,
  FaGitAlt,
  FaPalette,
  FaUserAlt,
  FaColumns,
  FaExpandArrowsAlt,
  FaBriefcase,
  FaImage,
  FaHourglassHalf,
  FaMicrochip,
  FaUniversalAccess,
  FaUser,
  FaRunning,
  FaServer,
  FaCubes,
  FaCodeBranch,
  FaGem,
  FaShieldAlt,
  FaBookOpen,
  FaAward,
  FaFeatherAlt,
  FaBezierCurve,
  FaCog,
  FaWrench,
  FaCrown,
  FaCompass,
  FaNetworkWired,
  FaProjectDiagram,
  FaSitemap,
  FaAtom,
  FaObjectGroup,
  FaVectorSquare,
  FaShapes,
  FaListUl,
  FaTable,
  FaSlidersH,
  FaGlobe,
  FaBook,
  FaBrush,
  FaEraser,
  FaFillDrip,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
  FaLaptopCode,
  FaCheckCircle,
  FaInfinity,
  FaStar,
  FaHeart,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTailwindcss,
  SiVite,
  SiPostman,
  SiFramer,
  SiGooglemaps,
  SiJavascript,
  SiTypescript,
  SiVuedotjs,
  SiReact,
  SiGit,
  SiDotnet,
  SiNodedotjs,
} from "react-icons/si";

import { IconType } from "react-icons";

export type AchievementType = "regular" | "leadership" | "award";

export type SchoolAchievement = {
  text: string;
  type: AchievementType;
};

export type School = {
  period: string;
  school: string;
  major?: string;
  achievements: SchoolAchievement[];
};

export type SkillTag = {
  name: string;
  icon: IconType;
  highlight?: boolean;
};

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const SKILL_ROWS: {
  number: string;
  label: string;
  accent: "orange" | "amber";
  items: SkillTag[];
}[] = [
  {
    number: "01",
    label: "Stack",
    accent: "orange",
    items: [
      { name: "HTML5", icon: FaHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: FaPython },
      { name: "C# / .NET", icon: SiDotnet },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "Vite", icon: SiVite },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    number: "02",
    label: "Tooling & UX",
    accent: "amber",
    items: [
      { name: "Postman", icon: SiPostman },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: FaGithub },
      { name: "VS Code", icon: FaLaptopCode },
      { name: "Figma", icon: FaFigma },
      { name: "EmailJS", icon: FaEnvelope },
      { name: "Google Maps", icon: SiGooglemaps },
      { name: "UI Design", icon: FaPalette },
      { name: "Visual Hierarchy", icon: FaColumns },
      { name: "Image Optimization", icon: FaImage },
      { name: "Lazy Loading", icon: FaHourglassHalf },
      { name: "GPU Animation", icon: FaMicrochip },
      { name: "Accessibility", icon: FaUniversalAccess },
    ],
  },
];

export const SCHOOLS: School[] = [
  {
    period: "2016 - 2022",
    school: "SD Negeri Medono 08",
    achievements: [
      { text: "Aktif dalam ekstrakurikuler olahraga", type: "leadership" },
      { text: "Ketua kelas", type: "leadership" },
    ],
  },
  {
    period: "2022 - 2025",
    school: "SMP Negeri 13 Pekalongan",
    achievements: [
      { text: "Ketua OSIS 2024–2025", type: "leadership" },
      { text: "Pratama Putra 2023–2024", type: "leadership" },
      { text: "Aktif ekstrakurikuler Paskibra sebagai koordinator", type: "leadership" },
      { text: "Komandan Pleton Terbaik Tingkat Kota Pekalongan 2024", type: "award" },
      { text: "Pemimpin Upacara Terbaik Tingkat Kota Pekalongan 2024", type: "award" },
      { text: "Pramuka Garuda Kota Pekalongan 2024", type: "award" },
      { text: "Juara 1 Lomba MAPSI cabang Rebana Tingkat Kota Pekalongan", type: "award" },
      { text: "TOP 10 Lulusan Terbaik", type: "award" },
    ],
  },
  {
    period: "2025 - Present",
    school: "SMK Negeri 1 Kandeman",
    major: "Rekayasa Perangkat Lunak",
    achievements: [
      { text: "Aktif dalam ekstrakurikuler PKS Yuana Bhakti", type: "leadership" },
      { text: "Top 10 Grand Finalis Duta GenRe Kabupaten Batang 2025", type: "award" },
      { text: "Cohort Student Coding Camp 2026 by Dicoding Indonesia", type: "award" },
      { text: "Juara 3 Kreanova bidang Teknologi 2026 Tingkat Kabupaten Batang", type: "award" },
      { text: "Mendirikan bisnis startup \"Tiga Searah\" sebagai Project Manager", type: "leadership" },
    ],
  },
];

export const EXPERIENCES = [
  {
    period: "2026",
    role: "Project Manager",
    company: "Codaptive — Startup Tech Studio",
    description:
      "Led a cross-functional team of 6 engineers and designers. Oversaw delivery of 5 client web platforms from discovery to launch. Implemented agile workflows that improved sprint velocity by 40%.",
  },
  {
    period: "2026",
    role: "Project Manager",
    company: "Forum MPK — Community Platform",
    description:
      "Built the web interface for a national student organization platform. Architected a scalable React frontend serving 2,000+ active users with real-time features using WebSocket.",
  },
  {
    period: "2026",
    role: "Project Manager",
    company: "PPLG One",
    description:
      "Developed an internal class management system with attendance, scheduling, and grading modules. Managed a small dev team of 3 junior developers.",
  },
  {
    period: "2026",
    role: "Fullstack Developer",
    company: "Lumos",
    description:
      "Designed and built a futuristic, visually immersive web experience showcasing modern UI design, smooth animations, and interactive features. Developed both frontend and backend systems to deliver a seamless, high-performance digital product.",
  },
];

export const CERTIFICATES = [
  {
    issuer: "ASEAN",
    name: "AI Class ASEAN",
    date: "Completed 2026",
    url: "certificates/AIClassASEAN.pdf",
    image: "/asean.png",
  },
  {
    issuer: "Dicoding Indonesia",
    name: "Belajar Dasar Cloud dan Gen AI di AWS",
    date: "Completed 2026",
    url: "certificates/AWS.pdf",
  },
  {
    issuer: "Dicoding Indonesia",
    name: "Belajar Back-End Pemula dengan JavaScript",
    date: "Completed 2026",
    url: "certificates/Back-End.pdf",
  },
  {
    issuer: "Dicoding Indonesia",
    name: "Belajar Dasar Pemrograman JavaScript",
    date: "Completed 2026",
    url: "certificates/Dasar Pemrograman JavaScript.pdf",
  },
  {
    issuer: "Dicoding Indonesia",
    name: "Belajar Dasar AI",
    date: "Completed 2026",
    url: "certificates/Belajar Dasar AI.pdf",
  },
  {
    issuer: "Dicoding Indonesia",
    name: "Belajar Dasar Pemrograman Web",
    date: "Completed 2026",
    url: "certificates/Dasar Pemrograman Web.pdf",
  },
  {
    issuer: "Dicoding Indonesia",
    name: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
    date: "Completed 2026",
    url: "certificates/Dasar Pemrograman.pdf",
  },
  {
    issuer: "Dicoding Indonesia",
    name: "Belajar Membuat Front-End Web untuk Pemula",
    date: "Completed 2026",
    url: "certificates/Front-End.pdf",
  },
  {
    issuer: "Dicoding Indonesia",
    name: "Pengenalan ke Logika Pemrograman (Programming Logic 101)",
    date: "Completed 2026",
    url: "certificates/Programming Logic.pdf",
  },
  {
    issuer: "Dicoding Indonesia",
    name: "Belajar Membuat Aplikasi Web dengan React",
    date: "Completed 2026",
    url: "certificates/React.pdf",
  },
  {
    issuer: "Dicoding Indonesia",
    name: "Memulai Pemrograman dengan Python",
    date: "Completed 2026",
    url: "certificates/Memulai Pemrograman dengan Python.pdf",
  },
  {
    issuer: "Dicoding Indonesia",
    name: "Spec-Driven Development dengan Kiro",
    date: "Completed 2026",
    url: "certificates/Spec-Driven Development dengan Kiro.pdf",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Fayakun delivered the project ahead of schedule with exceptional quality. His ability to manage both the technical and strategic aspects is rare and incredibly valuable.",
    name: "Ahmad Rizki",
    role: "CTO, Tech Startup",
    initials: "AR",
  },
  {
    quote:
      "Working with Fayakun was seamless. He understood our vision immediately and transformed it into a beautiful, high-performing web platform that exceeded expectations.",
    name: "Sari Ningrum",
    role: "Founder, EdTech Platform",
    initials: "SN",
  },
  {
    quote:
      "His project management skills are outstanding. The team was aligned, sprints were organized, and every deadline was met. A true professional in every sense.",
    name: "Budi Hartanto",
    role: "Product Manager",
    initials: "BH",
  },
  {
    quote:
      "Fayakun has a gift for translating complex requirements into elegant solutions. The forum platform he built has been running flawlessly for over a year.",
    name: "Dewi Wulandari",
    role: "Org Lead, Forum MPK",
    initials: "DW",
  },
];

export const PROJECTS = [
  {
    id: 1,
    image: "/codaptive.jpeg",
    color: "linear-gradient(135deg,#1a1200 0%,#2a1800 100%)",
    accentColor: "rgba(232,98,42,0.5)",
    categories: ["all", "web", "platform", "pm"],
    tags: ["React", "Next.js", "PM"],
    name: "Codaptive",
    description:
      "A modern educational platform that empowers beginners to start their coding journey with confidence. By providing personalized learning roadmaps, career path recommendations, and structured resources, Codaptive helps students navigate the world of software development and technology more effectively.",
    demoUrl: "https://codaptive.vercel.app/",
    repoUrl: "https://github.com/nnez17/Codaptive",
  },
  {
    id: 2,
    image: "/forum-mpk.jpeg",
    color: "linear-gradient(135deg,#0d1a10 0%,#0d1205 100%)",
    accentColor: "rgba(74,222,128,0.35)",
    categories: ["all", "web", "platform", "pm"],
    tags: ["React", "WebSocket", "Platform"],
    name: "Forum MPK",
    description:
      "A modern communication platform designed for student council organizations to improve coordination, information sharing, and discussions between members. Built with a clean and responsive interface to create a more organized and efficient digital collaboration experience.",
    demoUrl: "https://mpkskansaka.vercel.app",
    repoUrl: "https://github.com/tiga-searah/forum-mpk-skansaka",
  },
  {
    id: 3,
    image: "/pplg-one.jpeg",
    color: "linear-gradient(135deg,#0d0d1a 0%,#12001a 100%)",
    accentColor: "rgba(139,92,246,0.45)",
    categories: ["all", "web", "platform", "pm"],
    tags: ["Node.js", "PostgreSQL", "Web App"],
    name: "PPLG One",
    description:
      "A sleek, all-in-one classroom management system built for PPLG (Software and Game Development) vocational programs. Simplifies daily academic workflows with integrated tools for attendance, assignments, scheduling, announcements, and student data — helping teachers and students stay organized, connected, and focused on what matters most.",
    demoUrl: "https://pplgone.vercel.app",
    repoUrl: "https://github.com/tiga-searah/xpplgone-web",
  },
  {
    id: 4,
    image: "/lumos.png",
    color: "linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%)",
    accentColor: "rgba(232,98,42,0.45)",
    categories: ["all", "web", "platform", "pm"],
    tags: ["React", "Productivity", "Web App"],
    name: "LUMOS",
    description:
      "A futuristic and visually immersive web project that combines modern UI design, smooth animations, and interactive experiences. Lumos was created to explore creativity, digital aesthetics, and engaging front-end development concepts in a unique and elegant way.",
    demoUrl: "https://letsfaywme.github.io/Lumos/",
    repoUrl: "https://github.com/letsfaywme/Lumos",
  },
  {
    id: 5,
    image: "/duta-edukasi.png",
    color: "linear-gradient(135deg,#0a1628 0%,#1a2a3a 100%)",
    accentColor: "rgba(59,130,246,0.45)",
    categories: ["all", "web", "platform"],
    tags: ["React", "Education", "Platform"],
    name: "Duta Edukasi",
    description:
      "An educational platform designed to connect students with learning resources, mentorship, and collaborative tools. Built with a modern stack to deliver a seamless and engaging learning experience.",
    demoUrl: "https://duta-edukasi.netlify.app/",
    repoUrl: "https://github.com/letsfaywme/Duta-Edukasi",
  },
  {
    id: 6,
    image: "/bookshelf.png",
    color: "linear-gradient(135deg,#1a1200 0%,#3a2a00 100%)",
    accentColor: "rgba(255,183,77,0.45)",
    categories: ["all", "web"],
    tags: ["JavaScript", "localStorage", "CRUD"],
    name: "Bookshelf App",
    description:
      "A book tracking app to log books you've read, complete with author names and last-read dates. Features login, sign in, and the ability to edit or delete book entries, all stored via localStorage.",
    demoUrl: "https://bookshelf-app-seven-nu.vercel.app/",
    repoUrl: "https://github.com/fayakun258714-creator/Bookshelf-App",
  },
  {
    id: 7,
    image: "/note-app.png",
    color: "linear-gradient(135deg,#0a1a2a 0%,#0a2a1a 100%)",
    accentColor: "rgba(72,187,120,0.45)",
    categories: ["all", "web"],
    tags: ["JavaScript", "localStorage", "CRUD"],
    name: "Note App",
    description:
      "A note-taking website for diary entries and important notes, complete with dates and content. Includes login, sign in, and the ability to edit or delete notes, all stored via localStorage.",
    demoUrl: "https://bookshelf-app-seven-nu.vercel.app/",
    repoUrl: "https://github.com/fayakun258714-creator/note-app-dbs",
  },
];

export const STATS = [
  { num: "15", suffix: "+", label: "Projects Shipped" },
  { num: "8", suffix: "+", label: "Happy Clients" },
  { num: "1", suffix: "+", label: "Years Active" },
];

export const SOCIAL_LINKS = [
  { href: "https://github.com/letsfaywme", label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/fayakun-achamd-isa-378a043a5/",
    label: "LinkedIn",
  },
  { href: "https://twitter.com/fayakun", label: "Twitter/X" },
  { href: "https://instagram.com/letsfaywme", label: "Instagram" },
];
