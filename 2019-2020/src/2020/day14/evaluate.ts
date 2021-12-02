import { solution } from './solution';
import { readInput } from '../../utils';

/* Get + clean input */
const input = readInput('input.txt');

/* Results */
const result = solution(input);
console.log(`Part 1 Solution: ${result.part1}`);
console.log(`Part 2 Solution: ${result.part2}`);
