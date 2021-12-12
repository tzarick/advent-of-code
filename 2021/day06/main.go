package main

import (
	"fmt"
	"log"
	"os"

	"github.com/tzarick/advent-of-code/2021/day06/solution"
)

func main() {
	input, err := readInput("input.txt")
	if err != nil {
		log.Fatal(err)
	}

	part1 := solution.Run(input, 80)
	part2 := solution.Run(input, 256)

	fmt.Printf(`
		Part 1 Solution: %v
		Part 2 Solution: %v 
	`, part1, part2)
}

func readInput(filename string) (string, error) {
	content, err := os.ReadFile(filename)
	if err != nil {
		return "", fmt.Errorf("error reading input file")
	}

	return string(content), nil
}
