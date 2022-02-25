module.exports = function SearchMiddleware(req, res, next) {
  res.locals._search = {
    enabled: false,
    name: '',
  };

  if (req.query.hasOwnProperty('_search')) {
    Object.assign(res.locals._search, {
      enabled: true,
      name: req.query.name,
    });
  }
  next();
};
