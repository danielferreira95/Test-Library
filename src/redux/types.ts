export type Keys = 'USD' | 'CAD' | 'GBP' | 'ARS' | 'BTC' | 'LTC' | 'EUR' | 'JPY' | 'CHF'
| 'AUD' | 'CNY' | 'ILS' | 'ETH' | 'XRP' | 'DOGE';

export interface IExpensive {
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
  id: number,
  exchangeRates: any,
}

export interface State {
  currencies: Keys[];
  expenses: IExpensive[];
  exchangeRates: any;
}

export interface IStorage {
  user: any,
  wallet: State,
}
