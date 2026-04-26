import { BiSolidDonateHeart } from "react-icons/bi";
import { FaInstagram, FaBlogger } from "react-icons/fa6";

export const activities = [
    {
        id: "refood",
        title: "Refood",
        icon: {
            type: "file",
            value: "refood.png"            
        },
        tags: ["volunteering"],
        description: [            
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "refood.png"
                },
                label: "Website",
                link: "https://re-food.org/en"
            },
            {
                type: "button",
                icon: {
                    type: "react",
                    value: BiSolidDonateHeart
                },
                label: "Become a volunteer!",
                link: "https://re-food.org/en/volunteer/"
            }
        ],
        roles: [
            {
                date: {
                    start: "2025-09",
                    end: null
                },
                description: [
                    "I'm performing food collection and distribution routes and organizing it at the Operations Center."
                ]
            }
        ]
    },
    {
        id: "netium",
        title: "NETIUM",
        icon: {
            type: "file",
            value: "netium.png"
        },
        tags: ["university", "volunteering"],
        description: [
            "Núcleo de Estudantes de Engenharia de Telecomunicações e Informática da Universidade do Minho",
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "netium.png"
                },
                label: "Website",
                link: "https://netium.dsi.uminho.pt/netium"
            }
        ],
        roles: [
            {
                title: "Treasurer",
                date: {
                    start: "2020-01",
                    end: "2020-12"
                },
                description: [
                    "I managed financial assets and liabilities."
                ]
            },
            {
                title: "Communications and Design Department",
                date: {
                    start: "2019-01",
                    end: "2019-12"
                },
                description: [
                    "I designed posters and promoted events."
                ]
            }
        ]
    },
    {
        id: "mieti_party_committee",
        title: "MIETI Party Committee",
        tags: ["university", "volunteering"],
        description: [
            {
                type: "button",
                icon: {
                    type: "react",
                    value: FaInstagram
                },
                label: "Instagram",
                link: "https://www.instagram.com/comissaodefestasleti/"
            }
        ],
        roles: [
            {
                date: {
                    start: "2017-09",
                    end: "2018-05"
                },
                description: [
                    "I designed freshman and general course kits and helped organizing course dinners."
                ]
            }
        ]
    },
    // {
    //     title: "Gette it Onne!",
    //     tags: ["volunteering"],
    //     roles: [
    //         {
    //             title: "Founder and Administrator",
    //             date: {
    //                 start: "2017-10",
    //                 end: "2018-07"
    //             },
    //             description: [
    //                 "I founded and managed a Team Fortress 2 competitive league, where 44 teams, from Europe and North America, participated in the first season."
    //             ]
    //         }
    //     ]
    // },
    {
        id: "praxe",
        title: "Praxe",
        icon: {
            type: "file",
            value: "praxe.png"
        },
        tags: ["university"],
        description: [
            {
                type: "button",
                icon: {
                    type: "react",
                    value: FaBlogger
                },
                label: "Cabido de Cardeais",
                link: "https://cabidodecardeais.blogspot.com/"
            }
        ],
        roles: [
            {
                title: "MIETI Praxe Committee",
                date: {
                    start: "2018-09",
                    end: "2019-05"
                },
                description: [
                    "\"Mr. Engineer Fósforo Cooper\" with a very short active duty."
                ]
            },
            {
                title: "Freshman",
                date: {
                    start: "2016-09",
                    end: "2017-05"
                },
                description: [
                    "Had my weekly push-ups routine, participated in Guimarães's \"Latada\" and Braga's universitary procession, and got baptized as \"Fósforo Cooper\" with Francesinha sauce."
                ]
            }
        ]
    },
    {
        id: "swimming",
        title: "Swimming",
        roles: [
            {
                title: "Famalicão",
                date: {
                    start: "2014-11",
                    end: "2016-05"
                },
                description: [
                    "Participated in swimming classes and competitions representing my high school city.",
                    {
                        type: "button",
                        label: "Website",
                        link: "https://www.famalicaodesportivo.pt/_piscinas_vn_famalicao"
                    }
                ]
            },
            {
                title: "Ribeirão",
                date: {
                    start: "2009-10",
                    end: "2013-10"
                },
                description: [
                    "Participated in swimming classes and competitions representing my town.",
                    {
                        type: "button",
                        label: "Website",
                        link: "https://www.famalicaodesportivo.pt/_piscinas_ribeirao"
                    }
                ]
            }
        ]
    },
    {
        id: "students_association",
        title: "Students Association",
        tags: ["middle_school", "volunteering"],
        roles: [
            {
                date: {
                    start: "2012-09",
                    end: "2013-06"
                },
                description: [
                    "Organized events for the whole school."
                ]
            }
        ]
    },
    // {
    //     title: "Toma Lá Baxouras",
    //     tags: ["volunteering"],
    //     roles: [
    //         {
    //             title: "Founder and Administrator",
    //             date: {
    //                 start: "2012-10",
    //                 end: "2013-03"
    //             },
    //             description: [
    //                 "I founded and managed a Counter-Strike server and community."
    //             ]
    //         }
    //     ]
    // },
    {
        id: "futsal",
        title: "Futsal",
        tags: ["middle_school"],
        roles: [
            {
                date: {
                    start: "2011-10",
                    end: "2012-05"
                },
                description: [
                    "Participated in futsal competitions representing my school."
                ]
            }
        ]
    },
    {
        id: "chess",
        title: "Chess",
        tags: ["middle_school"],
        roles: [
            {
                date: {
                    start: "2009-10",
                    end: "2010-06"
                },
                description: [
                    "Participated in chess competitions representing my school."
                ]
            }
        ]
    },
    {
        id: "ccdr",
        title: "CCDR - Clube de Cultura e Desporto de Ribeirão",
        icon: {
            type: "file",
            value: "ccdr.png"
        },
        description: [            
            {
                type: "button",
                icon: {
                    type: "file",
                    value: "ccdr.png"
                },
                label: "Website",
                link: "https://www.ccdr.pt/"
            }
        ],
        roles: [
            {
                title: "Athlete",
                date: {
                    start: "2007-04",
                    end: "2011-07"
                },
                description: [
                    "Participated in athletics classes and competitions representing my town."
                ]
            }
        ]
    },
    {
        title: "Informatics Course",
        tags: ["middle_school"],
        roles: [
            {
                date: {
                    start: "2008-12",
                    end: "2009-06"
                },
                description: [
                    "Learned how to work with Windows Explorer, basic Command Line commands, and Microsoft Office Word, Excel and PowerPoint."
                ]
            }
        ]
    }
]