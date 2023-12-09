import { Day } from './day.type.js';

export class Day3 implements Day {
  part1 = (input: string[]) => {
    console.log('🚀 -> Day3 -> input:', input);

    return 0;
  };

  isSymbol = (c: string) => {
    return c !== '.' && Number.isNaN(Number(c));
  };

  part2 = (input: string[]) => {
    return 0;
  };

  testPart1 = () => {
    const example: string[] = [
      '467..114..',
      '...*......',
      '..35..633.',
      '......#...',
      '617*......',
      '.....+.58.',
      '..592.....',
      '......755.',
      '...$.*....',
      '.664.598..',
    ];
    const sampleResult = this.part1(example);
    if (sampleResult !== 4361)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };

  testPart2 = () => {
    const example: string[] = [];
    const sampleResult = this.part1(example);
    if (sampleResult !== 42)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };
}
