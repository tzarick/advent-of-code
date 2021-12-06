package solution

import (
	"log"
	"strconv"
	"strings"
)

func Run(rawList string, wordSize int) (part1, part2 int) {
	numList := parseInput(rawList)

	// ----------------------- part 1 -----------------------
	bitPosCount := getBitPositionCount(wordSize, numList)

	gammaString := make([]byte, wordSize)
	for i := 0; i < len(bitPosCount); i++ {
		if bitPosCount[i] > len(numList)/2 { // is there a majority of ones in this position, based on the total number of data points we were given
			gammaString[i] = '1'
		} else {
			gammaString[i] = '0'
		}
	}

	gamma, err := strconv.ParseInt(string(gammaString), 2, 64)
	if err != nil {
		log.Fatal("string -> binary conversion failed")
	}

	var mask int64
	if wordSize == 5 {
		mask = 0b11111
	} else if wordSize == 12 {
		mask = 0b111111111111
	} else {
		log.Fatal("wordSize not supported")
	}

	epsilon := ^gamma & mask // one's complement, but only keep the bits we care about

	powerConsumption := gamma * epsilon

	// ----------------------- part 2 -----------------------

	c02ScrubberRating := getRatingValue(numList, wordSize, bitPosCount, false)
	oxygenScrubberRating := getRatingValue(numList, wordSize, bitPosCount, true)

	lifeSupportRating := c02ScrubberRating * oxygenScrubberRating

	return int(powerConsumption), int(lifeSupportRating)
}

func parseInput(rawString string) []string {
	rawList := strings.Split(strings.ReplaceAll(rawString, "\r\n", "\n"), "\n")

	return rawList
}

// the count of 1's in each position
func getBitPositionCount(wordSize int, numList []string) []int {
	bitPosCount := make([]int, wordSize)

	for i := 0; i < len(numList); i++ {
		for j := 0; j < wordSize; j++ {
			if string(numList[i][j]) == "1" {
				bitPosCount[j]++
			}
		}
	}

	return bitPosCount
}

// oxy = true -> oxygen, oxy = false -> c02
func getRatingValue(numList []string, wordSize int, bitPosCount []int, oxy bool) int64 {
	var val string
	currList := make([]string, len(numList))
	copy(currList, numList)
	for i := 0; i < wordSize; i++ {
		// filter out entries that don't satisfy the proper bit rule for the current bit position
		filtered := []string{}
		for j := 0; j < len(currList); j++ {
			if oxy {
				if keepOne := bitPosCount[i] > len(currList)/2 || bitPosCount[i]*2 == len(currList); (!keepOne && currList[j][i] == '0') || (keepOne && currList[j][i] == '1') {
					filtered = append(filtered, currList[j])
				}
			} else {
				if keepZero := (len(currList) - bitPosCount[i]) <= len(currList)/2; (keepZero && currList[j][i] == '0') || (!keepZero && currList[j][i] == '1') {
					filtered = append(filtered, currList[j])
				}

			}
		}

		if len(filtered) == 1 {
			val = filtered[0]
			break
		}

		currList = currList[:len(filtered)] // resize. There's got to a better way to do this
		copy(currList, filtered)
		bitPosCount = getBitPositionCount(wordSize, currList)
	}

	scrubberRating, err := strconv.ParseInt(val, 2, 64)
	if err != nil {
		log.Fatal("string -> binary conversion failed for c02")
	}

	return scrubberRating
}
