const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const postController = require('../controllers/PostController');

// show trash
router.get('/trash', verifyToken, postController.showTrashPosts);
// show home page
router.get('/home', postController.showHomePage);
// // show detail Post
router.get('/:id', postController.showPost);
// // show all Post
router.get('/', postController.showAll);
// //add a Post
router.post('/add', verifyToken, postController.addPost);
// // update a Post
router.put('/:id/edit', verifyToken, postController.updatePost);
// // restore a deleted Post
router.patch('/:id/restore', verifyToken, postController.restorePost);
// // remove a Post in trash
router.delete('/:id/remove', verifyToken, postController.removePost);
// // delete a Post 
router.delete('/:id/delete', verifyToken, postController.deletePost);

module.exports = router;