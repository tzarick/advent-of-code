import { expect } from 'chai';
import { describe } from 'mocha';
import { solution } from './solution';

const testCases = [
  {
    part: 1,
    input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
    expected: 2,
  },
  {
    part: 2,
    input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
    expected: 4,
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
