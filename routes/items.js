const express = require("express");
const router = express.Router();
const Controller = require("../controllers/Controller");

router.get("/", Controller.showAll);
router.get("/add", Controller.addForm);
router.post("/add", Controller.addPost);
router.get("/edit/:id", Controller.editForm);
router.post("/edit/:id", Controller.editPost);
router.get("/delete/:id", Controller.delete);

module.exports = router;