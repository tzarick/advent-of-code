interface result {
  part1: number;
  part2: number;
}

export const solution = (inputSequence: string, windowSize: number): result => {
  /* Part 1 */
  const xmasData = parseInput(inputSequence);
  let xmasPointer = windowSize; // start looking after the preamble
  let isValid = true;

  while (xmasPointer < xmasData.length && isValid) {
    xmasPointer++;
    isValid = has2Sum(xmasData, xmasPointer, windowSize);
  }

  const firstInvalidData = xmasData[xmasPointer];

  /* Part 2 */
  let weaknessCode = -1; // smallest + largest number in weakness range
  let i = 0;
  // check each index for the weakness (a contiguous set of at least two numbers which sum to firstInvalidData)
  while (i < xmasData.length && weaknessCode < 0) {
    weaknessCode = findWeaknessCode(xmasData, i, firstInvalidData);
    i++;
  }

  return {
    part1: firstInvalidData,
    part2: weaknessCode,
  };
};

const parseInput = (input: string): number[] => {
  return input.split(/\r?\n/).map(Number);
};

const has2Sum = (
  data: number[],
  testIndex: number,
  window: number
): boolean => {
  let has2Sum = false;
  let visited = new Map<number, number>(); // value, index
  const target = data[testIndex];

  let i = testIndex - window;

  while (i < testIndex && !has2Sum) {
    const matchIndex = visited.get(target - data[i]);
    if (matchIndex && matchIndex > -1 && data[i] !== data[matchIndex]) {
      has2Sum = true;
    } else {
      visited.set(data[i], i);
    }

    i++;
  }

  return has2Sum;
};

// if the weakness is found, return the end index of the weakness range, otherwise -1
const findWeaknessRange = (
  data: number[],
  startIndex: number,
  target: number
): number => {
  let sum = 0;
  let i = startIndex;
  while (sum < target && data[i] < target && i < data.length) {
    sum += data[i];
    // when we find it, make sure the sequence is at least two digits
    if (sum === target && i - startIndex >= 1) {
      return i;
    }
    i++;
  }

  return -1;
};

// if weakness is found return the weakness code (the smallest + largest number in the weakness range), otherwise -1
const findWeaknessCode = (
  data: number[],
  startIndex: number,
  target: number
): number => {
  let weaknessCode = -1;
  const weaknessRangeEndIdx = findWeaknessRange(data, startIndex, target);

  if (weaknessRangeEndIdx > -1) {
    const weaknessRange = data.slice(startIndex, weaknessRangeEndIdx + 1);
    const min = Math.min(...weaknessRange);
    const max = Math.max(...weaknessRange);

    weaknessCode = min + max;
  }

  return weaknessCode;
};
