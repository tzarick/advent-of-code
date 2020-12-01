import _ from 'lodash';

type result = {
  part1: number;
  part2: number;
};

export const solution = (inputReport: string): result => {
  /* Part 1 */
  const entries = parseInput(inputReport);
  let solution1 = -1;

  // for all nested loops, start searching at the next highest index from the parent loop index, we've already scanned all the lower ones

  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      if (entries[i] + entries[j] === 2020) {
        solution1 = entries[i] * entries[j];
      }
    }
  }

  /* Part 2 */
  let solution2 = -1;
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      for (let k = j + 1; k < entries.length; k++) {
        if (entries[i] + entries[j] + entries[k] === 2020) {
          solution2 = entries[i] * entries[j] * entries[k];
        }
      }
    }
  }

  return {
    part1: solution1,
    part2: solution2,
  };
};

const parseInput = (inputString: string) => {
  return inputString.split('\n').map((item) => parseInt(item));
};
