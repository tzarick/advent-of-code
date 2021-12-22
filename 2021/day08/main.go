package main

import (
	_ "embed"
	"fmt"

	"github.com/tzarick/advent-of-code/2021/day08/solution"
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
