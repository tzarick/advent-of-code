package solution

import (
	"math"
	"sort"
	"strconv"
	"strings"
)

func Run(rawList string) (part1, part2 int) {
	positions := parseInput(rawList)
	sort.Ints(positions)
	min := positions[0]
	max := positions[len(positions)-1]

	// ----------------- part1 ---------------------
	fuelUsageOptions := make([]int, max-min+1)

	for i := min; i <= max; i++ {
		totalFuel := 0
		for _, pos := range positions {
			totalFuel += int(math.Abs(float64(pos) - float64(i)))
		}
		fuelUsageOptions[i] = totalFuel
	}

	minFuelUsage := minInt(fuelUsageOptions)

	// ------------------- part 2 -------------------
	fuelUsageOptions2 := make([]int, max-min+1)
	for i := min; i <= max; i++ {
		totalFuel := 0
		for _, pos := range positions {
			totalFuel += getFuelUsed(pos, i)
		}
		fuelUsageOptions2[i] = totalFuel
	}

	minFuelUsage2 := minInt(fuelUsageOptions2)

	return minFuelUsage, minFuelUsage2
}

func getFuelUsed(crabPosition, dest int) int {
	// ex. for a stdDist of 5, we need to calculate 1 + 2 + 3 + 4 + 5
	// find n + (n-1) + (n-2) +...+ 1  this is equal to 1 + ... + (n-2) + (n-1) + n.
	// we know that (n-1) + (n-2) + ... + (n-k) = nk - (k/2)(k+1)
	// in our case, k should be (n-1) bc we want (n-k) to be 1 --> n-k=1 -> k=n-1
	// then we just need to add an additional n on at the end to make the series inclusive of n

	standardDist := math.Abs(float64(crabPosition) - float64(dest))

	n := standardDist
	k := (n - 1)

	newDist := (n + (n * k) - (k/2.0)*(k+1))

	return int(newDist)
}

func parseInput(rawString string) []int {
	positionsRaw := strings.Split(rawString, ",")
	positions := make([]int, len(positionsRaw))

	for i, val := range positionsRaw {
		positions[i], _ = strconv.Atoi(val)
	}

	return positions
}

func minInt(nums []int) int {
	min := nums[0]
	for _, num := range nums {
		if num < min {
			min = num
		}
	}

	return min
}
