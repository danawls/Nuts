// app.js
const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();
const { sequelize } = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// app.js

// 추가 라우팅 설정
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signup.html"));
});

// app.js

// 추가 라우팅 설정
app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "profile.html"));
});

// app.js

// 추가 라우팅 설정
app.get("/research", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "research.html"));
});

app.get("/development", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "development.html"));
});

// app.js

// 추가 라우팅 설정
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});

const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/user");

app.use("/api/user", userRoutes);

const researchRoutes = require("./routes/research");

app.use("/api/research", researchRoutes);
