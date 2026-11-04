'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Nạp 3 category mẫu
    await queryInterface.bulkInsert('categories', [
      { id: 1, name: 'Lập trình Web', created_at: new Date(), updated_at: new Date() },
      { id: 2, name: 'Khoa học máy tính', created_at: new Date(), updated_at: new Date() },
      { id: 3, name: 'Kỹ năng mềm', created_at: new Date(), updated_at: new Date() }
    ], {});

    // 2. Nạp 6 product mẫu có tham chiếu category_id hợp lệ
    await queryInterface.bulkInsert('products', [
      { name: 'Node.js in Action', price: 250000, category_id: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'ReactJS Pro', price: 300000, category_id: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'Clean Code', price: 280000, category_id: 2, created_at: new Date(), updated_at: new Date() },
      { name: 'Data Structures and Algorithms', price: 350000, category_id: 2, created_at: new Date(), updated_at: new Date() },
      { name: 'Soft Skills for Developers', price: 150000, category_id: 3, created_at: new Date(), updated_at: new Date() },
      { name: 'The Pragmatic Programmer', price: 320000, category_id: 2, created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Xóa dữ liệu seed theo thứ tự ngược lại để tránh lỗi khóa ngoại
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('categories', null, {});
  }
};