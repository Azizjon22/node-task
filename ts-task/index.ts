import { fork, spawn } from "child_process";
import path from "path";
const prompt = require("prompt-sync")();

function start(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const carType = prompt("[index.ts] > Qaysi mashina? (tayotta / hundai): ").toLowerCase();

      if (carType === "tayotta") {
        const childFork = fork(path.join(__dirname, "tayotta.ts"), [], {
          execArgv: ["-r", "ts-node/register"],
        });

        const query = prompt("[index.ts] > Tayotta uchun nimani bilmoqchisiz? (color, price, year, mileage, engine, fuel, all): ");
        childFork.send(query.toLowerCase());

        childFork.on("message", (msg) => {
          console.log(`[index.ts] > Tayotta javob: ${msg}`);
          resolve(); 
        });

      } else if (carType === "hundai") {
        const tsNodePath = path.join(__dirname, 'node_modules', '.bin', 'ts-node.cmd');
        const childSpawn = spawn(tsNodePath, [path.join(__dirname, "Hudai.ts")]);

        childSpawn.stdout.on("data", (data) => {
          console.log(`[index.ts] > Hundai javob:\n${data.toString().trim()}`);
          resolve(); 
        });

        childSpawn.stderr.on("data", (data) => {
          reject(`[index.ts] > Hundai xatolik: ${data.toString()}`);
        });

        const query = prompt("[index.ts] > Hundai uchun nimani bilmoqchisiz? (color, price, year, mileage, engine, fuel, all): ");
        childSpawn.stdin.write(`${query.toLowerCase()}\n`);

      } else {
        console.log("[index.ts] > Noto‘g‘ri tanlov. Faqat 'tayotta' yoki 'hundai' yozing.");
        resolve(); 
      }

    } catch (err) {
      reject(`[index.ts] > Xatolik: ${err}`);
    }
  });
}

start()
  .then(() => console.log("[index.ts] > Jarayon tugadi."))
  .catch((err) => console.error(err));
