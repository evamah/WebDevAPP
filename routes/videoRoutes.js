const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const videoController = require("../controllers/videoController");

// page
router.get("/videos", requireAuth, (req, res) => videoController.showPage(req, res));

// add favorite
router.post("/videos/favorites/add", requireAuth, (req, res) =>
    videoController.addFavorite(req, res)
);

// remove favorite
router.post("/videos/favorites/remove", requireAuth, (req, res) =>
    videoController.removeFavorite(req, res)
);

module.exports = router;
