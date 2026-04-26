import { SiUnity, SiNodedotjs, SiAndroid, SiGit, SiJavascript, SiWebrtc, SiLinux, SiDocker, SiMapbox, SiReact, SiNestjs, SiNextdotjs, SiDotnet, SiFigma, SiAndroidstudio, SiTensorflow, SiFirebase, SiGooglecardboard, SiWebgl, SiPython, SiAssemblyscript, SiArduino, SiBlender, SiC, SiOpenai, SiClaude, SiEclipseide, SiGamedeveloper, SiGithubcopilot, SiIntellijidea, SiLatex, SiNotebooklm, SiOverleaf, SiPostman, SiSuno } from "react-icons/si";
import { TbBrandCSharp, TbAugmentedReality2, TbBrandMysql, TbSql, TbBoxModel2, TbCloudComputingFilled, TbBrandAdobePhotoshop, TbBrandAdobePremier } from "react-icons/tb"
import { BsHeadsetVr, BsStack } from "react-icons/bs";
import { DiVisualstudio, DiJava } from "react-icons/di";
import { PiMicrosoftWordLogoFill, PiMicrosoftPowerpointLogoFill, PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { LuBrainCircuit } from "react-icons/lu";
import { FaServer, FaMobileAlt, FaCode, FaNetworkWired, FaWindows, FaCloud } from "react-icons/fa";
import { CgSmartphoneChip } from "react-icons/cg";
import { MdViewQuilt } from "react-icons/md";
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
        id: "ai",
        title: "AI Tools"
    },
    {
        id: "protocol",
        title: "Protocols",
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
        icon: {
            type: "react",
            value: SiAssemblyscript
        },
        tags: ["language", "university"]
    },
    {
        id: "android",
        title: "Android",
        icon: {
            type: "react",
            value: SiAndroid
        },
        tags: ["platform", "personal", "university", "ccg"]
    },
    {
        id: "androidstudio",
        title: "Android Studio",
        icon: {
            type: "react",
            value: SiAndroidstudio
        },
        tags: ["featured", "tool", "personal", "university"]
    },
    {
        id: "ar",
        title: "Augmented Reality",
        icon: {
            type: "react",
            value: TbAugmentedReality2
        },
        tags: ["featured", "platform", "personal", "university", "ccg"]
    },
    {
        id: "arduino",
        title: "Arduino",
        icon: {
            type: "react",
            value: SiArduino
        },
        tags: ["platform", "university"]
    },
    {
        id: "arfoundation",
        title: "AR Foundation",
        icon: {
            type: "react",
            value: SiUnity
        },
        tags: ["framework", "personal", "university", "ccg"]
    },
    {
        id: "aspnet",
        title: "ASP.NET",
        icon: {
            type: "react",
            value: SiDotnet
        },
        tags: ["framework", "ccg"]
    },
    {
        id: "backend",
        title: "Backend",
        icon: {
            type: "react",
            value: FaServer
        },
        tags: ["featured", "domain", "personal", "university", "ccg"]
    },
    {
        id: "blender",
        title: "Blender",
        icon: {
            type: "react",
            value: SiBlender
        },
        tags: ["tool", "personal"]
    },
    {
        id: "cardboard",
        title: "Google Cardboard",
        icon: {
            type: "react",
            value: SiGooglecardboard
        },
        tags: ["platform", "personal", "university"]
    },
    {
        id: "chatgpt",
        title: "ChatGPT",
        icon: {
            type: "react",
            value: SiOpenai
        },
        tags: ["featured", "ai", "personal", "ccg"]
    },
    {
        id: "clang",
        title: "C",
        icon: {
            type: "react",
            value: SiC
        },
        tags: ["featured", "language", "university"]
    },
    {
        id: "claude",
        title: "Claude",
        icon: {
            type: "react",
            value: SiClaude
        },
        tags: ["ai", "personal"]
    },
    {
        id: "clipchamp",
        title: "Microsoft Clipchamp / Windows Movie Maker",
        icon: {
            type: "file",
            value: "clipchamp.png"
        },
        tags: ["tool", "personal", "middle_school", "high_school"]
    },
    {
        id: "corda",
        title: "Corda",
        icon: {
            type: "file",
            value: "corda.png"
        },
        tags: ["platform", "university"]
    },
    {
        id: "core",
        title: "CORE Emulator",
        icon: {
            type: "file",
            value: "core.png"
        },
        tags: ["tool", "university"]
    },
    {
        id: "csharp",
        title: "C#",
        icon: {
            type: "react",
            value: TbBrandCSharp
        },
        tags: ["featured", "language", "personal", "university", "ccg"]
    },
    {
        id: "deepseek",
        title: "DeepSeek",
        icon: {
            type: "file",
            value: "deepseek.svg"
        },
        tags: ["ai", "personal"]
    },
    {
        id: "docker",
        title: "Docker",
        icon: {
            type: "react",
            value: SiDocker
        },
        tags: ["tool", "university", "ccg"]
    },
    {
        id: "eclipse",
        title: "Eclipse",
        icon: {
            type: "react",
            value: SiEclipseide
        },
        tags: ["tool", "university"]
    },
    {
        id: "embedded",
        title: "Embedded Systems",
        icon: {
            type: "react",
            value: CgSmartphoneChip
        },
        tags: ["domain", "university"]
    },
    {
        id: "excel",
        title: "Microsoft Excel",
        icon: {
            type: "react",
            value: PiMicrosoftExcelLogoFill
        },
        tags: ["tool", "personal", "middle_school", "university", "ccg"]
    },
    {
        id: "figma",
        title: "Figma",
        icon: {
            type: "react",
            value: SiFigma
        },
        tags: ["tool", "ccg"]
    },
    {
        id: "firebase",
        title: "Firebase",
        icon: {
            type: "react",
            value: SiFirebase
        },
        tags: ["tool", "university", "ccg"]
    },
    {
        id: "frontend",
        title: "Frontend",
        icon: {
            type: "react",
            value: MdViewQuilt
        },
        tags: ["domain", "personal", "university", "ccg"]
    },
    {
        id: "fullstack",
        title: "Full Stack",
        icon: {
            type: "react",
            value: BsStack
        },
        tags: ["domain", "university", "ccg"]
    },
    {
        id: "gamedev",
        title: "Game Development",
        icon: {
            type: "react",
            value: SiGamedeveloper
        },
        tags: ["featured", "domain", "personal", "high_school", "university", "ccg"]
    },
    {
        id: "ghcopilot",
        title: "GitHub Copilot",
        icon: {
            type: "react",
            value: SiGithubcopilot
        },
        tags: ["featured", "ai", "personal"]
    },
    {
        id: "git",
        title: "Git",
        icon: {
            type: "react",
            value: SiGit
        },
        tags: ["tool", "personal", "university", "ccg"]
    },
    {
        id: "gusek",
        title: "GUSEK",
        icon: {
            type: "react",
            value: TbBoxModel2
        },
        tags: ["tool", "university"]
    },
    {
        id: "intellij",
        title: "IntelliJ IDEA",
        icon: {
            type: "react",
            value: SiIntellijidea
        },
        tags: ["tool", "university"]
    },
    {
        id: "iot",
        title: "Internet of Things",
        icon: {
            type: "react",
            value: TbCloudComputingFilled
        },
        tags: ["featured", "domain", "university"]
    },
    {
        id: "java",
        title: "Java",
        icon: {
            type: "react",
            value: DiJava 
        },
        tags: ["featured", "language", "personal", "university"]
    },
    {
        id: "js",
        title: "Javascript",
        icon: {
            type: "react",
            value: SiJavascript 
        },
        tags: ["featured", "language", "personal", "university", "ccg"]
    },
    {
        id: "latex",
        title: "LaTeX",
        icon: {
            type: "react",
            value: SiLatex 
        },
        tags: ["language", "personal", "university"]
    },
    {
        id: "linux",
        title: "Linux",
        icon: {
            type: "react",
            value: SiLinux 
        },
        tags: ["platform", "personal", "university", "ccg"]
    },
    {
        id: "mapbox",
        title: "Mapbox",
        icon: {
            type: "react",
            value: SiMapbox
        },
        tags: ["framework", "personal", "university"]
    },
    {
        id: "matlab",
        title: "MATLAB",
        icon: {
            type: "file",
            value: "matlab.svg"
        },
        tags: ["language", "university"]
    },
    {
        id: "mips",
        title: "MIPS Assembly",
        icon: {
            type: "react",
            value: SiAssemblyscript
        },
        tags: ["language", "university"]
    },
    {
        id: "ml",
        title: "Machine Learning",
        icon: {
            type: "react",
            value: LuBrainCircuit
        },
        tags: ["domain", "university", "ccg"]
    },
    {
        id: "mobile",
        title: "Mobile Development",
        icon: {
            type: "react",
            value: FaMobileAlt
        },
        tags: ["featured", "domain", "personal", "university", "ccg"]
    },
    {
        id: "mscopilot",
        title: "Microsoft Copilot",
        icon: {
            type: "file",
            value: "mscopilot.svg"
        },
        tags: ["ai", "personal", "ccg"]
    },
    {
        id: "msword",
        title: "Microsoft Word",
        icon: {
            type: "react",
            value: PiMicrosoftWordLogoFill
        },
        tags: ["tool", "personal", "middle_school", "high_school", "university", "ccg"]
    },
    {
        id: "mysql",
        title: "MySQL",
        icon: {
            type: "react",
            value: TbBrandMysql
        },
        tags: ["featured", "tool", "university", "ccg"]
    },
    {
        id: "nestjs",
        title: "NestJS",
        icon: {
            type: "react",
            value: SiNestjs
        },
        tags: ["framework", "ccg"]
    },
    {
        id: "networking",
        title: "Networking",
        icon: {
            type: "react",
            value: FaNetworkWired
        },
        tags: ["featured", "domain", "personal", "university", "ccg"]
    },
    {
        id: "nextjs",
        title: "Next.js",
        icon: {
            type: "react",
            value: SiNextdotjs
        },
        tags: ["framework", "ccg"]
    },
    {
        id: "nodejs",
        title: "Node.js",
        icon: {
            type: "react",
            value: SiNodedotjs
        },
        tags: ["featured", "framework", "personal", "university", "ccg"]
    },
    {
        id: "notebooklm",
        title: "NotebookLM",
        icon: {
            type: "react",
            value: SiNotebooklm
        },
        tags: ["ai", "personal"]
    },
    {
        id: "overleaf",
        title: "Overleaf",
        icon: {
            type: "react",
            value: SiOverleaf
        },
        tags: ["tool", "personal"]
    },
    {
        id: "pascal",
        title: "Pascal",
        icon: {
            type: "react",
            value: FaCode
        },
        tags: ["featured", "language", "high_school"]
    },
    {
        id: "photoshop",
        title: "Adobe Photoshop",
        icon: {
            type: "react",
            value: TbBrandAdobePhotoshop
        },
        tags: ["tool", "personal", "high_school"]
    },
    {
        id: "postman",
        title: "Postman",
        icon: {
            type: "react",
            value: SiPostman
        },
        tags: ["tool", "university", "ccg"]
    },
    {
        id: "powerpnt",
        title: "Microsoft PowerPoint",
        icon: {
            type: "react",
            value: PiMicrosoftPowerpointLogoFill
        },
        tags: ["tool", "personal", "middle_school", "high_school", "university", "ccg"]
    },
    {
        id: "premiere",
        title: "Adobe Premiere Pro",
        icon: {
            type: "react",
            value: TbBrandAdobePremier
        },
        tags: ["tool", "high_school"]
    },
    {
        id: "python",
        title: "Python",
        icon: {
            type: "react",
            value: SiPython
        },
        tags: ["featured", "language", "personal", "university"]
    },
    {
        id: "reactjs",
        title: "React.js",
        icon: {
            type: "react",
            value: SiReact
        },
        tags: ["framework", "personal", "university"]
    },
    {
        id: "snmp",
        title: "SNMP",
        icon: {
            type: "react",
            value: FaNetworkWired
        },
        tags: ["protocol", "university"]
    },
    {
        id: "sql",
        title: "SQL",
        icon: {
            type: "react",
            value: TbSql
        },
        tags: ["featured", "language", "university", "ccg"]
    },
    {
        id: "suno",
        title: "Suno",
        icon: {
            type: "react",
            value: SiSuno
        },
        tags: ["ai", "personal"]
    },
    {
        id: "tensorflow",
        title: "TensorFlow",
        icon: {
            type: "react",
            value: SiTensorflow
        },
        tags: ["tool", "personal", "university"]
    },
    {
        id: "unity",
        title: "Unity",
        icon: {
            type: "react",
            value: SiUnity
        },
        tags: ["featured", "framework", "personal", "university", "ccg"]
    },
    {
        id: "uwp",
        title: "Universal Windows Platform (UWP)",
        icon: {
            type: "react",
            value: FaWindows
        },
        tags: ["platform", "ccg"]
    },
    {
        id: "vbasic",
        title: "Visual Basic",
        icon: {
            type: "react",
            value: DiVisualstudio
        },
        tags: ["language", "high_school"]
    },
    {
        id: "viroo",
        title: "VIROO Studio",
        icon: {
            type: "file",
            value: "viroo.svg"
        },
        tags: ["tool", "ccg"]
    },
    {
        id: "vr",
        title: "Virtual Reality",
        icon: {
            type: "react",
            value: BsHeadsetVr
        },
        tags: ["featured", "platform", "personal", "high_school", "university", "ccg"]
    },
    {
        id: "vscode",
        title: "Visual Studio Code",
        icon: {
            type: "react",
            value: VscVscode
        },
        tags: ["tool", "personal", "university", "ccg"]
    },
    {
        id: "vstudio",
        title: "Visual Studio",
        icon: {
            type: "react",
            value: DiVisualstudio
        },
        tags: ["tool", "personal", "ccg"]
    },
    {
        id: "vuforia",
        title: "Vuforia",
        icon: {
            type: "react",
            value: TbAugmentedReality2
        },
        tags: ["framework", "university"]
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
        icon: {
            type: "react",
            value: SiWebgl
        },
        tags: ["framework", "ccg"]
    },
    {
        id: "webrtc",
        title: "WebRTC",
        icon: {
            type: "react",
            value: SiWebrtc
        },
        tags: ["featured", "protocol", "ccg"]
    },
    {
        id: "websocket",
        title: "WebSocket",
        icon: {
            type: "file",
            value: "websocket.svg"
        },
        tags: ["featured", "protocol", "ccg"]
    },
    {
        id: "windows",
        title: "Windows",
        icon: {
            type: "react",
            value: FaWindows
        },
        tags: ["platform", "personal", "high_school", "university", "ccg"]
    },
    {
        id: "xr",
        title: "Extended Reality",
        icon: {
            type: "react",
            value: BsHeadsetVr
        },
        tags: ["featured", "domain", "personal", "university", "ccg"]
    },
    {
        id: "xritk",
        title: "XR Interaction Toolkit",
        icon: {
            type: "react",
            value: SiUnity
        },
        tags: ["framework", "ccg"]
    }
]