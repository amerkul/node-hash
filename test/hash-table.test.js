import DoubleHashTable from "../app/domain/hash-table.js";

test('Creating hashtable with a wrong size type: string', () => {
    expect(() => new DoubleHashTable('a')).toThrow('Unacceptable type of a size value. Should be a number');
});

test('Creating hashtable with a wrong size type: infinity', () => {
    expect(() => new DoubleHashTable(Infinity)).toThrow('Unacceptable size value: Infinity');
});

test('Creating hashtable with a wrong size type: NaN', () => {
    expect(() => new DoubleHashTable(NaN)).toThrow('Unacceptable size value: NaN');
});

test('Creating hashtable with a wrong size: 4.5', () => {
    expect(() => new DoubleHashTable(4.5)).toThrow("Number mustn't have a floating point.");
});

test('Creating hashtable with a wrong size: 1', () => {
    expect(() => new DoubleHashTable(1)).toThrow("The size must be gte 2.");
});

test('Hash: apple', () => {
    const table = new DoubleHashTable(5);
    expect(table.hash('apple')).toBe(1594);
});

test('Insert a key: 93', () => {
    const table = new DoubleHashTable(5);
    expect(() => table.insert(93)).toThrow('Invalid key 93');
});

test('Insert a key: apple', () => {
    const table = new DoubleHashTable(5);
    table.insert('apple');
    expect(table.filledIndexes).toBe(1);
});

test('Get a key: apple', () => {
    const table = new DoubleHashTable(5);
    table.insert('apple');
    expect(table.get('apple')).toBe('apple');
});

test('Insert a key: appl', () => {
    const table = new DoubleHashTable(5);
    table.insert('apple');
    expect(table.get('appl')).toBe(undefined);
});

test('Delete a key: apple', () => {
    const table = new DoubleHashTable(5);
    table.insert('apple');
    table.delete('apple');
    expect(table.filledIndexes).toBe(0);
});

test('Delete a key: appl', () => {
    const table = new DoubleHashTable(5);
    table.insert('apple');
    table.delete('appl');
    expect(table.filledIndexes).toBe(1);
});

test('Collision in insert: melon and watermelon', () => {
    const table = new DoubleHashTable(2);
    table.insert('melon');
    table.insert('watermelon');
    expect(table.filledIndexes).toBe(2);
});

test('Collision in get: melon', () => {
    const table = new DoubleHashTable(2);
    table.insert('melon');
    table.insert('watermelon');
    expect(table.get('melon')).toBe('melon');
});

test('Collision in get: watermelon', () => {
    const table = new DoubleHashTable(2);
    table.insert('melon');
    table.insert('watermelon');
    table.delete('melon');
    expect(table.get('watermelon')).toBe('watermelon');
});

test('Insert a melon and wartermelon. Delete the melon. Get filledIndexes', () => {
    const table = new DoubleHashTable(2);
    table.insert('melon');
    table.insert('watermelon');
    table.delete('melon');
    expect(table.filledIndexes).toBe(1);
});

test('Rehash', () => {
    const table = new DoubleHashTable(2);
    table.insert('melon');
    table.insert('watermelon');
    table.insert('pear');
    expect(table.size).toBe(4);
});



