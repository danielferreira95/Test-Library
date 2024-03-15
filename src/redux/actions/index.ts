import { IExpensive, Keys } from '../types';
// import { getCurencyFormatInput } from '../../utils/servicesCurencies';

// Action types
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const CURRENCY_SUCCESS = 'CURRENCY_SUCCESS';
export const CURRENCY_ERROR = 'CURRENCY_ERROR';
export const EXPENSE_CONSTRUCTOR = 'EXPENSE_CONSTRUCTOR';
export const EXPENSE_DELETE = 'EXPENSE_DELETE';

export const saveEmail = (currentEmail: any) => ({
  type: SAVE_EMAIL,
  payload: currentEmail,
});

export const currencySuccess = (payload: Keys[]) => ({
  type: CURRENCY_SUCCESS,
  payload,
});

export const currencyError = (payload: any) => ({
  type: CURRENCY_ERROR,
  payload,
});

export const expenseConstructor = (currentState: IExpensive) => ({
  type: EXPENSE_CONSTRUCTOR,
  payload: currentState,
});

export const expenseDelete = (payload: any) => ({
  type: EXPENSE_DELETE,
  payload,
});
