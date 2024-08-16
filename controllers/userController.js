// controllers/userController.js
const User = require("../models/user");

// 사용자 정보 조회
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user profile" });
  }
};

// 사용자 정보 수정
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { username, email, password } = req.body;
    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error updating user profile" });
  }
};

// 사용자 삭제
exports.deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user profile" });
  }
};
