const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { prisma, createUser } = require("../db/queries");

const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", { email });
      return res.status(400).json({ message: "User already exists" });
    }

    // If not found, set up a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, hashedPassword);
    console.log("New user created:", { id: newUser.id, email: newUser.email });

    // Remove password from response for security
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);

    return res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
});

module.exports = router;
