const express = require('express');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Gắn kết route theo đúng yêu cầu
app.use('/api/v1/products', productRoutes);

// Route gốc kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Sequelize REST API CRUD is running..." });
});

// Khởi động server sau khi kết nối và đồng bộ database thành công
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