import { Request, Response, NextFunction } from 'express';
import cluster from "cluster";
import {sendValueInFabQueue1, sendValueInFabQueue2} from "@/broker/queues";

export const fibonacciController = (req: Request, res: Response, next: NextFunction) => {

    console.log(`Worker Process Id - ${cluster.worker?.process.pid} has accepted the request!`);
    if (typeof req.query?.value === 'string') {
        const value = Number.parseInt(req.query.value)

        if (value % 2 === 0) {
            sendValueInFabQueue1(value);
        }
        else {
            sendValueInFabQueue2(value);
        }

    }

    res.send(`<h1>See console log</h1>`);

    next()
}
