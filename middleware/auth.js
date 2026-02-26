function isloggedIn(req, res, next) {
  if (!req.session.userId) {
    return res.redirect("/?error=Please login first");
  }
  next();
}

module.exports = isloggedIn;
