const expensesReducer = (state = [], action: { type: any; payload: any; }) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default expensesReducer;
