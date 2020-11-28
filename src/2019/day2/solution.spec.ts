import { expect } from 'chai';
import { describe } from 'mocha';
import { readInput } from '../../utils';
import { solution } from './solution';

const testCases = [
  {
    part: 1,
    input: '1,9,10,3,2,3,11,0,99,30,40,50',
    expected: '3500,9,10,70,2,3,11,0,99,30,40,50',
  },
  {
    part: 1,
    input: '1,0,0,0,99',
    expected: '2,0,0,0,99',
  },
  {
    part: 1,
    input: '2,3,0,3,99',
    expected: '2,3,0,6,99',
  },
  {
    part: 1,
    input: '2,4,4,5,99,0',
    expected: '2,4,4,5,99,9801',
  },
  {
    part: 1,
    input: '1,1,1,4,99,5,6,0,99',
    expected: '30,1,1,4,2,5,6,0,99',
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
