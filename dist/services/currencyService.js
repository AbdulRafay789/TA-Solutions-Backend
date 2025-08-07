"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyService = void 0;
const axios_1 = __importDefault(require("axios"));
class CurrencyService {
    constructor() {
        this.apiKey = process.env.FREECURRENCY_API_KEY || '';
        this.baseUrl = process.env.FREECURRENCY_API_BASE_URL || 'https://api.freecurrencyapi.com/v1';
        if (!this.apiKey) {
            throw new Error('FreeCurrencyAPI key is required');
        }
    }
    async getCurrencies() {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/currencies`, {
                params: {
                    apikey: this.apiKey
                }
            });
            const currencies = [];
            for (const [code, data] of Object.entries(response.data.data)) {
                currencies.push({
                    code,
                    name: data.name || code,
                    symbol: data.symbol || code
                });
            }
            return currencies.sort((a, b) => a.code.localeCompare(b.code));
        }
        catch (error) {
            console.error('Error fetching currencies:', error);
            throw new Error('Failed to fetch currencies');
        }
    }
    async convertCurrency(from, to, amount) {
        try {
            console.log(`Converting ${amount} ${from} to ${to}`);
            console.log(`API URL: ${this.baseUrl}/latest`);
            console.log(`API Key: ${this.apiKey ? 'Present' : 'Missing'}`);
            const response = await axios_1.default.get(`${this.baseUrl}/latest`, {
                params: {
                    apikey: this.apiKey,
                    base_currency: from,
                    currencies: to
                }
            });
            console.log('API Response:', JSON.stringify(response.data, null, 2));
            // Check if the response has the expected structure
            if (!response.data || !response.data.data) {
                console.error('Invalid API response structure:', response.data);
                throw new Error('Invalid API response structure');
            }
            const rate = response.data.data[to];
            if (!rate) {
                console.error(`Rate not found for ${to} in response data:`, response.data.data);
                throw new Error(`Conversion rate not found for ${from} to ${to}`);
            }
            const result = amount * rate;
            return {
                from,
                to,
                amount,
                result: Math.round(result * 1000000) / 1000000, // Round to 6 decimal places
                rate,
                timestamp: response.data.meta?.last_updated_at || new Date().toISOString()
            };
        }
        catch (error) {
            console.error('Error converting currency:', error);
            if (axios_1.default.isAxiosError(error)) {
                console.error('Axios error details:', {
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    data: error.response?.data
                });
            }
            throw new Error('Failed to convert currency');
        }
    }
    async getExchangeRates(baseCurrency, targetCurrencies) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/latest`, {
                params: {
                    apikey: this.apiKey,
                    base_currency: baseCurrency,
                    currencies: targetCurrencies.join(',')
                }
            });
            return response.data.data;
        }
        catch (error) {
            console.error('Error fetching exchange rates:', error);
            throw new Error('Failed to fetch exchange rates');
        }
    }
}
exports.CurrencyService = CurrencyService;
//# sourceMappingURL=currencyService.js.map