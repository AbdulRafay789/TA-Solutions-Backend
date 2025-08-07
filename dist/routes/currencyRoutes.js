"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyRoutes = void 0;
const express_1 = require("express");
const currencyService_1 = require("../services/currencyService");
const router = (0, express_1.Router)();
exports.currencyRoutes = router;
// Get all available currencies
router.get('/currencies', async (req, res) => {
    try {
        const currencyService = new currencyService_1.CurrencyService();
        const currencies = await currencyService.getCurrencies();
        res.json(currencies);
    }
    catch (error) {
        console.error('Error in /currencies route:', error);
        res.status(500).json({ error: 'Failed to fetch currencies' });
    }
});
// Convert currency
router.get('/convert', async (req, res) => {
    try {
        const { from, to, amount } = req.query;
        if (!from || !to || !amount) {
            return res.status(400).json({
                error: 'Missing required parameters: from, to, amount'
            });
        }
        const fromCurrency = from;
        const toCurrency = to;
        const amountValue = parseFloat(amount);
        if (isNaN(amountValue) || amountValue <= 0) {
            return res.status(400).json({
                error: 'Amount must be a positive number'
            });
        }
        const currencyService = new currencyService_1.CurrencyService();
        const result = await currencyService.convertCurrency(fromCurrency, toCurrency, amountValue);
        res.json(result);
    }
    catch (error) {
        console.error('Error in /convert route:', error);
        res.status(500).json({ error: 'Failed to convert currency' });
    }
});
//# sourceMappingURL=currencyRoutes.js.map