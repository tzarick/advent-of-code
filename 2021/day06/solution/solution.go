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
	totalFish := len(fishies) // start with just the parents
	for _, fishy := range fishies {
		totalFish += getDescendantCount(fishy.birthday, fishy.age, duration)
	}

	return totalFish
}

// get descendant count for given parent
func getDescendantCount(parentBirthday, parentAge, duration int) int {
	firstSpawnDay := parentBirthday + parentAge + 1
	numChildren := 0               // base case -> if no children, an empty slice of fish is returned
	if firstSpawnDay <= duration { // this fish will have at least one child
		numChildren = 1 + (duration-firstSpawnDay)/spawnCycle
	}

	descendantCount := 0
	for i := 0; i < numChildren; i++ {
		childBirthday := firstSpawnDay + (i * spawnCycle)
		childAge := spawnCycle + 1 // always 8 for our purposes

		descendantCount += 1 + getDescendantCount(childBirthday, childAge, duration)
	}

	return descendantCount
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
