interface result {
  part1: number;
  part2: number;
}

export const solution = (input: string): result => {
  const sacks = input.split(/\r?\n/);

  // Part 1
  let totalPriority = 0;
  for (const sack of sacks) {
    totalPriority += getPriorityOfDuplicate(sack);
  }

  // Part 2
  let totalGroupBadgePriority = 0;
  for (let i = 0; i < sacks.length; i += 3) {
    totalGroupBadgePriority += getGroupBadgePriority(sacks.slice(i, i + 3));
  }

  return {
    part1: totalPriority,
    part2: totalGroupBadgePriority
  };
};

const getPriorityOfDuplicate = (contents: string): number => {
  let left = 0;
  let right = contents.length - 1;

  let frequencyMap: { [key: string]: number; } = {};

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

const getGroupBadgePriority = (sacks: string[]): number => {
  const lengths = sacks.map(item => item.length);
  const maxLen = Math.max(...lengths);

  let frequencyMap: { [key: string]: boolean[]; } = {}; // letter -> [seen?, seen?, seen?] 

  for (let i = 0; i < maxLen; i++) {
    let currIndexChars = [];
    for (let j = 0; j < sacks.length; j++) {
      if (i < lengths[j]) {
        currIndexChars.push(sacks[j].charAt(i));
      } else {
        currIndexChars.push(undefined);
      }
    }

    for (let k = 0; k < currIndexChars.length; k++) {
      const char = currIndexChars[k];
      if (!char) continue;
      const currentFreq = frequencyMap[char];

      if (currentFreq) {
        frequencyMap[char][k] = true;
        if (frequencyMap[char].every(item => item === true)) {
          return getPriority(char);
        }
      } else {
        let seenArray = [false, false, false];
        seenArray[k] = true;
        frequencyMap[char] = seenArray;
      }
    }
  }

  throw new Error('Unable to find common badge');
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
