import { fork, spawn } from "child_process";
import path from "path";
import readline from "readline";

// Terminaldan input olish
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Mashina tanlash
rl.question("Qaysi mashina? (tayotta / hundai): ", (carType) => {
  const mashina = carType.trim().toLowerCase();

  if (mashina === "tayotta") {
    const child = fork(path.join(__dirname, "tayotta.js")); // .js kerak chunki ts compile bo'ladi

    rl.question("Tayotta uchun nimani bilmoqchisiz? (color, price, ...): ", (query) => {
      child.send(query);
      child.on("message", (msg) => {
        console.log(`[index.ts] ➤ Javob: ${msg}`);
        rl.close();
      });
    });

  } else if (mashina === "hundai") {
    const child = spawn("node", [path.join(__dirname, "hundai.js")]);

    child.stdout.on("data", (data) => {
      console.log(`[index.ts] ➤ Javob: ${data.toString().trim()}`);
      rl.close();
    });

    rl.question("Hundai uchun nimani bilmoqchisiz? (color, price, ...): ", (query) => {
      child.stdin.write(`${query}\n`);
    });

  } else {
    console.log("Faqat 'tayotta' yoki 'hundai' yozing.");
    rl.close();
  }
});
