const express = require("express");
const crypto = require("crypto");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const ACCESS_KEY = "qKrHTC7c3as45Q";
const SECRET_KEY = "xfvCDqv5KdqLpA";

app.post("/screenshot", async (req, res) => {
  const targetUrl = req.body.url;
  if (!targetUrl) return res.status(400).json({ error: "Missing URL" });

  const query = `url=${encodeURIComponent(targetUrl)}&full_page=true&output=image`;
  const hmac = crypto.createHmac("sha256", SECRET_KEY);
  hmac.update(query);
  const signature = hmac.digest("hex");

  const screenshotUrl = `https://api.screenshotone.com/take?access_key=${ACCESS_KEY}&${query}&signature=${signature}`;
  res.json({ image: screenshotUrl });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
