import _, { intersection } from 'lodash';

interface result {
  part1: number;
  part2: number;
}

interface WireSegment {
  direction: Direction;
  distance: number;
}

enum Direction {
  Right,
  Left,
  Up,
  Down,
}

enum Dimension {
  Row,
  Column,
}

enum Multiplier {
  Pos = 1,
  Neg = -1,
}

enum Marker {
  Empty,
  Wire1,
  Wire2,
  Intersection,
}

// Find Manahattan distance of the closest intersection between the 2 wires (to the center point)
export const solution = (wireRoutes: string): result => {
  /* Part 1 */
  const [wireRoute1, wireRoute2] = parseRoutes(wireRoutes);

  // set up the wire panel grid space
  let grid = initGrid(wireRoute1, wireRoute2);

  const gridDimensions = [grid.length, grid[0].length];
  const centerPoint: [x: number, y: number] = [
    Math.floor(gridDimensions[0] / 2),
    Math.floor(gridDimensions[1] / 2),
  ];

  grid = plotRoute(centerPoint, wireRoute1, grid, Marker.Wire1);
  grid = plotRoute(centerPoint, wireRoute2, grid, Marker.Wire2);

  let intersections: [x: number, y: number][] = [];

  // find and add intersections to intersections array
  grid.forEach((row, i) => {
    row.forEach((point, j) => {
      if (point === Marker.Intersection) {
        intersections.push([i, j]);
      }
    });
  });

  const manhattanDistances: number[] = intersections.map((intersection) =>
    getManhattanDist(intersection, centerPoint)
  );

  return {
    part1: Math.min(...manhattanDistances),
    part2: 0,
  };
};

// input: string of route instructions separated by comma. Wire 2 is separated from Wire 1 by a new line
// output: array of objects for each wire route (Object containing distance and direction)
const parseRoutes = (routeInfo: string): WireSegment[][] => {
  const routeInstructionStrings = routeInfo.split('\n');
  const routesRaw = routeInstructionStrings.map((item) => item.split(',')); // both wire arrays: each array constructed of instructions in raw string format

  const routesClean: WireSegment[][] = routesRaw.map((route) =>
    route.map((instruct) => {
      // map each instruction of each route to a WireSegment object
      const instruction = instruct.trim();
      return {
        direction: getDirection(instruction[0]),
        distance: parseInt(instruction.slice(1, instruction.length)), // rest of the instruction after the direction char
      };
    })
  );

  return routesClean;
};

const getDirection = (dirLetter: string): Direction => {
  let dir = -1;
  switch (dirLetter) {
    case 'R':
      dir = Direction.Right;
      break;
    case 'L':
      dir = Direction.Left;
      break;
    case 'U':
      dir = Direction.Up;
      break;
    case 'D':
      dir = Direction.Down;
      break;
    default:
      throw new Error('Unreadable direction encountered');
  }

  return dir;
};

const initGrid = (route1: WireSegment[], route2: WireSegment[]): number[][] => {
  const routes = route1.concat(route2);
  const rightDistances = routes
    .filter((item) => item.direction === Direction.Right)
    .map((item) => item.distance);
  const leftDistances = routes
    .filter((item) => item.direction === Direction.Left)
    .map((item) => item.distance);
  const upDistances = routes
    .filter((item) => item.direction === Direction.Up)
    .map((item) => item.distance);
  const downDistances = routes
    .filter((item) => item.direction === Direction.Down)
    .map((item) => item.distance);

  // get worst case max values for the dimensions - sum all the movements in each respective direction. Add 2 to be sure, in case of even numbered row/col count. Multiply by 2 because the starting point is the center point. Find the max along each axis
  const xDim =
    (Math.max(
      rightDistances.reduce((acc, curr) => curr + Math.max(acc)),
      rightDistances.reduce((acc, curr) => curr + Math.max(acc))
    ) +
      2) *
    2;
  const yDim =
    (Math.max(
      upDistances.reduce((acc, curr) => curr + Math.max(acc)),
      downDistances.reduce((acc, curr) => curr + Math.max(acc))
    ) +
      2) *
    2;

  // create grid matrix, init with empty markers (all zeros)
  let grid = [];
  for (let i = 0; i < xDim; i++) {
    grid[i] = new Array<number>(yDim).fill(Marker.Empty);
  }

  return grid;
};

// add the route to the grid and return the updated grid
const plotRoute = (
  center: [x: number, y: number],
  route: WireSegment[],
  grid: number[][],
  marker: Marker
): number[][] => {
  let vertex = center;
  route.forEach((segment) => {
    let dimension: Dimension = Dimension.Row;
    let multiplier: Multiplier = Multiplier.Pos;
    switch (segment.direction) {
      case Direction.Right:
        dimension = Dimension.Row;
        multiplier = Multiplier.Pos;
        break;
      case Direction.Left:
        dimension = Dimension.Row;
        multiplier = Multiplier.Neg;
        break;
      case Direction.Up:
        dimension = Dimension.Column;
        multiplier = Multiplier.Pos;
        break;
      case Direction.Down:
        dimension = Dimension.Column;
        multiplier = Multiplier.Neg;
        break;
      default:
        throw new Error('Unreadable direction encountered');
    }

    // starting point x and y
    const vertex_x = vertex[0];
    const vertex_y = vertex[1];
    const dist = segment.distance;
    // console.log(vertex_x, vertex_y, dist);
    // mark the line segment onto the grid using the designated marker
    if (dimension === Dimension.Row) {
      for (let i = 0; i < dist; i++) {
        grid[vertex_x][vertex_y + 1 * multiplier + i * multiplier] =
          grid[vertex_x][vertex_y + 1 * multiplier + i * multiplier] &&
          grid[vertex_x][vertex_y + 1 * multiplier + i * multiplier] !== Marker.Empty &&
          grid[vertex_x][vertex_y + 1 * multiplier + i * multiplier] !== marker
            ? Marker.Intersection
            : marker; // if we see something other than Empty (0) or our own marker, mark an intersection
      }
      // reassign vertex to the new endpoint
      vertex = [vertex_x, vertex_y + dist * multiplier];
    } else {
      for (let i = 0; i < dist; i++) {
        grid[vertex_x + 1 * multiplier + i * multiplier][vertex_y] =
          grid[vertex_x + 1 * multiplier + i * multiplier][vertex_y] &&
          grid[vertex_x + 1 * multiplier + i * multiplier][vertex_y] !== Marker.Empty &&
          grid[vertex_x + 1 * multiplier + i * multiplier][vertex_y] !== marker
            ? Marker.Intersection
            : marker; // if we see something other than Empty (0) or our own marker, mark an intersection
      }
      // reassign vertex to the new endpoint
      vertex = [vertex_x + dist * multiplier, vertex_y];
    }
  });

  return grid;
};

// return the manhattan distance for the input coodinate to the center point
const getManhattanDist = (
  intersection: [x: number, y: number],
  center: [x: number, y: number]
): number => {
  return (
    Math.abs(center[0] - intersection[0]) +
    Math.abs(center[1] - intersection[1])
  );
};
