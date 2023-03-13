const express = require("express");
const router = require.Router();
const settings = require("../controllers/setting");

router.post("/setting", settings.createSetting);
router.get("/setting", settings.getAllSetting);
router.get("/setting/:id", settings.getOneSetting);
router.put("/setting/:id", settings.updateSetting);
router.delete("/setting", settings.deleteSetting);
