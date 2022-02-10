const authRouter = require('./auth');
const coursesRouter = require('./courses');
const postRouter = require('./posts');
const categoryRouter = require('./categories');
const { application } = require('express');

function route(app) {
  app.use('/api/auth', authRouter);
  app.use('/api/courses', coursesRouter);
  app.use('/api/posts', postRouter);
  app.use('/api/category/', categoryRouter);
}

module.exports = route;
