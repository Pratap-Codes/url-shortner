const express = require('express');
const path = require('path');
const connectToMongoDB = require('./connect');

const URL = require('./models/url')
const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("MongoDB connected")
});

app.set('view engine', "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());

app.use("/", staticRouter);

app.use("/url", urlRoute);
app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamps: Date.now(),
            }
        },
    }
    );
    res.redirect(entry.redirectUrl);
})
app.listen(PORT, () => { console.log(`server has started at PORT: ${PORT}`) });