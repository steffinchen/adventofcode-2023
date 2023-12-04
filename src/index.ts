import fs from 'fs';

const day = process.argv[2];
const part = process.argv[3] ?? 'a';

const input = fs
  .readFileSync(`./data/day_${day}.txt`, 'utf8')
  .split('\n')
  .filter((line) => line.length > 0);

const result = await getResult(day, part, input);

console.log(`Day ${day}, Part ${part.toUpperCase()}: `, result);

async function getResult(dayS: string, part: string, input: string[]) {
  const day = await import(`./day${dayS}.js`);
  const dayObj = new day[`Day${dayS}`]();
  if (part === '1') {
    dayObj.testPart1();
    return dayObj.part1(input);
  } else {
    dayObj.testPart2();
    return dayObj.part2(input);
  }
}
