const fs = require('fs')

// const files = fs.readdirSync('./')
// console.log(files);

// fs.readdir('./', function (err,files) {
//     if(err)
//     console.log(err);
//     else
//     console.log(files);
// })


// fs.readFile('./index.js','utf-8', function (err, filesContent) {
//     if(err)
//     throw err
    
//     console.log(filesContent);
// })

// fs.writeFile('index.txt', 'salom', (err) =>{
//     if (err)
//     console.log('Yozishda xatolik:', err);
//     else
//     console.log('Fayl muvaffaqiyatli yozildi!');
// } )





// fs.rename('index.txt', 'olma.ts', (err) => {
//     if(err)
//     console.log('ozgatrwda xatolik', err);
//     else
//     console.log('fayl nomi ozgardi');
// })


// fs.unlink('olma.ts', err =>{
//     if(err)
//     console.log('file ochrlmadi',err);
//     else
//     console.log('file ochrldi');
// })