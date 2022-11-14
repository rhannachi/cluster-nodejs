import amqplib, {Channel, Connection} from 'amqplib/callback_api'
import {URI_CHANNEL, URI_REDIS} from "@/config";
import Fibonacci from "@/factories";
import {createClient} from "redis";

const QUEUE_NAME = 'FabSeries1' as const

const client = createClient({ url: URI_REDIS });

export const sendValueInFabQueue1 = (value: number) => {
    amqplib.connect(URI_CHANNEL, (err: Error, connection: Connection) => {
        if (err) process.exit();
        connection.createChannel(async (error: Error, channel: Channel) => {
            if (error) {
                console.error(error);
                process.exit();
            } else {
                let result

                console.info()

                if (!client.isOpen) {
                    console.info('===> REDIS connect')
                    await client.connect();
                }

                const cache = await client.get(`cache-${QUEUE_NAME}-${value}`)

                if (cache) {
                    console.info('===> REDIS use cache:', cache)
                    result = cache
                } else {
                    const fibonacciInstance = new Fibonacci()
                    result = fibonacciInstance.calculate(value);
                    // cache result into redis
                    await client.set(`cache-${QUEUE_NAME}-${value}`, result)
                    console.info('===> REDIS set cache', result)
                }

                channel.assertQueue(QUEUE_NAME, {durable: false});
                channel.sendToQueue(QUEUE_NAME, Buffer.from(result.toString()));
                console.info();
                console.info(`===> Send To Queue - ${QUEUE_NAME}`);
                console.info();
            }
        });
    });
}
