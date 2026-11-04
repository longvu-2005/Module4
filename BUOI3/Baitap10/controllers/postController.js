const Post = require('../models/Post');
const Comment = require('../models/Comment');
const AppError = require('../utils/AppError');

const postController = {
    // GET /api/posts
    getPosts(req, res, next) {
        try {
            const posts = Post.getAll();
            // Lấy kèm danh sách comment cho mỗi post để tăng trải nghiệm hiển thị
            const postsWithComments = posts.map(post => ({
                ...post,
                comments: Comment.findByPostId(post.id)
            }));

            res.status(200).json({
                success: true,
                count: postsWithComments.length,
                data: postsWithComments
            });
        } catch (error) {
            next(error);
        }
    },

    // GET /api/posts/:id
    getPostById(req, res, next) {
        try {
            const post = Post.findById(req.params.id);
            if (!post) {
                return next(new AppError('Không tìm thấy bài viết', 404));
            }

            const postComments = Comment.findByPostId(post.id);

            res.status(200).json({
                success: true,
                data: {
                    ...post,
                    comments: postComments
                }
            });
        } catch (error) {
            next(error);
        }
    },

    // POST /api/posts (Có upload thumbnail qua Multer)
    createPost(req, res, next) {
        try {
            const { title, content } = req.body;

            if (!title || !content) {
                return next(new AppError('Thiếu trường bắt buộc: title hoặc content', 400));
            }

            let thumbnailUrl = null;
            if (req.file) {
                thumbnailUrl = `/uploads/${req.file.filename}`;
            }

            const newPost = Post.create({ title, content, thumbnailUrl });

            res.status(201).json({
                success: true,
                message: 'Tạo bài viết thành công',
                data: newPost
            });
        } catch (error) {
            next(error);
        }
    },

    // DELETE /api/posts/:id (Yêu cầu quyền admin và thực hiện Cascading Delete comment)
    deletePost(req, res, next) {
        try {
            const postId = req.params.id;
            const post = Post.findById(postId);

            if (!post) {
                return next(new AppError('Không tìm thấy bài viết', 404));
            }

            // Xóa bài viết
            Post.deleteById(postId);

            // Mô phỏng ON DELETE CASCADE: Xóa toàn bộ comment liên quan
            const deletedCommentsCount = Comment.deleteByPostId(postId);

            res.status(200).json({
                success: true,
                message: `Xóa bài viết thành công và đã xóa ${deletedCommentsCount} bình luận liên quan (Cascading Delete)`,
                data: { deletedPostId: Number(postId) }
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = postController;