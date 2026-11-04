const express = require('express');
const { sequelize } = require('./models/index');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Gắn route đặt hàng
app.use('/api/v1/orders', orderRoutes);

// Route kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "Transaction & Many-to-Many Order API is running..." });
});

// Khởi động server sau khi kết nối và đồng bộ DB
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // Đồng bộ database (chạy { alter: true } để cập nhật cấu trúc bảng)
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