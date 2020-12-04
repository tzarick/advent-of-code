interface result {
  part1: number;
  part2: number;
}

interface passport {
  byr?: string; // 4 digits - at least 1920 and at most 2002
  iyr?: string; // 4 digits - at least 2010 and at most 2020;
  eyr?: string; // 4 digits - at least 2020 and at most 2030
  hgt?: string; // a number followed by either cm or in: If cm, the number must be at least 150 and at most 193. If in, the number must be at least 59 and at most 76
  hcl?: string; // a # followed by exactly six characters 0-9 or a-f
  ecl?: string; // exactly one of: amb blu brn gry grn hzl oth
  pid?: string; // a nine-digit number, including leading zeroes
  cid?: string; // ignore
}

export const solution = (inputList: string): result => {
  /* Part 1 */
  const passportsRaw = parseInput(inputList);
  const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
    // 'cid',
  ];
  const validPassports = passportsRaw.filter((item) =>
    isValidPassport(item, requiredFields)
  );

  /* Part 2 */
  const actuallyValidPassports = passportsRaw.filter((item) =>
    isActuallyValidPassport(item, requiredFields)
  );

  return {
    part1: validPassports.length,
    part2: actuallyValidPassports.length,
  };
};

const parseInput = (inputString: string): string[] => {
  return inputString.split(/\r?\n\r?\n/).map((item) => item.trim()); // input file has \r\n newlines, tests have just \n
};

// part 1
const isValidPassport = (
  passportRaw: string,
  requiredFields: string[]
): boolean => {
  return requiredFields.every((field) => passportRaw.includes(field));
};

// part 2
const isActuallyValidPassport = (
  passportRaw: string,
  requiredFields: string[]
): boolean => {
  // all req fields need to be present
  if (!isValidPassport(passportRaw, requiredFields)) {
    return false;
  }

  const passportFields = passportRaw.split(/\s+/);
  const passport = buildPassport(passportFields);

  return Object.entries(passport).every((item) => {
    const key = item[0];
    const val: string = item[1];
    if (
      // type guard
      key === 'eyr' ||
      key === 'byr' ||
      key === 'iyr' ||
      key == 'hgt' ||
      key === 'hcl' ||
      key === 'ecl' ||
      key === 'pid'
    )
      return passportValidationRules[key](val);
  });
};

const buildPassport = (elements: string[]): passport => {
  // reduce the array of key:val pairs into a passport object
  return elements.reduce((acc: passport, curr: string): passport => {
    const key = curr.split(':')[0];
    const val = curr.split(':')[1];

    if (
      // type guard
      key === 'eyr' ||
      key === 'byr' ||
      key === 'iyr' ||
      key == 'hgt' ||
      key === 'hcl' ||
      key === 'ecl' ||
      key === 'pid'
    ) {
      acc[key] = val;
    }
    return acc;
  }, {});
};

const passportValidationRules = {
  byr: (val: string) => parseInt(val) >= 1920 && parseInt(val) <= 2002,
  iyr: (val: string) => parseInt(val) >= 2010 && parseInt(val) <= 2020,
  eyr: (val: string) => parseInt(val) >= 2020 && parseInt(val) <= 2030,
  hgt: (val: string) => {
    let isValid = false;
    if (/^\d+(cm|in)$/.test(val)) {
      const num = parseInt(val.slice(0, -2));
      if (val.includes('cm')) {
        isValid = num >= 150 && num <= 193;
      } else {
        isValid = num >= 59 && num <= 76;
      }
    }

    return isValid;
  },
  hcl: (val: string) => /^#[0-9a-f]{6}$/.test(val),
  ecl: (val: string) =>
    ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val),
  pid: (val: string) => /^\d{9}$/.test(val),
  cid: (val: string) => true, // don't care
};
