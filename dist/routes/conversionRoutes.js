"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversionRoutes = void 0;
const express_1 = require("express");
const conversionHistoryService_1 = require("../services/conversionHistoryService");
const router = (0, express_1.Router)();
exports.conversionRoutes = router;
const conversionHistoryService = new conversionHistoryService_1.ConversionHistoryService();
// Get conversion history
router.get('/conversions', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 50;
        const conversions = await conversionHistoryService.getConversions(limit);
        res.json(conversions);
    }
    catch (error) {
        console.error('Error in /conversions route:', error);
        res.status(500).json({ error: 'Failed to fetch conversion history' });
    }
});
// Save conversion to history
router.post('/conversions', async (req, res) => {
    try {
        const { from, to, amount, result, rate, timestamp } = req.body;
        if (!from || !to || !amount || !result || !rate) {
            return res.status(400).json({
                error: 'Missing required fields: from, to, amount, result, rate'
            });
        }
        const conversion = await conversionHistoryService.saveConversion({
            from,
            to,
            amount: parseFloat(amount),
            result: parseFloat(result),
            rate: parseFloat(rate),
            timestamp: timestamp || new Date().toISOString()
        });
        res.status(201).json(conversion);
    }
    catch (error) {
        console.error('Error in POST /conversions route:', error);
        res.status(500).json({ error: 'Failed to save conversion' });
    }
});
// Clear conversion history
router.delete('/conversions', async (req, res) => {
    try {
        await conversionHistoryService.clearHistory();
        res.json({ message: 'Conversion history cleared successfully' });
    }
    catch (error) {
        console.error('Error in DELETE /conversions route:', error);
        res.status(500).json({ error: 'Failed to clear conversion history' });
    }
});
//# sourceMappingURL=conversionRoutes.js.map