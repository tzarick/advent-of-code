package solution

import (
	"log"
	"sort"
	"strconv"
	"strings"
)

type display struct {
	signals []string
	output  []string
}

func Run(rawList string) (part1, part2 int) {
	displayInputs := parseInput(rawList)

	var totalOutputVal, totalEasyNumCount int

	for i := range displayInputs {
		seqToNumMap := decodeSegmentLines(displayInputs[i])
		outputVal, easyNumCount := decodeOutput(displayInputs[i].output, seqToNumMap)

		totalOutputVal += outputVal
		totalEasyNumCount += easyNumCount
	}

	return totalEasyNumCount, totalOutputVal
}

func decodeSegmentLines(d display) map[string]int {
	numberMap := make(map[int]string)

	// push the harder-to-determine segment sequences to the back. These sequeunces are any with length 5 and 6
	sort.Slice(d.signals, func(i, j int) bool {
		return len(d.signals[i]) != 5 && len(d.signals[i]) != 6
	})

	for _, signal := range d.signals {
		switch len(signal) {
		case 2:
			numberMap[1] = sortAlpha(signal)
		case 3:
			numberMap[7] = sortAlpha(signal)
		case 4:
			numberMap[4] = sortAlpha(signal)
		case 7:
			numberMap[8] = sortAlpha(signal)

		// harder to determine combos:
		// Decode these number values by subtracting the number segments we know (above) from the unknown segments and use the unique differences to our advantage
		case 5:
			// sequences with len 5:
			// it's a 3 if: unknownSequence - numberMap[7] = 2 segments left
			// it's a 2 if: unknownSequence - numberMap[4] = 3 segments left
			// it's a 5 if: doesn't satisfy the other len 5 cases ^

			if len(subtractSequences(signal, numberMap[7])) == 2 {
				numberMap[3] = sortAlpha(signal)
			} else if len(subtractSequences(signal, numberMap[4])) == 3 {
				numberMap[2] = sortAlpha(signal)
			} else {
				numberMap[5] = sortAlpha(signal)
			}

		case 6:
			// sequences with len 6:
			// it's a 9 if: unknownSequence - numberMap[4] = 2 segments left
			// it's a 6 if: unknownSequence - numberMap[1] = 5 segments left
			// it's a 0 if: doesn't satisfy the other len 6 cases ^

			if len(subtractSequences(signal, numberMap[4])) == 2 {
				numberMap[9] = sortAlpha(signal)
			} else if len(subtractSequences(signal, numberMap[1])) == 5 {
				numberMap[6] = sortAlpha(signal)
			} else {
				numberMap[0] = sortAlpha(signal)
			}
		}
	}

	return reverseMap(numberMap) // reverse so when we use it for decoding we can go from sequence -> number val
}

// returns:
// totalOutput: The output sequencec numbers decoded and concatenated as a 4 digit number
// easyNumCount: The number of occurrences of the numbers 1, 4, 7, and 8 in the output sequence
func decodeOutput(sequence []string, seqToNumMap map[string]int) (totalOutput, easyNumCount int) {

	var decodedSeq []byte
	for _, seq := range sequence {
		num := seqToNumMap[sortAlpha(seq)]

		if num == 1 || num == 4 || num == 7 || num == 8 {
			easyNumCount++
		}

		numString := strconv.Itoa(num)
		decodedSeq = append(decodedSeq, []byte(numString)...)
	}

	decodedNum, err := strconv.Atoi(string(decodedSeq))
	if err != nil {
		log.Fatalf("error parsing string -> number: %v", err)
	}

	return decodedNum, easyNumCount
}

func parseInput(list string) []display {
	raw := strings.Split(strings.ReplaceAll(list, "\r\n", "\n"), "\n")
	cleaned := make([]display, len(raw))

	for i, v := range raw {
		elements := strings.Split(v, "|")
		signals := strings.Split(strings.TrimSpace(elements[0]), " ")
		output := strings.Split(strings.TrimSpace(elements[1]), " ")

		cleaned[i] = display{
			signals: signals,
			output:  output,
		}
	}

	return cleaned
}

// helpers

func subtractSequences(a, b string) []rune {
	var diff []rune

	for _, char_a := range a {
		overlap := false
		for _, char_b := range b {
			if char_a == char_b {
				overlap = true
			}
		}

		if !overlap {
			diff = append(diff, char_a)
		}
	}

	return diff
}

func reverseMap(m map[int]string) map[string]int {
	reversed := make(map[string]int, len(m))

	for k, v := range m {
		reversed[v] = k
	}

	return reversed
}

func sortAlpha(str string) string {
	runes := []rune(str)
	sort.Slice(runes, func(i, j int) bool {
		return runes[i] < runes[j]
	})

	return string(runes)
}
