package solution_test

import (
	"testing"

	"github.com/tzarick/advent-of-code/2021/day03/solution"
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
			input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
			expect: 198,
		},
	}

	for _, test := range testCases {
		t.Logf("Running test case #%d", test.id)
		got, _ := solution.Run(test.input, 5)
		if got != test.expect {
			t.Errorf("Case #%d failed: Got %v, expected %v", test.id, got, test.expect)
		}
	}
}

func TestPart2(t *testing.T) {
	testCases := []test{
		{
			id: 1,
			input: `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
			expect: 230,
		},
	}

	for _, test := range testCases {
		t.Logf("Running test case #%d", test.id)
		_, got := solution.Run(test.input, 5)
		if got != test.expect {
			t.Errorf("Case #%d failed: Got %v, expected %v", test.id, got, test.expect)
		}
	}
}
