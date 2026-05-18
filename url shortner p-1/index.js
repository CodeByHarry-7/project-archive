const express = require("express");
const app = express();
const port = 8000;
const URL = require("./models/url");
const urlRoutes = require("./routes/url");
const { connectDB } = require("./connection");

// middleware
app.use(express.json());

// routes
app.use("/url", urlRoutes);

app.get("/:ShortID", async (req, res) => {
  const ShortID = req.params.ShortID;
  const entry = await URL.findOneAndUpdate(
    { ShortID },
    {
      $push: { visithistory: { timestamp: Date.now() } },
    },
  );
  res.redirect(entry.originalurl);
});

// DB connection
connectDB("mongodb://127.0.0.1:27017/url-shortner-p1")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("DB Error:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
