
const {topic, brokers, clientId} = require("../config/kafka")
const {Kafka} = require("kafkajs");

const kafka = new Kafka({ clientId, brokers })
const consumer = kafka.consumer({ groupId: clientId })
const consume = async () => {
    // first, we wait for the client to connect and subscribe to the given topic
    await consumer.connect().then(() => {console.log("CONNECTED CONSUMER")})
    await consumer.subscribe({ topic }).then(() => {console.log("SUBSCRIBED FOR TOPIC " + topic)})
    await consumer.run({
        // this function is called every time the consumer gets a new message
        eachMessage: async ({ message }) => {
            // here, we just log the message to the standard output
            console.log(`received message: ${message.value}`);
        },
    })
}

module.exports = consume