interface result {
  part1: number;
  part2: BigInt;
}

// Sequential Bus - for part 2
interface SeqBus {
  id: number;
  offset: number;
}

export const solution = (input: string): result => {
  /* Part 1 */
  const [arrival, busIds] = parseInput(input);
  // min of {busId - (arrival % busId)} should give us the closest bus. This equation gives us the amount of time until from on-foot arrival time to the next divisible number for that busId
  const busWaitTimes = busIds.map((id) => id - (arrival % id));
  const closestBusIdx = getMinIdx(busWaitTimes);

  /* Part 2 */
  // using Chinese Remainder Theorem to find an x when we know values and remainders
  const busIds_2 = parseInput_part2(input);
  const offsets = busIds_2.map((item) => item.offset % item.id); // mod the offset by the number so that we get the smallest possible offset/remainder to work with (this is important only for the actual problem input, not test cases, because the offset may be bigger than the id number itself -> ex. 20 mod 17 => 3 mod 17)
  const ids = busIds_2.map((item) => item.id);

  const [smallestCrt, newModulo] = chineseRemainderTheorem(ids, offsets);
  const targetTimestamp = BigInt(newModulo) - BigInt(smallestCrt);

  return {
    part1: busWaitTimes[closestBusIdx] * busIds[closestBusIdx],
    part2: targetTimestamp,
  };
};

const parseInput = (input: string): [number, number[]] => {
  const elements = input.split(/\r?\n/);
  const ids = elements[1]
    .split(',')
    .filter((item) => item !== 'x')
    .map(Number);

  return [parseInt(elements[0]), ids];
};

const parseInput_part2 = (input: string): SeqBus[] => {
  const elements = input.split(/\r?\n/);
  const busSequence = elements[1]
    .split(',')
    .map((id, i) => ({
      id: parseInt(id),
      offset: i,
    }))
    .filter((item) => item.id);

  return busSequence;
};

// to maximize efficiency rather than use array.indexOf(Min(array))
const getMinIdx = (arr: number[]): number => {
  let minIdx = 0;
  arr.forEach((item, i) => {
    if (item < arr[minIdx]) {
      minIdx = i;
    }
  });

  return minIdx;
};

// find an x when we know the remainders after division for multiple numbers - using inverse mod. This also assumes all nums are relatively prime to each other (which for all the inputs we've been given, they are all prime - this also seemed like a hint)
// return smallest CRT result and newModulo
// references:
// 1) https://en.wikipedia.org/wiki/Modular_multiplicative_inverse
// 2) https://en.wikipedia.org/wiki/Chinese_remainder_theorem
// 3) https://www.youtube.com/watch?v=zIFehsBHB8o
// 4) https://www.dave4math.com/mathematics/chinese-remainder-theorem/#Problems_to_Try_Out
// 5) http://www.math.ualberta.ca/~isaac/math324/s10/soln3.pdf
const chineseRemainderTheorem = (
  nums: number[],
  remainders: number[]
): [BigInt, BigInt] => {
  const newModulo = nums.reduce((a, b) => a * b, 1);
  const Ni = nums.map((item) => Math.floor(newModulo / item)); // number theory and mod arithmetic -> dealing with only whole numbers
  const modularMultiplicativeInv = nums.map((item, i) =>
    modInverse(Ni[i], item)
  );

  let sum = BigInt(0);
  for (let i = 0; i < nums.length; i++) {
    sum +=
      BigInt(remainders[i]) *
      BigInt(Ni[i]) *
      BigInt(modularMultiplicativeInv[i]);
  }

  return [sum % BigInt(newModulo), BigInt(newModulo)];
};

// from https://rosettacode.org/wiki/Modular_inverse#JavaScript
const modInverse = (a: number, b: number): number => {
  a %= b;
  for (var x = 1; x < b; x++) {
    if ((a * x) % b == 1) {
      return x;
    }
  }
  return -1;
};
