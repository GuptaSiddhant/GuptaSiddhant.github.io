export const fullName = "Siddhant Gupta"

export const title = "Full-stack Developer"

export const socialLinks = {
  linkedin: "https://linkedin.com/in/guptasiddhant9",
  github: "https://github.com/guptasiddhant",
  email: "me@guptasiddhant.com",
  homepage: "https://guptasiddhant.com",
}

export const gallery = [
  {
    url: "/favicon/android-chrome-384x384.png",
    alt: "Siddhant Gupta's profile",
  },
]

export const skills: Skills = {
  languages: [
    { name: "English", level: "Native (C2)" },
    { name: "Hindi", level: "Native (C1)" },
    { name: "Finnish", level: "Basic (A1)" },
    { name: "French", level: "Basic (A1)" },
  ],
  soft: [
    "Public speaking",
    "demonstrations",
    "problem solving",
    "teamwork",
    "entrepreneurship",
    "leadership",
  ],
  frontend: [
    "TypeScript",
    "JavaScript",
    "React",
    "Redux",
    "Next.js",
    "Remix-run",
    "HTML",
    "CSS",
    "SASS",
    "Styled-components",
    "Storybook",
  ],
  backend: ["NodeJS", "GraphQL", "Firebase", "Wordpress"],
  core: ["Git", "Bash", "Markdown", "Jest", "esbuild", "Webpack", "NPM"],
  tools: [
    "VSCode",
    "Jetbrains Webstorm",
    "GitHub",
    "Gitlab",
    "Bitbucket",
    "Jira",
    "Azure Devops",
    "Docker",
  ],
  design: ["Figma", "Sketch", "InVision", "XD", "Photoshop", "InDesign"],
  other: [
    "Python",
    "Dart",
    "GoLang",
    "MySQL",
    "C++",
    "ClojureScript",
    "Deno",
    "Gatsby",
    "Django",
    "Flutter ",
  ],
}

export const testimonies: Testimony[] = [
  {
    id: "luxus-jarkko",
    title: "Jarkko Syrjälä",
    subtitle: "Senior Developer, Luxus Worldwide",
    date: "2021-12-21",
    association: "luxus-worldwide",
    link: "https://linkedin.com/in/guptasiddhant9/details/recommendations",
    content:
      "Siddhant is able to accurately estimate his work and can always be trusted to deliver excellent quality. Siddhant is up to date with the latest frameworks and libraries in the JavaScript space, and his React expertise is top notch. His verbal and written communication skills are excellent. In a nutshell, Siddhant is super professional and pleasure to work with.",
  },
  {
    id: "fa-juha",
    title: "Juha Lehtonen",
    subtitle: "Managing Director, FA Solutions",
    date: "2021-01-22",
    association: "fa-solutions",
    link: "https://linkedin.com/in/guptasiddhant9/details/recommendations",
    content:
      "Siddhant is a very competent, fast-learning and versatile developer and a designer. His capabilities to learn and apply new technologies impresses me a lot. Only sky is a limit for him.",
  },
  {
    id: "be-sari",
    title: "Sari Mäkisalo",
    subtitle: "Marketing Manager, Business Espoo",
    date: "2019-09-01",
    association: "kalpik-studio",
    link: "https://linkedin.com/in/guptasiddhant9/details/recommendations",
    content:
      "I had the pleasure to work with Siddhant last spring when he designed the symbol and visual guidelines for the Business Espoo network. Siddhant did excellent work and cooperation with him was easy and flexible. He is creative and innovative with many good ideas. He also respect customer very well by listening customer needs, values and terms. He did for us also some extras and inspired our whole team which shows that he really concentrated to the project with good attitude and heart.\nI would definitely recommend him for different kind of design work.",
  },
  {
    id: "kth-daniel",
    title: "Daniel Schlaug",
    subtitle: "Software Engineer",
    date: "2019-08-19",
    association: "kth-ms-hcid",
    link: "https://linkedin.com/in/guptasiddhant9/details/recommendations",
    content:
      "I Had the pleasure of working together with Sid on a couple of projects for a web design course.\nThough at the time Sid's main expertise was with graphic design he had no problem stepping out of his comfort zone and taking on advanced programming tasks. His undertakings radiates ambition and if he's not already up to the task he'll make it so he is by asking questions and tirelessly trying stuff out in his spare time.\nSid goes to the bottom with things, tries to find the best way to carry out tasks while not getting stuck on details and he works with both graphics and programming in an organized way that's a pleasure for a computer scientist to watch.\nIt's been a real pleasure and I'm sure he'll bring great value wherever he goes.",
  },
  {
    id: "manish",
    title: "Manish K",
    date: "2015-08-15",
    link: "https://linkedin.com/in/guptasiddhant9/details/recommendations",
    draft: true,
    content:
      "I have worked with Siddhant and he is a great person. He has a great passion for Design and I personally liked his work. He is very dedicated and hard working.",
  },
]

export interface Testimony {
  id: string
  title: string
  subtitle?: string
  date: string
  association?: string
  link?: string
  content: string
  draft?: boolean
}

export interface Skills extends Record<SkillCategory, string[]> {
  languages: { name: string; level: string }[]
}

export type SkillCategory =
  | "soft"
  | "frontend"
  | "backend"
  | "core"
  | "tools"
  | "design"
  | "other"
