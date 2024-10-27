import { NextResponse } from 'next/server';

// Function to generate random values between 0 and 100
const getRandomValue = () => Math.floor(Math.random() * 101);

export async function GET() {
  const stats = [
    { label: "Stamina", label_zh: "体能", value: getRandomValue(), img: "/icons/Stamina.png" },
    { label: "Shooting Form", label_zh: "手感", value: getRandomValue(), img: "/icons/ShootingForm.png" },
    { label: "Three-Point Shooting Ability", label_zh: "三分投射", value: getRandomValue(), img: "/icons/ThreePointAbility.png" },
    { label: "Finishing Ability", label_zh: "终结能力", value: getRandomValue(), img: "/icons/FinishingAbility.png" },
    { label: "Dribbling and Driving Ability", label_zh: "突破能力", value: getRandomValue(), img: "/icons/DribblingAbility.png" },
    { label: "Lateral Defense Ability", label_zh: "移动防守", value: getRandomValue(), img: "https://via.placeholder.com/40" },
    { label: "Rim Protection Efficiency", label_zh: "篮下防守", value: getRandomValue(), img: "/icons/RimProtection.png" },
    { label: "Tactical Execution Ability", label_zh: "战术执行", value: getRandomValue(), img: "/icons/TaciticalAbiligy.png" },
    { label: "Playmaking Ability", label_zh: "组织串联", value: getRandomValue(), img: "https://via.placeholder.com/40" },
    { label: "Rebounding Ability", label_zh: "篮板能力", value: getRandomValue(), img: "/icons/ReboundingAbility.png" },
  ];

  return NextResponse.json({ stats });
}