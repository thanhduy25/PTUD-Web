const mongoose = require('mongoose');
const config = require("../");

async function connect() {
    try {
        await mongoose.connect(config.db.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect sucessfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
