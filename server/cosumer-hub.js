import { Kafka } from "kafkajs";
import { createServer } from "node:http";
import { Server } from "socket.io";

const kafka = new Kafka({ brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "dashboard-group" });
const server = createServer();
const io = new Server(server, {
  cors: { origin: "*" },
});
async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: "order-events", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const payload = JSON.parse(message.value.toString());
      // broadcast to all connected clients
      io.emit("order-event", payload);
    },
  });
}
io.on("connection", (socket) => {
  console.log("client connected");
});
server.listen(4000, () => console.log("WebSocket hub running on :4000"));
run().catch(console.error);
