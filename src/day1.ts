import exp from 'constants';
import { Day } from './day.type';
import { expectEquals } from './helper.js';

export class Day1 implements Day {
  part1 = (input: string[]) => {
    return input
      .map((line) => this.getNumber(line, /\d/g))
      .reduce((a, b) => a + b);
  };

  part2 = (input: string[]) => {
    const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;
    return input
      .map((line) => this.getNumber(line, regex))
      .reduce((a, b) => a + b);
  };

  testPart1 = () => {
    const example = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];
    const sampleResult = this.part1(example);
    if (sampleResult !== 142)
      throw new Error(`Test result is not as expected: ${sampleResult}`);

    const regex = /\d/g;
    expectEquals(77, this.getNumber('treb7uchet', regex));
    expectEquals(22, this.getNumber('2asdf', regex));
    expectEquals(22, this.getNumber('asdf2', regex));
    expectEquals(23, this.getNumber('asdf23', regex));
    expectEquals(23, this.getNumber('23asdf', regex));
    expectEquals(22, this.getNumber('2asdf', regex));
    expectEquals(22, this.getNumber('22', regex));
    expectEquals(22, this.getNumber('2', regex));
    expectEquals(36, this.getNumber('asd3skdk5skdk6asfd', regex));
  };

  testPart2 = () => {
    const example = [
      'two1nine',
      'eightwothree',
      'abcone2threexyz',
      'xtwone3four',
      '4nineeightseven2',
      'zoneight234',
      '7pqrstsixteen',
    ];
    const sampleResult = this.part2(example);
    if (sampleResult !== 281)
      throw new Error(`Test result is not as expected: ${sampleResult}`);

    expectEquals(76, this.part2(['sevenpqrstsixteen']));
    expectEquals(74, this.part2(['7mhpslddjtwo9sixkzdvqzvggvfoursdvd']));
    expectEquals(76, this.part2(['7two9six']));
    expectEquals(18, this.part2(['oneight']));
    expectEquals(11, this.part2(['one']));
    expectEquals(11, this.part2(['1one']));
  };

  getNumber = (line: string, regex: RegExp) => {
    const r = line.matchAll(regex);
    const matches = Array.from(r, (m) => m[0] || m[1]);
    let firstDigit = matches[0];
    let secondDigit = matches[matches.length - 1];

    return Number(`${this.toNumber(firstDigit)}${this.toNumber(secondDigit)}`);
  };

  toNumber = (s: string) => {
    switch (s) {
      case 'one':
        return 1;
      case 'two':
        return 2;
      case 'three':
        return 3;
      case 'four':
        return 4;
      case 'five':
        return 5;
      case 'six':
        return 6;
      case 'seven':
        return 7;
      case 'eight':
        return 8;
      case 'nine':
        return 9;
      default:
        return Number(s);
    }
  };
}
