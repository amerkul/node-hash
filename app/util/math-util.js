export default class MathUtil {

    static isPrime(value) {
        for (let i = 2; i < value; i++) {
            if (value % i === 0) {
                return false;
            }
        }
        return value > 0;
    }

}