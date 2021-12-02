package main

import (
	"fmt"
	"log"
	"os"

	"github.com/tzarick/advent-of-code/2021/day01/solution"
)

func main() {
	input := readInput("input.txt")

	part1, part2 := solution.Run(input)

	fmt.Printf(`
		Part 1 Solution: %v
		Part 2 Solution: %v 
	`, part1, part2)
}

func readInput(filename string) string {
	content, err := os.ReadFile(filename)
	if err != nil {
		log.Fatalf("Error reading input file")
	}

	return string(content)
}
