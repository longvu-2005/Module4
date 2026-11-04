// Dữ liệu mẫu gồm 10 đơn hàng của 3 user khác nhau (userId: 1, 2, 3)
const users = [1, 2, 3];

const orders = [
    { id: 101, userId: 1, status: 'paid', total: 500000 },
    { id: 102, userId: 1, status: 'pending', total: 200000 },
    { id: 103, userId: 1, status: 'cancelled', total: 150000 },
    { id: 104, userId: 1, status: 'paid', total: 300000 },
    { id: 201, userId: 2, status: 'paid', total: 1200000 },
    { id: 202, userId: 2, status: 'pending', total: 450000 },
    { id: 203, userId: 2, status: 'paid', total: 800000 },
    { id: 301, userId: 3, status: 'cancelled', total: 99000 },
    { id: 302, userId: 3, status: 'paid', total: 450000 },
    { id: 303, userId: 3, status: 'pending', total: 600000 }
];

module.exports = {
    users,
    orders
};