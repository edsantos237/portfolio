import { IoLocationSharp } from "react-icons/io5";

export const companies = [
    {
        id: "ccg",
        title: "CCG/ZGDV Institute",
        icon: "ccg.svg",
        // label: (optional)
        department: "CVIG-CG - Computer Vision, Interaction and Graphics - Computer Graphics",
        description: [
            {
                type: "button",
                icon: "ccg.svg",
                label: "Website",
                link: "https://ccg.pt/en"
            },
            {
                type: "button",
                icon: "ccg.svg",
                label: "CVIG",
                link: "https://ccg.pt/en/research-and-innovation/ri-departments/computer-vision-interaction-and-graphics"
            },
            {
                type: "button",
                icon: IoLocationSharp,
                label: "Universidade do Minho, Guimarães",
                link: "https://maps.app.goo.gl/5Pnj7W8nLfpWHGXXA"
            }
        ],
        roles: [
            {
                title: "Technical Project Coordinator",
                date: {
                    start: "2025-01",
                    end: "2026-07"
                },
                description: [
                    "Project:",
                    {
                        type: "button",
                        icon: "ecp.png",
                        label: "ECP - Ecoceramics and Crystalware of Portugal",
                        link: {
                            type: "projects",
                            entry: "ecp",
                        }
                    }
                ]
            },
            {
                title: "Development Technician / Assistant Researcher",
                date: {
                    start: "2021-10",
                    end: null
                },
                description: [
                    "Development in Unity/C# of Mixed Reality remote assistance systems, 3D scene configurators/back-offices, Augmented Reality mobile apps, gamified Virtual Reality apps and backend services in Node.js."
                ]
            },
            {
                title: "Research Grant",
                date: {
                    start: "2021-05",
                    end: "2021-09"
                },
                description: [
                    "Development in Unity/C# of Mixed Reality remote assistance systems, 3D scene configurators/back-offices and backend services in Node.js."
                ]
            }
        ]
    }
]