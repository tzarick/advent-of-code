import { solution } from './solution';
import { readInput } from '../../utils';

/* Get + clean input */
const input = readInput('input.txt');
const windowSize = 25;

/* Results */
const result = solution(input, windowSize);
console.log(`Part 1 Solution: ${result.part1}`);
console.log(`Part 2 Solution: ${result.part2}`);
