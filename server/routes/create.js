const express = require("express");
const router = express.Router();

const { authorizeUserAction } = require("../middleware/userMiddleware");
const { createSet } = require("../db/queries");

router.post("/set", authorizeUserAction, async (req, res) => {
  try {
    const { title, description } = req.body;

    // Use the authenticated user's ID from the middleware
    const authorId = req.authenticatedUserId;
    const username = req.authenticatedUsername;

    const newSet = await createSet(title, description, authorId);

    res.status(201).json({
      ...newSet,
      authorUsername: username,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error creating set:", error);
      return res.status(500).json({
        message: "An internal server error occurred while creating the set",
      });
    } else {
      console.error("Error creating set:", error);
      return res.status(500).json({
        message: "Error creating set",
        error: error.message,
      });
    }
  }
});

module.exports = router;
