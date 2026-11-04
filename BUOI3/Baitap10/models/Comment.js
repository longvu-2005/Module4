let comments = [
    { id: 1, postId: 1, content: 'Bài viết rất hữu ích!', author: 'User A' },
    { id: 2, postId: 1, content: 'Cảm ơn tác giả.', author: 'User B' }
];

let nextCommentId = 3;

const Comment = {
    create(data) {
        const newComment = {
            id: nextCommentId++,
            postId: Number(data.postId),
            content: data.content,
            author: data.author || 'Anonymous'
        };
        comments.push(newComment);
        return newComment;
    },

    findByPostId(postId) {
        const numericPostId = Number(postId);
        return comments.filter(c => c.postId === numericPostId);
    },

    // Mô phỏng hành vi ON DELETE CASCADE khi xóa Post
    deleteByPostId(postId) {
        const numericPostId = Number(postId);
        const initialLength = comments.length;
        comments = comments.filter(c => c.postId !== numericPostId);
        return initialLength - comments.length; // Trả về số lượng comment đã bị xóa
    }
};

module.exports = Comment;