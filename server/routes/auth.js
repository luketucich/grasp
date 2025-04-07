const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { prisma, createUser } = require("../db/queries");

const router = express.Router();

// Registration route
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", { email });
      return res.status(400).json({
        message:
          process.env.NODE_ENV === "production"
            ? "A user with this email already exists"
            : "Authentication error",
      });
    }

    // If not found, set up a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, username, hashedPassword);
    console.log("New user created:", {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    });

    // Remove password from response for security
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);

    return res.status(500).json({
      message: "Error creating user",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "An internal server error occurred",
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
      return res.status(401).json({
        message:
          process.env.NODE_ENV === "development"
            ? "Invalid email or password"
            : "Authentication failed",
      });
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
router.get("/me", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const userId = req.user.id;

    // Fetch full user data with sets from the database
    const userWithSets = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Set: true,
      },
    });

    if (!userWithSets) {
      return res.status(404).json({
        message:
          process.env.NODE_ENV === "development"
            ? "User profile not found"
            : "Resource not found",
      });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = userWithSets;

    console.log("User info retrieved:", {
      id: userWithSets.id,
      email: userWithSets.email,
      setCount: userWithSets.Set.length,
    });

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error fetching user with sets:", error);
    res.status(500).json({
      message:
        process.env.NODE_ENV === "development"
          ? `Error fetching user data: ${error.message}`
          : "An internal server error occurred",
    });
  }
});

module.exports = router;
