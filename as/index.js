"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
// Terminaldan input olish
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Mashina tanlash
rl.question("Qaysi mashina? (tayotta / hundai): ", (carType) => {
    const mashina = carType.trim().toLowerCase();
    if (mashina === "tayotta") {
        const child = (0, child_process_1.fork)(path_1.default.join(__dirname, "tayotta.js")); // .js kerak chunki ts compile bo'ladi
        rl.question("Tayotta uchun nimani bilmoqchisiz? (color, price, ...): ", (query) => {
            child.send(query);
            child.on("message", (msg) => {
                console.log(`[index.ts] ➤ Javob: ${msg}`);
                rl.close();
            });
        });
    }
    else if (mashina === "hundai") {
        const child = (0, child_process_1.spawn)("node", [path_1.default.join(__dirname, "hundai.js")]);
        child.stdout.on("data", (data) => {
            console.log(`[index.ts] ➤ Javob: ${data.toString().trim()}`);
            rl.close();
        });
        rl.question("Hundai uchun nimani bilmoqchisiz? (color, price, ...): ", (query) => {
            child.stdin.write(`${query}\n`);
        });
    }
    else {
        console.log("Faqat 'tayotta' yoki 'hundai' yozing.");
        rl.close();
    }
});
