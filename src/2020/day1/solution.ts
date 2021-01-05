type result = {
  part1: number;
  part2: number;
};

// basically seems like part 1 = 2sum and part 2 = 3sum
export const solution = (inputReport: string): result => {
  /* Part 1 */
  const entries = parseInput(inputReport);
  // const solution1 = initialSolution1(entries);
  // const solution1 = betterSolution1(entries);
  const solution1 = bettererSolution1(entries);

  /* Part 2 */
  const solution2 = betterSolution2(entries);

  return {
    part1: solution1,
    part2: solution2,
  };
};

const parseInput = (inputString: string) => {
  return inputString.split('\n').map((item) => parseInt(item));
};

const initialSolution1 = (entries: number[]): number => {
  let solution1 = -1;

  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      if (entries[i] + entries[j] === 2020) {
        solution1 = entries[i] * entries[j];
      }
    }
  }

  return solution1;
};

const betterSolution1 = (entries: number[]): number => {
  let solution = -1;

  let left = 0;
  let right = entries.length - 1;
  const sortedEntries = entries.sort((a, b) => a - b); // ascending

  while (left < right && solution === -1) {
    let sum = sortedEntries[left] + sortedEntries[right];
    if (sum > 2020) {
      right--;
    } else if (sum < 2020) {
      left++;
    } else {
      solution = sortedEntries[left] * sortedEntries[right];
    }
  }

  return solution;
};

const bettererSolution1 = (entries: number[]): number => {
  let solution = -1;

  let map = new Map<number, number>(); // (value, index)
  for (let i = 0; i < entries.length && solution === -1; i++) {
    const matchIndex = map.get(2020 - entries[i]);
    // if there exists a value in the map that satisfies our equation, choose it, otherwise add it
    if (matchIndex !== undefined) {
      solution = entries[i] * entries[matchIndex];
    } else {
      map.set(entries[i], i);
    }
  }

  return solution;
};

const initialSolution2 = (entries: number[]): number => {
  // for all nested loops, start searching at the next highest index from the parent loop index, we've already scanned all the lower ones
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

  return solution2;
};

const betterSolution2 = (entries: number[]): number => {
  let solution = -1;

  for (let i = 0; i < entries.length && solution < 0; i++) {
    const twoSumTarget = 2020 - entries[i];
    // check if there is a 2sum solution to this new target
    let twoSumSolution = -1;
    let map = new Map<number, number>(); // value, index
    for (let j = 0; j < entries.length && twoSumSolution < 0; j++) {
      const matchIndex = map.get(twoSumTarget - entries[j]);
      if (matchIndex !== undefined && j !== i) {
        twoSumSolution = entries[j] * entries[matchIndex];
      } else {
        map.set(entries[j], j);
      }
    }

    if (twoSumSolution > 0) {
      solution = entries[i] * twoSumSolution;
    }
  }

  return solution;
};
