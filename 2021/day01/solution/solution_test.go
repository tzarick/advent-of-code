package solution_test

import (
	"testing"

	"github.com/tzarick/advent-of-code/2021/day01/solution"
)

type Test struct {
	id     int
	input  string
	expect int
}

func TestPart1(t *testing.T) {
	testCases := []Test{
		{
			id: 1,
			input: `199
200
208
210
200
207
240
269
260
263`,
			expect: 7,
		},
		{
			id: 2,
			input: `3
2
1
0
9
7
0
0
0
55`,
			expect: 2,
		},
		{
			id:     3,
			input:  `2000`,
			expect: 0,
		},
	}

	for _, test := range testCases {
		t.Logf("Running test case #%d", test.id)
		got, _ := solution.Run(test.input)
		if got != test.expect {
			t.Errorf("Case #%d failed: Got %v, expected %v", test.id, got, test.expect)
		}
	}
}

func TestPart2(t *testing.T) {
	testCases := []Test{
		{
			id: 1,
			input: `199
200
208
210
200
207
240
269
260
263`,
			expect: 5,
		},
	}

	for _, test := range testCases {
		t.Logf("Running test case #%d", test.id)
		_, got := solution.Run(test.input)
		if got != test.expect {
			t.Errorf("Case #%d failed: Got %v, expected %v", test.id, got, test.expect)
		}
	}
}
