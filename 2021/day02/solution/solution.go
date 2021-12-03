package solution

import (
	"fmt"
	"log"
	"strconv"
	"strings"
)

type position struct {
	x   int
	y   int
	aim int
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

	depth := -position.y
	part1 = depth * position.x // depth * horizontal position

	return part1, 0
}

func calcPosition(instructs []instruction) (position, error) {
	var pos position
	for _, instr := range instructs {
		switch instr.dir {
		case "forward":
			pos.x += instr.magnitude
		case "up":
			pos.y += instr.magnitude
		case "down":
			pos.y -= instr.magnitude
		default:
			return position{}, fmt.Errorf("unexpected direction found: %s", instr.dir)
		}
	}

	return pos, nil
}

func calcPosition2(instructs []instruction) (position, error) {
	var pos position
	for _, instr := range instructs {
		switch instr.dir {
		case "forward":
			pos.x += instr.magnitude
		case "up":
			pos.y += instr.magnitude
		case "down":
			pos.y -= instr.magnitude
		default:
			return position{}, fmt.Errorf("unexpected direction found: %s", instr.dir)
		}
	}

	return pos, nil
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
