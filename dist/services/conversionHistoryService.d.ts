import { ConversionHistory, ConversionResponse } from '../types';
export declare class ConversionHistoryService {
    private historyFile;
    constructor();
    private ensureDataDirectory;
    private readHistory;
    private writeHistory;
    saveConversion(conversion: ConversionResponse): Promise<ConversionHistory>;
    getConversions(limit?: number): Promise<ConversionHistory[]>;
    clearHistory(): Promise<void>;
    private generateId;
}
//# sourceMappingURL=conversionHistoryService.d.ts.map