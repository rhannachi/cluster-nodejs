import amqplib, {Channel, Connection} from 'amqplib/callback_api'
import {URI_CHANNEL} from "@/config";

const QUEUE_NAME = 'FabSeries2' as const

amqplib.connect(  URI_CHANNEL, (err: Error, connection: Connection) => {
    if (err) { process.exit(); }
    else {
        connection.createChannel((_err, channel: Channel) => {
            channel.assertQueue(  QUEUE_NAME, { durable: false });
            channel.consume(  QUEUE_NAME, message => {
                console.info();
                console.info(`===> Waiting for messages`);
                console.info(`===> ${QUEUE_NAME} - ${message?.content.toString()}`);
                console.info();
            }, { noAck: true });
        });
    }
});
