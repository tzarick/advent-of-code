interface result {
  part1: number;
  part2: number;
}

const MAX_SMALL_DIR_SIZE = 100000;
const TOTAL_DISK_SPACE = 70000000;
const SPACE_NEEDED_FOR_UPDATE = 30000000;

export const solution = (input: string): result => {
  const filesystem = populateFilesystemInfo(input);
  const totalMemUsage = calculateMemoryTotals(filesystem['/']);
  const totalSmallDirMemUsage = getSmallDirMemUsage(filesystem['/']);

  const unusedSpace = TOTAL_DISK_SPACE - totalMemUsage;
  const bestDirSizeToDelete = findBestDirSizeToDelete(filesystem['/'], unusedSpace, totalMemUsage);

  return {
    part1: totalSmallDirMemUsage,
    part2: bestDirSizeToDelete
  };
};

const populateFilesystemInfo = (input: string) => {
  const filesystem: Record<string, any> = {
    '/': {}
  };
  const depthStack: string[] = []; // keep track of our depth traversal

  const lines = input.split(/\r?\n/);

  for (const line of lines) {
    const selectedDir = line.match(/(?<=\$ cd\s).*/)?.[0];
    if (!selectedDir) {
      // we are reading the output of ls (we don't need to do anything for the ls cmd itself)
      if (line !== '$ ls') {
        const elements = line.split(/\s/);
        const prefix = elements[0];

        // iterate through to the correct level
        let currLevel = filesystem;
        for (const level of depthStack) {
          currLevel = currLevel[level];
        }

        if (prefix === 'dir') { //dir
          const dirName = elements[1];
          currLevel[dirName] = {}; // modify by ref
        } else { // file
          const fileSize = parseInt(prefix);
          const filename = elements[1];
          currLevel[filename] = fileSize;
        }
      }
    } else if (selectedDir === '..') {
      depthStack.pop();
    } else {
      depthStack.push(selectedDir);
    }
  }

  return filesystem;
};

const calculateMemoryTotals = (filesystemLevel: Record<string, any>): number => {
  let totalMemUsage = 0;
  for (const [key, value] of Object.entries(filesystemLevel)) {
    if (typeof (value) === 'number') {
      // file
      totalMemUsage += value;
    } else {
      // dir
      totalMemUsage += calculateMemoryTotals(filesystemLevel[key]);
    }
  }

  filesystemLevel.totalMemUsage = totalMemUsage;
  return totalMemUsage;
};

const getSmallDirMemUsage = (filesystemLevel: Record<string, any>): number => {
  let smallDirMemUsage = 0;

  if (filesystemLevel.totalMemUsage <= MAX_SMALL_DIR_SIZE) {
    smallDirMemUsage += filesystemLevel.totalMemUsage;
  }

  for (const [key, value] of Object.entries(filesystemLevel)) {
    if (typeof (value) === 'object') {
      // dir
      smallDirMemUsage += getSmallDirMemUsage(filesystemLevel[key]);
    }
  }

  return smallDirMemUsage;
};

const findBestDirSizeToDelete = (filesystemLevel: Record<string, any>, unusedSpace: number, currentBest: number): number => {
  let bestSizeToDelete = currentBest;

  if (unusedSpace + filesystemLevel.totalMemUsage >= SPACE_NEEDED_FOR_UPDATE && filesystemLevel.totalMemUsage < currentBest) {
    bestSizeToDelete = filesystemLevel.totalMemUsage;
  }

  for (const [key, value] of Object.entries(filesystemLevel)) {
    if (typeof (value) === 'object') {
      // dir
      bestSizeToDelete = findBestDirSizeToDelete(filesystemLevel[key], unusedSpace, bestSizeToDelete);
    }
  }

  return bestSizeToDelete;
};