interface result {
  part1: number;
  part2: number;
}

type BagType = string | null;

interface NestedBag {
  color: BagType;
  count: number;
}

export const solution = (inputList: string): result => {
  /* Part 1 */
  const bagIndex = parseInputIntoMap(inputList);

  let bagsContainingShinyGold = 0;
  bagIndex.forEach((nestedBags, bagType, map) => {
    if (containsShinyGold(nestedBags, map)) {
      bagsContainingShinyGold++;
    }
  });

  /* Part 2 */
  const bagsInShinyGold = nestedBagCount(
    bagIndex.get('shiny gold') as NestedBag[],
    bagIndex
  );

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
  nestedBags: NestedBag[],
  bagMap: Map<BagType, NestedBag[]>
): boolean => {
  let bagContainsShinyGold = false;

  // base case is when there is only 1 nested bag which has color = null, otherwise proceed
  if (!(nestedBags.length === 1 && !nestedBags[0].color)) {
    if (nestedBags.findIndex((bag) => bag.color === 'shiny gold') > -1) {
      bagContainsShinyGold = true;
    } else {
      for (let i = 0; i < nestedBags.length && !bagContainsShinyGold; i++) {
        bagContainsShinyGold = containsShinyGold(
          bagMap.get(nestedBags[i].color) as NestedBag[],
          bagMap
        );
      }
    }
  }

  return bagContainsShinyGold;
};

const nestedBagCount = (
  nestedBags: NestedBag[],
  bagMap: Map<BagType, NestedBag[]>
): number => {
  let bagCount = 0;

  // base case is when there is only 1 nested bag which has color = null, otherwise proceed
  if (!(nestedBags.length === 1 && !nestedBags[0].color)) {
    for (let i = 0; i < nestedBags.length; i++) {
      const childColor = nestedBags[i].color;
      const childBags = bagMap.get(childColor);
      bagCount +=
        nestedBags[i].count +
        nestedBags[i].count * nestedBagCount(childBags as NestedBag[], bagMap);
    }
  }

  return bagCount;
};
