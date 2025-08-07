import { Router } from 'express';
import { CurrencyService } from '../services/currencyService';

const router = Router();

// Get all available currencies
router.get('/currencies', async (req, res) => {
  try {
    const currencyService = new CurrencyService();
    const currencies = await currencyService.getCurrencies();
    res.json(currencies);
  } catch (error) {
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

    const fromCurrency = from as string;
    const toCurrency = to as string;
    const amountValue = parseFloat(amount as string);

    if (isNaN(amountValue) || amountValue <= 0) {
      return res.status(400).json({
        error: 'Amount must be a positive number'
      });
    }

    const currencyService = new CurrencyService();
    const result = await currencyService.convertCurrency(fromCurrency, toCurrency, amountValue);
    res.json(result);
  } catch (error) {
    console.error('Error in /convert route:', error);
    res.status(500).json({ error: 'Failed to convert currency' });
  }
});

export { router as currencyRoutes };
