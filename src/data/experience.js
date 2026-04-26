export const companies = [
    {
        id: "ccg",
        title: "CCG/ZGDV Institute",
        icon: {
            type: "file",
            value: "ccg.svg"
        },
        department: "CVIG-CG - Computer Vision, Interaction and Graphics - Computer Graphics",
        description: [
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "ccg.svg"
                },
                label: "Website",
                link: "https://ccg.pt/en"
            },
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "ccg.svg"
                },
                label: "CVIG",
                link: "https://ccg.pt/en/research-and-innovation/ri-departments/computer-vision-interaction-and-graphics"
            }
        ],
        roles: [
            {
                title: "Technical Project Coordinator",
                date: {
                    start: "2025-01",
                    end: null
                },
                description: [
                    "Project:",
                    {
                        type: "button",
                        icon: {
                            type: "file",
                            value: "ecp.png"
                        },
                        label: "ECP - Ecoceramics and Crystalware of Portugal",
                        link: {
                            type: "projects",
                            project: "ecp",
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