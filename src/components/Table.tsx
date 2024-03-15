import { useSelector, useDispatch } from 'react-redux';
import { IStorage } from '../redux/types';
import { getValueConvert } from '../utils/servicesCurencies';
import { expenseDelete } from '../redux/actions';

function Table() {
  const storing = useSelector((state: IStorage) => state.wallet.expenses);

  const dispatch = useDispatch();
  const handleClick = (id: number) => {
    dispatch(
      expenseDelete({ id }),
    );
  };

  return (
    <>
      <div>Table</div>
      <table width="500">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {storing.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ Number(expense.value).toFixed(2) }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>{ Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
              <td>{ Number(getValueConvert(expense)).toFixed(2) }</td>
              <td>Real</td>
              <td>
                <button
                  data-testid="delete-btn"
                  onClick={ () => handleClick(expense.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>)) }
        </tbody>
      </table>
      ;
    </>
  );
}

export default Table;
