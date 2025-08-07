import { Currency, ConversionResponse } from '../types';
export declare class CurrencyService {
    private apiKey;
    private baseUrl;
    constructor();
    getCurrencies(): Promise<Currency[]>;
    convertCurrency(from: string, to: string, amount: number): Promise<ConversionResponse>;
    getExchangeRates(baseCurrency: string, targetCurrencies: string[]): Promise<Record<string, number>>;
}
//# sourceMappingURL=currencyService.d.ts.map