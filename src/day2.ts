import { max, min } from 'lodash';
import { Day } from './day.type.js';

type Color = 'red' | 'green' | 'blue';
type Round = { [key in Color]: number };
type Game = {
  id: number;
  rounds?: Round[];
  maxCubes?: Round;
  minCubes?: Round;
};

export class Day2 implements Day {
  part1 = (input: string[]) => {
    const exampleRound = { red: 12, green: 13, blue: 14 };
    return input
      .map((line) => this.parse(line))
      .map((game) => this.getMaxCubesPerColor(game))
      .filter((game) => {
        return (
          game.maxCubes!.red <= exampleRound.red &&
          game.maxCubes!.green <= exampleRound.green &&
          game.maxCubes!.blue <= exampleRound.blue
        );
      })
      .map((game) => Number(game.id))
      .reduce((a, b) => a + b);
  };

  parse = (line: string): Game => {
    const rounds = line
      .split(':')[1]
      .trim()
      .split(';')
      .map((round) =>
        round
          .split(',')
          .map((el) => el.trim())
          .reduce((acc, cur) => {
            const [count, color] = cur.split(' ');
            acc[color as Color] = parseInt(count);
            return acc;
          }, {} as Round)
      );
    const gameId = Number(line.match(/Game (\d+):/)?.[1]);
    return { id: gameId, rounds: rounds };
  };

  getMaxCubesPerColor = (game: Game) => {
    const maxCubes = game.rounds
      ?.flatMap((round) => Object.entries(round))
      .reduce((acc, cur) => {
        const [color, count] = cur;
        if (acc[color as Color] === undefined) {
          acc[color as Color] = count;
        } else {
          acc[color as Color] = Math.max(acc[color as Color], count);
        }
        return acc;
      }, {} as Record<Color, number>);
    return { ...game, maxCubes: maxCubes };
  };

  part2 = (input: string[]) => {
    return input
      .map((line) => this.parse(line))
      .map((game) => this.getMaxCubesPerColor(game))
      .map((game) => {
        return Object.values(game.maxCubes!).reduce((acc, cur) => acc * cur);
      })
      .reduce((acc, cur) => acc + cur);
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
    const example: string[] = [
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
      'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
    ];
    const sampleResult = this.part2(example);
    if (sampleResult !== 2286)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };
}
