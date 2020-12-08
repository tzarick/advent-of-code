interface result {
  part1: number;
  part2: number;
}

type BagType = string | null;

interface NestedBag {
  color: BagType;
  count: number;
}

// Memo cache for memoization in recursive calls - bool for part1, number for part2
interface Memo<T> {
  [key: string]: T;
}

// counters to track memo usage just to see how effective caching is in this scenario
let memo_hits_1 = 0;
let memo_hits_2 = 0;

export const solution = (inputList: string): result => {
  /* Part 1 */
  const bagIndex = parseInputIntoMap(inputList);

  let bagsContainingShinyGold = 0;
  let containsMemo: Memo<boolean> = {}; // memoization - cache already evaluated recursive calls
  bagIndex.forEach((nestedBags, bagType, map) => {
    if (containsShinyGold(bagType, nestedBags, map, containsMemo)) {
      bagsContainingShinyGold++;
    }
  });

  /* Part 2 */
  let countMemo: Memo<number> = {}; // memoization - cache already evaluated recursive calls
  const bagsInShinyGold = nestedBagCount(
    'shiny gold',
    bagIndex.get('shiny gold') as NestedBag[],
    bagIndex,
    countMemo
  );

  console.log(`Memo cache hits Part 1: ${memo_hits_1}`);
  console.log(`Memo cache hits Part 2: ${memo_hits_2}`);

  return {
    part1: bagsContainingShinyGold,
    part2: bagsInShinyGold,
  };
};

const parseInputIntoMap = (inputString: string): Map<BagType, NestedBag[]> => {
  let bagIndex = new Map<BagType, NestedBag[]>(); // map each bag type to the bag colors and counts immediately inside it

  const rules = inputString
    .replace(/(bags|bag)/g, '')
    .replace(/\./g, '')
    .split(/\r?\n/)
    .map((item) => item.trim());

  rules.forEach((rule) => {
    const elements = rule.split('contain');
    const nestedBags = elements[1].split(',').map((item) => {
      item = item.trim();
      const numberMatch = item.match(/\d+/g);
      let number = 0;
      let color = null;
      if (numberMatch) {
        number = parseInt(numberMatch[0]);
        color = item.slice(numberMatch[0].length + 1, item.length).trim();
      }

      return {
        count: number,
        color: color,
      };
    });

    bagIndex.set(elements[0].trim(), nestedBags);
  });

  return bagIndex;
};

const containsShinyGold = (
  bagType: BagType,
  nestedBags: NestedBag[],
  bagMap: Map<BagType, NestedBag[]>,
  memo: Memo<boolean>
): boolean => {
  let bagContainsShinyGold = false;

  // base case is when there is only 1 nested bag which has color = null, otherwise proceed
  if (!(nestedBags.length === 1 && !nestedBags[0].color)) {
    if (nestedBags.findIndex((bag) => bag.color === 'shiny gold') > -1) {
      bagContainsShinyGold = true;
    } else if (bagType && bagType in memo) {
      bagContainsShinyGold = memo[bagType];
      memo_hits_1++;
    } else {
      for (let i = 0; i < nestedBags.length && !bagContainsShinyGold; i++) {
        bagContainsShinyGold = containsShinyGold(
          nestedBags[i].color,
          bagMap.get(nestedBags[i].color) as NestedBag[],
          bagMap,
          memo
        );
      }

      if (bagType) memo[bagType] = bagContainsShinyGold;
    }
  }

  return bagContainsShinyGold;
};

const nestedBagCount = (
  bagType: BagType,
  nestedBags: NestedBag[],
  bagMap: Map<BagType, NestedBag[]>,
  memo: Memo<number>
): number => {
  let bagCount = 0;

  // base case is when there is only 1 nested bag which has color = null, otherwise proceed
  if (!(nestedBags.length === 1 && !nestedBags[0].color)) {
    // look in cache first
    if (bagType && bagType in memo) {
      bagCount = memo[bagType];
      memo_hits_2++;
    } else {
      for (let i = 0; i < nestedBags.length; i++) {
        const childColor = nestedBags[i].color;
        const childBags = bagMap.get(childColor);

        bagCount +=
          nestedBags[i].count +
          nestedBags[i].count *
            nestedBagCount(childColor, childBags as NestedBag[], bagMap, memo);
      }

      if (bagType) memo[bagType] = bagCount;
    }
  }

  return bagCount;
};
