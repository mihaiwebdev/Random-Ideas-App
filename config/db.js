const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = async () => {
    const data = await mongoose.connect(process.env.MONGO_URI);

    console.log(data.connection.host);
}

module.exports = connectDB;