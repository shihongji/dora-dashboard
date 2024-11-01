import * as fs from "fs";
import { GameInfo } from "@/types";

// Text data for generating random game insights
const textArray = [
  "春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。（孟浩然《春晓》）",
  "锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。（李绅《悯农》）",
  "床前明月光，疑是地上霜。举头望明月，低头思故乡。（李白《静夜思》）",
  "黄鹤一去不复返，白云千载空悠悠。晴川历历汉阳树，芳草萋萋鹦鹉洲。（崔颢《黄鹤楼》）",
  "红豆生南国，春来发几枝。愿君多采撷，此物最相思。（王维《相思》）",
  "山中相送罢，日暮掩柴扉。春草明年绿，王孙归不归？（王维《山中送别》）",
  "劝君更尽一杯酒，西出阳关无故人。（王维《送元二使安西》）",
  "人生若只如初见，何事秋风悲画扇。（纳兰性德《木兰花·拟古决绝词》）",
  "衣带渐宽终不悔，为伊消得人憔悴。（柳永《蝶恋花》）",
  "小楼昨夜又东风，故国不堪回首月明中。（李煜《虞美人》）",
  "昨夜西风凋碧树，独上高楼，望尽天涯路。（晏殊《蝶恋花》）",
  "莫道不消魂，帘卷西风，人比黄花瘦。（李清照《醉花阴》）",
  "千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。（柳宗元《江雪》）",
  "月落乌啼霜满天，江枫渔火对愁眠。（张继《枫桥夜泊》）",
  "桃花潭水深千尺，不及汪伦送我情。（李白《赠汪伦》）",
  "故人西辞黄鹤楼，烟花三月下扬州。孤帆远影碧空尽，唯见长江天际流。（李白《黄鹤楼送孟浩然之广陵》）",
  "长风破浪会有时，直挂云帆济沧海。（李白《行路难》）",
  "会当凌绝顶，一览众山小。（杜甫《望岳》）",
  "欲穷千里目，更上一层楼。（王之涣《登鹳雀楼》）",
  "醉翁之意不在酒，在乎山水之间也。（欧阳修《醉翁亭记》）",
];

const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2);
};

const scoreIncrements = [1, 2, 3]; // Possible score increments

// Function to generate random GameInfo
const generateRandomGameInfo = (): Partial<GameInfo>[] => {
  const totalGameTime = 48 * 60; // 48 minutes in seconds
  const quarterDuration = 12 * 60; // Each quarter is 12 minutes (720 seconds)

  let homeScore = 74;
  let awayScore = 59;
  let currentTime = 36 * 60; // Start of the game (in seconds)
  let gameInfoArray: Partial<GameInfo>[] = [];

  while (currentTime <= totalGameTime) {
    // Determine the quarter based on the current time
    const quarter = Math.floor(currentTime / quarterDuration) + 1;

    // Randomly increment team scores (can be home, away)
    const scored = Math.random();
    if (scored > 0.85) {
      homeScore +=
        scoreIncrements[Math.floor(Math.random() * scoreIncrements.length)];
    } else if (scored < 0.15) {
      awayScore +=
        scoreIncrements[Math.floor(Math.random() * scoreIncrements.length)];
    }

    // Calculate remaining time in the current quarter
    const timeLeftInQuarter = quarterDuration - (currentTime % quarterDuration);
    const minutesLeft = Math.floor(timeLeftInQuarter / 60);
    const secondsLeft = timeLeftInQuarter % 60;

    // Create a game info entry at this point in time
    gameInfoArray.push({
      id: generateRandomId(),
      game_id: generateRandomId(),
      home_team: {
        team_id: "ln020",
        team_name: "辽宁本钢",
        score: homeScore,
      },
      away_team: {
        team_id: "tj002",
        team_name: "天津先行者",
        score: awayScore,
      },
      // only reserve the date part
      game_date: new Date().toISOString().split("T")[0],
      venue: "辽宁体育馆",
      status: "In Progress",
      game_time: currentTime,
      quarter: quarter,
      // pad minutes
      time_left_in_quarter: `${minutesLeft
        .toString()
        .padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`,
      possession: Math.random() > 0.5 ? "home" : "away",
    });

    // Increment game time by random intervals (simulating game flow)
    currentTime += Math.floor(Math.random() * 10); // Increment time by 0 - 10 seconds
  }

  return gameInfoArray;
};

const generateRandomGameInsights = (): Partial<GameInfo>[] => {
  const gameInsights: Partial<GameInfo>[] = [];
  const totalGameTime = 48 * 60; // 48 minutes in seconds
  const quarterDuration = 12 * 60; // Each quarter is 12 minutes (720 seconds)
  const events = [
    "3-pointer",
    "2-pointer",
    "Free Throw",
    "Turnover",
    "Steal",
    "Block",
    "Foul",
    "Substitution",
  ];

  let currentTime = 36 * 60; // Start of the game (in seconds)
  let videoTime = 0;
  let quarter = 4;
  let timeLeftInQuarter = quarterDuration;

  while (currentTime <= totalGameTime) {
    // Randomly generate an event
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    const eventDescription = textArray[Math.floor(Math.random() * textArray.length)];

    // Create a game insight entry at this point in time
    gameInsights.push({
      id: generateRandomId(),
      game_id: "yhbzivp0o8i",
      game_time: currentTime,
      quarter: quarter,
      time_left_in_quarter: `${Math.floor(timeLeftInQuarter / 60)
        .toString()
        .padStart(2, "0")}:${(timeLeftInQuarter % 60)
        .toString()
        .padStart(2, "0")}`,
      event_type: randomEvent,
      event_description: eventDescription,
    });

    // Increment game time by random intervals (simulating game flow)
    const timeIncrement = Math.floor(Math.random() * 10); // Increment time by 10 - 20 seconds
    currentTime += timeIncrement;
    videoTime += timeIncrement + Math.floor(Math.random() * 5); // Increment video time by 10 - 25 seconds
    timeLeftInQuarter -= timeIncrement;

    // Update the quarter and time left in the quarter
    if (timeLeftInQuarter <= 0) {
      quarter += 1;
      timeLeftInQuarter = quarterDuration;
    }
  }

  // Return the final state of the game insights at the end of the loop
  return gameInsights; // Final game insights
};
// Example of using the function
// const randomGameInfo = generateRandomGameInfo();
const randomGameInsights = generateRandomGameInsights();
// console.log(randomGameInfo.length);
console.log(randomGameInsights.length);
// write to a file
// fs.writeFileSync('data/gameInfo.json', JSON.stringify(randomGameInfo, null, 2));
fs.writeFileSync(
  "data/gameInsights.json",
  JSON.stringify(randomGameInsights, null, 2)
);
