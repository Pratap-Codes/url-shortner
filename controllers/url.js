const express = require('express');
const shortid = require('shortid');
const URL = require('../models/url')

async function handleCreateShortId(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'Url is required' });

    const shortID = shortid.generate();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url, // Store formatted URL
        visitHistory: [],
    });

    return res.render("home", {
        id: shortID
    });
};

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length, analytics: result.visitHistory,
    });
}
module.exports = {
    handleCreateShortId,
    handleGetAnalytics,
};