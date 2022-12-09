interface result {
  part1: string;
  part2: string;
}

interface Direction {
  src: number;
  dst: number;
  count: number;
}

export const solution = (input: string): result => {
  let [stacks1, directions] = parseInput(input);

  const stacks2 = stacks1.map(item => [...item]); // create a deep copy of the inital state so we can run part 2 later

  rearrange1(stacks1, directions);
  const topCrates1 = getTopCrates(stacks1);

  rearrange2(stacks2, directions);
  const topCrates2 = getTopCrates(stacks2);

  return {
    part1: topCrates1,
    part2: topCrates2
  };
};

// modify stacks array
const rearrange1 = (stacks: string[][], directions: Direction[]): void => {
  for (const dir of directions) {
    for (let i = 0; i < dir.count; i++) {
      const crate = stacks[dir.src].pop();
      if (crate) {
        stacks[dir.dst].push(crate);
      } else {
        break;
      }
    }
  }
};

const getTopCrates = (stacks: string[][]): string => {
  return stacks.map(stack => stack[stack.length - 1]).reduce((a, b) => `${a}${b}`, '');
};

const rearrange2 = (stacks: string[][], directions: Direction[]): void => {
  for (const dir of directions) {
    const crates = stacks[dir.src].splice(-(dir.count));
    stacks[dir.dst] = stacks[dir.dst].concat(crates);
  }
};

const parseInput = (input: string): [string[][], Direction[]] => {
  const [stackRepresentation, directionsRaw] = input.split(/\r?\n\r?\n/);

  const stacks = parseStacks(stackRepresentation);
  const directions = parseDirections(directionsRaw);

  return [stacks, directions];
};

const parseStacks = (stackInputRaw: string): string[][] => {
  const lines = stackInputRaw.split(/\r?\n/);

  const totalStackCount = getTotalStackCount(lines[lines.length - 1]);
  let stacks = getEmptyStackList(totalStackCount);

  // build from the bottom up, skipping the number line at the bottom
  for (let i = lines.length - 2; i >= 0; i--) {
    const currLine = lines[i];

    for (let j = 1; j < currLine.length; j += 4) { // the chars we care about are 4 chars away from each other
      const char = currLine[j];
      if (char.trim()) {
        const stackIdx = Math.floor(j / 4);
        stacks[stackIdx].push(char);
      }
    }
  }

  return stacks;
};

// return the total number of initial stacks to keep track of
const getTotalStackCount = (numberRow: string): number => {
  const nums = numberRow.trim().split(/\s+/);

  return parseInt(nums[nums.length - 1]);
};

// initialize the list of stacks with the appropriate number of empty stacks
const getEmptyStackList = (stackCount: number): string[][] => {
  let stacks = [];
  for (let i = 0; i < stackCount; i++) {
    stacks.push([]);
  }

  return stacks;
};

const parseDirections = (directionsRaw: string): Direction[] => {
  const lines = directionsRaw.split(/\r?\n/);

  const directions: Direction[] = lines.map(line => {
    const digits = line.match(/\d+/g);

    if (!digits || digits.length < 3) {
      throw new Error('Error parsing directions. Couldn\'t find 3 digits :(');
    }

    return {
      count: parseInt(digits[0]),
      src: parseInt(digits[1]) - 1, // convert to 0-based index value
      dst: parseInt(digits[2]) - 1 // convert to 0-based index value
    };
  });

  return directions;
};
