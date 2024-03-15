// servicesCurencies.ts

import { fetchAPI } from '../services/awesomeapi';
import { Currency } from '../components/types';
import { IExpensive, Keys } from '../redux/types';

let currencyData: Currency[] | null = null;
let formatInputData: Keys[] | null = null;

export const getValueConvert = (el: IExpensive) => {
  if (!el.exchangeRates[el.currency]?.ask) {
    return 0;
  }
  const sum = Number(el.value) * Number(el.exchangeRates[el.currency].ask);
  return sum;
};

export const getCurency = async (): Promise<Currency[]> => {
  if (currencyData === null) {
    const response = await fetchAPI();
    currencyData = Object.entries<any>(response) // Definindo o tipo de value como any
      .filter(([key]) => key !== 'USDT')
      .map(([key, value]) => ({ code: key, name: value.name, ask: value.ask }));
  }
  return currencyData;
};

export const getCurencyFormatInput = async (): Promise<Keys[]> => {
  if (formatInputData === null) {
    const data = await getCurency();
    formatInputData = data.map((element: any) => element.code);
  }
  return formatInputData;
};
