import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';
import { useSelector } from 'react-redux';

export function Table() {
  const expenses = useSelector((state: any) => state.wallet.expenses);
  const formatCurrency = (value: number) => Number(value).toFixed(2);

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((
          expense: { description: string | number | boolean
          | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode>
          | ReactPortal | null | undefined; tag: string | number | boolean
          | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode>
          | ReactPortal | null | undefined; method: string | number | boolean
          | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode>
          | ReactPortal | null | undefined; value: number; exchangeRates: {
            [x: string]: {
              [x: string]: ReactNode; ask: number;
            };
          };currency: string | number; },
          index: Key | null | undefined,
        ) => (
          <tr key={ index }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{formatCurrency(expense.value)}</td>
            <td>
              {expense.exchangeRates[expense.currency].name }
            </td>
            <td>{formatCurrency(expense.exchangeRates[expense.currency].ask)}</td>
            <td>
              {formatCurrency(
                expense.value * expense.exchangeRates[expense.currency].ask,
              )}
            </td>
            <td>Real</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
