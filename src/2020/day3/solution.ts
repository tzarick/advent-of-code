interface result {
  part1: number;
  part2: number;
}

type slope = [x: number, y: number];

export const solution = (inputList: string): result => {
  /* Part 1 */
  const treeLines = parseInput(inputList);
  const linesWithTreeHit_part1 = treeLines.filter((item, i) =>
    isTreeHit(item, i, 3)
  );

  /* Part 2 */
  const slopes: slope[] = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  const treeCounts_part2 = slopes.map((slope) =>
    getTreeCount_alternate(treeLines, slope)
  );

  const solution_part2 = treeCounts_part2.reduce((acc, curr) => curr * acc);

  return {
    part1: linesWithTreeHit_part1.length,
    part2: solution_part2,
  };
};

const parseInput = (inputString: string): string[] => {
  return inputString.split('\n').map((item) => item.trim());
};

const isTreeHit = (
  treeLine: string,
  rowIndex: number,
  slope_x: number /* assumes slope_y of 1 */
) => {
  const xIndex = (rowIndex * slope_x) % treeLine.length; // wrap back around once we hit the end of our line
  return treeLine[xIndex] === '#';
};

// alternate approach with real loop
const getTreeCount_alternate = (treeLines: string[], slope: slope): number => {
  const slope_x = slope[0];
  const slope_y = slope[1];

  let treeCount = 0;
  for (let i = 0; i < treeLines.length; i += slope_y) {
    const x = (slope_x * (i / slope_y)) % treeLines.length; // Divide i by y so that we are giving the correct weight to each x index
    if (treeLines[i][x] === '#') {
      treeCount++;
    }
  }

  return treeCount;
};
