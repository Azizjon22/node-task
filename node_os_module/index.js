const os = require('os')
const osObj = os.freemem()
const userInfo = os.userInfo()

console.log(`bo'sh xotira ${osObj}`);
console.log(`Foydalanuchi haqida: ${userInfo.username}`);