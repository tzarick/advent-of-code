package solution

import (
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

func Run(rawList string, includeDiag bool) int {
	vents := parseInput(rawList)
	// part 1
	maxDim := getMaxDim(vents)
	grid := initGrid(maxDim)

	for _, v := range vents {
		if !isDiag(v) {
			xLen := v.end.x - v.start.x
			yLen := v.end.y - v.start.y

			// handle horizontal lines
			lineLengthX := int(math.Abs(float64(xLen)))
			xDir := int(math.Copysign(1, float64(xLen))) // -1 or 1
			for i := 0; lineLengthX > 0 && i <= lineLengthX; i++ {
				grid[v.start.x+(i*xDir)][v.start.y]++
			}

			// handle vertical lines
			lineLengthY := int(math.Abs(float64(yLen)))
			yDir := int(math.Copysign(1, float64(yLen))) // -1 or 1
			for i := 0; lineLengthY > 0 && i <= lineLengthY; i++ {
				grid[v.start.x][v.start.y+(i*yDir)]++
			}
		} else {
			if !includeDiag {
				continue
			}
			// part 2 - handle diagonal lines
			//
			// They are all specifically 45 degrees. This means each point is a distance of (1,1) away from each other point
			// We just have to figure out which direction and how to build it.
			//
			// example to help me visualize. This is the base case for all 4 possible cases:
			//
			//  - - -
			//  - x -
			//  - - -
			//
			// (1,1) -> (0,0) up and left
			// (1,1) -> (0,2) up and right
			// (1,1) -> (2,2) down and right
			// (1,1) -> (2,0) down and left
			//
			// in each case we can compare x2 to x1 and y2 to y1 to find the respective xDir and yDir in which we should head, by 1

			xDir := int(math.Copysign(1, float64(v.end.x-v.start.x))) // -1 or 1
			yDir := int(math.Copysign(1, float64(v.end.y-v.start.y))) // -1 or 1

			x := v.start.x
			y := v.start.y
			i := 0 // x direction weight
			j := 0 // y direction weight
			for (x+i) != v.end.x && (y+j) != v.end.y {
				grid[x+i][y+j]++
				i += 1 * xDir
				j += 1 * yDir
			}

			grid[x+i][y+j]++ // mark the end point
		}
	}

	overlap := findOverlap(grid)
	return overlap
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
