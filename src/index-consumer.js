const consume = require("./utils/consume.js")

// start the consumer, and log any errors
consume().catch((err) => {
    console.error("error in consumer: ", err)
})