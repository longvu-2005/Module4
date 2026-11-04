// Dữ liệu mẫu đơn hàng với trạng thái pending và cancelled
const orders = [
    {
        id: 17,
        userId: 3,
        status: "pending",
        total: 750000,
        items: [{ productId: "p1", qty: 2, price: 375000 }]
    },
    {
        id: 25,
        userId: 5,
        status: "cancelled",
        total: 1200000,
        items: [{ productId: "p4", qty: 1, price: 1200000 }]
    }
];

module.exports = orders;