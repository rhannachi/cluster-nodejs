import { Request, Response, NextFunction } from 'express';
import cluster from "cluster";
import Fibonacci from "@/factories";

export const fibonacciController = (req: Request, res: Response, next: NextFunction) => {
    const fibonacciInstance = new Fibonacci()

    console.log(`Worker Process Id - ${cluster.worker?.process.pid} has accepted the request!`);
    let result : number | string = ''
    if (typeof req.query?.value === 'string') {
        const value = Number.parseInt(req.query.value)
        result = fibonacciInstance.calculate(value);
    }

    res.send(`<h1>${result}</h1>`);

    next()
}
