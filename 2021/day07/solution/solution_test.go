package solution_test

import (
	"testing"

	"github.com/tzarick/advent-of-code/2021/day07/solution"
)

type test struct {
	id     int
	input  string
	expect int
}

var testCasesPart1 []test = []test{
	{
		id:     1,
		input:  `16,1,2,0,4,2,7,1,2,14`,
		expect: 37,
	},
}

var testCasesPart2 []test = []test{
	{
		id:     1,
		input:  `16,1,2,0,4,2,7,1,2,14`,
		expect: 168,
	},
}

func TestPart1(t *testing.T) {
	for _, test := range testCasesPart1 {
		t.Logf("Running test case #%d", test.id)
		got, _ := solution.Run(test.input)
		if got != test.expect {
			t.Errorf("Case #%d failed: Got %v, expected %v", test.id, got, test.expect)
		}
	}
}

func TestPart2(t *testing.T) {
	for _, test := range testCasesPart2 {
		t.Logf("Running test case #%d", test.id)
		_, got := solution.Run(test.input)
		if got != test.expect {
			t.Errorf("Case #%d failed: Got %v, expected %v", test.id, got, test.expect)
		}
	}
}
