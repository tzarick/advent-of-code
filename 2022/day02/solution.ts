interface result {
  part1: number;
  part2: number;
}

enum Selection {
  Rock = 0,
  Paper,
  Scissors
}

interface Game {
  player1: Selection,
  player2: Selection;
}

const inputMap: { [key: string]: Selection; } = {
  'A': Selection.Rock,
  'X': Selection.Rock,
  'B': Selection.Paper,
  'Y': Selection.Paper,
  'C': Selection.Scissors,
  'Z': Selection.Scissors
};

export const solution = (input: string): result => {
  const games = parseInput(input);

  let player2Score_part1 = 0;
  let player2Score_part2 = 0;

  for (const game of games) {
    player2Score_part1 += play(game.player1, game.player2);
    player2Score_part2 += play_part2(game.player1, game.player2);
  }


  return {
    part1: player2Score_part1,
    part2: player2Score_part2
  };
};



const play = (hand1: Selection, hand2: Selection): number => {
  let gameOutcome = 0;

  if (hand1 === hand2) {
    gameOutcome = 3;
  } else if (wins(hand2, hand1)) {
    gameOutcome = 6;
  }

  return gameOutcome + (hand2 + 1);
};

const play_part2 = (hand1: Selection, hand2: Selection): number => {
  let gameOutcome = hand2;
  let hand2Selection_real: Selection | undefined;

  if (gameOutcome === Selection.Rock) { // lose
    gameOutcome = 0;
    hand2Selection_real = mod(hand1 - 1, 3);
  } else if (gameOutcome === Selection.Paper) { // draw
    gameOutcome = 3;
    hand2Selection_real = hand1;
  } else { // win
    gameOutcome = 6;
    hand2Selection_real = (hand1 + 1) % 3;
  }

  return gameOutcome + hand2Selection_real + 1;
};

const wins = (hand2: Selection, hand1: Selection): boolean => {
  return hand2 === ((hand1 + 1) % 3);
};


const parseInput = (input: string): Game[] => {
  const lines = input.split(/\r?\n/);

  return lines.map((line: string) => {
    return {
      player1: inputMap[line.charAt(0)],
      player2: inputMap[line.charAt(2)]
    };
  });
};

// handle negative mod
function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}