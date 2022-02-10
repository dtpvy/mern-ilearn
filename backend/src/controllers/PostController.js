const Post = require('../models/Post');

class PostController {
  // GET /home
  async showHomePage(req, res) {
    try {
      const Posts = await Post.find({}).sort({ createAt: 'desc' }).limit(5);
      res.json({ success: true, Posts })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

  // GET /
  async showAll(req, res) {
    try {
      const posts = await Post.find({});
      res.json({ success: true, posts })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

  // GET /:id
  async showPost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      res.json({ success: true, post })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

  // GET /trash
  showTrashPosts(req, res) {
    Post.findDeleted({ author: req.userId })
      .then((Posts) => {
        res.json({ success: true, posts })
      })
      .catch(() => res.status(500).json({ success: false, message: 'Internal server error' }));
  }

  // POST /add
  async addPost(req, res) {
    const { title, description, categories, content } = req.body;
    try {
      const newPost = new Post({
        title,
        description,
        categories,
        content,
        author: req.userId
      });

      console.log(newPost);

      await newPost.save();

      res.json({ success: true, message: 'Thank for your Post!', Post: newPost });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  // PUT /:id
  async updatePost(req, res) {
    const { title, description, categories, content } = req.body;
    try {
      const postUpdateCondition = { _id: req.params.id, author: req.userId }

      const updatedAt = new Date();

      let updatePost = {
        title,
        description,
        categories,
        content,
        updatedAt
      };

      updatePost = await Post.findOneAndUpdate(
        postUpdateCondition,
        updatePost,
        { new: true }
      );

      if (!updatePost)
        return res.status(401).json({
          success: false,
          message: 'Post not found or user not authorised'
        });

      res.json({
        success: true,
        message: 'Update success!',
        post: updatePost
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  // PATCH /:id/restore
  restorePost(req, res) {
    try {
      post.restore({ _id: req.params.id, author: req.userId });
      res.json({ success: true, message: 'Restore success!' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  // DELETE /:id/remove
  removePost(req, res) {
    post.deleteOne({ _id: req.params.id, author: req.userId })
      .then(() => res.json({ success: true, message: 'Remove success!' }))
      .catch(() => res.status(500).json({ success: false, message: 'Internal server error' }));
  }

  // DELETE /:id/delete
  deletePost(req, res) {
    post.delete({ _id: req.params.id, author: req.userId })
      .then(() => res.json({ success: true, message: 'Delete success!' }))
      .catch(() => res.status(500).json({ success: false, message: 'Internal server error' }));
  }

};

module.exports = new PostController();