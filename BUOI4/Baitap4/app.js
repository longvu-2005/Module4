const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware parse JSON (Bắt lỗi JSON sai định dạng để trả về 400 chuẩn)
app.use(express.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            success: false,
            message: "JSON sai định dạng cú pháp"
        });
    }
    next();
});

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Product API with Newman Testing is running..." });
});

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});