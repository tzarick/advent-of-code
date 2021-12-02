import { solution } from './solution';
import { readInput } from '../../utils';

/* Clean input */
const rawInput = readInput('input.txt');
const cleanInput = (input: string) => {
  return input.split(/\s+/).map((item) => parseInt(item));
};

const input = cleanInput(rawInput);

/* Results */
console.log(`Part 1 Solution: ${solution(input).part1}`);
console.log(`Part 2 Solution: ${solution(input).part2}`);
