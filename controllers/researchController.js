// controllers/researchController.js
const Research = require("../models/research");

// 연구 자료 생성
exports.createResearch = async (req, res) => {
  try {
    const { title, description } = req.body;
    const research = await Research.create({
      title,
      description,
      userId: req.user.id,
    });
    res.status(201).json(research);
  } catch (error) {
    res.status(500).json({ error: "Error creating research" });
  }
};

// 연구 자료 조회
exports.getResearch = async (req, res) => {
  try {
    const research = await Research.findByPk(req.params.id);
    if (!research) {
      return res.status(404).json({ error: "Research not found" });
    }
    res.json(research);
  } catch (error) {
    res.status(500).json({ error: "Error fetching research" });
  }
};

// 연구 자료 수정
exports.updateResearch = async (req, res) => {
  try {
    const research = await Research.findByPk(req.params.id);
    if (!research) {
      return res.status(404).json({ error: "Research not found" });
    }
    const { title, description } = req.body;
    research.title = title || research.title;
    research.description = description || research.description;
    await research.save();
    res.json(research);
  } catch (error) {
    res.status(500).json({ error: "Error updating research" });
  }
};

// 연구 자료 삭제
exports.deleteResearch = async (req, res) => {
  try {
    const research = await Research.findByPk(req.params.id);
    if (!research) {
      return res.status(404).json({ error: "Research not found" });
    }
    await research.destroy();
    res.json({ message: "Research deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting research" });
  }
};
