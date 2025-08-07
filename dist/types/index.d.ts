export interface Currency {
    code: string;
    name: string;
    symbol?: string;
}
export interface ConversionRequest {
    from: string;
    to: string;
    amount: number;
}
export interface ConversionResponse {
    from: string;
    to: string;
    amount: number;
    result: number;
    rate: number;
    timestamp: string;
}
export interface ConversionHistory {
    id: string;
    from: string;
    to: string;
    amount: number;
    result: number;
    rate: number;
    timestamp: string;
}
export interface FreeCurrencyApiResponse {
    data: Record<string, number>;
    meta: {
        last_updated_at: string;
    };
}
export interface ApiError {
    error: string;
    message?: string;
    status?: number;
}
//# sourceMappingURL=index.d.ts.map