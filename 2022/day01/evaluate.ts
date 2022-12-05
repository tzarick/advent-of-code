import { solution } from './solution';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();
console.log(input);

const readStream = fs.createReadStream(path.join(__dirname, 'input.txt'));
const rl = readline.createInterface({
  input: readStream,
  crlfDelay: Infinity
});

// throw 1;

/* Results */
(async () => {
  const result = await solution(rl);
  console.log(`Part 1 Solution: ${result.part1}`);
  console.log(`Part 2 Solution: ${result.part2}`);
})();
