const express = require("express");
const router = express.Router();

const { isUser, getSet } = require("../db/queries");

router.get("/:username", async (req, res) => {
  try {
    const user = await isUser(req.params.username);

    if (!user) {
      return res.status(200).json({ isUser: false, isOwner: false });
    }

    if (!req.user) {
      return res.status(200).json({ isUser: true, isOwner: false });
    }

    if (req.user.username !== req.params.username) {
      return res.status(200).json({ isUser: true, isOwner: false });
    }

    return res.status(200).json({ isUser: true, isOwner: true });
  } catch (error) {
    console.error("Error checking user ownership:", error);
    if (process.env.NODE_ENV === "development") {
      return res
        .status(500)
        .json({ message: "An internal server error occurred" });
    } else {
      return res.status(500).json({
        message: "Error checking user ownership",
        error: error.message,
      });
    }
  }
});

router.get("/:username/set/:setId/edit", async (req, res) => {
  try {
    const { username, setId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (username !== req.user.username) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await isUser(username);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const set = await getSet(parseInt(setId), req.user.id);

    if (!set) {
      return res.status(404).json({ message: "Set not found" });
    }

    return res.status(200).json(set);
  } catch (error) {
    console.error("Error loading user set:", error);
    return res.status(500).json({
      message: "Error loading user set",
      error: error.message,
    });
  }
});

module.exports = router;
