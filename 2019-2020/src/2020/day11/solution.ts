import _ from 'lodash';

interface result {
  part1: number;
  part2: number;
}

enum SeatStatus {
  Floor = 1,
  Empty,
  Occupied,
}

interface SeatCoord {
  x: number;
  y: number;
}

interface Seat {
  status: SeatStatus;
  adjacentSeats: SeatCoord[];
  flipped: boolean; // whether or not the seat flipped state
}

const directions = [
  {
    x: -1,
    y: -1,
  },
  {
    x: -1,
    y: 0,
  },
  {
    x: -1,
    y: 1,
  },
  {
    x: 0,
    y: -1,
  },
  {
    x: 0,
    y: 1,
  },
  {
    x: 1,
    y: -1,
  },
  {
    x: 1,
    y: 0,
  },
  {
    x: 1,
    y: 1,
  },
];

export const solution = (seatGrid: string): result => {
  /* Part 1 */
  let seats = parseInput(seatGrid, 1);

  let noneFlipped = false;
  while (!noneFlipped) {
    seats = updateSeats(seats, 4);
    noneFlipped = seats.every((row) => row.every((seat) => !seat.flipped));
  }

  const occupiedSeats = _.flatten(seats).filter(
    (seat) => seat.status === SeatStatus.Occupied
  );

  /* Part 2 */
  let seats_part2 = parseInput(seatGrid, 2);
  fillAdjacentWithSeatsInView(seats_part2);

  noneFlipped = false;
  while (!noneFlipped) {
    seats_part2 = updateSeats(seats_part2, 5);
    noneFlipped = seats_part2.every((row) =>
      row.every((seat) => !seat.flipped)
    );
  }

  const occupiedSeats_part2 = _.flatten(seats_part2).filter(
    (seat) => seat.status === SeatStatus.Occupied
  );

  return {
    part1: occupiedSeats.length,
    part2: occupiedSeats_part2.length,
  };
};

const parseInput = (input: string, part: number): Seat[][] => {
  const rows = input.split(/\r?\n/);
  let seatGrid = rows.map((row, x) => {
    let seatRow = [];
    for (let i = 0; i < row.length; i++) {
      seatRow.push({
        status: getSeatStatus(row[i]),
        adjacentSeats: getAdjacent(x, i, rows.length, row.length, part),
        flipped: false,
      });
    }

    return seatRow;
  });

  // filter out any floor spots from the adjacent seats, they aren't looked at
  seatGrid.forEach((row) =>
    row.forEach((seat) => {
      seat.adjacentSeats = seat.adjacentSeats.filter(
        (item) => seatGrid[item.x][item.y].status > SeatStatus.Floor
      );
    })
  );

  return seatGrid;
};

const getSeatStatus = (char: string): SeatStatus => {
  let status: SeatStatus;
  switch (char) {
    case 'L':
      status = SeatStatus.Empty;
      break;
    case '#':
      status = SeatStatus.Occupied;
      break;
    case '.':
      status = SeatStatus.Floor;
      break;
    default:
      throw new Error('Invalid seat char encountered');
  }

  return status;
};

const getAdjacent = (
  x: number,
  y: number,
  maxX: number,
  maxY: number,
  part: number // part 1 or part 2
): SeatCoord[] => {
  let coords: SeatCoord[] = [];
  if (part === 1) {
    coords = directions
      .map((dir) => ({
        x: x + dir.x,
        y: y + dir.y,
      }))
      .filter(
        (item) => _.inRange(item.x, 0, maxX) && _.inRange(item.y, 0, maxY)
      );
  } else if (part === 2) {
    coords = []; // fill these once we've parsed everything out
  } else {
    throw new Error('Invalid Part arg');
  }

  return coords;
};

const updateSeats = (seatsRef: Seat[][], seatTolerance: number): Seat[][] => {
  let newSeats = _.cloneDeep(seatsRef); // make sure we compare to the original seat grid passed in, not the one we are altering
  newSeats.forEach((row, x) => {
    row.forEach((seat, y) => {
      let referenceSeat = seatsRef[x][y];
      if (
        referenceSeat.status === SeatStatus.Empty &&
        noOccuppiedAdjacent(referenceSeat, seatsRef)
      ) {
        seat.status = SeatStatus.Occupied;
        seat.flipped = true;
      } else if (
        referenceSeat.status === SeatStatus.Occupied &&
        denselySurrounded(referenceSeat, seatsRef, seatTolerance)
      ) {
        seat.status = SeatStatus.Empty;
        seat.flipped = true;
      } else {
        seat.flipped = false;
      }
    });
  });

  return newSeats;
};

const noOccuppiedAdjacent = (seat: Seat, seats: Seat[][]): boolean => {
  return seat.adjacentSeats.every(
    (coords) => seats[coords.x][coords.y].status < SeatStatus.Occupied
  );
};

const denselySurrounded = (
  seat: Seat,
  seats: Seat[][],
  tolerance: number
): boolean => {
  const adjacentOccupied = seat.adjacentSeats.filter(
    (coords) => seats[coords.x][coords.y].status === SeatStatus.Occupied
  );
  return adjacentOccupied.length >= tolerance;
};

const fillAdjacentWithSeatsInView = (seats: Seat[][]): void => {
  seats.forEach((row, x) =>
    row.forEach(
      (seat, y) =>
        (seat.adjacentSeats = getSeatsInView(
          seats,
          x,
          y,
          seats.length,
          row.length
        ))
    )
  );
};

const getSeatsInView = (
  seats: Seat[][],
  x: number,
  y: number,
  maxX: number,
  maxY: number
): SeatCoord[] => {
  // search for the first seat in each direction and then add it to inView
  let inView: SeatCoord[] = [];

  directions.forEach((dir) => {
    let current_x = x + dir.x;
    let current_y = y + dir.y;
    while (
      _.inRange(current_x, 0, maxX) &&
      _.inRange(current_y, 0, maxY) &&
      seats[current_x][current_y].status === SeatStatus.Floor
    ) {
      current_x += dir.x;
      current_y += dir.y;
    }

    if (_.inRange(current_x, 0, maxX) && _.inRange(current_y, 0, maxY)) {
      inView.push({
        x: current_x,
        y: current_y,
      });
    }
  });

  return inView;
};
