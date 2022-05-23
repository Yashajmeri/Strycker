const express = require("express");
const router = express.Router();
const userController = require("./controllers/user-controller");
const { check } = require("express-validator");
const fileUpload = require("./middleware/file-upload");
router.get("/", userController.getUser);

router.post(
  "/signup",
  fileUpload.single('image'),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  userController.signup
);
router.post("/login", userController.login);

module.exports = router;
