interface result {
  part1: number;
  part2: number;
}

export const solution = (inputList: string): result => {
  /* Part 1 */
  /* Count unique letters ("yes" answers) in each group and sum all */
  const groupAnswers = parseInput(inputList);
  const uniqueAnswerCounts = groupAnswers.map((group) =>
    getUniqueAnswerCount(group)
  );
  const totalCount = uniqueAnswerCounts.reduce((acc, curr) => acc + curr); // sum

  /* Part 2 */
  const unanimousAnswerCounts = groupAnswers.map((group) =>
    getUnanimousAnswerCount(group)
  );
  const unanimousTotalCount = unanimousAnswerCounts.reduce(
    (acc, curr) => acc + curr
  ); // sum

  return {
    part1: totalCount,
    part2: unanimousTotalCount,
  };
};

const parseInput = (inputString: string): string[] => {
  return inputString.split(/\r?\n\r?\n/).map((item) => item.trim());
};

const getUniqueAnswerCount = (groupAnswersChunk: string): number => {
  // add all chars to a set
  let uniqueAnswers = new Set<string>();
  for (let i = 0; i < groupAnswersChunk.length; i++) {
    const letter = groupAnswersChunk.charAt(i);
    if (/[a-z]/.test(letter)) {
      uniqueAnswers.add(letter);
    }
  }

  return uniqueAnswers.size;
};

const getUnanimousAnswerCount = (groupAnswersChunk: string): number => {
  const groupAnswersByIndividual = groupAnswersChunk.split(/\r?\n/);

  // 1 person = unanimous
  if (groupAnswersByIndividual.length === 1) {
    return groupAnswersByIndividual[0].length;
  }

  // get the shortest string -- we know the length of this string is the max we can return
  const shortestSequence = groupAnswersByIndividual.reduce(
    (prev: string, curr: string, i) =>
      curr.length < prev.length || i === 0 ? curr : prev
  );

  let unanimousAnswers = shortestSequence.length; // this is the max it could possibly be
  for (let i = 0; i < shortestSequence.length; i++) {
    const letter = shortestSequence.charAt(i);
    const re = new RegExp(letter, 'g');
    const charOccuranceCount = (groupAnswersChunk.match(re) || []).length; // how many times the char occurs in the group as a whole

    // the char must occur once for every individual in the group
    if (charOccuranceCount !== groupAnswersByIndividual.length) {
      unanimousAnswers--;
    }
  }

  return unanimousAnswers;
};
