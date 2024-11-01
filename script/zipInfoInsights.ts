import * as fs from "fs";
import * as path from "path";

const insightFilePath = path.join(__dirname, "../data/gameInsights.json");
const infoFilePath = path.join(__dirname, "../data/gameInfo.json");
const insights = JSON.parse(fs.readFileSync(insightFilePath, "utf8"));
const info = JSON.parse(fs.readFileSync(infoFilePath, "utf8"));

for (let i = 0; i < insights.length; i++) {
    const { event_type, event_description } = insights[i];
    info[i] = { ...info[i], event_type, event_description };
}

fs.writeFileSync(infoFilePath, JSON.stringify(info, null, 2));