package solution

import (
	"strconv"
	"strings"
)

type fish struct {
	birthday int
	age      int
}

const (
	spawnCycle int = 7 // 7 days
)

func Run(rawList string, duration int) int {
	fishies := parseInput(rawList)

	// add all the children to our list of fish
	for _, fishy := range fishies {
		children := birthFishChildren(fishy, duration)
		fishies = append(fishies, children...)
	}

	totalFish := len(fishies)
	return totalFish
}

func birthFishChildren(parent fish, duration int) []fish {
	firstSpawnDay := parent.birthday + parent.age + 1
	numChildren := 0               // base case -> if no children, an empty slice of fish is returned
	if firstSpawnDay <= duration { // this fish will have at least one child
		numChildren = 1 + (duration-firstSpawnDay)/spawnCycle
	}
	var children []fish

	for i := 0; i < numChildren; i++ {
		spawnDay := firstSpawnDay + (i * spawnCycle)
		child := fish{
			birthday: spawnDay,
			age:      spawnCycle + 1, // always 8 for our purposes
		}
		children = append(children, child)
		children = append(children, birthFishChildren(child, duration)...)
	}

	return children
}

func parseInput(rawString string) []fish {
	agesRaw := strings.Split(rawString, ",")
	fishies := make([]fish, len(agesRaw))

	for i, v := range agesRaw {
		age, _ := strconv.Atoi(v)
		fishies[i] = fish{
			birthday: 0, // initial: starts on day 0
			age:      age,
		}
	}

	return fishies
}
