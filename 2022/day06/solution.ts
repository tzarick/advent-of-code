interface result {
  part1: number;
  part2: number;
}

export const solution = (input: string): result => {
  // part 1
  const startMarker = getFirstWindowWithNoDuplicates(input, 4, 0);

  // part 2 - we know that we should only look equal to or after the first valid start marker window (from part 1) bc we've already validated dupicates up to that point
  const messageMarker = getFirstWindowWithNoDuplicates(input, 14, startMarker - 4);

  return {
    part1: startMarker,
    part2: messageMarker
  };
};

// returns the end index (1-based) of the first window with no duplicates of a specified length starting at a specified index 
const getFirstWindowWithNoDuplicates = (str: string, windowSize: number, startIdx: number): number => {
  for (let i = startIdx; i < str.length; i++) {
    const windowSet = new Set<string>();

    const window = str.substring(i, i + windowSize).split('');
    window.forEach(char => windowSet.add(char));

    if (windowSet.size === windowSize) { // no duplicates
      return i + windowSize;
    }
  }

  throw new Error('Error: unable to find window with no duplicates with the specified params');
};