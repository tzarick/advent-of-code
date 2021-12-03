package solution

import (
	"fmt"
	"log"
	"strconv"
	"strings"
)

const (
	forward = "forward"
	up      = "up"
	down    = "down"
)

type position struct {
	x int
	y int
}

type instruction struct {
	dir       string
	magnitude int
}

func Run(rawDirections string) (part1, part2 int) {
	instructions, err := parseInput(rawDirections)
	if err != nil {
		log.Fatal(err)
	}

	position, err := calcPosition(instructions)
	if err != nil {
		log.Fatal(err)
	}

	depth1 := -position.y
	part1 = depth1 * position.x // depth * horizontal position

	depth2, err := calcDepth2(instructions)
	if err != nil {
		log.Fatal(err)
	}
	part2 = depth2 * position.x // horizontal position should not have changed from part 1 to part 2

	return part1, part2
}

func calcPosition(instructs []instruction) (position, error) {
	var pos position
	for _, instr := range instructs {
		switch instr.dir {
		case forward:
			pos.x += instr.magnitude
		case up:
			pos.y += instr.magnitude
		case down:
			pos.y -= instr.magnitude
		default:
			return position{}, fmt.Errorf("unexpected direction found: %s", instr.dir)
		}
	}

	return pos, nil
}

func calcDepth2(instructs []instruction) (int, error) {
	var aim int
	var depth int
	for _, instr := range instructs {
		switch instr.dir {
		case forward:
			depth += instr.magnitude * aim
		case up:
			aim -= instr.magnitude
		case down:
			aim += instr.magnitude
		default:
			return 0, fmt.Errorf("unexpected direction found: %s", instr.dir)
		}
	}

	return depth, nil
}

func parseInput(rawString string) ([]instruction, error) {
	rawList := strings.Split(strings.ReplaceAll(rawString, "\r\n", "\n"), "\n")
	instructions := make([]instruction, len(rawList))

	for i, v := range rawList {
		elements := strings.Split(v, " ")

		instructions[i].dir = strings.ToLower(elements[0])

		num, err := strconv.Atoi(elements[1])
		if err != nil {
			fmt.Println(err)
			return []instruction{}, fmt.Errorf("failed string -> int conversion")
		}
		instructions[i].magnitude = num
	}

	return instructions, nil
}
