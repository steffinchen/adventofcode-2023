import _, { last } from 'lodash';
import { Day } from './day.type.js';

export class Day9 implements Day {
  part1 = (input: string[]) => {
    //2105961943
    return input
      .map((line) => line.split(' ').map((n) => Number(n.trim())))
      .map((history) => this.extrapolateNextValue(history))
      .reduce((acc, curr) => acc + curr, 0);
  };

  extrapolateNextValue = (history: number[]): number => {
    let done = false;
    const allDiffs: number[][] = [history];
    let currentDiffs = history;

    while (!done) {
      currentDiffs = this.calcDiff(currentDiffs);
      allDiffs.push(currentDiffs);
      done = currentDiffs.every((diff) => diff === 0);
    }

    return allDiffs
      .map((diffs) => _.last(diffs) ?? 0)
      .reduce((a, b) => a + b, 0);
  };

  calcDiff = (history: number[]): number[] => {
    return history.reduce((acc, curr, i) => {
      if (i === 0) return acc;
      return [...acc, curr - history[i - 1]];
    }, [] as number[]);
  };

  part2 = (input: string[]) => {
    return 0;
  };

  testPart1 = () => {
    const example: string[] = [
      '0 3 6 9 12 15',
      '1 3 6 10 15 21',
      '10 13 16 21 30 45',
    ];
    const sampleResult = this.part1(example);
    console.log('🚀 -> Day9 -> sampleResult:', sampleResult);
    if (sampleResult !== 114)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };

  testPart2 = () => {
    const example: string[] = [];
    const sampleResult = this.part1(example);
    if (sampleResult !== 42)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };
}
