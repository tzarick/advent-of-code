package solution

import "strings"

type display struct {
	signals []string // maybe make this a mp
	output  []string
}

func Run(rawList string) (part1, part2 int) {
	displayInputs := parseInput(rawList)

	return getUniqueOutputDigitCount(displayInputs), 0
}

func getUniqueOutputDigitCount(displays []display) int {
	var uniqueCount int
	for _, display := range displays {
		for _, digit := range display.output {
			if d := len(digit); d == 2 || d == 3 || d == 4 || d == 7 {
				uniqueCount++
			}
		}
	}

	return uniqueCount
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
