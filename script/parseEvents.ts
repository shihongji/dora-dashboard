// import required modules
import * as fs from "fs";
import * as path from "path";

const eventFileName = "1013_events.json";
const eventFilePath = path.join(__dirname, "../data", eventFileName);
const events = JSON.parse(fs.readFileSync(eventFilePath, "utf8"));

// Describe the basic information of the data

const actionFrequency = new Map<string, number>();

events.forEach((event: any) => {
    const action = event?.action;
    if (action === undefined) {
        return;
    }
    if (actionFrequency.has(action)) {
        actionFrequency.set(action, actionFrequency.get(action)! + 1);
    } else {
        actionFrequency.set(action, 1);
    }
});

console.log("Game name:", eventFileName.split(".")[0]);
console.log("Number of events:", events.length);
console.log("Number of events with scores:", events.filter((event: any) => event.home_team.score).length);
const targets = events
    .filter((event: any) => event.home_team.score)
    .map((event: any) => ({
        video_time: event.video_time,
        home_score: event.home_team.score,
        away_score: event.away_team.score,
    }));

console.log(targets);
console.log("Action frequency:");
const sortedActionFrequency = Array.from(actionFrequency.entries()).sort((a, b) => b[1] - a[1]);
sortedActionFrequency.forEach(([action, frequency]) => {
    console.log(`Action: ${action}, Frequency: ${frequency}`);
});