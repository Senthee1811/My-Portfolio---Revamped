export interface ProfileData {
  fullName: string;
  displayName: string;
  githubHandle: string;
  role: string;
  tagline: string;
  location: string;
  timezone: string;
  statusLine: string;
  avatarUrl: string;
  remoteAvatarUrl: string;
  bio: string;
  shortBio: string;
  contacts: {
    email: string;
    whatsapp: string;
    whatsappDisplay: string;
    linkedin: string;
    github: string;
    instagram?: string;
    cvPath: string;
  };
  highlights: {
    id: string;
    title: string;
    icon: string;
    gradient: string;
    stories: {
      type: "bio" | "stack" | "now" | "contact";
      title: string;
      subtitle: string;
      content: string[];
    }[];
  }[];
}

export const profileData: ProfileData = {
  fullName: "Sentheepan Ellankovan",
  displayName: "Senthee",
  githubHandle: "Senthee1811",
  role: "Full-Stack Developer",
  tagline: "MERN & Next.js Specialist · AI Integration Enthusiast · Scalable Web Architectures",
  location: "Kotahena, Colombo, Sri Lanka",
  timezone: "Asia/Colombo",
  statusLine: "Open to junior software engineering roles & freelance projects",
  avatarUrl: "/images/me/avatar.jpg",
  remoteAvatarUrl: "https://github.com/Senthee1811.png?size=352",
  bio: "BSc (Hons) Information Technology graduate from SLIIT with 9+ months of combined internship and freelance full-stack experience building scalable, AI-integrated web applications. Proficient in the MERN stack (MongoDB, Express.js, Node.js, React.js), Next.js and Python, with a strong foundation in RESTful API design, TypeScript and microservices architectures.",
  shortBio: "IT graduate who builds scalable full-stack web apps and plugs AI APIs (Gemini, GPT-4) into them. Based in Colombo.",
  contacts: {
    email: "esentheepan@gmail.com",
    whatsapp: "https://wa.me/94762587540",
    whatsappDisplay: "+94 76 258 7540",
    linkedin: "https://www.linkedin.com/in/ellankovan-sentheepan",
    github: "https://github.com/Senthee1811",
    instagram: "https://instagram.com/sen_thee_007",
    cvPath: "/cv/Sentheepan_Ellankovan_CV.pdf",
  },
  highlights: [
    {
      id: "about",
      title: "About",
      icon: "User",
      gradient: "from-blue-500 to-indigo-600",
      stories: [
        {
          type: "bio",
          title: "About Me",
          subtitle: "Background & Education",
          content: [
            "BSc (Hons) in Information Technology from SLIIT, specializing in Full-Stack Development & Software Quality Assurance.",
            "9+ months of hands-on industry & freelance experience delivering production-grade microservices and modern web apps.",
            "Passionate about combining robust backend architecture with intuitive, polished frontend motion.",
          ],
        },
      ],
    },
    {
      id: "stack",
      title: "Stack",
      icon: "Layers",
      gradient: "from-emerald-500 to-teal-600",
      stories: [
        {
          type: "stack",
          title: "Tech Stack",
          subtitle: "Core Toolkit",
          content: [
            "Frontend: Next.js (App Router), React, Vue.js, Tailwind CSS, GSAP.",
            "Backend: Node.js, Express, Python (FastAPI/Flask), MongoDB, MySQL, Supabase, Convex.",
            "AI & Cloud: Gemini API, OpenAI/GPT-4, Coqui TTS, PyTorch, Docker, AWS.",
          ],
        },
      ],
    },
    {
      id: "now",
      title: "Now",
      icon: "Compass",
      gradient: "from-amber-500 to-orange-600",
      stories: [
        {
          type: "now",
          title: "Current Focus",
          subtitle: "April 2026",
          content: [
            "Open to junior software engineering roles & selected freelance contracts.",
            "Architecting AI-integrated full-stack applications with real-time streaming capabilities.",
            "Exploring local LLM reasoning models and agentic workflows.",
          ],
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      icon: "Send",
      gradient: "from-purple-500 to-pink-600",
      stories: [
        {
          type: "contact",
          title: "Let's Connect",
          subtitle: "Direct Reach",
          content: [
            "Email: esentheepan@gmail.com",
            "WhatsApp: +94 76 258 7540",
            "LinkedIn: ellankovan-sentheepan",
            "Based in Kotahena, Colombo, Sri Lanka (UTC+05:30).",
          ],
        },
      ],
    },
  ],
};
