interface result {
  part1: number;
  part2: number;
}

interface BoardingPass {
  row: number;
  col: number;
  seatId: number;
}
/* Notes:
 *  Row is 0 - 127 -> represented by an 8 bit number where F=0 and B=1
 *  Column is 0 - 7 -> represented by a 3 bit number where L=0 and R=1
 */
export const solution = (inputList: string): result => {
  /* Part 1 */
  const boardingPassesRaw = parseInput(inputList);
  const boardingPasses: BoardingPass[] = boardingPassesRaw.map((item) =>
    buildBoardingPass(item)
  );

  const boardingPassSeatIds = boardingPasses.map((item) => item.seatId);
  const highestSeat = Math.max(...boardingPassSeatIds);

  /* Part 2 */
  const IdsSorted = boardingPassSeatIds.sort((a, b) => a - b); // ascending
  const nextIdUpFromMine = IdsSorted.find(
    (id, i) => i !== 0 && IdsSorted[i - 1] === id - 2 // the ID just before this seat will be 2 seats back since it skips mine
  );
  const mySeatId = nextIdUpFromMine ? nextIdUpFromMine - 1 : -1;

  return {
    part1: highestSeat,
    part2: mySeatId,
  };
};

const parseInput = (inputString: string): string[] => {
  return inputString.split(/\r?\n/).map((item) => item.trim());
};

const buildBoardingPass = (passRaw: string): BoardingPass => {
  const passBinaryString = convertStringToBinaryString(passRaw); // string of 1's and 0's

  // parse as base 2
  const rowBinary = parseInt(passBinaryString.slice(0, -3), 2);
  const colBinary = parseInt(
    passBinaryString.slice(-3, passBinaryString.length),
    2
  );
  const seatIdBinary = parseInt(passBinaryString, 2); // the full sequence in binary is equivalent to taking row*8 + col

  // convert each to decimal
  return {
    row: Number(rowBinary.toString(10)),
    col: Number(colBinary.toString(10)),
    seatId: Number(seatIdBinary.toString(10)),
  };
};

// convert from a string made up of B,F,R, and L's to a string of 1's and 0's
const convertStringToBinaryString = (boardingPassRaw: string): string => {
  return boardingPassRaw
    .replace(/F|L/g, '0') // F and L represent 0
    .replace(/B|R/g, '1'); // B and R represent 1
};
