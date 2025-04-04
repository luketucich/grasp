function authorizeUserAction(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const profileUsername = req.params.username;

  if (req.user.username !== profileUsername) {
    return res.status(403).json({
      message: "Forbidden - You can only modify your own profile",
    });
  }

  next();
}

module.exports = { authorizeUserAction };
