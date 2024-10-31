export interface GameInfo {
  id: string;
  game_id: string;
  home_team: Partial<TeamInfo>;
  away_team: Partial<TeamInfo>;
  game_date: string;
  venue: string;
  status: string;
  game_time: number;
  quarter: number;
  time_left_in_quarter: string;
  possession: string;
}

interface TeamInfo {
  team_id: string;
  team_name: string;
  score: number;
  turnovers: number;
}

export interface GameInsight {
  id: string;
  game_id: string;
  game_time: number;
  video_time: number;
  quarter: number;
  time_left_in_quarter: string;
  event_type: string;
  event_description: string;
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
    labelEn: "Three-Point Shooting",
    labelCn: "三分投射",
    img: "/icons/ThreePointAbility.png",
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
    labelEn: "Tactical Execution",
    labelCn: "战术执行",
    img: "/icons/TaciticalAbiligy.png",
  },
  {
    labelEn: "Playmaking",
    labelCn: "组织串联",
    img: "/icons/undefined.png",
  },
  {
    labelEn: "Rebounding",
    labelCn: "篮板能力",
    img: "/icons/ReboundingAbility.png",
  },
];