const express = require("express");
const app = express();
const autofikatsa = require("./autofikatsa");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const books = require("./routes/books");
const home = require("./routes/home");

console.log("Mail server parol:", config.get("mailserver.password"));

app.use(express.json()); //middleware bo‘lib, u Express.js ga kelayotgan so‘rov (request) tanasidagi (body) JSON formatdagi ma’lumotni o‘qib, avtomatik req.body ga joylashtiradi.
app.use(express.urlencoded({ extended: true })); // Express.js’dagi middleware, u sizga HTML formasi orqali kelgan ma’lumotlarni req.body ga o‘qib olish imkonini beradi.
app.use(autofikatsa);
app.use(express.static("public")); // Express.js ilovangizga statik fayllar (HTML, CSS, JS, rasmlar, musiqa, video va h.k.) ni tashqi tomonga ko‘rsatishga imkon beradi.
app.use(helmet()); // Express.js uchun xavfsizlikni ta'minlovchi middleware bo‘lib, HTTP sarlavhalari (headers) orqali turli xavfsizlik choralarini qo‘shadi.
app.use(morgan("tiny")); // Express.js ilovasi uchun HTTP so‘rovlarni log (yozuv) qilib boradigan middleware. 1 ta misol get so'rovlar
app.set("view engine", "pug");
app.use("/api/books", books);
app.use("/", home);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Logger iwlamiyapdi..."); // dasturni iwlash muh xitni aniqlashtrib olindi
}

console.log(process.env.NODE_ENV);
console.log(app.get("env"));

console.log(config.get("name"));
console.log(config.get("mailserver.host"));
console.log(config.get("mailserver.password"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`${port}-chi port eshitilyapti...`);
});
