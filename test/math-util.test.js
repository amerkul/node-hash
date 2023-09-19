import MathUtil from "../app/util/math-util.js"

test('121 is not prime', () => expect(MathUtil.isPrime(121)).toBe(false));

test('17 is prime', () => expect(MathUtil.isPrime(23)).toBe(true));

test('1 is prime', () => expect(MathUtil.isPrime(1)).toBe(true));

test('0 is not prime', () => expect(MathUtil.isPrime(0)).toBe(false));

test('-10 is not prime', () => expect(MathUtil.isPrime(-10)).toBe(false));