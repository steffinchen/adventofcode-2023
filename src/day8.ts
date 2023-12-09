import { Day } from './day.type.js';

type Node = { L: string; R: string; node: string };
type Instruction = 'L' | 'R';

export class Day8 implements Day {
  part1 = (input: string[]) => {
    const { instructions, network } = this.parseInput(input);

    let done = false;
    let i = 0;
    let currentNode = network['AAA'];

    while (!done) {
      const instruction = this.getInstruction(instructions, i);
      currentNode = network[currentNode[instruction]];
      i++;
      if (currentNode.node === 'ZZZ') {
        done = true;
      }
    }

    return i;
  };

  part2 = (input: string[]) => {
    return 0;
  };

  getInstruction = (instructions: Instruction[], i: number): Instruction => {
    return instructions[i % instructions.length];
  };

  parseInput = (input: string[]) => {
    const instructions = input[0].split('') as Instruction[];
    const network = input.slice(2).reduce((acc, line) => {
      const regex = /(?<node>[A-Z]{3}) = \((?<left>[A-Z]{3}), (?<right>[A-Z]{3})\)/g;
      const matches = regex.exec(line);
      if (!matches || !matches.groups) {
        console.log(matches);
        throw new Error(`Invalid input: ${line}`);
      }
      const node = {
        node: matches.groups.node,
        L: matches.groups.left,
        R: matches.groups.right,
      };
      acc[node.node] = node;
      return acc;
    }, {} as Record<string, Node>);
    return { instructions, network };
  };

  testPart1 = () => {
    const example = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;
    const lines = example.split('\n');
    const sampleResult = this.part1(lines);
    if (sampleResult !== 6)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };

  testPart2 = () => {
    const example: string[] = [];
    const sampleResult = this.part1(example);
    if (sampleResult !== 42)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };
}
