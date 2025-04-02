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

// Login route
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      // Remove password from response for security
      const { password: _, ...userWithoutPassword } = user;

      console.log("User logged in:", { id: user.id, email: user.email });
      return res.status(200).json(userWithoutPassword);
    });
  })(req, res, next);
});

// Logout route
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    console.log("User logged out");
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// User info route
router.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = req.user;

  console.log("User info retrieved:", {
    id: req.user.id,
    email: req.user.email,
  });

  res.status(200).json(userWithoutPassword);
});

module.exports = router;
