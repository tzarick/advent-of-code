import { expect } from 'chai';
import { describe } from 'mocha';
import { readInput } from '../../utils';
import { solution } from './solution';

const testCases = [
  {
    part: 1,
    input: `abc

a
b
c

ab
ac

a
a
a
a

b`,
    expected: 11,
  },
  {
    part: 2,
    input: `abc

a
b
c

ab
ac

a
a
a
a

b`,
    expected: 6,
  },
];

describe('Solution Test Cases - Day 6', () => {
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
