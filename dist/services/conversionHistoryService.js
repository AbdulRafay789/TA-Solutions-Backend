"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionHistoryService = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class ConversionHistoryService {
    constructor() {
        this.historyFile = path.join(__dirname, '../../data/conversions.json');
        this.ensureDataDirectory();
    }
    ensureDataDirectory() {
        const dataDir = path.dirname(this.historyFile);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        if (!fs.existsSync(this.historyFile)) {
            fs.writeFileSync(this.historyFile, JSON.stringify([]));
        }
    }
    readHistory() {
        try {
            const data = fs.readFileSync(this.historyFile, 'utf8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Error reading conversion history:', error);
            return [];
        }
    }
    writeHistory(history) {
        try {
            fs.writeFileSync(this.historyFile, JSON.stringify(history, null, 2));
        }
        catch (error) {
            console.error('Error writing conversion history:', error);
        }
    }
    async saveConversion(conversion) {
        const history = this.readHistory();
        const newConversion = {
            id: this.generateId(),
            ...conversion,
            timestamp: new Date().toISOString()
        };
        history.unshift(newConversion);
        if (history.length > 100) {
            history.splice(100);
        }
        this.writeHistory(history);
        return newConversion;
    }
    async getConversions(limit = 50) {
        const history = this.readHistory();
        return history.slice(0, limit);
    }
    async clearHistory() {
        this.writeHistory([]);
    }
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}
exports.ConversionHistoryService = ConversionHistoryService;
//# sourceMappingURL=conversionHistoryService.js.map