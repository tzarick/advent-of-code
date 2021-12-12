// currently this works for part 1 but not part 2 because we aren't memoizing / caching. Need to figure out how to do this better / use channels

package solution

import (
	"sync"
)

func RunConcurrent(rawList string, duration int) int {
	parentFish := parseInput(rawList)

	// memoize / cache results based on first spawn day - each time we encounter the same spawn day, the number of descendants created should be the same
	var descendantCache = make(map[spawnDay]descendantCount) // local variable here instead of global, to prevent coupling of test runs

	// resultCh := make(chan int)
	wg := &sync.WaitGroup{}
	mu := &sync.RWMutex{}
	counterMu := &sync.Mutex{}

	descendantCount := 0
	// add all the children to our list of fish
	totalFish := len(parentFish) // start with just the parents
	for _, fishy := range parentFish {
		wg.Add(1)
		go getDescendantCountConcurrent(fishy.birthday, fishy.age, duration, &descendantCache, &descendantCount, mu, wg, counterMu)
	}

	wg.Wait()
	// go func() {
	// 	// close(resultCh)
	// }()

	// totalFish += len(resultCh)
	totalFish += descendantCount

	return totalFish
}

// get descendant count for given parent
func getDescendantCountConcurrent(parentBirthday, parentAge, duration int, cache *map[spawnDay]descendantCount, dCount *int, mu *sync.RWMutex, wg *sync.WaitGroup, counterMu *sync.Mutex) {
	defer wg.Done() // why do we put this here rather than just at the end? Is that equivalent?

	firstSpawnDay := parentBirthday + parentAge + 1

	// this section is doing nothing currently since we aren't adding to the cache at the moment
	mu.RLock()
	if count, ok := (*cache)[firstSpawnDay]; ok {
		mu.RUnlock()

		counterMu.Lock()
		*dCount += count
		counterMu.Unlock()
		return
	}
	mu.RUnlock()
	/////////

	numChildren := 0               // base case -> if no children, 0 is returned
	if firstSpawnDay <= duration { // this fish will have at least one child
		numChildren = 1 + (duration-firstSpawnDay)/spawnCycle
	}

	// descendantCount := 0
	for i := 0; i < numChildren; i++ {
		childBirthday := firstSpawnDay + (i * spawnCycle)
		childAge := spawnCycle + 1 // always 8 for our purposes

		counterMu.Lock()
		*dCount++
		counterMu.Unlock()

		wg.Add(1)
		go getDescendantCountConcurrent(childBirthday, childAge, duration, cache, dCount, mu, wg, counterMu)
	}

	// mu.Lock()
	// (*cache)[firstSpawnDay] = descendantCount // memoize
	// mu.Unlock()
}
