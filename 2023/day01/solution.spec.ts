import { expect } from 'chai';
import { describe } from 'mocha';
import { solution } from './solution';

const testCases = [
  {
    part: 1,
    input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
    expected: 142,
  },
  {
    part: 2,
    input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
    expected: 281,
  },
];

describe('Solution Test Cases - Day 01', () => {
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
