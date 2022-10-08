# Cluster nodejs typescript 
### PM2, RabbitMQ, Redis and Nginx


## Standard process vs Process with worker threads
We can think of running our application in a cluster.\
When we run our application in a cluster, we will create a number of processes based on our requirement.
Each process can run in a separate court.

And all these processes will share the same part of our application.\
This way, we can distribute the load of our application to the number of processes.

![](assets/process-worker.png)

# Stress NodeJs Cluster Test
## Loadtest
While using loadtest, we can use number of parameters like:
- -n : sets max number of requests
- -c : concurrent requests
- --rps : number of requests per second
```
yarn dev

loadtest -n 1000 -c 100 --rps 200 http://localhost:3000/api/calculate?value=10
```

## Artillery 
While using Artillery, we can use number of parameters like:
- quick : used for ad-hoc testing
- --count : used for creating virtual users
- -n : number of request per virtual user
```
yarn dev

artillery quick --count 10 -n 20 http://localhost:3000/api/calculate?value=20
```

