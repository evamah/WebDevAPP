const API_KEY = process.env.YOUTUBE_API_KEY;

class YouTubeService {
    async search(query) {
        if (!API_KEY) throw new Error("Missing YOUTUBE_API_KEY env variable");

        const q = (query || "").trim();
        if (!q) return [];

        const url =
            "https://www.googleapis.com/youtube/v3/search" +
            `?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(q)}` +
            `&key=${encodeURIComponent(API_KEY)}`;

        const resp = await fetch(url);
        const data = await resp.json();

        if (!resp.ok) {
            const msg = data?.error?.message || "YouTube API error";
            throw new Error(msg);
        }

        return (data.items || []).map((item) => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnailUrl: item.snippet.thumbnails?.medium?.url || ""
        }));
    }
}

module.exports = new YouTubeService();
