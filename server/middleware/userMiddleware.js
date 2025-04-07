function authorizeUserAction(req, res, next) {
  // Check if user is authenticated
  if (!req.user) {
    const message =
      process.env.NODE_ENV === "production"
        ? "Authentication required. Please login to access this resource."
        : "Authentication error";
    return res.status(401).json({ message });
  }

  // Add user data to the request for use in the route handler
  req.authenticatedUserId = req.user.id;
  req.authenticatedUsername = req.user.username;

  next();
}

module.exports = { authorizeUserAction };
