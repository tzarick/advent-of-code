package main

import (
	_ "embed"
	"fmt"

	"github.com/tzarick/advent-of-code/2021/day07/solution"
)

//go:embed input.txt
var input string

func main() {
	part1, part2 := solution.Run(input)

	fmt.Printf(`
		Part 1 Solution: %v
		Part 2 Solution: %v 
	`, part1, part2)
}

// func readInput(filename string) (string, error) {
// 	content, err := os.ReadFile(filename)
// 	if err != nil {
// 		return "", fmt.Errorf("error reading input file")
// 	}

// 	return string(content), nil
// }
