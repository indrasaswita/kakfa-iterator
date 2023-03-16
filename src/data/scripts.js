const scripts = [
    {
        iterations: 100,
        topic: "KAFKA_TOPIC_1",
        value: {
            "loanId": "HCI0001",
            "amount": 10000.32
        }
    },
    {
        iterations: 1,
        topic: "KAFKA_TOPIC_2",
        value: {
            "message": "Second attempt"
        }
    }
]

module.exports = scripts