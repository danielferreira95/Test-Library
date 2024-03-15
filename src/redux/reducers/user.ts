// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, { type, payload }: any) => {
  switch (type) {
    case SAVE_EMAIL:
      return {
        ...state, email: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
