import { solution } from './solution';
import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt')).toString();

/* Results */

const result = solution(input);
console.log(`Part 1 Solution: ${result.part1}`);
console.log(`Part 2 Solution: ${result.part2}`);
