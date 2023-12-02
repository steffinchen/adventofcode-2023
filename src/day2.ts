import { Day } from './day.type.js';

export class Day2 implements Day {
  part1 = (input: string[]) => {
    const exampleRound = { red: 12, green: 13, blue: 14 };
    return input
      .map((line) => {
        return this.getMaxCubesPerColor(line);
      })
      .filter((game) => {
        return (
          game.maxCubes.red <= exampleRound.red &&
          game.maxCubes.green <= exampleRound.green &&
          game.maxCubes.blue <= exampleRound.blue
        );
      })
      .map((game) => Number(game.id))
      .reduce((a, b) => a + b);
  };

  getMaxCubesPerColor = (line: string) => {
    const rounds = line.split(':')[1].trim().split(';');
    const maxCubes = rounds
      .flatMap((round) => round.split(',').map((el) => el.trim()))
      .reduce((acc, cur) => {
        const [count, color] = cur.split(' ');
        if (acc[color] === undefined) {
          acc[color] = parseInt(count);
        } else {
          acc[color] = Math.max(acc[color], parseInt(count));
        }
        return acc;
      }, {} as Record<string, number>);
    const gameId = line.match(/Game (\d+):/)?.[1];
    return { id: gameId!, maxCubes: maxCubes };
  };

  part2 = (input: string[]) => {
    return 0;
  };

  testPart1 = () => {
    const example: string[] = [
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
      'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
    ];
    const sampleResult = this.part1(example);
    if (sampleResult !== 8)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };

  testPart2 = () => {
    const example: string[] = [];
    const sampleResult = this.part1(example);
    if (sampleResult !== 42)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };
}
