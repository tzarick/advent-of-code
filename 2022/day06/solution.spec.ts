import { expect } from 'chai';
import { describe } from 'mocha';
import { solution } from './solution';

const testCases = [
  {
    part: 1,
    input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
    expected: 7,
  },
  {
    part: 1,
    input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
    expected: 5,
  },
  {
    part: 1,
    input: `nppdvjthqldpwncqszvftbrmjlhg`,
    expected: 6,
  },
  {
    part: 1,
    input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
    expected: 10,
  },
  {
    part: 1,
    input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
    expected: 11,
  },
  {
    part: 2,
    input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
    expected: 19,
  },
  {
    part: 2,
    input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
    expected: 23,
  },
  {
    part: 2,
    input: `nppdvjthqldpwncqszvftbrmjlhg`,
    expected: 23,
  },
  {
    part: 2,
    input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
    expected: 29,
  },
  {
    part: 2,
    input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
    expected: 26,
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
