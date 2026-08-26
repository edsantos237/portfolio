import { IoLocationSharp } from "react-icons/io5";

export const schools = [
    {
        id: "university",
        title: "University of Minho",
        icon: "uminho.jpg",
        label: "University",
        type: "University",
        headline: ["Integrated Master", "Telecommunications and Informatics Engineering"],
        description: [
            {
                type: "button",
                icon: "uminho.jpg",
                label: "Website",
                link: "https://www.uminho.pt/EN"
            }
        ],
        courses: [
            {
                title: "Telecommunications and Informatics Engineering",
                degrees: ["Bachelor's and Master's degree"],
                dates: [{
                    start: "2016-09",
                    end: "2022-03"
                }],
                grade: {
                    value: 15.072,
                    range: 20
                },                
                description: [                    
                    {
                        type: "button",
                        icon: "uminho.jpg",
                        label: "Website",
                        link: "https://www.uminho.pt/EN/education/educational-offer/Cursos-Conferentes-a-Grau/_layouts/15/UMinho.PortalUM.UI/Pages/CatalogoCursoDetail.aspx?itemId=3802&catId=11"
                    },
                    {
                        type: "button",
                        icon: "uminho.jpg",
                        label: "Master's Dissertation",
                        link: {
                            type: "projects",
                            entry: "dissertation",
                        }
                    }
                ]
            }
        ]
    },
    {
        id: "high_school",
        title: "Escola Secundária D. Sancho I",
        icon: "aesancho.png",
        label: "High School",
        type: "High School",
        headline: ["Science and Technology"],
        description: [
            {
                type: "button",
                icon: "aesancho.png",
                label: "Website",
                link: "https://aesancho.pt/"
            }
        ],
        courses: [
            {
                title: "Science and Technology",
                degrees: ["Secondary Education", "10th — 12th grade"],
                dates: [{
                    start: "2013-09",
                    end: "2016-06"
                }],
                grade: {
                    value: 14.75,
                    range: 20
                }
            }
        ]
    },
    {
        id: "middle_school",
        title: "Escola EB 2, 3 de Ribeirão",
        icon: "eb23ribeirao.png",
        label: "Middle School",
        type: "Middle School",
        description: [
            {
                type: "button",
                icon: "eb23ribeirao.png",
                label: "Website",
                link: "https://eb23-ribeirao.pt/"
            }
        ],
        courses: [
            {
                degrees: ["Basic Education -- 3rd cycle", "7th — 9th grade"],                
                dates: [{
                    start: "2010-09",
                    end: "2013-06"
                }],
                grade: {
                    value: 4.25,
                    range: 5
                }
            },
            {
                degrees: ["Basic Education -- 2nd cycle", "5th — 6th grade"],
                dates: [{
                    start: "2008-09",
                    end: "2010-06"
                }]
            }
        ]
    },
    {
        id: "elementary_school",
        title: "Escola Básica de Ribeirão",
        label: "Elementary School",
        type: "Elementary School",
        courses: [
            {
                degrees: ["Primary Education", "Basic Education -- 1st cycle", "1st — 4th grade"],
                dates: [{
                    start: "2004-09",
                    end: "2008-06"
                }]
            }
        ]
    }
]