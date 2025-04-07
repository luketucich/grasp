const express = require("express");
const router = express.Router();

const { isUser } = require("../db/queries");

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
    if (process.env.NODE_ENV === "development") {
      console.error("Error checking user ownership:", error);
      return res
        .status(500)
        .json({ message: "An internal server error occurred" });
    }
    console.error("Error checking user ownership:", error);
  }
});

module.exports = router;
