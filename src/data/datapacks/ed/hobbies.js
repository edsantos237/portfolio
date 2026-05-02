import { IoTelescope, IoAperture } from "react-icons/io5";
import { MdOutlineDeveloperMode, MdPiano, MdMovie, MdHeadphones } from "react-icons/md";
import { BiWorld, BiSolidDonateHeart } from "react-icons/bi";
import { IoMdFitness } from "react-icons/io";
import { TbWritingFilled, TbWritingSignFilled } from "react-icons/tb";
import { FaPersonHiking } from "react-icons/fa6";

export const hobbies = [
    {
        id: "app_development",
        title: "App development",
        icon: MdOutlineDeveloperMode,
        description: [
            "I have lots of ideas for projects and whenever I have the time, I try to develop what sounds more promissing.",
            {
                type: "button",
                label: "Show personal projects",
                link: {
                    type: "projects",
                    filters: ["personal"]
                }
            }
        ]
    },
    {
        id: "astrophotography",
        title: "Astro-photography",
        icon: IoAperture,
        description: [
            "Trying to capture the wonders of the cosmos with my camera and telescope.",
            {
                type: "image",
                path: "infinity_moons.png"
            }
        ]
    },
    {
        id: "drawing",
        title: "Drawing",
        icon: TbWritingSignFilled,
        description: [
            "This might be my oldest hobby, and making a living out of it was probably my first \"what I want to be when I grow up\".",
            {
                type: "image",
                path: "drawing_dragon.jpg"
            }
        ]
    },
    {
        id: "gym",
        title: "Gym",
        icon: IoMdFitness,
        description: [
            "I try to workout 3x a week."
        ]
    },
    {
        id: "hiking",
        title: "Hiking",
        icon: FaPersonHiking,
        description: [
            "I have quite the tendency to get lost in the woods with my dog."
        ]
    },
    {
        id: "music",
        title: "Listening to music",
        icon: MdHeadphones,
        description: [
            "I'm particlarly fond of instrumental music, like movie soundtracks, epic scores and piano.",
            "* Favorite song since 2020:",
            {
                type: "bandcamp",
                // link: "https://open.spotify.com/embed/track/098x2YmtSd6W3UixT1P0i1",
                link: "https://bandcamp.com/EmbeddedPlayer/track=1585406331"
            }
        ]
    },
    {
        id: "piano",
        title: "Playing piano",
        icon: MdPiano,
        description: [
            "Trying to learn on my own since 2024 whenever I have the time.",
            "* Yiruma - River Flows in You:",
            {
                type: "video",
                path: "river_flows_in_you.mp4"
            }
        ]
    },
    {
        id: "stargazing",
        title: "Stargazing",
        icon: IoTelescope,
        description: [
            "Sometimes I just lay on my garden and look up."
        ]
    },
    {
        id: "traveling",
        title: "Traveling",
        icon: BiWorld,
        description: [
            "I have traveled a total of 13 countries (15 if you count layovers) across 4 continents."
        ]
    },
    {
        id: "volunteering",
        title: "Volunteering",
        icon: BiSolidDonateHeart,
        description: [
            "Trying to do my part in saving the world.",
            {
                type: "button",
                icon: "refood.png",
                label: "Refood",
                link: {
                    type: "activities",
                    entry: "refood",
                }
            }
        ]
    },
    {
        id: "movies_series",
        title: "Watching movies/series",
        icon: MdMovie,
        description: [
            "I'm the biggest fan of mind-bending movies and series.",
            "* Favorite movie: Interstellar (2014)",
            "* Favorite series: Dark (2017-2020)"
        ]
    },
    {
        id: "writing",
        title: "Writing",
        icon: TbWritingFilled,
        description: [
            "I have been idealizing since my 7th grade, and writting since 2019, the most epic piece of fiction spanning across 24 seasons that might never see the light of day."
        ]
    }
];
