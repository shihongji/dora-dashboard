import { NextResponse } from "next/server";

// Function to generate random values between 0 and 100
const getRandomValue = (max: number) => {
  const randomValue = Math.floor(Math.random() * max);
  console.log("Generated Random Value:", randomValue);
  return randomValue;
};
export async function GET() {
  const stats = [
    {
      label: "Stamina",
      label_zh: "体能",
      max: 79,
      value: getRandomValue(79),
      img: "/icons/Stamina.png",
    },
    {
      label: "Shooting Form",
      label_zh: "手感",
      max: 79,
      value: getRandomValue(79),
      img: "/icons/ShootingForm.png",
    },
    {
      label: "Three-Point Shooting Ability",
      label_zh: "三分投射",
      max: 59,
      value: getRandomValue(59),
      img: "/icons/ThreePointAbility.png",
    },
    {
      label: "Finishing Ability",
      label_zh: "终结能力",
      max: 87,
      value: getRandomValue(87),
      img: "/icons/FinishingAbility.png",
    },
    {
      label: "Dribbling and Driving Ability",
      label_zh: "突破能力",
      max: 69,
      value: getRandomValue(69),
      img: "/icons/DribblingAbility.png",
    },
    {
      label: "Lateral Defense Ability",
      label_zh: "移动防守",
      max: 79,
      value: getRandomValue(79),
      img: "https://via.placeholder.com/40",
    },
    {
      label: "Rim Protection Efficiency",
      label_zh: "篮下防守",
      max: 79,
      value: getRandomValue(79),
      img: "/icons/RimProtection.png",
    },
    {
      label: "Tactical Execution Ability",
      label_zh: "战术执行",
      max: 79,
      value: getRandomValue(79),
      img: "/icons/TaciticalAbiligy.png",
    },
    {
      label: "Playmaking Ability",
      label_zh: "组织串联",
      max: 86,
      value: getRandomValue(86),
      img: "https://via.placeholder.com/40",
    },
    {
      label: "Rebounding Ability",
      label_zh: "篮板能力",
      max: 86,
      value: getRandomValue(86),
      img: "/icons/ReboundingAbility.png",
    },
  ];

  // Adding a unique value to force uniqueness in the response
  const uniqueResponse = { stats, randomSeed: Math.random() };

  const response = NextResponse.json(uniqueResponse);
  response.headers.set("Cache-Control", "no-store, max-age=0");

  return response;
}
