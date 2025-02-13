const express = require('express');
const connectToMongoDB = require('./connect');

const URL = require('./models/url')
const urlRoute = require("./routes/url");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("MongoDB connected")
});

app.use(express.json());

app.use("/", urlRoute);
app.get('/:shortId', async (req, res) => {
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