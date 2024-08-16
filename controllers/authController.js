// controllers/authController.js
const User = require("../models/user");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    const token = user.generateToken();
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = user.generateToken();
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: "Error logging in" });
  }
};
