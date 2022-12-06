interface result {
  part1: number;
  part2: number;
}

interface Interval {
  start: number,
  end: number;
}

type IntervalPair = [Interval, Interval];

export const solution = (input: string): result => {
  const intervalPairs = parseInput(input);

  let fullOverlapCount = 0;
  let anyOverlapCount = 0;

  for (const pair of intervalPairs) {
    if (hasAnyOverlap(pair)) {
      anyOverlapCount++;
      if (hasFullOverlap(pair)) {
        fullOverlapCount++;
      }
    }
  }

  return {
    part1: fullOverlapCount,
    part2: anyOverlapCount
  };
};

const hasFullOverlap = (pair: IntervalPair): boolean => {
  return (pair[0].start <= pair[1].start && pair[0].end >= pair[1].end) || (pair[1].start <= pair[0].start && pair[1].end >= pair[0].end);
};

const hasAnyOverlap = (pair: IntervalPair): boolean => {
  return (pair[0].start <= pair[1].end && pair[0].end >= pair[1].start) || (pair[1].start <= pair[0].end && pair[1].end >= pair[0].start);
};

const parseInput = (input: string): IntervalPair[] => {
  let intervalPairs: IntervalPair[] = [];

  const lines = input.split(/\r?\n/);
  for (const line of lines) {
    const intervalsRaw = line.split(',');
    intervalPairs.push([parseInterval(intervalsRaw[0]), parseInterval(intervalsRaw[1])]);
  }

  return intervalPairs;
};

const parseInterval = (intervalRaw: string): Interval => {
  const bounds = intervalRaw.split('-');
  return {
    start: parseInt(bounds[0]),
    end: parseInt(bounds[1])
  };
};