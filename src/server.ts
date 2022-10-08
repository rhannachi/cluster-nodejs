import express from "express";
import os from "os"
import cluster from "cluster";
import Fibonacci from '@/factories'

const TOTAL_CPUS = os.cpus().length

const fabObj = new Fibonacci()
if (cluster.isPrimary) {

    console.log(`Total Number of CPU Counts is ${TOTAL_CPUS}`);

    for (let i = 0; i < TOTAL_CPUS; i++) {
        cluster.fork();
    }
    cluster.on("online", worker => {
        console.log(`Worker Id is ${worker.id} and PID is ${worker.process.pid}`);
    });
    cluster.on("exit", worker => {
        console.log(`Worker Id ${worker.id} and PID is ${worker.process.pid} is offline`);
        console.log("Let's fork new worker!");
        cluster.fork();
    });
}
else {
    const app = express();

    // example of use
    // http://localhost:3000/api/calculate?value=30

    app.get("/api/calculate", (request, response) => {
        console.log(`Worker Process Id - ${cluster.worker?.process.pid} has accepted the request!`);
        let result : number | string = ''
        if (typeof request.query?.value === 'string') {
            const value = Number.parseInt(request.query.value)
            result = fabObj.calculate(value);
        }

        response.send(`<h1>${result}</h1>`);
    });

    app.listen(3000, () => console.log("Express App is running on PORT : 3000"));
}