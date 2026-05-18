const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handlegenerateshorturl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  const ShortID = nanoid(6); // ✅ FIXED (capital S)

  await URL.create({
    ShortID: ShortID,
    originalurl: body.url,
    visithistory: [],
  });

  res.json({ id: ShortID });
}

async function handleanalytics(req, res) {
  const ShortID = req.params.ShortID;

  const entry = await URL.findOne({ ShortID });

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.json({
    totalclicks: entry.visithistory.length,
    Analytics: entry.visithistory,
  });
}

module.exports = { handlegenerateshorturl, handleanalytics };