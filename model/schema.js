const mongoose = require('mongoose')

const newSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("fromSchema", newSchema)