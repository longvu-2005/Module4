const express = require('express');
const { sequelize } = require('./models/index');
const queryCounter = require('./middlewares/queryCounter');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Lưu sequelize instance vào app để middleware queryCounter có thể truy xuất bộ đếm logging
app.set('sequelizeInstance', sequelize);

// Áp dụng middleware đo đếm query và thời gian cho các route report
app.use('/api/v1/report', queryCounter);
app.use('/api/v1/report', reportRoutes);

// Route gốc kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: "N+1 Query Detection & Performance Lab is running..." });
});

// Khởi động server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        app.listen(PORT, () => {
            console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();