const mongoose = require('mongoose');
const Movie = require('../models/movie');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore_db';

const seedMovies = async () => {
    try {
        // 1. Kết nối tới MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully for seeding movies.');

        // 2. Danh sách 4 bộ phim sử dụng đa dạng các kiểu dữ liệu BSON
        const moviesData = [
            {
                title: "Inception",
                releaseYear: 2010,
                isReleased: true,
                genres: ["Sci-Fi", "Action", "Thriller"]
            },
            {
                title: "Interstellar",
                releaseYear: 2014,
                isReleased: true,
                genres: ["Sci-Fi", "Drama", "Adventure"]
            },
            {
                title: "The Dark Knight",
                releaseYear: 2008,
                isReleased: true,
                genres: ["Action", "Crime", "Drama"]
            },
            {
                title: "Avatar 3",
                releaseYear: 2025,
                isReleased: false,
                genres: ["Sci-Fi", "Action", "Fantasy"]
            }
        ];

        // 3. Sử dụng Movie.insertMany() để thêm 4 bản ghi vào database trong một lần gọi
        const createdMovies = await Movie.insertMany(moviesData);

        console.log('\n--- KẾT QU