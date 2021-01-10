interface result {
  part1: number;
  part2: number;
}

enum Direction {
  East,
  North,
  West,
  South,
  Forward,
}

const DirectionMap = {
  E: Direction.East,
  N: Direction.North,
  W: Direction.West,
  S: Direction.South,
  F: Direction.Forward,
};

enum Action {
  Move,
  Turn,
}

interface Command {
  action: Action;
  value: number;
  direction: Direction | null; // null for Turn commands
}

export const solution = (directionsRaw: string): result => {
  /* Part 1 */
  const directions = parseInput(directionsRaw);
  let coords: [number, number] = [0, 0]; // x, y
  let heading: Direction = Direction.East;

  directions.forEach((command) => {
    heading = executeCommand(command, coords, heading);
  });

  const manhattanDist = Math.abs(coords[0]) + Math.abs(coords[1]);
  /* Part 2 */
  coords = [0, 0]; // reset coords
  heading = Direction.East; // reset heading
  let waypoint: [number, number] = [10, 1]; // x, y - relative to the current location of the ship
  directions.forEach((command) => {
    waypoint = executeCommand_waypoint(command, coords, waypoint, heading);
  });

  const manhattanDist2 = Math.abs(coords[0]) + Math.abs(coords[1]);

  return {
    part1: manhattanDist,
    part2: manhattanDist2,
  };
};

const parseInput = (dirs: string): Command[] => {
  return dirs.split(/\r?\n/).map((item) => parseCommand(item));
};

const parseCommand = (commandString: string): Command => {
  let action = Action.Move;
  const modifier = commandString[0];
  let value = parseInt(commandString.slice(1, commandString.length));
  let dir = null;

  if (/(L|R)/.test(modifier)) {
    action = Action.Turn;
    value /= 90;
    if (modifier === 'R') {
      value *= -1;
    }
  } else {
    // type guard
    if (
      modifier === 'E' ||
      modifier === 'W' ||
      modifier === 'S' ||
      modifier === 'N' ||
      modifier === 'F'
    ) {
      dir = DirectionMap[modifier];
      if (dir === Direction.West || dir === Direction.South) {
        value *= -1;
      }
    } else {
      throw new Error('Unknown modifier encountered');
    }
  }

  return {
    action: action,
    value: value,
    direction: dir,
  };
};

const executeCommand = (
  command: Command,
  coords: [number, number],
  heading: Direction
): Direction => {
  if (command.action === Action.Turn) {
    heading = mod(heading + command.value, 4) as Direction; // rollover at South
  } else {
    if (
      command.direction === Direction.East ||
      command.direction === Direction.West
    ) {
      coords[0] += command.value; // x axis
    } else if (
      command.direction === Direction.North ||
      command.direction === Direction.South
    ) {
      coords[1] += command.value; // y axis
    } else {
      // forward
      const multiplier = heading < 2 ? 1 : -1;
      const axis = heading % 2 === 0 ? 0 : 1;
      coords[axis] += command.value * multiplier;
    }
  }

  return heading;
};

const executeCommand_waypoint = (
  command: Command,
  coords: [number, number],
  waypoint: [number, number],
  heading: Direction
): [number, number] => {
  // let newHeading = null;
  if (command.action === Action.Turn) {
    waypoint = calculateNewWaypoint(waypoint, command.value * 90);
  } else {
    if (
      command.direction === Direction.East ||
      command.direction === Direction.West
    ) {
      waypoint[0] += command.value; // x axis
    } else if (
      command.direction === Direction.North ||
      command.direction === Direction.South
    ) {
      waypoint[1] += command.value; // y axis
    } else {
      // forward

      coords[0] += waypoint[0] * command.value;
      coords[1] += waypoint[1] * command.value;
    }
  }

  return waypoint;
};

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

const calculateNewWaypoint = (
  waypoint: [number, number],
  degrees: number
): [number, number] => {
  // rotate a point around the origin by theta:
  // x1 = x0*cos(theta) - y0*sin(theta)
  // y1 = x0*sin(theta) + y0*cos(theta)
  // console.log(`rotate degrees: ${degrees}`);
  return [
    Math.round(
      waypoint[0] * Math.cos(toRadians(degrees)) -
        waypoint[1] * Math.sin(toRadians(degrees))
    ),
    Math.round(
      waypoint[0] * Math.sin(toRadians(degrees)) +
        waypoint[1] * Math.cos(toRadians(degrees))
    ),
  ];
};
const toRadians = (angle: number): number => {
  return angle * (Math.PI / 180);
};
