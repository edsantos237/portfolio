import { IoLogoGithub } from "react-icons/io5";

export const projects = [
    {
        id: "xrgrit",
        title: "XR-GRIT - Gamified XR Platform for Robotics Instruction and Training Consulte",
        tags: ["featured", "ccg", "csharp", "gamedev", "unity", "viroo", "vr", "xr", "xritk"],
        date: {
            start: "2025-09",
            end: null
        },
        summary: "VR training course for robotics learning.",
        description: [
            {
                type: "image",
                path: "xrgrit.jpg"
            },
            "XR-GRIT is a Virtual Reality (VR) platform that redefines robotics training through immersive simulation and structured gamification.",
            "The system enables learners to perform realistic robotic operations such as pick-and-place, machine tending, and safety procedures, all within a fully virtual environment that replicates industrial conditions safely and accurately. Building on this foundation, we propose a framework that begins with a structured understanding of the educational content and evolves toward a gamified VR narrative designed to enhance immersion and the overall learning experience.",
            "At its core, XR-GRIT integrates narrative-driven missions, progress-tracking mechanics, and visual metaphors representing achievement and advancement.",
            "Trainees are guided by an avatar facilitator, who introduces objectives, demonstrates procedures, and provides feedback throughout the modules, ensuring an intuitive, instructor-like learning flow.",
            "By merging immersive training and game design, XR-GRIT provides a pathway for workforce upskilling and digital transformation in sectors with low technological maturity — particularly ceramics, glass, and stone — aligning with the Industry 5.0 vision of human-centric, adaptive automation.",
            "<b>My contributions:</b>",
            "• Integration into the VIROO platform.",
            "• Development of the environment, interactions, gamification mechanics and tutor timelines.",
            "• Integration of teaching content (3D models, animations, videos, images, audio and exercises).",
            "• Partners: <b>CCG</b>, <b><a href=\"https://www.ctcv.pt/\">CTCV</a></b>",
            {
                type: "youtube",
                link: "https://www.youtube.com/embed/2RsYF83Yetk"
            },
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "ccg.svg"
                },
                label: "Project website",
                link: "https://www.ccg.pt/en/research-and-innovation/projects/xr-grit"
            },
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "master.png"
                },
                label: "Open Call website | Master",
                link: "https://www.master-xr.eu/oc-project/xr-grit/"
            }
        ]
    },
    {
        id: "nyxium",
        title: "Nyxium",
        tags: ["featured", "personal", "android", "csharp", "mobile", "unity"],
        date: {
            start: "2025-08",
            end: null
        },
        summary: {
            type: "image",
            path: "nyxium_horiz.jpg"
        },
        description: [
            {
                type: "image",
                path: "nyxium_horiz.jpg"
            },
            {
                type: "image",
                path: "nyxium_astrol.jpg"
            },
            "Mobile app with clock and compass to display the orientation of celestial bodies, with astronomy and astrology (with birth chart) modes."
        ]
    },
    {
        id: "texpact",
        title: "TEXP@CT - Innovation Pact for the Digitalization of Textiles and Clothing",
        tags: ["ccg", "android", "ar", "backend", "csharp", "js", "mobile", "networking", "nodejs", "unity", "webrtc", "websocket", "xr"],
        date: {
            start: "2024-09",
            end: null
        },
        summary: "Remote Assistance system using AR for the textile and clothing industry.",
        description: [
            "WP6 - Digital Product | PPS22: T&C Product Lifecycle Management 4.0",            
            "My contributions:",
            "• Remote Assistance system for video and audio communication through WebRTC between a remote expert on a desktop device and a clothes technician equipped with Magic Leap 2.",
            {
                type: "youtube",
                link: "https://www.youtube.com/embed/G0DyT4qO1CI"
            },
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "ccg.svg"
                },
                label: "Project website",
                link: "https://ccg.pt/en/research-and-innovation/projects/texpct-innovation-pact-for-the-digitalization-of-textiles-and-clothing"
            },
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "texpact.png"
                },
                label: "Project website",
                link: "https://texpact.pt/"
            },
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "texpact.png"
                },
                label: "PPS22 website",
                link: "https://texpact.pt/solucoes/artigos___solucoes/pps22__t_c_product_lifecycle_management_4_0-e7a21c3f"
            }
        ]
    },
    {
        id: "ecp",
        title: "ECP - Ecoceramics and Crystalware of Portugal",
        tags: ["featured", "ccg", "android", "ar", "arfoundation", "backend", "csharp", "js", "mobile", "networking", "nodejs", "unity", "windows", "xr"],
        date: {
            start: "2023-12",
            end: null
        },
        summary: "Digital Training Academy with virtual and immersive learning methods for continuous and advanced worker training.",
        description: [
            "WP7: Digital Training Academy with virtual and immersive learning methods for continuous and advanced worker training.",
            "Role: Technical Project Coordinatorn",
            "My contributions:",
            "• TCA - Training Configuration System - desktop app for trainers to build immersive scenes composed with 3D objects with customizable properties, interactions and animations, following a set of steps.",
            "• ARTA - Augmented Reality Training System - mobile app for trainees to load created training scenes to be performed in augmented reality.",
            "• TSIS - Training Session Information System - back-end system to store training info and provide it to the apps through a REST API.",
            {
                type: "youtube",
                link: "https://www.youtube.com/embed/YqAKVt1mczU"
            },
            {
                type: "youtube",
                link: "https://www.youtube.com/embed/mY7fUsA-E1s"
            },
            "Partners: CCG, CTCV, FCUP",
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "ccg.svg"
                },
                label: "Project website",
                link: "https://ccg.pt/en/research-and-innovation/projects/ecp-ecoceramics-and-crystalware-of-portugal"
            },
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "ecp.png"
                },
                label: "Project website",
                link: "https://agendaecp.pt/en"
            }
        ]
    },
    {
        id: "hfpt",
        title: "HfPT - Health from Portugal",
        tags: ["featured", "ccg", "android", "ar", "arfoundation", "backend", "csharp", "js", "mobile", "networking", "nodejs", "unity", "webgl", "webrtc", "websocket", "windows", "xr"],
        date: {
            start: "2023-10",
            end: null
        },
        summary: "Remote monitoring and telemedicine system for healthcare, and a set of interactive applications for histopathological anatomy learning.",
        description: [
            "WP3 - Sensorization and Robotics | A3.2.3: Development of devices for remote monitoring and physical recovery, based on gamification (Gripwise) - digital games mobile application",
            "My contributions:",
            "• Video call module through WebRTC between a remote doctor and the patient using the Gripwise app.",
            "WP5 - Digital Consultation/Telemedicine | 5.3.4: Augmented Reality system for visualizing processed slide data:",
            "System of applications towards FMUC's Histologic Anatomy Museum.",
            "My contributions:",
            "• AR mobile app for visitors to have access to additional info and digital twins of exposed or pieces.",
            "• Desktop app for students to simulate laboratory classes with laboratory tools and fully customizable.",
            "Partners: CCG, BMD, FMUC, CeNTI",
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "ccg.svg"
                },
                label: "Project website",
                link: "https://ccg.pt/en/research-and-innovation/projects/hfpt-health-from-portugal"
            },
        ]
    },
    {
        id: "skyscanner",
        title: "Sky Scanner",
        tags: ["personal", "mobile", "android", "csharp", "mapbox", "unity"],
        date: {
            start: "2025-03",
            end: "2025-03"
        },
        summary: {
            type: "image",
            path: "skyscanner_cover.png"
        },
        description: [
            "Mobile app in development to track airplanes in 3D and eventually satellites. Currently in standby.",
            {
                type: "image",
                path: "skyscanner.png"
            }
        ]
    },
    {
        id: "openlabs",
        title: "OpenLabs - Open Pilot Labs Network",
        tags: ["ccg", "backend", "csharp", "js", "linux", "ml", "networking", "nodejs", "unity", "webrtc", "websocket"],
        date: {
            start: "2024-06",
            end: "2024-07"
        },
        summary: "Demonstrative app to display in real-time a digital twin of a given environment (CCG's building) along with a mobile robot and a set of detection cameras.",
        description: [
            "Demonstrative app to display in real-time a digital twin of a given environment (CCG's building) along with a mobile robot and a set of detection cameras.",
            "My contributions:",
            "• Scene configuration and display UI.",
            "• Communication system through WebRTC to retrieve robot coordinates and coordinates of detected people to be displayed.",
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "ccg.svg"
                },
                label: "Project website",
                link: "https://ccg.pt/en/research-and-innovation/projects/openlabs-open-pilot-labs-network"
            },
        ]
    },
    {
        id: "solarsystem",
        title: "SolAR System",
        tags: ["ccg", "android", "ar", "arfoundation", "csharp", "mobile", "xr", "unity"],
        date: {
            start: "2024-07",
            end: "2024-07"
        },
        summary: "Unity project to view and interact with the Solar System in AR.",
        description: [
            "AR and 3D modeling training course for CCG's Tech Training Hub where users develop a Unity project to view and interact with the Solar System in Augmented Reality.",
            "My contributions:",
            "• Unity and AR Foundation project/tutorial.",
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "ccg.svg"
                },
                label: "Tech Training Hub",
                link: "https://tthub.ccg.pt/"
            },
        ]
    },
    {
        id: "cmms",
        title: "Cognitive CMMS - Cognitive Computerized Maintenance Management System",
        tags: ["ccg", "arfoundation", "android", "ar", "backend", "csharp", "firebase", "js", "mobile", "networking", "nodejs", "webgl", "webrtc", "websocket", "xr"],
        date: {
            start: "2021-06",
            end: "2023-06"
        },
        summary: "Mobile app to list and display assets info and tasks on a given location with indoor navigation system.",
        description: [
            "Mobile app to list and display assets info and tasks on a given location with indoor navigation system.",
            "My contributions:",
            "• Mobile app development.",
            "• Remote Assistance expert desktop app for video and audio communication with file and annotations exchange through WebRTC with technicians equipped with HoloLens 1.0.",
            "Partners: CCG, Cegid, UMinho",
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "ccg.svg"
                },
                label: "Project website",
                link: "https://www.ccg.pt/en/research-and-innovation/projects/cognitive-cmms-cognitive-computerized-maintenance-management-system"
            },
        ]
    },
    {
        id: "i2am",
        title: "I2AM: Intelligent Immersive Aircraft Modification",
        tags: ["ccg", "ar", "backend", "csharp", "js", "networking", "nodejs", "unity", "webrtc", "websocket", "windows", "xr"],
        date: {
            start: "2022-03",
            end: "2023-08"
        },
        summary: "Remote Assistance system for aviation inspection in AR.",
        description: [
            "Solution based on augmented reality for remote assistance centered on aviation maintenance operations (borescope inspection) and with holographic visualization of information (from the worker on-site to the remote inspector)",
            "My contributions:",
            "• Remote Assistance expert desktop app for video and audio communication with file and annotations exchange through WebRTC with aviation inspectors equipped with HoloLens 2.0.",
            "Partners: CCG, Aeromec",
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "ccg.svg"
                },
                label: "Project website",
                link: "https://www.ccg.pt/en/research-and-innovation/projects/i2am-intelligent-immersive-aircraft-modification"
            },
        ]
    },
    {
        id: "admin",
        title: "ADM.IN: Advanced Decision Making IN Productive Systems Through Intelligent Networks",
        tags: ["featured", "ccg", "ar", "backend", "csharp", "js", "networking", "nodejs", "unity", "webrtc", "websocket", "windows", "xr"],
        date: {
            start: "2022-09",
            end: "2023-07"
        },
        summary: "Maintenance Configurator and Remote Assistance system for maintenance operations in AR.",
        description: [
            "Development of a knowledge management architecture and framework for the integration of Augmented Reality and Mixed Reality, oriented towards knowledge of the maintenance and monitoring process through indicators applied in some critical maintenance activities.",
            "My contributions:",
            "• Maintenance Configurator - desktop app to display a digital twin of a given machine and customize a set of telemetries, diagnosis tree and intervention steps.",
            "• Remote Assistance - expert desktop app for video and audio communication with file and annotations exchange through WebRTC with technicians equipped with HoloLens 2.0.",
            "Partners: CCG, Sonae Arauco",
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "ccg.svg"
                },
                label: "Project website",
                link: "https://www.ccg.pt/en/research-and-innovation/projects/admin-advanced-decision-making-in-productive-systems-through-intelligent-networks"
            },
        ]
    },
    {
        id: "tsim",
        title: "TSIM - Test System Intelligent Machines",
        tags: ["ccg", "backend", "ar", "aspnet", "csharp", "frontend", "js", "nestjs", "networking", "nextjs", "nodejs", "unity", "webrtc", "websocket", "windows", "xr"],
        date: {
            start: "2021-05",
            end: "2023-10"
        },
        summary: "Auto diagnosis and validation system, with maintenance step-by-step holographic indications and remote assistance support.",
        description: [
            "Auto diagnosis and validation system, with maintenance step-by-step holographic indications and remote assistance support for HoloLens equipped by a technician performing operations on a machine.",
            "My contributions:",
            "• Back-office app:",
            "- Authentication module - WebSocket connection handler and HTTP REST endpoints access;",
            "- Designer module - content files manager, machine 3D model instantiation, content files instantiation for maintenance steps;",
            "- Remote Assistance module - contacts management, WebRTC P2P call management (video and audio) with annotations and content files exchange, and sessions log management.",
            "• Backend servers:",
            "- Authentication module - WebSocket server, HTTP REST endpoints, and users database;",
            "- Designer module - content files HTTP REST endpoints;",
            "- Remote Assistance module - sessions log HTTP REST endpoints and database.",
            "Partners: CCG, Controlar, UMinho",
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "controlar.svg"
                },
                label: "Project website",
                link: "https://controlar.com/en/business-units/test-systems/tsim/"
            },
        ]
    },
    {
        id: "dissertation",
        title: "Augmented Reality System with Gamification for Education",
        grade: {
            value: 19,
            range: 20
        },
        tags: ["featured", "university", "android", "ar", "arfoundation", "backend", "csharp", "frontend", "fullstack", "gamedev", "js", "mapbox", "mobile", "mysql", "networking", "nodejs", "reactjs", "sql", "unity", "xr"],
        date: {
            start: "2020-09",
            end: "2022-03"
        },
        summary: "Master's Dissertation",
        description: [
            "• Original title (PT): \"Sistema de Realidade Aumentada com Gamificação para o Ensino\"",
            "• Curricular unit: Dissertation in Telecommunications and Informatics Engineering (5th year)",
            {
                type: "pdf",
                path: "Dissertation-a82350.pdf"
            }
        ]
    },
    {
        id: "fof",
        title: "Factory of the Future: Smart Manufacturing / P51 - Training for operators with new methodologies",
        tags: ["featured", "ccg", "ar", "backend", "csharp", "mysql", "sql", "unity", "webgl", "vr", "xr"],
        date: {
            start: "2021-08",
            end: "2022-01"
        },
        summary: "Gamified training and evaluation system for machine operations in VR and AR.",
        description: [
            "Gamified training and evaluation system for machine operations in VR and AR (HoloLens).",
            "My contributions:",
            "• Task Configurator - flowchart designer to define each task's flow through steps and conditions, and respective precedences and awarded points.",
            "• XR Configurator - back-office app to assign interactions (VR only) and 3D annotations (VR and AR) using a QR code marker as reference point for each step and machine components, to be displayed in the VR and AR player apps.",
            "Partners: CCG, Bosch, UMinho",
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "uminho.jpg"
                },
                label: "Project website",
                link: "https://www.eng.uminho.pt/en/researchinnovate/projectsinindustry/Pages/projetoFactoryFuture.aspx"
            },
        ]
    },
    {
        id: "voice_transcription",
        title: "Voice Transcription app",
        tags: ["personal", "android", "androidstudio", "mobile", "java"],
        date: {
            start: "2021-07",
            end: "2021-07"
        },
        summary: "Voice Transcription mobile app shared with my family so they can communicate with its deaf members.",
        description: [
            "Voice Transcription mobile app shared with my family so they can communicate with its deaf members."
        ]
    },
    {
        id: "rva_1",
        title: "VRollercoastAR",
        grade: {
            value: 19,
            range: 20
        },
        tags: ["featured", "university", "android", "ar", "cardboard", "csharp", "mobile", "sql", "unity", "vuforia", "vr", "xr"],
        date: {
            start: "2020-09",
            end: "2021-02"
        },
        description: [
            "• Curricular unit: Virtual and Augmented Reality (5th year)"
        ]
    },
    {
        id: "su_1",
        title: "Detection of bike riding events with a mobile phone",
        grade: {
            value: 18.53,
            range: 20
        },
        tags: ["featured", "university", "android", "androidstudio", "firebase", "java", "ml", "mobile", "python", "tensorflow"],
        date: {
            start: "2020-09",
            end: "2021-01"
        },
        description: [
            "• Curricular unit: Ubiquitous Systems (5th year)",
            {
                type: "button",
                label: "GitHub",
                icon: {
                    type: "react",
                    value: IoLogoGithub
                },
                link: "https://github.com/edsantos237/BikeMonitor"
            }
        ]
    },
    {
        id: "edshot",
        title: "edShot",
        tags: ["personal", "backend", "android", "androidstudio", "ar", "gamedev", "java", "mobile", "networking", "tensorflow", "xr"],
        date: {
            start: "2019-07",
            end: "2020-09"
        },
        summary: "Mobile AR multiplayer laser tag game.",
        description: [
            "Unfinished project that consists on a mobile AR multiplayer laser tag game."
        ]
    },
    {
        id: "tsm_2",
        title: "PCM Audio Distribution",
        grade: {
            value: 17.0,
            range: 20
        },
        tags: ["university", "backend", "java", "linux", "networking"],
        date: {
            start: "2020-05",
            end: "2020-07"
        },
        description: [
            "• Curricular unit: Multimedia Technologies and Services (4th year)"
        ]
    },
    {
        id: "tsm_1",
        title: "Shannon-Fano and LZW file compressor",
        grade: {
            value: 19.0,
            range: 20
        },
        tags: ["university", "clang", "linux"],
        date: {
            start: "2020-02",
            end: "2020-07"
        },
        description: [
            "• Curricular unit: Multimedia Technologies and Services (4th year)"
        ]
    },
    {
        id: "pti2_1",
        title: "Corporative messaging and alerting services for vehicular networks",
        grade: {
            value: 19,
            range: 20
        },
        tags: ["featured", "university", "backend", "core", "iot", "java", "linux", "mysql", "networking", "python", "sql"],
        date: {
            start: "2020-02",
            end: "2020-06"
        },
        description: [
            "• Original title (PT): \"Serviços corporativos de mensagens e alertas para redes veiculares\"",
            "• Curricular unit: Project of Telecommunications and Informatics II (4th year)"
        ]
    },
    {
        id: "rm_1",
        title: "E-Scudo - Mobile application to carry out criptocurrency transactions",
        grade: {
            value: 18,
            range: 20
        },
        tags: ["featured", "university", "corda", "java"],
        date: {
            start: "2020-03",
            end: "2020-06"
        },
        description: [
            "• Original title (PT): \"E-Scudo - Aplcação móvel para efetuar transações em criptomoedas\"",
            "• Curricular unit: Mobile Networks (4th year)",
            "Participated in the 1st edition of INNCYBER Innovation Award (2019/2020).",
            {
                type: "pdf",
                path: "Certificado de Participação-José Eduardo da Silva Santos.pdf"
            }
        ]
    },
    {
        id: "gr_1",
        title: "Monitoring tool",
        grade: {
            value: 15.0,
            range: 20
        },
        tags: ["university", "backend", "frontend", "java", "js", "linux", "networking", "nodejs", "reactjs", "snmp"],
        date: {
            start: "2019-11",
            end: "2020-02"
        },
        description: [
            "• Original title (PT): \"Ferramenta de monitorização\"",
            "• Curricular unit: Network Management (4th year)"
        ]
    },
    {
        id: "gr_2",
        title: "Music server with SNMP interface",
        grade: {
            value: 15.0,
            range: 20
        },
        tags: ["university", "backend", "java", "linux", "networking", "snmp"],
        date: {
            start: "2020-01",
            end: "2020-02"
        },
        description: [
            "• Original title (PT): \"Servidor musical com interface SNMP\"",
            "• Curricular unit: Network Management (4th year)"
        ]
    },
    {
        id: "carrilhoinator",
        title: "Carrilhoinator",
        tags: ["personal", "android", "androidstudio", "java", "js", "mobile", "nodejs"],
        date: {
            start: "2019-12",
            end: "2019-12"
        },
        summary: "Mobile app that plays random audioclips that were sent from a friend over four years across group chats.",
        description: [
            "Mobile app that plays random audioclips that were sent from a friend over four years across group chats."
        ]
    },
    {
        id: "pti1_1",
        title: "Colaborative sensing-based traffic monitoring services",
        grade: {
            value: 18,
            range: 20
        },
        tags: ["featured", "university", "android", "androidstudio", "clang", "backend", "iot", "java", "js", "linux", "mobile", "mysql", "networking", "sql"],
        date: {
            start: "2019-09",
            end: "2020-01"
        },
        description: [
            "• Original title (PT): \"Serviços de monitorização de tráfego baseado em collaborative sensing\"",
            "• Curricular unit: Project of Telecommunications and Informatics I (4th year)",
            {
                type: "button",
                label: "GitHub",
                icon: {
                    type: "react",
                    value: IoLogoGithub
                },
                link: "https://github.com/edsantos237/PTI1Project"
            }
        ]
    },
    {
        id: "sco_1",
        title: "Communication between two devices using laser and through air",
        grade: {
            value: 14,
            range: 20
        },
        tags: ["university", "arduino", "embedded"],
        date: {
            start: "2019-10",
            end: "2020-01"
        },
        description: [
            "• Curricular unit: Optical Communications Systems (4th year)"
        ]
    },
    {
        id: "cripto_1",
        title: "Server/client communication system with encryption and certificates",
        grade: {
            value: 16.0,
            range: 20
        },
        tags: ["university", "linux", "python"],
        date: {
            start: "2019-09",
            end: "2020-01"
        },
        description: [
            "• Curricular unit: Cryptography (4th year)"
        ]
    },
    {
        id: "sd_1",
        title: "Chat server",
        grade: {
            value: 18,
            range: 20
        },
        tags: ["university", "backend", "java", "linux", "networking"],
        date: {
            start: "2019-05",
            end: "2019-06"
        },
        description: [
            "• Original title (PT): \"Servidor de chat\"",
            "• Curricular unit: Distributed Systems (3rd year)"
        ]
    },
    {
        id: "pds_1",
        title: "Electrocardiogram signal",
        tags: ["university", "matlab"],
        date: {
            start: "2019-05",
            end: "2019-06"
        },
        description: [
            "• Original title (PT): \"Sinal de electrocardiograma\"",
            "• Curricular unit: Digital Signal Processing (3rd year)"
        ]
    },
    {
        id: "rc2_1",
        title: "IPv4 packet forwarding router",
        grade: {
            value: 17.75,
            range: 20
        },
        tags: ["university", "core", "java", "networking"],
        date: {
            start: "2019-04",
            end: "2019-06"
        },
        description: [
            "• Curricular unit: Computer Networks II (3rd year)"
        ]
    },
    {
        id: "lti2_1",
        title: "Physical activity monitoring system",
        grade: {
            value: 17.69,
            range: 20
        },
        tags: ["featured", "university", "arduino", "backend", "clang", "embedded", "iot", "linux", "mysql", "networking", "sql"],
        date: {
            start: "2019-02",
            end: "2019-06"
        },
        description: [
            "• Original title (PT): \"Sistema de monitorização de atividade física\"",
            "• Curricular unit: Laboratories of Telecommunications and Informatics II (3rd year)"
        ]
    },
    {
        id: "lti1_1",
        title: "Chatting Application",
        grade: {
            value: 16,
            range: 20
        },
        tags: ["university", "arduino", "embedded", "java", "networking"],
        date: {
            start: "2018-09",
            end: "2019-01"
        },
        description: [
            "• Original title (PT): \"Aplicação de Conversação\"",
            "• Curricular unit: Laboratories of Telecommunications and Informatics I (3rd year)"
        ]
    },
    {
        id: "so_1",
        title: "Scheduled Execution of Program Sets",
        grade: {
            value: 14.0,
            range: 20
        },
        tags: ["university", "clang", "linux"],
        date: {
            start: "2018-11",
            end: "2019-01"
        },
        description: [
            "• Original title (PT): \"Execução Agendada de Conjuntos de Programas\"",
            "• Curricular unit: Operating Systems (3rd year)"
        ]
    },
    {
        id: "rc1_1",
        title: "Simulation of Ethernet LANs and TCP/IP networks using CORE",
        grade: {
            value: 14.0,
            range: 20
        },
        tags: ["university", "core", "networking"],
        date: {
            start: "2018-11",
            end: "2019-01"
        },
        description: [
            "• Original title (PT): \"Simulação de LANs Ethernet e redes TCP/IP usando o CORE\"",
            "• Curricular unit: Computer Networks I (3rd year)"
        ]
    },
    {
        id: "eletro2_1",
        title: "PCBs Project",
        tags: ["university"],
        date: {
            start: "2018-06",
            end: "2018-06"
        },
        description: [
            "• Original title (PT): \"Projeto de PCBs\"",
            "• Curricular unit: Electronics II (2nd year)"
        ]
    },
    {
        id: "io_2",
        title: "Pallet Warehouse",
        grade: {
            value: 67,
            range: 100
        },
        tags: ["university", "gusek"],
        date: {
            start: "2018-05",
            end: "2018-06"
        },
        summary: "Project to optimize storage of pallets in a warehouse.",
        description: [
            "• Original title (PT): \"Armazém de Paletes\"",
            "• Curricular unit: Operations Research (2nd year)",
            "Project to optimize storage of pallets in a warehouse."
        ]
    },
    {
        id: "pp2_1",
        title: "Smart Health Control",
        grade: {
            value: 13,
            range: 20
        },
        tags: ["featured", "university", "android", "androidstudio", "mobile"],
        date: {
            start: "2018-02",
            end: "2018-06"
        },
        summary: "Mobile app to monitor user's health.",
        description: [
            "• Curricular unit: Programming Paradigms II (2nd year)",
            "Mobile app to monitor user's health through a set of features:",
            "• Steps counter and distance measuring - using accelerometer, gyroscope and GPS.",
            "• Heart rate measure - using the device's camera and flashlight covered with the user's finger.",
            "• Calories monitoring - through user's manual input."
        ]
    },
    {
        id: "io_1",
        title: "Scientific article research - \"Resolution of an Antenna-Satellite assignment problem by means of Integer Linear Programming\"",
        grade: {
            value: 62,
            range: 100
        },
        tags: ["university"],
        date: {
            start: "2018-04",
            end: "2018-05"
        },
        summary: "Research and presentation of existing scientific article related to resources optimization.",
        description: [
            "• Curricular unit: Operations Research (2nd year)",
            "Research and presentation of existing scientific article related to resources optimization.",
            {
                type: "button",
                label: "ScienceDirect",
                link: "https://www.sciencedirect.com/science/article/abs/pii/S1270963814001096"
            }
        ]
    },
    {
        id: "pp1_1",
        title: "Long term park management",
        grade: {
            value: 13,
            range: 20
        },
        tags: ["university", "java"],
        date: {
            start: "2017-11",
            end: "2018-01"
        },
        summary: "Java program to manage parking at a hotel.",
        description: [
            "• Original title (PT): \"Gestão de Parques de longa duração\"",
            "• Curricular unit: Programming Paradigms I (2nd year)",
            "Java program to manage parking at a hotel."
        ]
    },
    {
        id: "mp2_3",
        title: "The QUIZZER",
        grade: {
            value: 16,
            range: 20
        },
        tags: ["featured", "university", "clang", "gamedev", "latex", "linux"],
        date: {
            start: "2017-05",
            end: "2017-06"
        },
        summary: "Quiz fighter game in C where the player must answer questions to defeat themed characters.",
        description: [
            "• Curricular unit: Programming Methods II (1st year)",
            "Quiz fighter game in C where the player must answer questions to defeat themed characters.",
            {
                type: "youtube",
                link: "https://www.youtube.com/embed/djG5STzFkOQ"
            },
            {
                type: "youtube",
                link: "https://www.youtube.com/embed/g6_N_XRKgoQ"
            }
        ]
    },
    {
        id: "mp2_2",
        title: "Pointers and Linked Lists",
        grade: {
            value: 16,
            range: 20
        },
        tags: ["university", "clang", "latex", "linux"],
        date: {
            start: "2017-03",
            end: "2017-04"
        },
        summary: "C program to read and store files content and store it in linked lists.",
        description: [
            "• Original title (PT): \"Pointers e Listas Ligadas\"",
            "• Curricular unit: Programming Methods II (1st year)",
            "C program to read and store files content and store it in linked lists."
        ]
    },
    {
        id: "mp2_1",
        title: "Arrays, Structs, Files",
        grade: {
            value: 15,
            range: 20
        },
        tags: ["university", "clang", "latex", "linux"],
        date: {
            start: "2017-02",
            end: "2017-03"
        },
        summary: "C program to read and store files content and store it in arrays of structs.",
        description: [
            "• Curricular unit: Programming Methods II (1st year)",
            "C program to read and store files content and store it in arrays of structs."
        ]
    },
    {
        id: "mp2_1",
        title: "Morse dictionary decoder",
        grade: {
            value: 13,
            range: 20
        },
        tags: ["university", "clang"],
        date: {
            start: "2016-11",
            end: "2017-01"
        },
        summary: "Morse code decoder that translates an input into a list of every possible set of words from a dictionary.",
        description: [
            "• Curricular unit: Programming Methods I (1st year)",
            "Decoder app where, upon inputting a Morse code, the app would decode it into a list of every possible set of words that would be translated from that code. Such words would have to be previously added to a dictionary with each one's Morse code conversion."
        ]
    },
    {
        id: "apib_1",
        title: "Tic Tac Torchic",
        tags: ["high_school", "gamedev", "vbasic", "windows"],
        date: {
            start: "2016-04",
            end: "2016-05"
        },
        summary: {
            type: "image",
            path: "tictactorchic.png"
        },
        description: [
            "• Subject: Computer Applications B (12th grade)",
            "Tic Tac Toe game based on Pokémon battling, where both players would peak one of six Pokémon and battle each other as if a completed row would invoke one of the Pokémon moves and deal damage according to each other's stats, until someone would run out of HP.",
            {
                type: "image",
                path: "tictactorchic.png"
            }
        ]
    }
];