interface result {
  part1: number;
  part2: number;
}

export const solution = (input: string): result => {
  // part 1
  const WINDOW_SIZE = 4;
  let marker = -1;
  for (let i = 0; i < input.length; i++) {
    const windowSet = new Set<string>();

    const window = input.substring(i, i + WINDOW_SIZE).split('');
    window.forEach(char => windowSet.add(char));

    if (windowSet.size === WINDOW_SIZE) { // no duplicates
      marker = i + WINDOW_SIZE;
      break;
    }
  }

  return {
    part1: marker,
    part2: 0
  };
};