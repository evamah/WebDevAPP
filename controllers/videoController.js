const youtubeService = require("../services/youtubeService");
const favoriteRepo = require("../repositories/favoriteRepository");

class VideoController {
    async showPage(req, res) {
        const userId = req.session.user.id;

        const q = (req.query.q || "").trim();
        let results = [];
        let error = null;

        try {
            if (q) results = await youtubeService.search(q);
        } catch (e) {
            error = e.message;
        }

        const favorites = await favoriteRepo.listByUser(userId);

        res.render("videos", {
            q,
            results,
            favorites,
            error
        });
    }

    async addFavorite(req, res) {
        const userId = req.session.user.id;
        const { videoId, title, thumbnailUrl } = req.body;

        try {
            // add the video to users favorites list
            await favoriteRepo.add({ userId, videoId, title, thumbnailUrl });
        } catch (e) {
            // If the video already exists in favorites SQLite throws an error.
        }

        res.redirect("/videos?q=" + encodeURIComponent(req.query.q || ""));
    }

    async removeFavorite(req, res) {
        const userId = req.session.user.id;
        const { videoId } = req.body;

        await favoriteRepo.remove({ userId, videoId });
        res.redirect("/videos?q=" + encodeURIComponent(req.query.q || ""));
    }
}

module.exports = new VideoController();
