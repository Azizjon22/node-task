const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Asosiy sahifa");
    res.end();
  }
  if (req.url === "/api/books") {
    res.write(JSON.stringify(["Code Complite", "Clean Code", "Refactoring"]));
    res.end();
  }
});

// server.on('connection',(socket)=>{
//     console.log('Yangi boglash...');
// })

server.listen(8000);
console.log(`${server.address().port} portni ewtwi boshladim....`);
