package solution_test

import (
	"testing"

	"github.com/tzarick/advent-of-code/2021/day02/solution"
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
			input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
			expect: 150,
		},
		{
			id:     2,
			input:  `forward 2000`,
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
	t.SkipNow()
	testCases := []test{
		{
			id: 1,
			input: `forward 5
down 5
forward 8
up 3
down 8
forward 2`,
			expect: 900,
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
