interface result {
  part1: number;
  part2: number;
}

export const solution = (input: string): result => {
  const sacks = input.split(/\r?\n/);

  let totalPriority = 0;
  for (const sack of sacks) {
    totalPriority += getPriorityOfDuplicate(sack);
  }

  return {
    part1: totalPriority,
    part2: 0
  };
};

const getPriorityOfDuplicate = (contents: string): number => {
  let left = 0;
  let right = contents.length - 1;

  let frequencyMap: { [key: string]: number; } = {}; // letter -> frequency

  while (left < right) {
    const leftChar = contents[left];
    const rightChar = contents[right];

    // left side has seen char -> represented by a 1
    // right side has seen char -> represented by a -1

    if (frequencyMap[leftChar] === -1) {
      return getPriority(leftChar);
    } else {
      frequencyMap[leftChar] = 1;
    }

    if (frequencyMap[rightChar] === 1) {
      return getPriority(rightChar);
    } else {
      frequencyMap[rightChar] = -1;
    }

    left++;
    right--;
  }

  throw new Error(`Unable to find duplicate for sack: [${contents}]`);
};

const PRIORITY_ADJUSTMENT = {
  upper: 38,
  lower: 96
};

const getPriority = (char: string): number => {
  if (char.charCodeAt(0) > PRIORITY_ADJUSTMENT.lower) {
    return char.charCodeAt(0) - PRIORITY_ADJUSTMENT.lower;
  } else {
    return char.charCodeAt(0) - PRIORITY_ADJUSTMENT.upper;
  }
};
