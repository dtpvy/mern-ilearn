const Category = require('../models/Category');

class CategoryController {

  // GET /
  async showAll(req, res) {
    try {
      const categories = await Category.find({});
      res.json({ success: true, categories })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

  // POST /
  async addNew(req, res) {
    const { value } = req.body;
    try {
      const newCategory = new Category({
        value
      });

      await newCategory.save();

      res.json({ success: true, message: 'Thank for your Post!', category: newCategory });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  // PUT /:key
  async update(req, res) {
    const { value } = req.body;
    try {
      const updateCondition = { _id: req.params.id }

      const updateAt = new Date();

      let updateCategory = {
        value,
        updateAt
      };

      updateCategory = await Category.findOneAndUpdate(
        updateCondition,
        updateCategory,
        { new: true }
      );

      if (!updateCategory)
        return res.status(401).json({
          success: false,
          message: 'not found!'
        });

      res.json({
        success: true,
        message: 'Update success!',
        category: updateCategory
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }


  // DELETE /:key
  delete(req, res) {
    Category.deleteOne({ _id: req.params.id })
      .then(() => res.json({ success: true, message: 'Remove success!' }))
      .catch(() => res.status(500).json({ success: false, message: 'Internal server error' }));
  }


};

module.exports = new CategoryController();