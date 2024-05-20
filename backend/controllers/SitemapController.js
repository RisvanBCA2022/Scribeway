import { SitemapStream, streamToPromise } from 'sitemap'; // Import SitemapStream and streamToPromise from sitemap

import Post from "../models/postModel.js";

export const generateSitemap = async (req, res) => {
  try {
    const urls = [];
    const posts = await Post.find({}, "slug updatedAt").exec();

    posts.forEach((post) => {
      urls.push({
        url: `/posts/${post.slug}`,
        changefreq: "weekly",
        priority: 0.7,
        lastmodISO: post.updatedAt.toISOString(),
      });
    });

    const stream = new SitemapStream({ hostname: "https://scribeway.onrender.com/" });

    urls.forEach((url) => {
      stream.write(url);
    });
    stream.end();

    const xml = await streamToPromise(stream);
    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Internal Server Error");
  }
};
