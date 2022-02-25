const Course = require('../models/Course');

class CourseController {

  // GET /home
  async showHomePage(req, res) {
    try {
      const courses = await Course.find({}).populate('author').sort({ createdAt: 'desc' }).limit(req.params.num);
      res.json({ success: true, courses })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

  // GET /
  async showAll(req, res) {
    try {
      const courses = await Course.find({}).populate('author').sortable(req).search(req);
      res.json({ success: true, courses })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

  // GET /:id
  async showCourse(req, res) {
    const id = req.params.id;
    try {
      const course = await Course.findOne({ _id: id }).populate('author');
      res.json({ success: true, course })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

  // GET /trash
  showTrashCourses(req, res) {
    Course.findDeleted({ author: req.userId })
      .then((courses) => {
        res.json({ success: true, courses })
      })
      .catch(() => res.status(500).json({ success: false, message: 'Internal server error' }));
  }

  // POST /add
  async addCourse(req, res) {
    const course = req.body;
    try {
      const newCourse = new Course({
        ...course,
        author: req.userId
      });

      await newCourse.save();

      res.json({ success: true, message: 'Thank for your course!', course: newCourse });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  // PUT /:id/edit
  async updateCourse(req, res) {
    const course = req.body;
    console.log(course, req.params)
    try {
      const courseUpdateCondition = { _id: req.params.id, author: req.userId }
      const updatedAt = new Date();

      let updateCourse = {
        ...course,
        updatedAt
      };

      updateCourse = await Course.findOneAndUpdate(
        courseUpdateCondition,
        updateCourse,
        { new: true }
      );

      if (!updateCourse)
        return res.status(401).json({
          success: false,
          message: 'Course not found or user not authorised'
        });

      res.json({
        success: true,
        message: 'Update success!',
        course: updateCourse
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  // PUT /:id/comment
  async addComment(req, res) {
    const { body, rate } = req.body;
    try {
      console.log(body, rate);
      const updateCourse = await Course.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            "comments": {
              user: req.userId,
              body,
              rate
            }
          }
        }
      )

      if (!updateCourse)
        return res.status(401).json({
          success: false,
          message: 'Course not found or user not authorised'
        });

      res.json({
        success: true,
        message: 'Update success!',
        course: updateCourse
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  // PATCH /:id/restore
  restoreCourse(req, res) {
    Course.restore({ _id: req.params.id, author: req.userId })
      .then(() => res.json({ success: true, message: 'Restore success!' }))
      .catch(() => res.status(500).json({ success: false, message: 'Internal server error' }));
  }

  // DELETE /:id/remove
  removeCourse(req, res) {
    Course.deleteOne({ _id: req.params.id, author: req.userId })
      .then(() => res.json({ success: true, message: 'Remove success!' }))
      .catch(() => res.status(500).json({ success: false, message: 'Internal server error' }));
  }

  // DELETE /:id/delete
  deleteCourse(req, res) {
    Course.delete({ _id: req.params.id, author: req.userId })
      .then(() => res.json({ success: true, message: 'Delete success!' }))
      .catch(() => res.status(500).json({ success: false, message: 'Internal server error' }));
  }
};

module.exports = new CourseController();