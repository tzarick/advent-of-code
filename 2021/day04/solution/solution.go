package solution

import (
	"fmt"
	"log"
	"strconv"
	"strings"

	"github.com/tzarick/advent-of-code/2021/day04/solution/board"
)

func Run(rawList string) (part1, part2 int) {
	calledBingoNums, rawBoards := parseInput(rawList)

	boards := buildBoards(rawBoards)
	firstWinner, lastWinner := playBingo(calledBingoNums, boards)

	return firstWinner, lastWinner
}

func playBingo(bingoNums []int, boards []board.Board) (int, int) {
	var firstFinished, lastFinished int
	finishedBoards := 0

	for i, num := range bingoNums {
		for j := 0; j < len(boards); j++ {
			if boards[j].Finished {
				continue
			}

			x, y := boards[j].GetCoords(num)
			if x > -1 {
				boards[j].Mark(x, y)
			}

			possibleWinner := i >= boards[0].XDim || i >= boards[0].YDim
			if possibleWinner && boards[j].IsAWinner() {
				if finishedBoards == 0 {
					firstFinished = boards[j].UnmarkedSum() * num
				} else if finishedBoards == len(boards)-1 {
					lastFinished = boards[j].UnmarkedSum() * num
					return firstFinished, lastFinished
				}

				finishedBoards++
				boards[j].Finished = true
			}
		}
	}

	return firstFinished, -1 // if we got here, we never set lastFinished
}

func parseInput(rawString string) (calledNums []int, rawBoards []string) {
	subComponents := strings.Split(strings.ReplaceAll(rawString, "\r\n", "\n"), "\n\n") // only split on double new line here first - initial breakdown

	calledNums, err := parseCalledNums(subComponents[0])
	if err != nil {
		log.Fatalf("parsing called nums failed: %s", err)
	}

	rawBoards = subComponents[1:]

	return calledNums, rawBoards
}

func parseCalledNums(rawCalledNums string) ([]int, error) {
	nums := strings.Split(rawCalledNums, ",")
	numsClean := make([]int, len(nums))

	for i, num := range nums {
		val, err := strconv.Atoi(num)
		if err != nil {
			return []int{}, fmt.Errorf("error during string -> num: %s", err.Error())
		}

		numsClean[i] = val
	}

	return numsClean, nil
}

func buildBoards(rawBoards []string) []board.Board {
	boards := make([]board.Board, len(rawBoards))
	for i, rawBoard := range rawBoards {
		boards[i] = board.NewBoard(rawBoard)
	}

	return boards
}
