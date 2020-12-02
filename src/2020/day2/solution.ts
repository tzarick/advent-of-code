type result = {
  part1: number;
  part2: number;
};

interface PasswordInput {
  requirements: {
    token: string;
    min: number;
    max: number;
  };
  password: string;
}

export const solution = (inputList: string): result => {
  const passwordInputs = parseInput(inputList);

  /* Part 1 */
  const validPasswords_part1 = passwordInputs.filter((item) =>
    isValidPassword_part1(item)
  );

  /* Part 2 */
  const validPasswords_part2 = passwordInputs.filter((item) =>
    isValidPassword_part2(item)
  );

  return {
    part1: validPasswords_part1.length,
    part2: validPasswords_part2.length,
  };
};

const parseInput = (inputString: string): PasswordInput[] => {
  return inputString.split('\n').map((pwordLine) => {
    const elements = pwordLine.split(/\s+/); // format:   <min>-<max> <token>: <password>
    return {
      requirements: {
        token: elements[1][0], // first char of second element chunk
        min: parseInt(elements[0].split('-')[0]),
        max: parseInt(elements[0].split('-')[1]),
      },
      password: elements[2],
    };
  });
};

const isValidPassword_part1 = (pwordInput: PasswordInput): boolean => {
  const pword = pwordInput.password;
  const req = pwordInput.requirements;

  // make sure password includes the token at all if it has to
  if (req.min !== 0 && !pword.includes(req.token)) {
    return false;
  }

  let isValid = false;
  let tokenCount = 0;
  for (let i = 0; i < pword.length && tokenCount <= req.max; i++) {
    if (pword.charAt(i) === req.token) {
      tokenCount++;
    }
  }

  if (tokenCount >= req.min && tokenCount <= req.max) {
    isValid = true;
  }

  return isValid;
};

const isValidPassword_part2 = (pwordInput: PasswordInput): boolean => {
  const pword = pwordInput.password;
  const req = pwordInput.requirements;
  const idx1 = req.min - 1;
  const idx2 = req.max - 1;

  if (!pword.includes(req.token)) {
    return false;
  }

  const idx1Match = pword.charAt(idx1) === req.token ? 1 : 0;
  const idx2Match = pword.charAt(idx2) === req.token ? 1 : 0;

  return !!(idx1Match ^ idx2Match); // bitwise XOR to bool
};
