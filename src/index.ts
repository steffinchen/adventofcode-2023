import fs from 'fs';
import { Day1 } from './day1.js';
import { Day2 } from './day2.js';
import { Day4 } from './day 4.js';

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
      const day = new Day1();
      if (part === 'a') {
        day.testPart1();
        return day.part1(input);
      } else {
        day.testPart2();
        return day.part2(input);
      }
    case '2':
      const day2 = new Day2();
      if (part === 'a') {
        day2.testPart1();
        return day2.part1(input);
      } else {
        day2.testPart2();
        return day2.part2(input);
      }
    case '4':
      const day4 = new Day4();
      if (part === 'a') {
        day4.testPart1();
        return day4.part1(input);
      } else {
        day4.testPart2();
        return day4.part2(input);
      }
    default:
      throw new Error(`Day ${dayS} not implemented`);
  }
}
