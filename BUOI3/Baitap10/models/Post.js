let posts = [
    { id: 1, title: 'Lập trình Node.js cơ bản', content: 'Nội dung bài viết về Node.js...', thumbnailUrl: null },
    { id: 2, title: 'Kiến trúc MVC trong Express', content: 'Tìm hiểu về mô hình MVC...', thumbnailUrl: null }
];

let nextPostId = 3;

const Post = {
    getAll() {
        return posts;
    },

    findById(id) {
        const numericId = Number(id);
        return posts.find(p => p.id === numericId);
    },

    create(data) {
        const newPost = {
            id: nextPostId++,
            title: data.title,
            content: data.content,
            thumbnailUrl: data.thumbnailUrl || null
        };
        posts.push(newPost);
        return newPost;
    },

    deleteById(id) {
        const numericId = Number(id);
        const index = posts.findIndex(p => p.id === numericId);
        if (index !== -1) {
            const deleted = posts.splice(index, 1);
            return deleted[0];
        }
        return null;
    }
};

module.exports = Post;