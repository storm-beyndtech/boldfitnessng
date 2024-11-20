import {
	FaDumbbell,
	FaBurn,
	FaRunning,
	FaBicycle,
	FaHeartbeat,
	FaSwimmer,
	FaBolt,
  FaBalanceScale,
  FaItunesNote
} from "react-icons/fa";
import { Plan } from "../types/types";

export const baseImageUrl = "https://firebasestorage.googleapis.com/v0/b/boldfitness-ed634.appspot.com/o/";
export const imageUrls = [
  `${baseImageUrl}affiliates-bg.svg?alt=media`,
  `${baseImageUrl}auth-bg.svg?alt=media`,
  `${baseImageUrl}back-squat.svg?alt=media`,
  `${baseImageUrl}bold-fitness-logo-fav.svg?alt=media`,
  `${baseImageUrl}bold-fitness-logo.svg?alt=media`,
  `${baseImageUrl}cable-crunch.svg?alt=media`,
  `${baseImageUrl}heroBg.svg?alt=media`,
  `${baseImageUrl}products.svg?alt=media`,
  `${baseImageUrl}swimming.svg?alt=media`,
  `${baseImageUrl}team-member-1.svg?alt=media`,
  `${baseImageUrl}team-member-2.svg?alt=media`,
]

export const programs = [
	{
		id: "1",
		title: "Strength &",
		titleLine2: "Power Boost",
		desc: "Build muscle with lifting and compound movements. Includes cardio to enhance strength and endurance.",
		icon: FaDumbbell,
	},
	{
		id: "2",
		title: "Total Body",
		titleLine2: "Conditioning",
		desc: "Full-body workouts combining strength, cardio, and endurance. Perfect for overall toning and fitness.",
		icon: FaBalanceScale,
	},
	{
		id: "3",
		title: "Speed &",
		titleLine2: "Agility Sprint",
		desc: "Boost speed and coordination with fast-paced drills. Cardio improves quickness and athletic performance.",
		icon: FaBolt,
	},
	{
		id: "4",
		title: "Endurance &",
		titleLine2: "Stamina Surge",
		desc: "Build endurance with running, cycling, and HIIT. Designed for sustained energy and cardio health.",
		icon: FaBicycle,
	},
	{
		id: "5",
		title: "Core &",
		titleLine2: "Stability Sculpt",
		desc: "Strengthen your core with targeted exercises. Improve balance, flexibility, and overall stability.",
		icon: FaHeartbeat,
	},
	{
		id: "6",
		title: "Plan Body",
		titleLine2: "Transformation",
		desc: "Achieve full-body results with strength, cardio, and nutrition guidance. Ideal for visible health changes.",
		icon: FaBolt,
	},
	{
		id: "7",
		title: "Mobility &",
		titleLine2: "Flex Flow",
		desc: "Enhance flexibility and reduce injury with mobility work. Includes low-impact cardio for joint health.",
		icon: FaSwimmer,
	},
	{
		id: "8",
		title: "Functional",
		titleLine2: "Fit Focus",
		desc: "Improve balance, agility, and strength with functional moves. Includes cardio and bodyweight exercises.",
		icon: FaRunning,
	},
	{
		id: "9",
		title: "Muscle",
		titleLine2: "Mass Mastery",
		desc: "Build lean muscle with progressive resistance. Cardio is included to maintain endurance and fitness.",
		icon: FaDumbbell,
	},
	{
		id: "10",
		title: "HIIT",
		titleLine2: "Fat-Burn Blitz",
		desc: "High-intensity intervals to burn fat and boost stamina. Fast-paced with minimal rest for max results.",
		icon: FaBurn,
	},
];


export const exercises = [
  {
    id: "1",
    title: "Aerobics",
    desc: "Rhythmic cardio exercises that improve cardiovascular health.",
    icon: FaHeartbeat,
  },
  {
    id: "2",
    title: "Core Cardio",
    desc: "Combines strengthening moves & intense cardio exercises.",
    icon: FaRunning,
  },
  {
    id: "3",
    title: "Zumba",
    desc: "Fun, Latin-inspired dance workout to boost cardio fitness.",
    icon: FaItunesNote,
  },
  {
    id: "4",
    title: "Spinning",
    desc: "High-intensity cycling workout that builds stamina & endurance.",
    icon: FaBicycle,
  },
  {
    id: "5",
    title: "HIIT",
    desc: "Short bursts of intense exercise followed by brief rest periods.",
    icon: FaBurn,
  },
  {
    id: "6",
    title: "Swimming",
    desc: "Full-body, low-impact workout for endurance and flexibility.",
    icon: FaSwimmer,
  },
];



// constants/plans.ts
export const PAYMENT_PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    amount: 19000,
    features: [
      "Over 3 Free Training Sessions Monthly",
      "Access to Advanced Training Facilities",
      "Top-tier Fitness Supplements & Products",
      "Access to Personal Training",
      "Supportive Network of Like-Minds",
      "Friendly Environment",
    ],
    interval: 30
  },
  {
    id: 'quarterly',
    name: 'Quarterly Plan',
    amount: 51000,
    features: [
      "Over 3 Free Training Sessions Monthly",
      "Access to Advanced Training Facilities",
      "Top-tier Fitness Supplements & Products",
      "Access to Personal Training",
      "Supportive Network of Like-Minds",
      "Friendly Environment",
    ],
    interval: 120,
  },
  {
    id: 'annually',
    name: 'Annual Plan',
    amount: 183000,
    features: [
      "Over 3 Free Training Sessions Monthly",
      "Access to Advanced Training Facilities",
      "Top-tier Fitness Supplements & Products",
      "Access to Personal Training",
      "Supportive Network of Like-Minds",
      "Friendly Environment",
    ],
    interval: 365
  }
];


export const contactHero = {
  title: "Swift Customer Service, 24/7",
  subtitle: "Encountered Any Glitch On The Platform?",
}