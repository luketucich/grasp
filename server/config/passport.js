const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { prisma } = require("../db/queries");

// Passport local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Try to find user
        const user = await prisma.user.findUnique({
          where: { email },
        });

        // If user not found, return error
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        // If user found, check password
        const isMatch = await bcrypt.compare(password, user.password);

        // If password doesn't match, return error
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        // If all checks pass, return user
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user (store only the user ID)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user (find user in Prisma by ID)
passport.deserializeUser(async (id, done) => {
  try {
    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id },
    });

    // Error handling
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
