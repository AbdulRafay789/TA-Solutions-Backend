import { ConversionHistory, ConversionResponse } from '../types';
import * as fs from 'fs';
import * as path from 'path';

export class ConversionHistoryService {
  private historyFile: string;

  constructor() {
    this.historyFile = path.join(__dirname, '../../data/conversions.json');
    this.ensureDataDirectory();
  }

  private ensureDataDirectory(): void {
    const dataDir = path.dirname(this.historyFile);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(this.historyFile)) {
      fs.writeFileSync(this.historyFile, JSON.stringify([]));
    }
  }

  private readHistory(): ConversionHistory[] {
    try {
      const data = fs.readFileSync(this.historyFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading conversion history:', error);
      return [];
    }
  }

  private writeHistory(history: ConversionHistory[]): void {
    try {
      fs.writeFileSync(this.historyFile, JSON.stringify(history, null, 2));
    } catch (error) {
      console.error('Error writing conversion history:', error);
    }
  }

  async saveConversion(conversion: ConversionResponse): Promise<ConversionHistory> {
    const history = this.readHistory();
    const newConversion: ConversionHistory = {
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

  async getConversions(limit: number = 50): Promise<ConversionHistory[]> {
    const history = this.readHistory();
    return history.slice(0, limit);
  }

  async clearHistory(): Promise<void> {
    this.writeHistory([]);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
