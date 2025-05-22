const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  deleteAllUsers,
} = require("../controllers/userController");

const authenticateToken = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/", authenticateToken, getAllUsers);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.delete("/", deleteAllUsers);

module.exports = router;
