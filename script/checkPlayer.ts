// import required modules
import * as fs from "fs";
import * as path from "path";
// Define the type structure for a Player
interface Player {
  name: string;
  team: string;
  position: string;
}

// Define the type for the PlayerMap
interface PlayerMap {
  [id: string]: Player;
}
// Unmatched player: 天津先行者#31#詹姆斯  : 大卫-詹姆斯
// Unmatched player: 天津先行者#22#罗切斯特  : 泰勒-罗切斯特
// Unmatched player: 天津先行者#10#哈姆雷特 : 贾维恩-哈姆雷特
// Unmatched player: 广东华南虎#24#威姆斯 : 克拉伦斯-威姆斯
// Unmatched player: 广东华南虎#5#贝尔 : 乔丹-贝尔
// Unmatched player: 广东华南虎#51#沃特斯 : 特里蒙特-沃特斯
// Define alternative names for unmatched players
const alternativeNames: { [key: string]: string } = {
  詹姆斯: "大卫-詹姆斯",
  罗切斯特: "泰勒-罗切斯特",
  哈姆雷特: "贾维恩-哈姆雷特",
  威姆斯: "克拉伦斯-威姆斯",
  贝尔: "乔丹-贝尔",
  沃特斯: "特里蒙特-沃特斯",
  沙约克: "马里奥-沙约克",
  阿丘尔: "卢瓦尔-阿丘尔",
  巴斯: "帕里克-巴斯",
  约克: "盖比-约克",
};

const jsonFileName = "rt-test.json";
const jsonFilePath = path.join(__dirname, jsonFileName);
const data = fs.readFileSync(jsonFilePath, "utf8");
const jsonData = JSON.parse(data);
const playerMapPath = path.join(__dirname, "../data/playerMap.json");
const playerMapData = JSON.parse(fs.readFileSync(playerMapPath, "utf8"));

// -----
// Define a function to replace keys
function replaceKey(obj: any, oldKey: string, newKey: string) {
  if (obj.hasOwnProperty(oldKey)) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
}

// Function to get player ID by name and team
function getPlayerIdByNameAndTeam(name: string): string | null {
  const lookupName = alternativeNames[name] || name;
  for (const [id, player] of Object.entries(playerMapData)) {
    const playerInfo = player as Player; // Type casting to Player
    if (playerInfo.name === lookupName) {
      return id; // Return player ID if name and team match
    }
  }
  return null;
}

jsonData.forEach((entry: any) => {
  if (entry["实时数据"]) {
    const rtData = entry["实时数据"];
    const newRtData: any = {};

    for (const playerName in rtData) {
      const [team, , name] = playerName.split("#");
      const playerId = getPlayerIdByNameAndTeam(name);

      if (playerId) {
        newRtData[playerId] = rtData[playerName]; // Use ID as key if matched
      } else {
        console.log(`Unmatched player: ${playerName}`);
        newRtData[playerName] = rtData[playerName]; // Retain original name if unmatched
      }
    }

    // Replace the "实时数据" key with "rt" and assign modified data
    entry.rt = newRtData;
    delete entry["实时数据"];
  }
});

const outputPath = path.join(__dirname, "rt-rename.json");
// Save to a JSON file
fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2), "utf8");
