import amqplib, {Channel, Connection} from 'amqplib/callback_api'
import {URI_CHANNEL} from "@/config";
import Fibonacci from "@/factories";

const QUEUE_NAME = 'FabSeries2' as const

export const sendValueInFabQueue1 = (value: number) => {
    amqplib.connect(URI_CHANNEL, (err: Error, connection: Connection) => {
        if (err) process.exit();
        connection.createChannel((error: Error, channel: Channel) => {
            if (error) {
                console.log(error);
                process.exit();
            }
            else {
                const fibonacciInstance = new Fibonacci()
                const result = fibonacciInstance.calculate(value);
                channel.assertQueue(QUEUE_NAME, { durable: false });
                channel.sendToQueue(QUEUE_NAME, Buffer.from(result.toString()));
                console.log();
                console.log(`Send To Queue - ${QUEUE_NAME}`);
                console.log();
            }
        });
    });
}
