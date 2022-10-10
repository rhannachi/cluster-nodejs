import { Request, Response, NextFunction } from 'express';
import cluster from "cluster";
//import Fibonacci from "@/factories";
import {sendValueInFabQueue1, sendValueInFabQueue2} from "@/broker/queues";

export const fibonacciController = (req: Request, res: Response, next: NextFunction) => {
    // const fibonacciInstance = new Fibonacci()

    console.log(`Worker Process Id - ${cluster.worker?.process.pid} has accepted the request!`);
    const result : number | string = ''
    if (typeof req.query?.value === 'string') {
        const value = Number.parseInt(req.query.value)
        // TODO ???
        // result = fibonacciInstance.calculate(value);

        if (value % 2 === 0) {
            sendValueInFabQueue1(value);
        }
        else {
            sendValueInFabQueue2(value);
        }

    }

    res.send(`<h1>${result}</h1>`);

    next()
}
