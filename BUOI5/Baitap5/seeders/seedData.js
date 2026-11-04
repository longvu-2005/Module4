const { sequelize, Category, Product } = require('../models/index');

const seedDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true }); // Reset sạch database để seed mới
        console.log('Database connected and reseted for seeding...');

        console.log('Đang tạo 50 categories và mỗi category có 10 products...');
        
        for (let i = 1; i <= 50; i++) {
            const category = await Category.create({ name: `Danh mục Lập trình ${i}` });
            
            const productsData = [];
            for (let j = 1; j <= 10; j++) {
                productsData.push({
                    name: `Sản phẩm ${j} của Danh mục ${i}`,
                    price: Math.floor(Math.random() * 500000) + 100000,
                    category_id: category.id
                });
            }
            await Product.bulkCreate(productsData);
        }

        console.log('✅ Seed dữ liệu thành công: 50 categories & 500 products đã được tạo!');
        process.exit(0);
    } catch (error) {
        console.error('Lỗi khi seed dữ liệu:', error);
        process.exit(1);
    }
};

seedDatabase();