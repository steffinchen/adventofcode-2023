import { Day } from './day.type';

export class Day1 implements Day {
  input: string[] = [];

  testInput = ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'];

  regex = /\d/g;

  constructor(input: string[]) {
    this.input = input;
  }

  part1 = () => {
    this.test();
    const sampleResult = this.testInput
      .map((line) => this.getNumber(line))
      .reduce((a, b) => a + b);
    if (sampleResult !== 142)
      throw new Error(`Test result is not as expected: ${sampleResult}`);

    return this.input
      .map((line) => this.getNumber(line))
      .reduce((a, b) => a + b);
  };

  part2 = () => {
    return 0;
  };

  test = () => {
    this.expectEquals(77, this.getNumber('treb7uchet'));
    this.expectEquals(22, this.getNumber('2asdf'));
    this.expectEquals(22, this.getNumber('asdf2'));
    this.expectEquals(23, this.getNumber('asdf23'));
    this.expectEquals(23, this.getNumber('23asdf'));
    this.expectEquals(22, this.getNumber('2asdf'));
    this.expectEquals(22, this.getNumber('22'));
    this.expectEquals(22, this.getNumber('2'));
    this.expectEquals(36, this.getNumber('asd3skdk5skdk6asfd'));
  };

  expectEquals(expected: number, actual: number) {
    if (expected !== actual)
      throw new Error(`Expected ${expected} but got ${actual}`);
  }

  getNumber = (line: string) => {
    const matches = Array.from(line.matchAll(this.regex), (m) => m[0]);
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
