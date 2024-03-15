// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY_SUCCESS, EXPENSE_CONSTRUCTOR, EXPENSE_DELETE } from '../actions';
import { State } from '../types';

const INITIAL_STATE: State = {
  currencies: [],
  expenses: [],
  exchangeRates: {},
};

interface IWalletData {
  type: string,
  payload: any,
}

const deleteExpense = (payload: any, state: any) => {
  const { expenses } = state;
  const deleteExpenses = expenses.filter((el: any) => el.id !== payload.id);
  return deleteExpenses;
};

const walletReducer = (state = INITIAL_STATE, { type, payload }: IWalletData) => {
  switch (type) {
    case CURRENCY_SUCCESS:
      return {
        ...state, currencies: payload,
      };
    case EXPENSE_CONSTRUCTOR:
      return {
        ...state, expenses: [...state.expenses, payload],
      };
    case EXPENSE_DELETE:
      return {
        ...state, expenses: deleteExpense(payload, state),
      };
    default:
      return state;
  }
};

export default walletReducer;
