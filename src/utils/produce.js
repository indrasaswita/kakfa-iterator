const {clientId, brokers} = require("../config/kafka")
const scripts = require("../data/scripts")
const {Kafka} = require("kafkajs");

const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

// we define an async function that writes a new message each second
const produce = () => new Promise((
    resolve, reject
) => {
    producer.connect().then(() => {
        const scriptTemp = []
        scripts.forEach((script) => {
            scriptTemp.push(...(new Array(script.iterations).fill({ value: script.value, topic: script.topic })))
        })

        let i = 0
        const intv = setInterval(async () => {
            try {
                // send a message to the configured topic with
                // the key and value formed from the current value of `i`
                await producer.send({
                    topic: scriptTemp[i].topic,
                    messages: [
                        {
                            key: "",
                            value: typeof scriptTemp[i].value === "object"
                                ? JSON.stringify(scriptTemp[i].value)
                                : scriptTemp.value,
                        },
                    ],
                })

                // if the message is written successfully, log it and increment `i`
                console.log("writes: ", JSON.stringify(scriptTemp[i]))
                i++

                if(i >= scriptTemp.length) {
                    clearInterval(intv)

                    resolve()
                }
            } catch (err) {
                console.error("could not write message " + err)
                reject(err)
            }
        }, 20)
    })
})

module.exports = produce