import { GeneralExpensesType } from '../../types';
import { success, SET_CURRENCIES } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  editorId: 0,
};

const walletReducer = (state = initialState, action: GeneralExpensesType) => {
  switch (action.type) {
    case SET_CURRENCIES: {
      return { ...state, currencies: action.payload.currencies };
    }
    case success: {
      const newState = {
        ...state,
        expenses: [...state.expenses, ...action.payload.expenses],
      };
      return newState;
    }
    default:
      return state;
  }
};

export default walletReducer;
