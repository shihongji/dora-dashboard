import * as fs from "fs";
import * as path from "path";

// Load the JSON data
const jsonData = fs.readFileSync(
  path.join(__dirname, "../data/0406_pre_rt.json"),
  "utf-8"
);
// Step-by-step transformation
let lines = jsonData.split("\n"); // Split by line for each entry
// Filter the first 20 lines
lines = lines.filter((_, index) => index % 60 === 0);


const transformedLines = lines.map((line, index) => {
  // Convert any tuple-like values to array format
//   line = line.replace(/(\d+),\s*(\d+)/g, "[$1, $2]");
  // If it's not the last line, add a comma at the end
  if (index < lines.length - 1) {
    line += ",";
  }

  return line;
});

// Join all lines and wrap in an array to form valid JSON
const validJson = `[\n${transformedLines.join("\n")}\n]`;

try {
  // Parse to ensure it's valid JSON
  const parsedData = JSON.parse(validJson);
  parsedData.forEach((entry: any) => {
    if (entry["实时数据"]) {
      const rtData = entry["实时数据"];
  
      // Replace the "实时数据" key with "rt" and assign modified data
      entry.rt = rtData;
      delete entry["实时数据"];
    }
  });
  const outputPath = path.join(__dirname, "0406_rt.json");
  // Save to a JSON file
  fs.writeFileSync(outputPath, JSON.stringify(parsedData, null, 2), "utf8");

  console.log(
    "Real-time data has been successfully parsed and saved to rt-test.json"
  );
} catch (error) {
  console.error("Error parsing JSON:", error);
}


