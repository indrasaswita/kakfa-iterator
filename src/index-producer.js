const produce = require("./utils/produce.js")

// call the `produce` function and log an error if it occurs
produce().then(() => {
    process.exit(1)
}).catch((err) => {
    console.error("error in producer: ", err)
})
