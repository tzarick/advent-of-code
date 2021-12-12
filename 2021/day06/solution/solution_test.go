package solution_test

import (
	"testing"

	"github.com/tzarick/advent-of-code/2021/day06/solution"
)

type test struct {
	id       int
	input    string
	duration int
	expect   int
}

var testCasesPart1 []test = []test{
	{
		id:       1,
		input:    `3,4,3,1,2`,
		duration: 18,
		expect:   26,
	},
	{
		id:       2,
		input:    `3,4,3,1,2`,
		duration: 80,
		expect:   5934,
	},
}

func TestPart1(t *testing.T) {

	for _, test := range testCasesPart1 {
		t.Logf("Running test case #%d", test.id)
		got := solution.Run(test.input, test.duration)
		if got != test.expect {
			t.Errorf("Case #%d failed: Got %v, expected %v", test.id, got, test.expect)
		}
	}
}

func TestPart2(t *testing.T) {
	t.SkipNow()
	testCases := []test{
		{
			id:       1,
			input:    `3,4,3,1,2`,
			duration: 256,
			expect:   26984457539,
		},
	}

	for _, test := range testCases {
		t.Logf("Running test case #%d", test.id)
		got := solution.Run(test.input, test.duration)
		if got != test.expect {
			t.Errorf("Case #%d failed: Got %v, expected %v", test.id, got, test.expect)
		}
	}
}

func BenchmarkTest(b *testing.B) {
	b.Log("Running benchmark test...")
	testCase := testCasesPart1[0]
	b.StartTimer()
	for i := 0; i < b.N; i++ {
		solution.Run(testCase.input, testCase.duration)
	}

	// Results:
	// after part 1, recursion, no memoization:
	//
	// BenchmarkTest-4           466556              2428 ns/op
	//
}
