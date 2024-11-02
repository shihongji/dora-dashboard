export interface GameInfo {
  id: string;
  game_id: string;
  home_team: Partial<TeamInfo>;
  away_team: Partial<TeamInfo>;
  video_time: number;
  quarter: number;
  time_left_in_quarter: string;
  action_type?: string;
  action?: string;
  coach_for?: string;
  reason?: string;
}

interface TeamInfo {
  team_id: string;
  team_name: string;
  score: number;
  turnovers: number;
}

export interface PlayerStats {
  playTime: string;
  points: string;
  offensiveRebounds: string;
  defensiveRebounds: string;
  totalRebounds: string;
  assists: string;
  steals: string;
  blocks: string;
  fouls: string;
  turnovers: string;
  fieldGoalsMade: string;
  fieldGoalsAttempted: string;
  fieldGoalPercentage: string;
  threePointersMade: string;
  threePointersAttempted: string;
  threePointPercentage: string;
  freeThrowsMade: string;
  freeThrowsAttempted: string;
  freeThrowPercentage: string;
}

export interface Player {
  id: string;
  name: string;
  team: string;
  number: number;
  stats: PlayerStats;
  imgUrl: string;
}

export interface AdvancedMetric {
  labelEn: string;
  labelCn: string;
  max: number;
  value: number;
  img: string;
}

export interface PlayerHistory extends Player {
  lastGame: PlayerStats;
  last5Games: PlayerStats;
  lastSeason: PlayerStats;
}

export const statsMap = [
  { labelEn: "Stamina", labelCn: "体能", img: "/icons/Stamina.png" },
  { labelEn: "Shooting Form", labelCn: "手感", img: "/icons/ShootingForm.png" },
  {
    labelEn: "Playmaking",
    labelCn: "组织串联",
    img: "/icons/undefined.png",
  },
  {
    labelEn: "Finishing",
    labelCn: "终结能力",
    img: "/icons/FinishingAbility.png",
  },
  {
    labelEn: "Dribbling and Driving",
    labelCn: "突破能力",
    img: "/icons/DribblingAbility.png",
  },
  {
    labelEn: "Lateral Defense",
    labelCn: "移动防守",
    img: "/icons/undefined.png",
  },
  {
    labelEn: "Rim Protection Efficiency",
    labelCn: "篮下防守",
    img: "/icons/RimProtection.png",
  },
  {
    labelEn: "Mid-Range Shooting",
    labelCn: "中投能力",
    img: "/icons/MidRange.png",
  },
  {
    labelEn: "Three-Point Shooting",
    labelCn: "三分投射",
    img: "/icons/ThreePointAbility.png",
  },
  {
    labelEn: "Rebounding",
    labelCn: "篮板能力",
    img: "/icons/ReboundingAbility.png",
  },
];

export const metricLabels: { [key: string]: { en: string; cn: string } } = {
  playTime: { en: "Time", cn: "时间" },
  points: { en: "Points", cn: "得分" },
  offensiveRebounds: { en: "Offensive Rebounds", cn: "前板" },
  defensiveRebounds: { en: "Defensive Rebounds", cn: "后板" },
  totalRebounds: { en: "Total Rebounds", cn: "篮板" },
  assists: { en: "Assists", cn: "助攻" },
  steals: { en: "Steals", cn: "抢断" },
  blocks: { en: "Blocks", cn: "盖帽" },
  fouls: { en: "Fouls", cn: "犯规" },
  turnovers: { en: "Turnovers", cn: "失误" },
  fieldGoalsMade: { en: "Field Goals Made", cn: "投篮命中" },
  fieldGoalsAttempted: { en: "Field Goals Attempted", cn: "投篮出手" },
  fieldGoalPercentage: { en: "Field Goal Percentage", cn: "投篮%" },
  threePointersMade: { en: "Three Pointers Made", cn: "三分命中" },
  threePointersAttempted: { en: "Three Pointers Attempted", cn: "三分出手" },
  threePointPercentage: { en: "Three Point Percentage", cn: "三分%" },
  freeThrowsMade: { en: "Free Throws Made", cn: "罚球命中" },
  freeThrowsAttempted: { en: "Free Throws Attempted", cn: "罚球出手" },
  freeThrowPercentage: { en: "Free Throw Percentage", cn: "罚球%" },
};