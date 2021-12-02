import { expect } from 'chai';
import { describe } from 'mocha';
import { readInput } from '../../utils';
import { solution } from './solution';

const testCases = [
  {
    part: 1,
    input: `939
7,13,x,x,59,x,31,19`,
    expected: 295,
  },
  {
    part: 2,
    input: `939
7,13,x,x,59,x,31,19`,
    expected: 1068781n, // bigint literal
  },
  {
    part: 2,
    input: `939
17,x,13,19`,
    expected: 3417n,
  },
  {
    part: 2,
    input: `939
67,7,59,61`,
    expected: 754018n,
  },
  {
    part: 2,
    input: `939
67,x,7,59,61`,
    expected: 779210n,
  },
  {
    part: 2,
    input: `939
67,7,x,59,61`,
    expected: 1261476n,
  },
  {
    part: 2,
    input: `939
1789,37,47,1889`,
    expected: 1202161486n,
  },
];

describe('Solution Test Cases - Day 13', () => {
  describe('Part 1', () => {
    const part1TestCases = testCases.filter((item) => item.part === 1);
    for (let i = 0; i < part1TestCases.length; i++) {
      const { input, expected } = part1TestCases[i];

      it(`Case ${i + 1}`, () => {
        expect(solution(input).part1).to.equal(expected);
      });
    }
  });

  describe('Part 2', () => {
    const part2TestCases = testCases.filter((item) => item.part === 2);
    for (let i = 0; i < part2TestCases.length; i++) {
      const { input, expected } = part2TestCases[i];

      it(`Case ${i + 1}`, () => {
        expect(solution(input).part2).to.equal(expected);
      });
    }
  });
});
