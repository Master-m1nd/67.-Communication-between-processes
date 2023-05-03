import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url';

// Taks 1

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const book = 'The Wind in the Willows (introductory fragment).txt';

const readStream = fs.createReadStream(path.join(__dirname, '/files', book), { highWaterMark: 1024 });
const writeStream = fs.createWriteStream(path.join(__dirname, '/files', 'book_copy.txt'));
console.log(readStream.readableHighWaterMark);

readStream.on('data', (chunk)=>{
    writeStream.write('\n--Introductory fragment, copying is prohibited!--\n');
    writeStream.write(chunk);
    writeStream.write('\n--Introductory fragment, copying is prohibited!--\n');
});

// Task 2

const log = process.stdin.on('data', data=>{
    console.log(process.stdout.write(data + '\n'))
});

// Task 3

const ask = (question) => {
    return new Promise((resolve, reject) => {
      process.stdout.write(question);
      process.stdin.once('data', (data) => {
        if (['y', 'Y', 'YES', 'yes', 'n', 'N', 'no', 'NO'].includes(data.toString().trim())) {
          resolve(data.toString().trim());
        } else {
          reject(new Error('Invalid response format'));
        }})})};
  (async () => {
    try {
      const first_question = await ask('Do you want to use SCSS?');
      const second_question = await ask('Do you want to use ESLint?');
      process.exit();
    } catch (error) {
      process.stderr.write(error.message);
      process.exit(1);
    }
  })();
  