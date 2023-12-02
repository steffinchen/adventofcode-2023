import fs from 'fs';
import { Day1 } from './day1.js';

const day = process.argv[2];
const part = process.argv[3] ?? 'a';

const input = fs
  .readFileSync(`./data/day_${day}.txt`, 'utf8')
  .split('\n')
  .filter((line) => line.length > 0);

const result = getResult(day, part, input);

console.log(`Day ${day}, Part ${part.toUpperCase()}: `, result);

function getResult(dayS: string, part: string, input: string[]) {
  switch (dayS) {
    case '1':
      const day = new Day1(input);
      if (part === 'a') {
        return day.part1();
      } else {
        return day.part2();
      }
    default:
      throw new Error(`Day ${dayS} not implemented`);
  }
}
