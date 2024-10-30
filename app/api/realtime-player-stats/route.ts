import { NextResponse } from "next/server";

// Function to generate random values between 0 and 100
const getRandomValue = (max: number) => {
  const randomValue = Math.floor(Math.random() * max);
  return randomValue;
};
export async function GET() {
  const stats = [
    {
      labelEn: "Stamina",
      labelCn: "体能",
      max: 79,
      value: getRandomValue(79),
      img: "/icons/Stamina.png",
    },
    {
      labelEn: "Shooting Form",
      labelCn: "手感",
      max: 79,
      value: getRandomValue(79),
      img: "/icons/ShootingForm.png",
    },
    {
      labelEn: "Three-Point Shooting Ability",
      labelCn: "三分投射",
      max: 59,
      value: getRandomValue(59),
      img: "/icons/ThreePointAbility.png",
    },
    {
      labelEn: "Finishing Ability",
      labelCn: "终结能力",
      max: 87,
      value: getRandomValue(87),
      img: "/icons/FinishingAbility.png",
    },
    {
      labelEn: "Dribbling and Driving Ability",
      labelCn: "突破能力",
      max: 69,
      value: getRandomValue(69),
      img: "/icons/DribblingAbility.png",
    },
    {
      labelEn: "Lateral Defense Ability",
      labelCn: "移动防守",
      max: 79,
      value: getRandomValue(79),
      img: "https://via.placeholder.com/40",
    },
    {
      labelEn: "Rim Protection Efficiency",
      labelCn: "篮下防守",
      max: 79,
      value: getRandomValue(79),
      img: "/icons/RimProtection.png",
    },
    {
      labelEn: "Tactical Execution Ability",
      labelCn: "战术执行",
      max: 79,
      value: getRandomValue(79),
      img: "/icons/TaciticalAbiligy.png",
    },
    {
      labelEn: "Playmaking Ability",
      labelCn: "组织串联",
      max: 86,
      value: getRandomValue(86),
      img: "https://via.placeholder.com/40",
    },
    {
      labelEn: "Rebounding Ability",
      labelCn: "篮板能力",
      max: 86,
      value: getRandomValue(86),
      img: "/icons/ReboundingAbility.png",
    },
  ];

  // Adding a unique value to force uniqueness in the response

  const response = NextResponse.json({stats});
  response.headers.set("Cache-Control", "no-store, max-age=0");

  return response;
}

export const revalidate = 0;