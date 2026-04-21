import { IoTelescope, IoAperture } from "react-icons/io5";
import { MdOutlineDeveloperMode, MdPiano, MdMovie, MdHeadphones } from "react-icons/md";
import { BiWorld, BiSolidDonateHeart } from "react-icons/bi";
import { IoMdFitness } from "react-icons/io";
import { TbWritingFilled, TbWritingSignFilled } from "react-icons/tb";
import { FaPersonHiking } from "react-icons/fa6";

export const about = {
    name: "Eduardo Santos",
    picture: "res/profile_torso.png",
    full_name: "José Eduardo da Silva Santos",
    headline_short: [
        "Unity & Backend Developer"
    ],
    headline_long: [
        "Unity & Backend Developer @ CCG/ZGDV Institute.",
        "MSc in Telecommunications and Informatics Engineering @ University of Minho."
    ],
    birthdate: "1998-05-17",
    address: "V. N. Famalicão, Braga, Portugal",
    summary: [
        "Since I know myself that I'm passionate about technology, and since I started watching sci-fi movies, I see not only what technology is, but also what it can be.",
        "This mindset has driven my interest in fields that may revolutionize how people interact with technology, bending the digital world to reality, through ubiquitous computing, extended reality, sensors, networks, internet of things and machine learning.",
        "It's with this motivation that I look for new challanges that let me be creative and that set me in the right path to revolutionize the world, not only in the mentioned fields, but also in others that let me learn and grow as a developer, researcher and person."
    ],
    drivers_license: ["B", "B1"]
};

export const hobbies = [
    {
        title: "App development",
        icon: {
            type: "react",
            value: MdOutlineDeveloperMode
        },
        details: {
            type: "button",
            value: ["projects", "personal"]
        }
    },
    {
        title: "Astro-photography",
        icon: {
            type: "react",
            value: IoAperture
        },
        details: {
            type: "file",
            value: []
        }
    },
    {
        title: "Drawing",
        icon: {
            type: "react",
            value: TbWritingSignFilled
        },
        details: {
            type: "file",
            value: []
        }
    },
    {
        title: "Gym",
        icon: {
            type: "react",
            value: IoMdFitness
        },
        details: {
            type: "text",
            value: ["I try to workout 3x a week"]
        }
    },
    {
        title: "Hiking",
        icon: {
            type: "react",
            value: FaPersonHiking
        },
        details: {
            type: "text",
            value: ["I have quite the tendency to get lost in the woods with my dog."]
        }
    },
    {
        title: "Listening to music",
        icon: {
            type: "react",
            value: MdHeadphones
        },
        details: {
            type: "file",
            value: []
        }
    },
    {
        title: "Playing piano",
        icon: {
            type: "react",
            value: MdPiano
        }
    },
    {
        title: "Stargazing",
        icon: {
            type: "react",
            value: IoTelescope
        }
    },
    {
        title: "Traveling",
        icon: {
            type: "react",
            value: BiWorld
        },
        details: [
            {
                type: "text",
                value: ["I have traveled a total of 13 countries (15 if you count layovers) across 4 continents."]
            }
        ]
    },
    {
        title: "Volunteering",
        icon: {
            type: "react",
            value: BiSolidDonateHeart
        }
    },
    {
        title: "Watch series/movies",
        icon: {
            type: "react",
            value: MdMovie
        }
    },
    {
        title: "Writing",
        icon: {
            type: "react",
            value: TbWritingFilled
        }
    }
];

export const strengths = [
    {
        title: "Creativity",
        description: "I design solutions beyond standard approaches."
    },
    {
        title: "Ambition",
        description: "I set high goals for my projects.",
    },
    {
        title: "Problem solving",
        description: "I analyze problems deeply to find effective solutions."
    },
    {
        title: "Proactivity",
        description: "I take initiative on features and improvements."
    },
    {
        title: "Versatility",
        description: "I work across multiple domains and technologies."
    },
    {
        title: "Teamwork",
        description: "I collaborate effectively with others to achieve common goals."
    }
];

export const languages = [
    {
        title: "Portuguese",
        proficiency: "Native",
        level: 5 // 0-5 scale
    },
    {
        title: "English",
        proficiency: "Professional",
        level: 4
    },
    {
        title: "Spanish",
        proficiency: "Elementary",
        level: 2
    },
    {
        title: "German",
        proficiency: "Elementary",
        level: 1
    }
];
