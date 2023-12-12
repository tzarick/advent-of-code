interface result {
  part1: number;
  part2: number;
}

export const solution = (input: string): result => {
  const lines = parseInput(input);

  const sum_part1 = getFirstLastDigitSum(lines);
  const sum_part2 = getRealFirstLastDigitSum(lines);

  return {
    part1: sum_part1,
    part2: sum_part2
  };
};

const getFirstLastDigitSum = (lines: string[]): number => {
  let sum = 0;
  for (const line of lines) {
    let i = 0;
    let j = line.length - 1;
    const digit = /^\d$/;

    while (!digit.test(line[i]) && i < line.length) {
      i++;
    }
    while (!digit.test(line[j]) && j >= 0) {
      j--;
    }

    sum += parseInt(`${line[i]}${line[j]}`);
  }

  return sum;
};

const getRealFirstLastDigitSum = (lines: string[]): number => {
  const englishDigits = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
  };

  const englishDigitsReversed: { [key: string]: string; } = {};
  for (const [key, value] of Object.entries(englishDigits)) {
    englishDigitsReversed[reverse(key)] = value;
  }

  let sum = 0;
  for (const line of lines) {
    let i = 0;
    let j = line.length - 1;
    const digit = /^\d$/;
    const reversedLine = reverse(line);

    let leftDigit;
    while (!digit.test(line[i]) && !leftDigit) {
      leftDigit = getEnglishDigit(line, i, englishDigits);
      i++;
    }

    let rightDigit;
    while (!digit.test(line[j]) && !rightDigit) {
      rightDigit = getEnglishDigit(reversedLine, line.length - 1 - j, englishDigitsReversed);
      j--;
    }

    sum += parseInt(`${leftDigit ?? line[i]}${rightDigit ?? line[j]}`);
  }

  return sum;
};

const getEnglishDigit = (line: string, idx: number, digitMap: { [key: string]: string; }): string | undefined => {
  for (const [englishDigit, digit] of Object.entries(digitMap)) {
    const substr = line.substring(idx);
    if (substr.startsWith(englishDigit)) {
      return digit;
    }
  }
};

const reverse = (str: string): string => {
  const chars = Array(str.length).fill('');

  for (let i = 0; i < str.length / 2; i++) {
    const left = i;
    const right = str.length - 1 - i;

    chars[left] = str[right];
    chars[right] = str[left];
  }

  return chars.join('');
};

const parseInput = (input: string): string[] => {
  const lines = input.split(/\r?\n/);
  return lines;
};