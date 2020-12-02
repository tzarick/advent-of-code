import { solution } from './solution';
import { readInput } from '../../utils';

/* Get + clean input */
const input = readInput('input.txt');

/* Results */
console.log(`Part 1 Solution: ${solution(input).part1}`);
console.log(`Part 2 Solution: ${solution(input).part2}`);
