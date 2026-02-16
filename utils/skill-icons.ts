import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiGit,
  SiFigma,
  SiBootstrap,
  SiMui,
  SiCanva,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiFreelancer,
} from "react-icons/si";
import { IconType } from "react-icons";

export const getSkillIcon = (skill: string): IconType => {
  const skillLower = skill.toLowerCase();

  switch (skillLower) {
    case "html":
      return SiHtml5;
    case "css":
      return SiCss3;
    case "javascript":
      return SiJavascript;
    case "js":
      return SiJavascript;
    case "typescript":
      return SiTypescript;
    case "ts":
      return SiTypescript;
    case "react":
      return SiReact;
    case "next js":
    case "nextjs":
    case "next.js":
      return SiNextdotjs;
    case "tailwind":
    case "tailwindcss":
      return SiTailwindcss;
    case "node js":
    case "nodejs":
    case "node.js":
      return SiNodedotjs;
    case "mongodb":
      return SiMongodb;
    case "mysql":
      return SiMysql;
    case "firebase":
      return SiFirebase;
    case "git":
      return SiGit;
    case "figma":
      return SiFigma;
    case "bootstrap":
      return SiBootstrap;
    case "materialui":
    case "mui":
      return SiMui;
    case "canva":
      return SiCanva;
    case "illustrator":
      return SiAdobeillustrator;
    case "photoshop":
      return SiAdobephotoshop;
    default:
      return SiFreelancer; // Fallback icon
  }
};

export const getSkillColor = (skill: string): string => {
  const skillLower = skill.toLowerCase();
  switch (skillLower) {
    case "html":
      return "#61DAFB"; // Red-500
    case "css":
      return "#61DAFB"; // Red-600
    case "javascript":
      return "#4FA8C7"; // Red-700
    case "typescript":
      return "#61DAFB"; // Red-500
    case "react":
      return "#61DAFB"; // Red-600
    case "next js":
    case "nextjs":
    case "next.js":
      return "#ffffff"; // Keep white for contrast
    case "tailwind":
      return "#282C34"; // Red-800
    case "node js":
    case "nodejs":
      return "#4FA8C7"; // Red-700
    case "mongodb":
      return "#21232A"; // Red-900
    case "mysql":
      return "#282C34"; // Red-800
    case "firebase":
      return "#61DAFB"; // Red-500
    case "git":
      return "#61DAFB"; // Red-600
    case "figma":
      return "#4FA8C7"; // Red-700
    case "bootstrap":
      return "#282C34"; // Red-800
    case "materialui":
    case "mui":
      return "#61DAFB"; // Red-500
    default:
      return "#61DAFB"; // Default Red
  }
};
