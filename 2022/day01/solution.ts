import readline from 'readline';

interface result {
  part1: number;
  part2: number;
}


export const solution = async (reader: readline.Interface): Promise<result> => {
  let elfInventory: number[] = [];
  let currentVal: number | undefined;
  let first = 0;
  let second = 0;
  let third = 0;

  // reading in line by line just for fun / the experience
  for await (const line of reader) {
    const lineClean = line.trim();
    if (!lineClean && currentVal) {
      elfInventory.push(currentVal);
      currentVal = undefined;
    }

    const num = parseInt(lineClean);
    currentVal = (currentVal) ? currentVal += num : num;
  }

  elfInventory.sort((a, b) => b - a);

  return {
    part1: elfInventory[0],
    part2: elfInventory[0] + elfInventory[1] + elfInventory[2]
  };
};