let products = [
    { id: 1, name: 'Laptop ASUS Vivobook', price: 15000000, quantity: 10 },
    { id: 2, name: 'Bàn phím cơ Logi', price: 1200000, quantity: 25 }
];

let nextId = 3;

const Product = {
    getAll() {
        return products;
    },
    findById(id) {
        const numericId = Number(id);
        return products.find(p => p.id === numericId);
    },
    create(data) {
        const newProduct = {
            id: nextId++,
            name: data.name,
            price: Number(data.price),
            quantity: Number(data.quantity)
        };
        products.push(newProduct);
        return newProduct;
    }
};

module.exports = Product;