// routes/research.js
const express = require("express");
const {
  createResearch,
  getResearch,
  updateResearch,
  deleteResearch,
} = require("../controllers/researchController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createResearch);
router.get("/:id", getResearch);
router.put("/:id", authMiddleware, updateResearch);
router.delete("/:id", authMiddleware, deleteResearch);

module.exports = router;
