interface result {
  part1: number;
  part2: number;
}

export const solution = (adapterRatings: string): result => {
  /* Part 1 */
  const ratings = parseInput(adapterRatings);

  const ratingsSorted = ratings.sort((a, b) => a - b);
  const distances = ratingsSorted.map((item, i) =>
    i !== 0 ? item - ratingsSorted[i - 1] : item
  );

  const ones = distances.filter((item) => item === 1).length;
  const threes = distances.filter((item) => item === 3).length + 1; // add 1 for the built in adapter at end

  /* Part 2 */
  // Everywhere there is a distance of 3 (or chains of 3s, or chains of 3s with single 1s in the middle) in the distances array corresponding to the sorted list, those numbers are "locked" in place - they will appear in every sequence in that order no matter what. We are only concerned with the "flexible islands" surrounding the locked chains. If we multiply all the mini "flexible island" permutation counts together, we should get the answer
  const disposableIslands_ContiguousOnes = [];
  let i = 0;
  let contiguousOnesCount = 0;
  while (i < distances.length) {
    if (distances[i] === 1) {
      contiguousOnesCount++;
      if (i === distances.length - 1 && contiguousOnesCount > 1) {
        disposableIslands_ContiguousOnes.push(contiguousOnesCount);
      }
    } else if (distances[i] === 3 || i === distances.length - 1) {
      if (contiguousOnesCount > 1) {
        disposableIslands_ContiguousOnes.push(contiguousOnesCount);
      }
      contiguousOnesCount = 0;
    }
    i++;
  }

  // The number of perms/combs (value) that can be made with a sequence of a certain number of consecutive ones (key)
  // Todo: ideally this would be a function that dynamically calulates the perm/comb count for each sequence of flexible non-three island of distances, but we know that at max, the largest islands we receive in the input are 3 digits long (four consecutive distances of 1)
  const contiguousOnes_CombinationPerms = {
    2: 2,
    3: 4,
    4: 7,
  };

  const disposableIslandPerms = disposableIslands_ContiguousOnes.map((item) => {
    // type guard
    if (item === 2 || item === 3 || item === 4) {
      return contiguousOnes_CombinationPerms[item];
    } else {
      throw new Error(
        'Mini combo sequence is out of range of our current map values'
      );
    }
  });

  // multiply all the flexible island perm counts together
  const possibleSequences = disposableIslandPerms.reduce(
    (acc: number, curr: number): number => acc * curr
  );

  return {
    part1: ones * threes,
    part2: possibleSequences,
  };
};

const parseInput = (input: string): number[] => {
  return input.split(/\r?\n/).map(Number);
};
