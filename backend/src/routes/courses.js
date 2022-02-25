const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const SortMiddleware = require('../middleware/sort');
const SearchMiddleware = require('../middleware/search');
const courseController = require('../controllers/CourseController');

// show trash
router.get('/trash', verifyToken, courseController.showTrashCourses);
// show home page
router.get('/home/:num', courseController.showHomePage);
// show detail course
router.get('/:id', courseController.showCourse);
// show all course
router.get('/', SortMiddleware, SearchMiddleware, courseController.showAll);
//add a course
router.post('/add', verifyToken, courseController.addCourse);
//add a comment
router.put('/:id/comment', verifyToken, courseController.addComment);
// update a course
router.put('/:id/edit', verifyToken, courseController.updateCourse);
// restore a deleted course
router.patch('/:id/restore', verifyToken, courseController.restoreCourse);
// remove a course in trash
router.delete('/:id/remove', verifyToken, courseController.removeCourse);
// delete a course 
router.delete('/:id/delete', verifyToken, courseController.deleteCourse);

module.exports = router;