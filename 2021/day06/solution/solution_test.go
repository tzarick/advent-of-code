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

func TestPart1(t *testing.T) {
	testCases := []test{
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

	for _, test := range testCases {
		t.Logf("Running test case #%d", test.id)
		got := solution.Run(test.input, test.duration)
		if got != test.expect {
			t.Errorf("Case #%d failed: Got %v, expected %v", test.id, got, test.expect)
		}
	}
}

func TestPart2(t *testing.T) {
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
