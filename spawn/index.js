// const { spawn } = require('child_process');

// const dir = spawn('cmd', ['/c', 'dir']);

// dir.stdout.on('data', (data) => {
//   console.log(`Natija:\n${data.toString()}`);
// });

// dir.stderr.on('data', (data) => {
//   console.error(`Xato:\n${data.toString()}`);
// });




// const { spawn } = require('child_process');

// // Windows terminal komandasi: cmd /c dir
// const dir = spawn('cmd', ['/c', 'dir']);

// dir.stdout.on('data', (data) => {
//   console.log(`Natija:\n${data.toString()}`);
// });

// dir.stderr.on('data', (data) => {
//   console.error(`Xato:\n${data.toString()}`);
// });

// dir.on('close', (code) => {
//   console.log(`Jarayon tugadi, kod: ${code}`);
// });



// const { spawn } = require('child_process');
// const python = spawn('python', ['model.py']);

// python.stdout.on('data', data => {
//   console.log(`Natija: ${data.toString()}`);
// });


// const { spawn } = require('child_process');
// const backup = spawn('mysqldump', ['-u', 'root', '-p', 'mydb']);

// backup.stdout.pipe(fs.createWriteStream('backup.sql'));



// const { spawn } = require('child_process');
// const pdf = spawn('wkhtmltopdf', ['input.html', 'output.pdf']);



// const fs = require('fs');
// const path = require('path');

// const dirs = ['scripts', 'backup', 'output'];
// const files = ['index.js', 'README.md'];
// const scriptFile = path.join('scripts', 'script.py');

// dirs.forEach(dir => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
//     console.log(`Papka yaratildi: ${dir}`);
//   }
// });

// files.forEach(file => {
//   if (!fs.existsSync(file)) {
//     fs.writeFileSync(file, '');
//     console.log(`Fayl yaratildi: ${file}`);
//   }
// });

// if (!fs.existsSync(scriptFile)) {
//   fs.writeFileSync(scriptFile, '# Python fayli');
//   console.log(`Fayl yaratildi: ${scriptFile}`);
// }



// const { spawn } = require('child_process');
// const path = require('path');

// const python = spawn('python', [path.join(__dirname, 'scripts', 'script.py')]);

// python.stdout.on('data', (data) => {
//   console.log(`Python natijasi:\n${data.toString()}`);
// });

// python.stderr.on('data', (data) => {
//   console.error(`Xatolik:\n${data.toString()}`);
// });

// python.on('close', (code) => {
//   console.log(`Python jarayoni tugadi. Chiqish kodi: ${code}`);
// });

