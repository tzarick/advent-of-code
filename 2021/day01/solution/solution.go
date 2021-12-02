package solution

import (
	"fmt"
	"log"
	"strconv"
	"strings"
)

func Run(depthChartRaw string) (part1, part2 int) {
	depthChart := parseInput(depthChartRaw)

	// part 1 - depth increase count
	depthIncreaseCount := 0
	for i := 1; i < len(depthChart); i++ {
		if depthChart[i] > depthChart[i-1] {
			depthIncreaseCount++
		}
	}

	// part 2 - smooth the result with a moving window
	smoothedIncreaseCount := 0
	if len(depthChart) >= 3 {
		left := 0
		right := 2 // window size of 3
		currWindowTotal := sum(depthChart[left : right+1])
		for i := 0; i < len(depthChart)-3; i++ {
			nextWindowTotal := currWindowTotal - depthChart[left] + depthChart[right+1]
			if nextWindowTotal > currWindowTotal {
				smoothedIncreaseCount++
			}

			currWindowTotal = nextWindowTotal
			left++
			right++
		}
	}

	return depthIncreaseCount, smoothedIncreaseCount
}

func parseInput(rawString string) []int {
	depthChartStr := strings.Split(strings.ReplaceAll(rawString, "\r\n", "\n"), "\n")
	depthChart := make([]int, len(depthChartStr))

	for i, v := range depthChartStr {
		num, err := strconv.Atoi(v)
		if err != nil {
			fmt.Println(err)
			log.Fatal("Failed string -> int conversion")
		}

		depthChart[i] = num
	}

	return depthChart
}

func sum(nums []int) int {
	sum := 0
	for _, v := range nums {
		sum += v
	}

	return sum
}
