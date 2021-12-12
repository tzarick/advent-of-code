package solution

import (
	"strconv"
	"strings"
)

type fish struct {
	birthday int
	age      int
}

type spawnDay = int
type descendantCount = int

const (
	spawnCycle int = 7 // 7 days
)

func Run(rawList string, duration int) int {
	parentFish := parseInput(rawList)

	// memoize / cache results based on first spawn day - each time we encounter the same spawn day, the number of descendants created should be the same
	var descendantCache = make(map[spawnDay]descendantCount) // local variable here instead of global, to prevent coupling of test runs

	// add all the children to our list of fish
	totalFish := len(parentFish) // start with just the parents
	for _, fishy := range parentFish {
		totalFish += getDescendantCount(fishy.birthday, fishy.age, duration, &descendantCache)
	}

	return totalFish
}

// get descendant count for given parent
func getDescendantCount(parentBirthday, parentAge, duration int, cache *map[spawnDay]descendantCount) int {
	firstSpawnDay := parentBirthday + parentAge + 1

	if count, ok := (*cache)[firstSpawnDay]; ok {
		return count
	}

	numChildren := 0               // base case -> if no children, 0 is returned
	if firstSpawnDay <= duration { // this fish will have at least one child
		numChildren = 1 + (duration-firstSpawnDay)/spawnCycle
	}

	descendantCount := 0
	for i := 0; i < numChildren; i++ {
		childBirthday := firstSpawnDay + (i * spawnCycle)
		childAge := spawnCycle + 1 // always 8 for our purposes

		descendantCount += 1 + getDescendantCount(childBirthday, childAge, duration, cache)
	}

	(*cache)[firstSpawnDay] = descendantCount // memoize

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
