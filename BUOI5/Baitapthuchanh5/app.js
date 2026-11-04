const express = require('express');
const { sequelize } = require('./models/index');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Gắn kết routes
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);

// Route gốc kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Sequelize Association & Eager Loading API is running..." });
});

// Khởi động server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully.');

        app.listen(PORT, () => {
            console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();