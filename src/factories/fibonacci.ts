
class Fibonacci {

    calculate(value: number): number {
        let s = 0;
        if (value === 0) {
            return s;
        }
        if (value === 1) {
            s += 1;
            return s;
        }
        return (this.calculate(value - 1) + this.calculate(value - 2));
    }
}

export default Fibonacci