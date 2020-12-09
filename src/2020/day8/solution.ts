interface result {
  part1: number;
  part2: number;
}

enum InstructionType {
  Nop,
  Jmp,
  Acc,
  Invalid,
}

interface Instruction {
  type: InstructionType;
  arg: number;
  visited: boolean;
}

export const solution = (inputProgram: string): result => {
  /* Part 1 */
  const instructions = parseInput(inputProgram);

  let instructStackTrace = []; // keep track of the order of instructions
  let instructPointer = 0;
  let accumulator1 = 0;
  while (
    instructPointer < instructions.length &&
    !instructions[instructPointer].visited
  ) {
    instructStackTrace.push(instructPointer);

    [instructPointer, accumulator1] = executeInstruction(
      instructPointer,
      instructions[instructPointer],
      accumulator1,
      false
    );
  }

  /* Part 2 */

  // we know the instruction that needs to be swapped is an instruction that was a part of our instruction path the first time - this rules out anything not already visited in part 1
  // back track from the end (top) of the instruction stack trace (from where the inf loop ocurred) and try swapping nop/jmp - this feels like the better direction

  // first find the index where we need to swap the instruction --> swapIndex
  let __ = 0; // dummy accumulator variable
  let stackTracePointer = instructStackTrace.length - 1; // start at the end (top)
  let swapIndex = -1;
  while (instructPointer < instructions.length && stackTracePointer > 0) {
    /*
     * Start from the right (top) and move left (down) in the original failed instruction stack trace until we find a swappable instruction
     * Swap the instruction at that index and continue execution from that point (as if we'd run the same initial program up to that point)
     * Continue backtracking along this path until we find a swap that allows us to complete the program
     */
    [swapIndex, stackTracePointer] = getNextSwappableInsNearEnd(
      instructStackTrace,
      stackTracePointer,
      instructions
    );

    [instructPointer, __] = swapAndContinueExecutingInstructionSet(
      swapIndex,
      instructions,
      swapIndex
    );

    stackTracePointer--; // look lower in the instruction stack trace next time
  }

  // the instruction after the last instruction in the set is the stop code
  if (instructPointer !== instructions.length) {
    throw new Error('Program did not reach the stop instruction correctly');
  } else {
    console.log(`Successfully found the swap index: ${swapIndex}`);
  }

  // reset the whole instruction set to unvisited
  instructions.forEach((instruct) => {
    unvisit(instruct);
  });

  // execute the program from the beginning with the newly found swapIndex
  const [_, accumulator2] = swapAndContinueExecutingInstructionSet(
    0,
    instructions,
    swapIndex
  );

  return {
    part1: accumulator1,
    part2: accumulator2,
  };
};

const parseInput = (inputProg: string): Instruction[] => {
  return inputProg.split(/\r?\n/).map((instruct) => {
    const instructElements = instruct.split(/\s+/);
    return {
      type: instructionType(instructElements[0]),
      arg: parseInt(instructElements[1]),
      visited: false,
    };
  });
};

const instructionType = (instructString: string): InstructionType => {
  let type;
  switch (instructString) {
    case 'nop':
      type = InstructionType.Nop;
      break;
    case 'acc':
      type = InstructionType.Acc;
      break;
    case 'jmp':
      type = InstructionType.Jmp;
      break;
    default:
      type = InstructionType.Invalid;
  }

  return type;
};

// execute instruction, return updated instruct pointer and updated accumulator
const executeInstruction = (
  pointer: number,
  instruct: Instruction,
  acc: number,
  swap: boolean
): [number, number] => {
  let type = instruct.type;
  if (swap && type < InstructionType.Acc) {
    type =
      type === InstructionType.Nop ? InstructionType.Jmp : InstructionType.Nop;
  }

  switch (type) {
    case InstructionType.Acc:
      acc += instruct.arg;
      pointer++;
      break;
    case InstructionType.Jmp:
      pointer += instruct.arg;
      break;
    case InstructionType.Nop:
      pointer++;
      break;
    default:
      throw new Error('invalid instruction type');
  }

  instruct.visited = true;

  return [pointer, acc];
};

const unvisit = (instruct: Instruction): void => {
  instruct.visited = false;
};

const swapAndContinueExecutingInstructionSet = (
  pointer: number,
  instructSet: Instruction[],
  swapIndex: number
): [number, number] => {
  let instructTraceStack = []; // keep track of the order of instructions
  let instructPointer = pointer;
  let accumulator = 0;
  while (
    instructPointer < instructSet.length &&
    !instructSet[instructPointer].visited
  ) {
    instructTraceStack.push(instructPointer);

    [instructPointer, accumulator] = executeInstruction(
      instructPointer,
      instructSet[instructPointer],
      accumulator,
      instructPointer === swapIndex // when we are on the swapIndex, make sure we swap instructions
    );
  }

  // reset these visit vals
  if (instructPointer !== instructSet.length) {
    instructTraceStack.forEach((i) => {
      unvisit(instructSet[i]);
    });
  }

  return [instructPointer, accumulator];
};

// this function helps us get the next swappable index nearest the end of the stack trace that we haven't tried yet
// return swapIndex and updated stackTracePointer
const getNextSwappableInsNearEnd = (
  instructStackTrace: number[],
  stackTracePointer: number,
  instructions: Instruction[]
): [number, number] => {
  let instructionIndex = instructStackTrace[stackTracePointer];
  unvisit(instructions[instructionIndex]);

  // find the next swappable instruction and unvisit it so we can try it in our next execution
  while (instructions[instructionIndex].type > InstructionType.Jmp) {
    stackTracePointer--;
    instructionIndex = instructStackTrace[stackTracePointer];
    unvisit(instructions[instructionIndex]);
  }

  return [instructionIndex, stackTracePointer];
};
