
const {brokers, clientId} = require("../config/kafka")
const scripts = require("../data/scripts")
const {Kafka} = require("kafkajs");

const kafka = new Kafka({ clientId, brokers })
const consumer = kafka.consumer({ groupId: clientId })

const removeDuplicate = (items) => {
    let temp = {}
    items.forEach((item) => temp[item] = true)
    const result = []
    for (let key in temp) {
        result.push(key)
    }
    return result
}

const consume = async () => {

    const topics = removeDuplicate(scripts
        .map((script) => script.topic))

    // first, we wait for the client to connect and subscribe to the given topic
    await consumer.connect().then(() => {console.log("CONNECTED CONSUMER")})
    await consumer.subscribe({
        topics
    }).then(() => {console.log("SUBSCRIBED FOR TOPIC: " + topics.join(", "))})
    await consumer.run({
        // this function is called every time the consumer gets a new message
        eachMessage: async ({ message }) => {
            // here, we just log the message to the standard output
            console.log(`received message: ${message.value}`);
        },
    })
}

module.exports = consume