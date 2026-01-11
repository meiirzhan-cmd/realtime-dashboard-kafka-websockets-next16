import { Kafka } from "kafkajs";

const kafka = new Kafka({ brokers: ["localhost:9092"] });
export const producer = kafka.producer();
export async function produceOrder(orderId: string, userId: string) {
  await producer.connect();
  await producer.send({
    topic: "order-events",
    messages: [
      {
        key: orderId,
        value: JSON.stringify({ orderId, userId, status: "CREATED" }),
      },
    ],
  });
  await producer.disconnect();
}
