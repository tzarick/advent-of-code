import _ from 'lodash';

type result = {
  part1: string;
  part2: string;
};

/* Op Codes:
 * 1 - add data from next 2 locations and put in next digit location
 * 2 - multiply
 * 99 - halt
 */
export const solution = (opCodes: string): result => {
  /* Part 1 */
  let initialInstructions = parseInstructions(opCodes);
  const instructionsAfter = runProgram(initialInstructions);
  const finalState = rebuildString(instructionsAfter);

  /* Part 2 */
  // find noun (address 1) and verb (address 2)
  const target = 19690720;
  let noun = 0;
  let verb = 0;
  let output = 0;
  for (let i = 0; i < 100 && output !== target; i++) {
    for (let j = 0; j < 100 && output !== target; j++) {
      noun = i;
      verb = j;
      output = runAlteredProgram(noun, verb, initialInstructions)[0];
    }
  }

  return {
    part1: finalState,
    part2: `noun: ${noun}, verb: ${verb}`,
  };
};

const parseInstructions = (input: string): number[] => {
  return input.split(',').map((item) => parseInt(item));
};

const rebuildString = (instructs: number[]): string => {
  return instructs.map((item) => item.toString()).join(',');
};

const runProgram = (instructionsInput: number[]): number[] => {
  let instructions = _.clone(instructionsInput);
  let instructPointer = 0;
  while (
    instructPointer < instructions.length &&
    instructions[instructPointer] !== 99
  ) {
    const operand1Location = instructions[instructPointer + 1];
    const operand2Location = instructions[instructPointer + 2];
    const resultLocation = instructions[instructPointer + 3];

    switch (instructions[instructPointer]) {
      case 1:
        instructions[resultLocation] =
          instructions[operand1Location] + instructions[operand2Location];
        break;
      case 2:
        instructions[resultLocation] =
          instructions[operand1Location] * instructions[operand2Location];
        break;
      default:
        throw `Invalid instruction encountered ${instructions[instructPointer]}`;
    }

    instructPointer += 4; // move to next word
  }

  return instructions;
};

const runAlteredProgram = (
  noun: number,
  verb: number,
  instructions: number[]
): number[] => {
  const instructs = _.clone(instructions);
  instructs[1] = noun;
  instructs[2] = verb;
  return runProgram(instructs);
};
