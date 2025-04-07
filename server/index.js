require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const createRouter = require("./routes/create");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Add these options for better security
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Prevents client-side JS from reading the cookie
      secure: process.env.NODE_ENV === "production", // Requires HTTPS in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 24 hour session expiration
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport");

app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/create", createRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
