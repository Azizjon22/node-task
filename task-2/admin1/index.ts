import fs from 'fs';
import path from 'path';
import promptSync from 'prompt-sync';

const prompt = promptSync();

const sourceDir = path.join(__dirname); 
const destDir = path.join(__dirname, '../admin2');

async function copySelectedFile() {
  try {
    const files = await fs.promises.readdir(sourceDir);

    const validFiles = files.filter(file =>
      file.endsWith('.mp4') || file.endsWith('.mp3') || file.endsWith('.txt')
    );

    if (validFiles.length === 0) {
      console.log(' Ko‘chiriladigan fayl yo‘q.');
      return;
    }

    console.log('\n📁 Mavjud fayllar:');
    validFiles.forEach((file, i) => {
      console.log(`  ${i + 1}. ${file}`);
    });

    const selected = prompt('\n🔍 Qaysi faylni ko‘chirmoqchisiz? Fayl nomini aynan yozing: ').trim();

    if (!validFiles.includes(selected)) {
      console.log(' Bunday fayl topilmadi.');
      return;
    }

    const srcPath = path.join(sourceDir, selected);
    const destPath = path.join(destDir, selected);

    const { size: totalSize } = await fs.promises.stat(srcPath);
    let copiedSize = 0;

    const readStream = fs.createReadStream(srcPath);
    const writeStream = fs.createWriteStream(destPath);

    readStream.on('data', (chunk) => {
      copiedSize += chunk.length;
      const percent = Math.floor((copiedSize / totalSize) * 100);
      process.stdout.write(`\r🚚 Ko‘chirilmoqda: ${percent}%`);
    });

    
    await new Promise<void>((resolve, reject) => {
      readStream.pipe(writeStream); 
      writeStream.on('finish', resolve); 
      writeStream.on('error', reject);
      readStream.on('error', reject);
    });

    console.log(`\n ${selected} muvaffaqiyatli ko‘chirildi!`);

    await fs.promises.rm(srcPath);
    console.log(`🗑️  ${selected} fayli admin1 dan o‘chirildi.`);

  } catch (err) {
    console.error('\n Xatolik:', err);
  }
}

copySelectedFile();