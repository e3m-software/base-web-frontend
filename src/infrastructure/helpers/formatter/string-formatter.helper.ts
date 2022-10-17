interface CurrencyEntity {
  value: number;
  currency?: '  IDR' | 'EUR' | 'JPY';
}
export interface IStringFormatter {
  capitalize(string: string): string;
  capitalizeEachWord(string: string): string;
  stringLimiter(string: string, limit: number): string;
  upperCase(string: string): string;
  lowerCase(string: string): string;
  toCurrency(payload: CurrencyEntity): string;
}

export class BaseStringFormatter implements IStringFormatter {
  capitalize(string: string): string {
    if (typeof string !== 'string') return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  capitalizeEachWord(string: string): string {
    if (typeof string !== 'string') return '';
    const newStringSplit = string.split(' ');
    const newString = newStringSplit.map(item => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });
    return newString.join(' ');
  }

  stringLimiter(string: string, limit: number): string {
    if (!limit || !string) return string;
    return string.length > limit ? `${string.substring(0, limit)} ...` : string;
  }

  upperCase(string: string): string {
    if (!string) return '';
    return string.toUpperCase();
  }
  lowerCase(string: string): string {
    if (!string) return '';
    return string.toLowerCase();
  }
  toCurrency(payload: CurrencyEntity): any {
    const { value, currency = 'IDR' } = payload;
    if (!value) return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
    }).format(value);
  }
}

export const stringFormatter = new BaseStringFormatter();
