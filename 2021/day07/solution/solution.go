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

	fuelUsage := make([]int, max-min)

	for i := min; i <= max; i++ {
		totalFuel := 0
		for _, pos := range positions {
			totalFuel += int(math.Abs(float64(pos) - float64(i)))
		}
		fuelUsage[i] = totalFuel
	}

	// math.Max()
	return 0, 0
}

func parseInput(rawString string) []int {
	positionsRaw := strings.Split(rawString, ",")
	positions := make([]int, len(positionsRaw))

	for i, val := range positionsRaw {
		positions[i], _ = strconv.Atoi(val)
	}

	return positions
}
