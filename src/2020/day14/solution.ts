interface result {
  part1: number;
  part2: number;
}

interface Operation {
  mask: number;
  addresses: number[];
  vals: number[];
}

export const solution = (input: string): result => {
  /* Part 1 */
  let mem = new Map<number, number>(); // mem address, value
  const lines = parseInput(input);
  let currentMask = [0, 0]; // we evaluate each mask to 2 separate masks: one that enforces the 1's overwrite and one that enforces the 0's overwrite
  for (let line of lines) {
    if (line.includes('mask')) {
      // update mask
      currentMask = parseMask(line);
      console.log(currentMask);
    } else {
      const numberMatches = line.match(/\d+/g);
      const [addr, val] = numberMatches ? numberMatches.map(Number) : [-1, -1];
      const adjustedVal = applyMask(currentMask, toBinary(val));
      mem.set(addr, adjustedVal);
    }
  }

  const vals = Array.from(mem.values());
  console.log(vals);
  const total = vals.reduce((a, b) => a + b, 0);
  /* Part 2 */

  return {
    part1: total,
    part2: 0,
  };
};

const parseInput = (input: string): string[] => {
  return input.split(/\r?\n/);
};

const parseMask = (maskLine: string): [number, number] => {
  let onesMask = -1,
    zerosMask = -1;
  const maskStr = maskLine.match(/(?<=mask\s=\s).*/g);
  // console.log(maskStr);
  if (maskStr) {
    onesMask = parseInt(maskStr[0].replace(/X/g, '0'), 2); // replace all X's with 0's and then we can OR with the target to set all 1's and leave all other digits alone
    zerosMask = parseInt(maskStr[0].replace(/X/g, '1'), 2); // replace all X's with 1's and then we can AND with the target to set all 0's and leave all other digits alone
  } else {
    throw new Error('Mask search error. Mask not found');
  }

  return [toBinary(onesMask), toBinary(zerosMask)];
};

const applyMask = (mask: number[], val: number): number => {
  // first, perform an OR with the first mask
  // then, perform an AND with the above result
  console.log(mask[0], val, `apply ${toBinary(mask[0] | val)}`);
  return toBinary(mask[0] | val) & mask[1];
};

const toBinary = (decimal: number): number => {
  return Number((decimal >>> 0).toString(2));
};
