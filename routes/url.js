const express = require('express');
const { handleCreateShortId, handleGetAnalytics } = require('../controllers/url');

const router = express.Router();

router.post("/", handleCreateShortId);

router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;