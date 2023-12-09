import _, { last } from 'lodash';
import { Day } from './day.type.js';

export class Day9 implements Day {
  part1 = (input: string[]) => {
    return input
      .map((line) => line.split(' ').map((n) => Number(n.trim())))
      .map((history) => this.getNextValue(history))
      .reduce((acc, curr) => acc + curr, 0);
  };

  getNextValue = (history: number[]): number => {
    if (history.every((diff) => diff === 0)) return 0;

    const diffs = this.calcDiff(history);
    const lastValue = _.last(history) ?? 0;
    return lastValue + this.getNextValue(diffs);
  };

  getPreviousValue = (history: number[]): number => {
    if (history.every((diff) => diff === 0)) return 0;

    const diffs = this.calcDiff(history);
    const lastValue = _.first(history) ?? 0;
    return lastValue - this.getPreviousValue(diffs);
  };

  calcDiff = (history: number[]): number[] => {
    return history.reduce((acc, curr, i) => {
      if (i === 0) return acc;
      return [...acc, curr - history[i - 1]];
    }, [] as number[]);
  };

  part2 = (input: string[]) => {
    return input
      .map((line) => line.split(' ').map((n) => Number(n.trim())))
      .map((history) => this.getPreviousValue(history))
      .reduce((acc, curr) => acc + curr, 0);
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
    const example: string[] = [
      '0 3 6 9 12 15',
      '1 3 6 10 15 21',
      '10 13 16 21 30 45',
    ];
    const sampleResult = this.part2(example);
    if (sampleResult !== 2)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };
}
