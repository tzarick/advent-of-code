package board

import (
	"regexp"
	"strconv"
	"strings"
)

type Board struct {
	referenceGrid [][]int // the bingo numbers
	markGrid      [][]int // the positions being marked - we need this because "0" can be a bingo number and a value we set in the referenceGrid (maybe there's a way around that)
	XDim          int
	YDim          int
	Finished      bool
}

// clear the bingo number on the board to zero when it gets marked
func (b *Board) Mark(x int, y int) {
	b.markGrid[x][y] = 1
	b.referenceGrid[x][y] = 0
}

func (b Board) GetCoords(num int) (x int, y int) {
	for i, row := range b.referenceGrid {
		for j, val := range row {
			if val == num {
				return i, j
			}
		}
	}

	return -1, -1
}

func (b Board) IsAWinner() bool {
	verticalSums := make([]int, b.YDim) // will keep track of as we traverse horizontally

	for i := 0; i < b.XDim; i++ {
		horizSum := 0 // can calculate and check as we go
		for j := 0; j < b.YDim; j++ {
			horizSum += b.markGrid[i][j]
			verticalSums[j] += b.markGrid[i][j]
		}

		if horizSum == b.XDim {
			return true
		}
	}

	for _, col := range verticalSums {
		if col == b.YDim {
			return true
		}
	}

	return false
}

func (b Board) UnmarkedSum() int {
	// a simple sum of the matrix will suffice here since we zeroed out numbers that we marked
	result := 0
	for _, row := range b.referenceGrid {
		result += sum(row)
	}

	return result
}

func NewBoard(rawBoard string) Board {
	grid := parseBoard(rawBoard)
	xDim := len(grid)
	yDim := len(grid[0])
	emptyBoard := buildEmptyBoard(xDim, yDim)

	return Board{
		referenceGrid: grid,
		markGrid:      emptyBoard,
		XDim:          xDim,
		YDim:          yDim,
		Finished:      false,
	}
}

// helpers

func parseBoard(rawBoard string) [][]int {
	var grid [][]int

	lines := strings.Split(rawBoard, "\n")
	for _, line := range lines {
		row := []int{}
		gridLine := regexp.MustCompile(`\s+`).Split(line, -1)
		for _, v := range gridLine {
			if len(v) > 0 {
				num, _ := strconv.Atoi(v)
				row = append(row, num)
			}
		}

		grid = append(grid, row)
	}

	return grid
}

func buildEmptyBoard(xDim int, yDim int) [][]int {
	emptyBoard := make([][]int, xDim)
	for i := range emptyBoard {
		emptyBoard[i] = make([]int, yDim)
	}

	return emptyBoard
}

func sum(nums []int) int {
	sum := 0
	for i := range nums {
		sum += nums[i]
	}
	return sum
}
