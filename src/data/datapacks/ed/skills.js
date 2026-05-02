import { SiUnity, SiNodedotjs, SiAndroid, SiGit, SiJavascript, SiWebrtc, SiLinux, SiDocker, SiMapbox, SiReact, SiNestjs, SiNextdotjs, SiDotnet, SiFigma, SiAndroidstudio, SiTensorflow, SiFirebase, SiGooglecardboard, SiWebgl, SiPython, SiAssemblyscript, SiArduino, SiBlender, SiC, SiOpenai, SiClaude, SiEclipseide, SiGamedeveloper, SiGithubcopilot, SiIntellijidea, SiLatex, SiNotebooklm, SiOverleaf, SiPostman, SiSuno, SiWireshark } from "react-icons/si";
import { TbBrandCSharp, TbAugmentedReality2, TbBrandMysql, TbSql, TbBoxModel2, TbCloudComputingFilled, TbBrandAdobePhotoshop, TbBrandAdobePremier } from "react-icons/tb"
import { BsHeadsetVr, BsStack } from "react-icons/bs";
import { DiVisualstudio, DiJava } from "react-icons/di";
import { PiMicrosoftWordLogoFill, PiMicrosoftPowerpointLogoFill, PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { LuBrainCircuit } from "react-icons/lu";
import { FaServer, FaMobileAlt, FaCode, FaNetworkWired, FaWindows, FaCloud } from "react-icons/fa";
import { CgSmartphoneChip } from "react-icons/cg";
import { MdHttp, MdViewQuilt } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";

export const categories = [    
    {
        id: "domain",
        title: "Domains"
    },
    {
        id: "language",
        title: "Languages"
    },
    {
        id: "framework",
        title: "Frameworks"
    },
    {
        id: "tool",
        title: "Tools"
    },
    {
        id: "technology",
        title: "Technologies",
    },
    {
        id: "ai",
        title: "AI Tools"
    },
    {
        id: "platform",
        title: "Platforms",
    }
]

export function getSkillCategoryId(skill) {
    return categories.find((category) => skill?.tags?.includes(category.id))?.id || "tool";
}

export function getSkillCategoryTitle(skill) {
    return categories.find((category) => skill?.tags?.includes(category.id))?.title || "Tools";
}

export const skills = [
    {
        id: "8051",
        title: "8051 Assembly",
        icon: SiAssemblyscript,
        tags: ["language", "university"]
    },
    {
        id: "android",
        title: "Android",
        icon: SiAndroid,
        tags: ["featured", "platform", "personal", "university", "ccg"]
    },
    {
        id: "androidstudio",
        title: "Android Studio",
        icon: SiAndroidstudio,
        tags: ["featured", "tool", "personal", "university"]
    },
    {
        id: "ar",
        title: "Augmented Reality",
        icon: TbAugmentedReality2,
        tags: ["featured", "platform", "personal", "university", "ccg"]
    },
    {
        id: "arduino",
        title: "Arduino",
        icon: SiArduino,
        tags: ["platform", "university"]
    },
    {
        id: "arfoundation",
        title: "AR Foundation",
        icon: SiUnity,
        tags: ["framework", "personal", "university", "ccg"]
    },
    {
        id: "aspnet",
        title: "ASP.NET",
        icon: SiDotnet,
        tags: ["framework", "ccg"]
    },
    {
        id: "backend",
        title: "Backend",
        icon: FaServer,
        tags: ["featured", "domain", "personal", "university", "ccg"]
    },
    {
        id: "blender",
        title: "Blender",
        icon: SiBlender,
        tags: ["tool", "personal"]
    },
    {
        id: "cardboard",
        title: "Google Cardboard",
        icon: SiGooglecardboard,
        tags: ["platform", "personal", "university"]
    },
    {
        id: "chatgpt",
        title: "ChatGPT",
        icon: SiOpenai,
        tags: ["featured", "ai", "personal", "ccg"]
    },
    {
        id: "clang",
        title: "C",
        icon: SiC,
        tags: ["featured", "language", "university"]
    },
    {
        id: "claude",
        title: "Claude",
        icon: SiClaude,
        tags: ["ai", "personal"]
    },
    {
        id: "clipchamp",
        title: "Microsoft Clipchamp / Windows Movie Maker",
        icon: "clipchamp.png",
        tags: ["tool", "personal", "middle_school", "high_school"]
    },
    {
        id: "coap",
        title: "CoAP",
        icon: FaNetworkWired,
        tags: ["technology", "university"]
    },
    {
        id: "corda",
        title: "Corda",
        icon: "corda.png",
        tags: ["platform", "university"]
    },
    {
        id: "core",
        title: "CORE Emulator",
        icon: "core.png",
        tags: ["tool", "university"]
    },
    {
        id: "csharp",
        title: "C#",
        icon: TbBrandCSharp,
        tags: ["featured", "language", "personal", "university", "ccg"]
    },
    {
        id: "deepseek",
        title: "DeepSeek",
        icon: "deepseek.svg",
        tags: ["ai", "personal"]
    },
    {
        id: "docker",
        title: "Docker",
        icon: SiDocker,
        tags: ["tool", "university", "ccg"]
    },
    {
        id: "eclipse",
        title: "Eclipse",
        icon: SiEclipseide,
        tags: ["tool", "university"]
    },
    {
        id: "embedded",
        title: "Embedded Systems",
        icon: CgSmartphoneChip,
        tags: ["domain", "university"]
    },
    {
        id: "excel",
        title: "Microsoft Excel",
        icon: PiMicrosoftExcelLogoFill,
        tags: ["tool", "personal", "middle_school", "university", "ccg"]
    },
    {
        id: "figma",
        title: "Figma",
        icon: SiFigma,
        tags: ["tool", "ccg"]
    },
    {
        id: "firebase",
        title: "Firebase",
        icon: SiFirebase,
        tags: ["tool", "university", "ccg"]
    },
    {
        id: "frontend",
        title: "Frontend",
        icon: MdViewQuilt,
        tags: ["domain", "personal", "university", "ccg"]
    },
    {
        id: "fullstack",
        title: "Full Stack",
        icon: BsStack,
        tags: ["domain", "university", "ccg"]
    },
    {
        id: "gamedev",
        title: "Game Development",
        icon: SiGamedeveloper,
        tags: ["featured", "domain", "personal", "high_school", "university", "ccg"]
    },
    {
        id: "ghcopilot",
        title: "GitHub Copilot",
        icon: SiGithubcopilot,
        tags: ["featured", "ai", "personal"]
    },
    {
        id: "git",
        title: "Git",
        icon: SiGit,
        tags: ["tool", "personal", "university", "ccg"]
    },
    {
        id: "gusek",
        title: "GUSEK",
        icon: TbBoxModel2,
        tags: ["tool", "university"]
    },
    {
        id: "http",
        title: "HTTP / REST",
        icon: MdHttp,
        tags: ["featured", "technology", "ccg", "university"]
    },
    {
        id: "intellij",
        title: "IntelliJ IDEA",
        icon: SiIntellijidea,
        tags: ["tool", "university"]
    },
    {
        id: "iot",
        title: "Internet of Things",
        icon: TbCloudComputingFilled,
        tags: ["featured", "domain", "university"]
    },
    {
        id: "java",
        title: "Java",
        icon: DiJava,
        tags: ["featured", "language", "personal", "university"]
    },
    {
        id: "js",
        title: "Javascript",
        icon: SiJavascript,
        tags: ["featured", "language", "personal", "university", "ccg"]
    },
    {
        id: "latex",
        title: "LaTeX",
        icon: SiLatex,
        tags: ["language", "personal", "university"]
    },
    {
        id: "linux",
        title: "Linux",
        icon: SiLinux,
        tags: ["featured", "platform", "personal", "university", "ccg"]
    },
    {
        id: "mapbox",
        title: "Mapbox",
        icon: SiMapbox,
        tags: ["framework", "personal", "university"]
    },
    {
        id: "matlab",
        title: "MATLAB",
        icon: "matlab.svg",
        tags: ["language", "university"]
    },
    {
        id: "mips",
        title: "MIPS Assembly",
        icon: SiAssemblyscript,
        tags: ["language", "university"]
    },
    {
        id: "ml",
        title: "Machine Learning",
        icon: LuBrainCircuit,
        tags: ["domain", "university", "ccg"]
    },
    {
        id: "mobile",
        title: "Mobile Development",
        icon: FaMobileAlt,
        tags: ["featured", "domain", "personal", "university", "ccg"]
    },
    {
        id: "mscopilot",
        title: "Microsoft Copilot",
        icon: "mscopilot.svg",
        tags: ["ai", "personal", "ccg"]
    },
    {
        id: "msword",
        title: "Microsoft Word",
        icon: PiMicrosoftWordLogoFill,
        tags: ["tool", "personal", "middle_school", "high_school", "university", "ccg"]
    },
    {
        id: "mysql",
        title: "MySQL",
        icon: TbBrandMysql,
        tags: ["featured", "tool", "university", "ccg"]
    },
    {
        id: "nestjs",
        title: "NestJS",
        icon: SiNestjs,
        tags: ["framework", "ccg"]
    },
    {
        id: "networking",
        title: "Networking",
        icon: FaNetworkWired,
        tags: ["featured", "domain", "personal", "university", "ccg"]
    },
    {
        id: "nextjs",
        title: "Next.js",
        icon: SiNextdotjs,
        tags: ["framework", "ccg"]
    },
    {
        id: "nodejs",
        title: "Node.js",
        icon: SiNodedotjs,
        tags: ["featured", "framework", "personal", "university", "ccg"]
    },
    {
        id: "notebooklm",
        title: "NotebookLM",
        icon: SiNotebooklm,
        tags: ["ai", "personal"]
    },
    {
        id: "overleaf",
        title: "Overleaf",
        icon: SiOverleaf,
        tags: ["tool", "personal"]
    },
    {
        id: "pascal",
        title: "Pascal",
        icon: FaCode,
        tags: ["language", "high_school"]
    },
    {
        id: "photoshop",
        title: "Adobe Photoshop",
        icon: TbBrandAdobePhotoshop,
        tags: ["tool", "personal", "high_school"]
    },
    {
        id: "postman",
        title: "Postman",
        icon: SiPostman,
        tags: ["tool", "university", "ccg"]
    },
    {
        id: "powerpnt",
        title: "Microsoft PowerPoint",
        icon: PiMicrosoftPowerpointLogoFill,
        tags: ["tool", "personal", "middle_school", "high_school", "university", "ccg"]
    },
    {
        id: "premiere",
        title: "Adobe Premiere Pro",
        icon: TbBrandAdobePremier,
        tags: ["tool", "high_school"]
    },
    {
        id: "python",
        title: "Python",
        icon: SiPython,
        tags: ["featured", "language", "personal", "university"]
    },
    {
        id: "reactjs",
        title: "React.js",
        icon: SiReact,
        tags: ["framework", "personal", "university"]
    },
    {
        id: "snmp",
        title: "SNMP",
        icon: FaNetworkWired,
        tags: ["technology", "university"]
    },
    {
        id: "sql",
        title: "SQL",
        icon: TbSql,
        tags: ["featured", "language", "university", "ccg"]
    },
    {
        id: "suno",
        title: "Suno",
        icon: SiSuno,
        tags: ["ai", "personal"]
    },
    {
        id: "tcp",
        title: "TCP/IP",
        icon: FaNetworkWired,
        tags: ["technology", "university", "personal"]
    },
    {
        id: "tensorflow",
        title: "TensorFlow",
        icon: SiTensorflow,
        tags: ["tool", "personal", "university"]
    },
    {
        id: "udp",
        title: "UDP",
        icon: FaNetworkWired,
        tags: ["technology", "university", "personal"]
    },
    {
        id: "unity",
        title: "Unity",
        icon: SiUnity,
        tags: ["featured", "framework", "personal", "university", "ccg"]
    },
    {
        id: "uwp",
        title: "Universal Windows Platform (UWP)",
        icon: FaWindows,
        tags: ["platform", "ccg"]
    },
    {
        id: "vbasic",
        title: "Visual Basic",
        icon: DiVisualstudio,
        tags: ["language", "high_school"]
    },
    {
        id: "viroo",
        title: "VIROO Studio",
        icon: "viroo.svg",
        tags: ["tool", "ccg"]
    },
    {
        id: "vr",
        title: "Virtual Reality",
        icon: BsHeadsetVr,
        tags: ["featured", "platform", "personal", "high_school", "university", "ccg"]
    },
    {
        id: "vscode",
        title: "Visual Studio Code",
        icon: VscVscode,
        tags: ["tool", "personal", "university", "ccg"]
    },
    {
        id: "vstudio",
        title: "Visual Studio",
        icon: DiVisualstudio,
        tags: ["tool", "personal", "ccg"]
    },
    {
        id: "vuforia",
        title: "Vuforia",
        icon: TbAugmentedReality2,
        tags: ["technology", "university"]
    },
    // {
    //     id: "server",
    //     title: "Server Environment",
    //     icon: {
    //         type: "react",
    //         value: FaServer
    //     },
    //     tags: ["featured", "platform", "university", "ccg"]
    // },
    {
        id: "webgl",
        title: "WebGL",
        icon: SiWebgl,
        tags: ["technology", "ccg"]
    },
    {
        id: "webrtc",
        title: "WebRTC",
        icon: SiWebrtc,
        tags: ["featured", "technology", "ccg"]
    },
    {
        id: "websocket",
        title: "WebSocket",
        icon: "websocket.svg",
        tags: ["featured", "technology", "ccg"]
    },
    {
        id: "windows",
        title: "Windows",
        icon: FaWindows,
        tags: ["platform", "personal", "high_school", "university", "ccg"]
    },
    {
        id: "wireshark",
        title: "Wireshark",
        icon: SiWireshark,
        tags: ["tool", "university"]
    },
    {
        id: "xr",
        title: "Extended Reality",
        icon: BsHeadsetVr,
        tags: ["featured", "domain", "personal", "university", "ccg"]
    },
    {
        id: "xritk",
        title: "XR Interaction Toolkit",
        icon: SiUnity,
        tags: ["framework", "ccg"]
    }
]