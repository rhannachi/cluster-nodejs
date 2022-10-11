# Cluster nodejs typescript 
### PM2, RabbitMQ, Redis and Nginx


## Standard process vs Process with worker threads
We can think of running our application in a cluster.\
When we run our application in a cluster, we will create a number of processes based on our requirement.
Each process can run in a separate court.

And all these processes will share the same part of our application.\
This way, we can distribute the load of our application to the number of processes.
Each process has its own memory with their own V8 engine.

![](assets/process-worker.png)

# Stress NodeJs Cluster Test
## Loadtest
While using loadtest, we can use number of parameters like:
- -n : sets max number of requests
- -c : concurrent requests
- --rps : number of requests per second
```
yarn dev

loadtest -n 1000 -c 100 --rps 200 http://localhost:3000/api/fibonacci?value=10
```

# PM2
Is a production process manager for NodeJs applications with a build-in load-balancer.

![](assets/pm2-load-balancing.png)

```
yarn pm2:start
yarn pm2:monit
```

# Setting up Path Alias and tsc build

```
// tsconfig.json
"baseUrl": "src",
"rootDir": "src",
"paths": {
    "@/*": ["*"]
}

// package.json
"build": "tsc --project tsconfig.json && tscpaths -p tsconfig.json -s ./src -o ./build",

```