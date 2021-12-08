package solution

import (
	"fmt"
	"math"
	"regexp"
	"strconv"
	"strings"
)

type point struct {
	x int
	y int
}

type vent struct {
	start point
	end   point
}

func Run(rawList string) (part1, part2 int) {
	vents := parseInput(rawList)
	// part 1
	maxDim := getMaxDim(vents)
	grid := initGrid(maxDim)
	println(len(grid), len(grid[0]))
	for _, v := range vents {
		if !isDiag(v) {
			xLen := v.end.x - v.start.x
			yLen := v.end.y - v.start.y

			println("lens", xLen, yLen)
			println("start", v.start.x, v.start.y)
			println(v.end.x, v.end.y)
			println("len", int(math.Abs(float64(xLen))))
			for i := 0; i < int(math.Abs(float64(xLen))); i++ {
				if xLen > 0 {
					grid[v.start.x+i][v.start.y]++
					fmt.Printf("mark %v, %v\n", v.start.x+i, v.start.y)
				} else {
					grid[v.start.x-i][v.start.y]++
					fmt.Printf("mark %v, %v\n", v.start.x-i, v.start.y)
				}
			}

			for i := 0; i < int(math.Abs(float64(yLen))); i++ {
				if yLen > 0 {
					grid[v.start.x][v.start.y+i]++
				} else {
					grid[v.start.x][v.start.y-i]++
				}
			}
		}
	}

	overlap := findOverlap(grid)
	return overlap, 0
}

func findOverlap(grid [][]int) int {
	overlapCount := 0
	for _, row := range grid {
		for _, val := range row {
			if val >= 2 {
				overlapCount++
			}
		}
	}

	return overlapCount
}

func getMaxDim(vents []vent) int {
	max := 0
	for _, v := range vents {
		refs := []int{v.start.x, v.start.y, v.end.x, v.end.y}
		for _, v := range refs {
			if v > max {
				max = v
			}
		}
	}

	return max + 1
}

func initGrid(maxDim int) [][]int {
	emptyGrid := make([][]int, maxDim)
	for i := range emptyGrid {
		emptyGrid[i] = make([]int, maxDim)
	}

	return emptyGrid
}

func isDiag(v vent) bool {
	return !(v.start.x == v.end.x || v.start.y == v.end.y)
}

func parseInput(rawString string) []vent {
	lines := strings.Split(strings.ReplaceAll(rawString, "\r\n", "\n"), "\n") // only split on double new line here first - initial breakdown
	vents := make([]vent, len(lines))

	for i, line := range lines {
		coords := regexp.MustCompile(`\s*->\s*`).Split(line, -1)

		vents[i] = vent{
			start: parsePoint(coords[0]),
			end:   parsePoint(coords[1]),
		}
	}

	return vents
}

func parsePoint(s string) point {
	nums := strings.Split(s, ",")

	x, _ := strconv.Atoi(nums[0])
	y, _ := strconv.Atoi(nums[1])

	return point{
		x: x,
		y: y,
	}
}
