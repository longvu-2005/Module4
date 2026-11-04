const Comment = require('../models/Comment');
const Post = require('../models/Post');
const AppError = require('../utils/AppError');

const commentController = {
    // POST /api/comments
    createComment(req, res, next) {
        try {
            const { postId, content, author } = req.body;

            if (!postId || !content) {
                return next(new AppError('Thiếu trường bắt buộc: postId hoặc content', 400));
            }

            // Kiểm tra xem postId gửi lên có tồn tại trong mảng posts không
            const post = Post.findById(postId);
            if (!post) {
                return next(new AppError('Bài viết không tồn tại', 404));
            }

            const newComment = Comment.create({ postId, content, author });

            res.status(201).json({
                success: true,
                message: 'Thêm bình luận thành công',
                data: newComment
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = commentController;