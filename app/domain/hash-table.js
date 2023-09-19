import MathUtil from "../util/math-util.js";

/**
 * DoubleHashTable class works by using two hash functions to compute 
 * two different hash values for a given key. 
 */
export default class DoubleHashTable {

    #hashTable = [];
    #size = 0;
    //A prime is smaller than the size.
    #prime;
    #filledIndexes = 0;

    constructor(size) {
        if (typeof size !== "number") {
            throw new Error("Unacceptable type of a size value. Should be a number");
        }
        if (isNaN(size) || !isFinite(size)) {
            throw new Error(`Unacceptable size value: ${size}`);
        }
        if (Math.floor(size) !== size) {
            throw new Error("Number mustn't have a floating point.")
        }
        if (size < 2) {
            throw new Error("The size must be gte 2.")
        }
        this.#prime = size - 1;
        while (!MathUtil.isPrime(this.#prime)) {
            this.#prime--;
        }
        this.#size = size;
        this.#hashTable.length = size;
    }

    get filledIndexes() {
        return this.#filledIndexes;
    }

    get size() {
        return this.#size;
    }

    /**
     * Insert a key into the hashtable. Time Complexity: O(n).
     * @param {String} key 
     */
    insert(key) {
        if (this.#filledIndexes === this.#size) {
            this.#rehash();
        }
        let hashCode = this.hash(key);
        let index = this.#getFirstIndex(hashCode);
        let order = 0;
        while (this.#hashTable[index] !== undefined) {
            index = this.#resolveCollision(hashCode, ++order);
        }
        this.#hashTable[index] = key;
        this.#filledIndexes++;
    }

    /**
     * Rehash a hashtable. The size increases to twice.
     */
    #rehash() {
        let newHashTable = [];
        this.#size *= 2;
        this.#prime = this.#size - 1;
        while (!MathUtil.isPrime(this.#prime)) {
            this.#prime--;
        }
        newHashTable.length = this.#size;
        for (let i = 0; i < this.#hashTable.length; i++) {
            let key = this.#hashTable[i];
            let hashCode = this.hash(key);
            let index = this.#getFirstIndex(hashCode);
            let order = 0;
            while (newHashTable[index] !== undefined) {
                index = this.#resolveCollision(hashCode, ++order);
            }
            newHashTable[index] = key;
        }
        this.#hashTable = newHashTable;
    }

    /**
     * Get a value with a key. Time Complexity: O(n).
     * @param {String} key 
     * @returns value
     */
    get(key) {
        let hashCode = this.hash(key);
        let index = this.#getFirstIndex(hashCode);
        let firstIndex = index;
        let order = 0, firstIter = true;
        while (true) {
            if (this.#hashTable[index] === key) {
                return key;
            } else if (index === firstIndex && !firstIter) {
                return undefined;
            } else {
                index = this.#resolveCollision(hashCode, ++order);
                firstIter = false;
            }
        }
    }

    /**
     * Delete a value with a key. Time Complexity: O(n).
     * @param {String} key 
     */
    delete(key) {
        let hashCode = this.hash(key);
        let index = this.#getFirstIndex(hashCode);
        let firstIndex = index;
        let order = 0, firstIter = true;
        while (true) {
            if (this.#hashTable[index] === key) {
                this.#hashTable[index] = undefined;
                this.#filledIndexes--;
            } else if (index === firstIndex && !firstIter) {
                break;
            } else {
                index = this.#resolveCollision(hashCode, ++order);
                firstIter = false;
            }
        }
    }

    /**
     * Compute a hashcode.
     * @param {String} key 
     * @returns hashcode
     */
    hash(key) {
        this.#checkInvalidKeyAndThrowError(key);
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += (key.charCodeAt(i) * (i + 1));
        }
        return hash;
    }

    #checkInvalidKeyAndThrowError(key) {
        if (typeof key !== "string") {
            throw new Error(`Invalid key ${key}`);
        }
    }

    #resolveCollision(hashCode, order) {
        return this.#doubleHash(hashCode, order);
    }

    /**
     * Compute a new index using two hash functions.
     * @param {Number} hashCode 
     * @param {Number} order 
     * @returns index
     */
    #doubleHash(hashCode, order) {
        return (this.#getFirstIndex(hashCode) + order * this.#getSecondIndex(hashCode)) % this.#size;
    }

    /**
     * First hash function
     * @param {Number} hashCode 
     * @returns index
     */
    #getFirstIndex(hashCode) {
        return hashCode % this.#size;
    }

    /**
     * Second hash function
     * @param {Number} hashCode 
     * @returns index
     */
    #getSecondIndex(hashCode) {
        return this.#prime - (hashCode % this.#prime);
    }
    
}
