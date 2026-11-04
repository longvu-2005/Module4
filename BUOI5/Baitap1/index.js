const sequelize = require('./config/database');
const Book = require('./models/book');

const main = async () => {
    try {
        // 1. Kiểm tra kết nối cơ sở dữ liệu
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // 2. Đồng bộ Model với database (tự động tạo bảng books nếu chưa tồn tại)
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully. Table "books" is ready.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

main();