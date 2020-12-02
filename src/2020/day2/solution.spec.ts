import { expect } from 'chai';
import { describe } from 'mocha';
import { readInput } from '../../utils';
import { solution } from './solution';

const testCases = [
  {
    part: 1,
    input: `1-3 a: abcde
    1-3 b: cdefg
    2-9 c: ccccccccc`,
    expected: 1,
  },
  {
    part: 2,
    input: `1-3 a: abcde
    1-3 b: cdefg
    2-9 c: ccccccccc`,
    expected: 1,
  },
];

describe('Solution Test Cases - Day 2', () => {
  describe('Part 1', () => {
    const part1TestCases = testCases.filter((item) => item.part === 1);
    for (let i = 0; i < part1TestCases.length; i++) {
      const { input, expected } = part1TestCases[i];

      it(`Case ${i + 1}`, () => {
        expect(solution(input).part1).to.deep.equal(expected);
      });
    }
  });

  describe('Part 2', () => {
    const part2TestCases = testCases.filter((item) => item.part === 2);
    for (let i = 0; i < part2TestCases.length; i++) {
      const { input, expected } = part2TestCases[i];

      it(`Case ${i + 1}`, () => {
        expect(solution(input).part2).to.deep.equal(expected);
      });
    }
  });
});
