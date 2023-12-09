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
    const { instructions, network } = this.parseInput(input);

    const startNodes = Object.values(network).filter(
      (node) => node.node.at(2) === 'A'
    );

    const steps = startNodes.map((node) =>
      this.countSteps(network, node, instructions)
    );
    return this.calculateLCM(steps);
  };

  calculateLCM = (steps: number[]) => {
    const lcm = steps.reduce((acc, step) => {
      return (acc * step) / this.gcd(acc, step);
    });
    return lcm;
  };

  gcd = (a: number, b: number): number => {
    if (b === 0) {
      return a;
    }
    return this.gcd(b, a % b);
  };

  countSteps = (
    network: Record<string, Node>,
    startNode: Node,
    instructions: Instruction[]
  ) => {
    let done = false;
    let i = 0;
    let currentNode = startNode;

    while (!done) {
      const instruction = this.getInstruction(instructions, i);
      currentNode = network[currentNode[instruction]];
      i++;
      if (currentNode.node.at(2) === 'Z') {
        done = true;
      }
    }
    return i;
  };

  getInstruction = (instructions: Instruction[], i: number): Instruction => {
    return instructions[i % instructions.length];
  };

  parseInput = (input: string[]) => {
    const instructions = input[0].split('') as Instruction[];
    const network = input.slice(1).reduce((acc, line) => {
      const regex = /(?<node>[A-Z0-9]{3}) = \((?<left>[A-Z0-9]{3}), (?<right>[A-Z0-9]{3})\)/g;
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
    const example = `LR
    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)`;
    const lines = example.split('\n');
    const sampleResult = this.part2(lines);
    if (sampleResult !== 6)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };
}
