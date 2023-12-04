import { Day } from './day.type.js';
import { expectEquals } from './helper.js';

type Card = { id: number; numbers: number[]; winning: Set<number> };

export class Day4 implements Day {
  part1 = (input: string[]) => {
    const cards = this.parseInput(input);

    return cards.map(this.getPoints).reduce((a, b) => a + b);
  };

  part2 = (input: string[]) => {
    return 0;
  };

  getPoints = (card: Card) => {
    const n = card.numbers.filter((n) => card.winning.has(n)).length;
    if (n <= 0) return 0;
    else return Math.pow(2, n - 1);
  };

  parseInput(input: string[]): Card[] {
    //const regex = /Card (?<id>\d+): (?<numbers>[\d ]+)|(?<winning>[\d ]+)/g;

    return input.map(
      (line): Card => {
        const id = Number(line.split(':')[0].replace('Card ', ''));
        const [winning, numbers] = line
          .split(':')[1]
          .split('|')
          .map((el) => el.trim())
          .map((el) =>
            el
              .split(' ')
              .map((n) => n.trim())
              .filter((n) => n !== '')
              .map((n) => Number(n))
          );
        const winningSet = new Set(winning);
        return { id, numbers, winning: winningSet };
      }
    );
  }

  testPart1 = () => {
    const example: string[] = [
      'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
      'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
      'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
      'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
      'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
      'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11',
    ];
    const sampleResult = this.part1(example);
    if (sampleResult !== 13)
      throw new Error(`Test result is not as expected: ${sampleResult}`);

    expectEquals(
      4,
      this.getPoints({ id: 1, numbers: [1, 2, 3], winning: new Set([1, 2, 3]) })
    );
    expectEquals(
      2,
      this.getPoints({ id: 1, numbers: [1, 2, 3], winning: new Set([1, 2]) })
    );
    expectEquals(
      1,
      this.getPoints({ id: 1, numbers: [1, 2, 3], winning: new Set([1]) })
    );
    expectEquals(
      0,
      this.getPoints({ id: 1, numbers: [1, 2, 3], winning: new Set([]) })
    );
    expectEquals(
      64,
      this.getPoints({
        id: 1,
        numbers: [1, 2, 3, 4, 5, 6, 7],
        winning: new Set([1, 2, 3, 4, 5, 6, 7, 8]),
      })
    );
    expectEquals(
      2,
      this.getPoints({
        id: 1,
        numbers: [67, 20, 49, 89, 38, 55, 16, 79, 27, 45],
        winning: new Set([43, 57, 35, 34, 20, 26, 72, 69, 28, 45, 96]),
      })
    );
  };

  testPart2 = () => {
    const example: string[] = [];
    const sampleResult = this.part1(example);
    if (sampleResult !== 42)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };
}
