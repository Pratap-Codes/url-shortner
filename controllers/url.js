const express = require('express');
const shortid = require('shortid');
const URL = require('../models/url')

async function handleCreateShortId(req, res) {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'Url is required' });

    // Ensure the URL has "http://" or "https://"
    let formattedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

    const shortID = shortid.generate();
    await URL.create({
        shortId: shortID,
        redirectUrl: formattedUrl, // Store formatted URL
        visitHistory: [],
    });

    return res.json({ id: shortID });
};

async function handleAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length, analytics: result.visitHistory,
    });
}
module.exports = {
    handleCreateShortId,
    handleAnalytics,
};