const express = require("express");
const router = express.Router();

const { authorizeUserAction } = require("../middleware/userMiddleware");
const { isUser, createSet } = require("../db/queries");

router.get("/:username", async (req, res) => {
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
});

router.post("/:username/new/set", authorizeUserAction, async (req, res) => {
  console.log(req.body);

  try {
    const { title, description } = req.body;

    const authorId = req.user.id;

    const newSet = await createSet(title, description, authorId);
    console.log("New set created:", {
      id: newSet.id,
      authorId: newSet.authorId,
      title: newSet.title,
      description: newSet.description,
    });

    res.status(201).json(newSet);
  } catch (error) {
    console.error("Error creating set:", error);

    return res.status(500).json({
      message: "Error creating set",
      error: error.message,
    });
  }
});

module.exports = router;
