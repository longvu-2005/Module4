const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Sử dụng phương thức mongoose.connect với biến môi trường MONGO_URI
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully via Mongoose.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;