// find total fuel required for all modules:
// fuel required for each module = floor(mass / 3) - 2
type result = {
  part1: number;
  part2: number;
};

export const solution = (masses: number[]): result => {
  /* Part 1 */
  const fuelRequirements = masses.map((mass) => Math.floor(mass / 3) - 2);
  const totalFuelRequired_part1 = fuelRequirements.reduce(
    (acc, curr) => acc + curr
  ); // sum fuel requirements

  /* Part 2 */
  const fuelRequirementsAdjusted = getFuelRequirements(masses);
  const totalFuelRequired_part2 = fuelRequirementsAdjusted.reduce(
    (acc, curr) => acc + curr
  ); // sum fuel requirements

  return {
    part1: totalFuelRequired_part1,
    part2: totalFuelRequired_part2,
  };
};

const getFuelRequirements = (masses: number[]): number[] => {
  const getFuelRequirementForMass = (mass: number): number => {
    let fuel = Math.floor(mass / 3) - 2;
    // base case
    if (fuel <= 0) {
      return 0;
    } else {
      return fuel + getFuelRequirementForMass(fuel);
    }
  };

  return masses.map((mass) => getFuelRequirementForMass(mass));
};
