export const schools = [
    {
        id: "university",
        title: "University of Minho",
        labels: ["University", "Integrated Master", "Telecommunications and Informatics Engineering"],
        icon: {
            type: "file",
            value: "uminho.jpg"
        },
        description: [
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "uminho.jpg"
                },
                label: "Website",
                link: "https://www.uminho.pt/EN"
            }
        ],
        courses: [
            {
                title: "Telecommunications and Informatics Engineering",
                degrees: ["Bachelor's and Master's degree"],
                date: {
                    start: "2016-09",
                    end: "2022-03"
                },
                grade: {
                    value: 15.072,
                    range: 20
                },                
                description: [
                    {
                        type: "button",
                        icon: {
                            type: "file",
                            value: "uminho.jpg"
                        },
                        label: "Master's Dissertation",
                        link: {
                            type: "projects",
                            project: "dissertation",
                        }
                    }
                ]
            }
        ]
    },
    {
        id: "high_school",
        title: "Escola Secundária D. Sancho I",
        labels: ["High School", "Science and Technologies"],
        icon: {
            type: "file",
            value: "aesancho.png"
        },
        description: [
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "aesancho.png"
                },
                label: "Website",
                link: "https://aesancho.pt/"
            }
        ],
        courses: [
            {
                title: "Science and Technologies",
                degrees: ["Secondary Education", "10th — 12th grade"],
                date: {
                    start: "2013-09",
                    end: "2016-06"
                },
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
        labels: ["Middle School"],
        icon: {
            type: "file",
            value: "eb23ribeirao.png"
        },
        description: [
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "eb23ribeirao.png"
                },
                label: "Website",
                link: "https://eb23-ribeirao.pt/"
            }
        ],
        courses: [
            {
                degrees: ["Basic Education - 3rd cycle", "7th — 9th grade"],                
                date: {
                    start: "2010-09",
                    end: "2013-06"
                },
                grade: {
                    value: 4.25,
                    range: 5
                }
            },
            {
                degrees: ["Basic Education - 2nd cycle", "5th — 6th grade"],
                date: {
                    start: "2008-09",
                    end: "2010-06"
                }
            }
        ]
    },
    {
        id: "elementary_school",
        title: "Escola Básica de Ribeirão",
        labels: ["Elementary School"],
        courses: [
            {
                degrees: ["Primary Education", "Basic Education - 1st cycle", "1st — 4th grade"],
                date: {
                    start: "2004-09",
                    end: "2008-06"
                }
            }
        ]
    }
]