const express = require("express");
const router = express.Router();

const Controller = require("../controllers/Controller");
const itemsRouter = require("./items");

router.get("/", Controller.home);
router.get("/health", Controller.health);
router.get("/reset", Controller.reset);

router.use("/items", itemsRouter);

module.exports = router;