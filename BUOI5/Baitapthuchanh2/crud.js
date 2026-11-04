const sequelize = require('./config/database');
const Book = require('./models/book');

const runCRUD = async () => {
    try {
        // Kết nối và đồng bộ database
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('\n--- BẮT ĐẦU THỰC HIỆN 5 BƯỚC CRUD ---O\n');

        // 1. Tạo 3 bản ghi trong một lần gọi (bulkCreate)
        const createdBooks = await Book.bulkCreate([
            { title: "Clean Code", author: "Robert C. Martin", price: 250000 },
            { title: "The Pragmatic Programmer", author: "Andrew Hunt", price: 300000 },
            { title: "Node.js in Action", author: "Alex Young", price: 200000 }
        ]);
        console.log('\n[1. BULK CREATE SUCCESS]: Đã tạo thành công 3 bản ghi:', createdBooks.map(b => b.toJSON()));

        // 2. Lấy toàn bộ danh sách và in ra số lượng bản ghi (findAll)
        const allBooks = await Book.findAll();
        console.log(`\n[2. FIND ALL SUCCESS]: Tổng số lượng bản ghi trong database là: ${allBooks.length}`);

        // Lấy ID của bản ghi đầu tiên để thực hiện các bước tiếp theo
        const targetId = allBooks[0].id;

        // 3. Lấy một bản ghi theo khoá chính (findByPk)
        const singleBook = await Book.findByPk(targetId);
        console.log(`\n[3. FIND BY PK SUCCESS]: Lấy bản ghi với ID = ${targetId}:`, singleBook ? singleBook.toJSON() : "Không tìm thấy");

        // 4. Cập nhật giá của bản ghi vừa lấy (update)
        const newPrice = 350000;
        await Book.update({ price: newPrice }, { where: { id: targetId } });
        const updatedBook = await Book.findByPk(targetId);
        console.log(`\n[4. UPDATE SUCCESS]: Đã cập nhật giá mới (${newPrice}) cho bản ghi ID = ${targetId}:`, updatedBook.toJSON());

        // 5. Xoá bản ghi đó, sau đó truy vấn lại để chứng minh đã xoá (destroy)
        await Book.destroy({ where: { id: targetId } });
        console.log(`\n[5. DESTROY SUCCESS]: Đã xóa bản ghi có ID = ${targetId}`);

        const checkDeleted = await Book.findByPk(targetId);
        console.log(`\n[5. VERIFY DELETION]: Truy vấn lại bản ghi ID = ${targetId} sau khi xóa:`, checkDeleted === null ? "null (Đã xóa thành công hoàn toàn)" : checkDeleted.toJSON());

        console.log('\n--- HOÀN TẤT TẤT CẢ CÁC BƯỚC CRUD ---\n');
        process.exit(0);

    } catch (error) {
        console.error('Lỗi thực thi CRUD:', error);
        process.exit(1);
    }
};

runCRUD();