package solution_test

import (
	"testing"

	"github.com/tzarick/advent-of-code/2021/day05/solution"
)

type test struct {
	id     int
	input  string
	expect int
}

func TestPart1(t *testing.T) {
	testCases := []test{
		{
			id: 1,
			input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
			expect: 5,
		},
	}

	for _, test := range testCases {
		t.Logf("Running test case #%d", test.id)
		got := solution.Run(test.input, false)
		if got != test.expect {
			t.Errorf("Case #%d failed: Got %v, expected %v", test.id, got, test.expect)
		}
	}
}

func TestPart2(t *testing.T) {
	testCases := []test{
		{
			id: 1,
			input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
			expect: 12,
		},
	}

	for _, test := range testCases {
		t.Logf("Running test case #%d", test.id)
		got := solution.Run(test.input, true)
		if got != test.expect {
			t.Errorf("Case #%d failed: Got %v, expected %v", test.id, got, test.expect)
		}
	}
}
