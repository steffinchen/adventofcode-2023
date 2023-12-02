import { Day } from './day.type';
import { expectEquals } from './helper.js';

export class Day1 implements Day {
  part1 = (input: string[]) => {
    return input
      .map((line) => this.getNumber(line, /\d/g))
      .reduce((a, b) => a + b);
  };

  part2 = (input: string[]) => {
    return 0;
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

  testPart2 = () => {};

  getNumber = (line: string, regex: RegExp) => {
    const matches = Array.from(line.matchAll(regex), (m) => m[0]);
    let firstDigit = matches[0];
    let secondDigit = matches[matches.length - 1];

    if (firstDigit.length !== 1 || parseInt(firstDigit) > 9) {
      throw new Error(
        `First digit is not a single digit: ${firstDigit} (line: ${line})`
      );
    }
    if (secondDigit.length !== 1 || parseInt(secondDigit) > 9) {
      throw new Error(
        `Second digit is not a single digit: ${secondDigit} (line: ${line})`
      );
    }

    return Number(`${firstDigit}${secondDigit}`);
  };
}
