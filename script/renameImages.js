"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs/promises");
var path = require("path");
// Paths
var imagesDir = path.join(__dirname, '../public/images/players');
var jsonFilePath = path.join(__dirname, '../data/players_info/2022_player_2.json');
// Main function to rename image files
function renameImages() {
    return __awaiter(this, void 0, void 0, function () {
        var jsonData, players, playerMap_1, files, _i, files_1, file, filePath, playerName, playerId, newFilePath, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, fs.readFile(jsonFilePath, 'utf-8')];
                case 1:
                    jsonData = _a.sent();
                    players = JSON.parse(jsonData);
                    playerMap_1 = new Map();
                    players.forEach(function (player) {
                        playerMap_1.set(player.球员, player.ID);
                    });
                    return [4 /*yield*/, fs.readdir(imagesDir)];
                case 2:
                    files = _a.sent();
                    _i = 0, files_1 = files;
                    _a.label = 3;
                case 3:
                    if (!(_i < files_1.length)) return [3 /*break*/, 7];
                    file = files_1[_i];
                    filePath = path.join(imagesDir, file);
                    playerName = file.replace('.jpg', '');
                    // Check, if the filePath starts with number, then skip
                    if (!isNaN(parseInt(playerName[0]))) {
                        return [3 /*break*/, 6];
                    }
                    playerId = playerMap_1.get(playerName);
                    if (!playerId) return [3 /*break*/, 5];
                    newFilePath = path.join(imagesDir, "".concat(playerId, ".jpg"));
                    return [4 /*yield*/, fs.rename(filePath, newFilePath)];
                case 4:
                    _a.sent();
                    console.log("Renamed: ".concat(file, " -> ").concat(playerId, ".jpg"));
                    return [3 /*break*/, 6];
                case 5:
                    console.warn("No ID found for player: ".concat(playerName, ", skipping."));
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7:
                    console.log('Image renaming complete.');
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error('Error renaming images:', error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
// Run the script
renameImages();
