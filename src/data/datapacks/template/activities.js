import { FaServer } from "react-icons/fa6";

export const activities = [
    {
        id: "volunteering_activity",
        title: "Some volunteering activity",
        icon: "example.svg", // can be a string (path to image in public/res)
        tags: ["company1", "volunteering"], // can reference associations and have a "volunteering" tag
        description: [
            "Some string.", // string elements are placed as paragraphs
            "Another string with <b>HTML tags</b>.", // strings can contain simple HTML tags like <b> (bold), <i> (italic), <a>, etc.
            <>Some React element.</>, // React elements can be used for more complex formatting, like links with custom styles or icons
            {
                type: "image", // media content is also supported
                path: "example.jpg" // path to image in public/res
            },
            {
                type: "image", // if multiple elements of the array have the same media type and are adjacent to each other, they can be in the same row if they fit properly
                path: "example2.jpg"
            },
            {
                type: "video",
                path: "example.mp4"
            },
            {
                type: "pdf", // supported browsers can display PDF files directly in an embedded viewer; PDF files aren't placed with adjacent elements in the same row as the wrapper fills the whole row
                path: "example.pdf"
            },
            {
                type: "button",
                icon: "example.svg", // can be a string (path to image)
                label: "Button with image icon that opens URL",
                link: "https://example.com"
            },
            {
                type: "button", // just like media content, adjacent buttons may also be placed in the same row
                icon: FaServer, // can be a React component
                label: "Button with React component icon that opens URL",
                link: "https://example.com"
            },
            {
                type: "button",
                icon: FaServer,
                label: "Button that jumps to personal skills", // buttons can open sections with given filters
                link: {
                    type: "skills", // id of the section
                    filters: ["personal"]  // filters to apply
                },
            },
            {
                type: "button",
                icon: FaServer,
                label: "Button that jumps to the Experience section",
                link: {
                    type: "experience"                
                },
            },
            {
                type: "button",
                icon: FaServer,
                label: "Button that jumps to the Education section",
                link: {
                    type: "education"                
                },
            },
            {
                type: "button",
                icon: FaServer,
                label: "Button that selects a project",
                link: {
                    type: "projects",
                    entry: "helloworld"
                },
            },
            {
                type: "button",
                icon: FaServer,
                label: "Button that selects an activity",
                link: {
                    type: "activities",
                    entry: "volunteering"
                },
            },
            {
                type: "youtube", // YouTube videos can be embedded with the link
                link: "https://www.youtube.com/embed/dQw4w9WgXcQ"
            },
            {
                type: "spotify",
                link: "https://open.spotify.com/embed/track/098x2YmtSd6W3UixT1P0i1"
            },
            {
                type: "bandcamp",
                link: "https://bandcamp.com/EmbeddedPlayer/track=1585406331"
            }
        ],
        roles: [
            {
                title: "Some role",
                dates: [{
                    start: "2025-01", // ISO date string (YYYY-MM)
                    end: null // leave null if ongoing
                }],
                description: [
                    "Some string.",
                    "Another string with <b>HTML tags</b>.",
                    <>Some React element.</>,
                    {
                        type: "image",
                        path: "example.jpg"
                    },
                    {
                        type: "video",
                        path: "example.mp4"
                    },
                    {
                        type: "pdf",
                        path: "example.pdf"
                    },
                    {
                        type: "button",
                        icon: "example.svg",
                        label: "Button with image icon that opens URL",
                        link: "https://example.com"
                    },
                    {
                        type: "youtube",
                        link: "https://www.youtube.com/embed/dQw4w9WgXcQ"
                    },
                    {
                        type: "spotify",
                        link: "https://open.spotify.com/embed/track/098x2YmtSd6W3UixT1P0i1"
                    },
                    {
                        type: "bandcamp",
                        link: "https://bandcamp.com/EmbeddedPlayer/track=1585406331"
                    }
                ],
            },
            {
                title: "Some other role",
                dates: [{
                    start: "2024-01",
                    end: "2024-12"
                }],
                description: [
                    "Some string.",
                    "Another string with <b>HTML tags</b>.",
                    <>Some React element.</>
                ],
            }
        ]
    },
    {
        id: "activity2",
        title: "Some other activity",
        icon: FaServer, // can be a React component
        tags: ["school1"],
        description: [
            "Some string.",
            "Another string with <b>HTML tags</b>.",
            <>Some React element.</>
        ],
        roles: [
            {
                title: "Some role",
                dates: [{
                    start: "2023-01",
                    end: "2023-12"
                }],
                description: [
                    "Some string.",
                    "Another string with <b>HTML tags</b>.",
                    <>Some React element.</>
                ]
            }
        ]
    }
]