import { expect } from 'chai';
import { describe } from 'mocha';
import { readInput } from '../../utils';
import { solution } from './solution';

// type Case = {
//   part: number, // part 1 or 2
//   input: any,
//   expected: any
// }

const testCases = [
  {
    part: 1,
    input: [12, 14, 1969, 100756],
    expected: 34241,
  },
  {
    part: 2,
    input: [12, 14, 1969, 100756],
    expected: 51316,
  },
  // { // before sum
  //   part: 2,
  //   input: [12, 14, 1969, 100756],
  //   expected: [2, 2, 966, 50346],
  // },
];

describe('Solution Test Cases - Day 1', () => {
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
