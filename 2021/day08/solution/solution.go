package solution

import "strings"

type display struct {
	signals                    []string
	output                     []string
	customSegmentToStdSegments map[byte]int // map the letter we get to the std segment (key below)
}

const (
	top         = iota
	topLeft     = iota
	topRight    = iota
	mid         = iota
	bottomLeft  = iota
	bottomRight = iota
	bottom      = iota
)

// state of all 7 segments -> displayed digit
var stdSegmentComboToDigitMap map[string]int = map[string]int{
	"1110111": 0,
	"0010010": 1,
	"1011101": 2,
	"1011011": 3,
	"0111010": 4,
	"1101011": 5,
	"1101111": 6,
	"1010010": 7,
	"1111111": 8,
	"1111011": 9,
}

func Run(rawList string) (part1, part2 int) {
	displayInputs := parseInput(rawList)

	totalOutputVal := 0
	for i := range displayInputs {
		customSegmentToStdSegments := decodeSegmentLines(displayInputs[i])
		totalOutputVal += decodeOutput(displayInputs[i].output, customSegmentToStdSegments)
	}

	return getUniqueOutputDigitCount(displayInputs), totalOutputVal
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

func decodeSegmentLines(d display) map[byte]int {
	// fill d.customSegmentToStdSegments
	// for _, digit := range d.output {

	// }
	return map[byte]int{}
}

func decodeOutput(sequence []string, key map[byte]int) int {
	return 0
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

// rand comb -> number
// rand comb -> decoded mapping -> segment key -> std map -> number

// segment key
//
// top
// t  t
// o  o
// p  p
// l  r
// t  t
// mid
// b  b
// o  o
// t  t
// l  r
// t  t
// bottom

// top = 0, toplt = 1, toprt = 2, mid = 3, botlt = 4, botrt = 5, bottom = 6
