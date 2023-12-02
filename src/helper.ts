export const expectEquals = (expected: number, actual: number) => {
  if (expected !== actual)
    throw new Error(`Expected ${expected} but got ${actual}`);
};
