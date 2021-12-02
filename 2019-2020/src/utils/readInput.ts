import { readFileSync } from 'fs';
import * as getCallerFile from 'get-caller-file';

export const readInput = (filename: string) => {
  const file = getCallerFile
    .default()
    .split('\\')
    .slice(0, -1)
    .concat(filename)
    .join('\\');

  return readFileSync(file).toString();
};
