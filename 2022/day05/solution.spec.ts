import { expect } from 'chai';
import { describe } from 'mocha';
import { solution } from './solution';

const testCases = [
  {
    part: 1,
    input:
      `    [D]    
[N] [C]    
[Z] [M] [P]
  1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
    expected: 'CMZ',
  },
  {
    part: 2,
    input:
      `    [D]    
[N] [C]    
[Z] [M] [P]
  1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
    expected: 'MCD',
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
