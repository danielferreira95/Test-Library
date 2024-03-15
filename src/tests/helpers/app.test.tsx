import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import store from '../redux';
import Wallet from '../pages/Wallet';
import WalletForm from '../components/WalletForm';
import {
  currencySuccess,
  expenseConstructor,
} from '../redux/actions';

test('Espera-se que na página inicial, tenha o texto "Login"', async () => {
  renderWithRouterAndRedux(<App />);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/E-mail:/i)).toBeInTheDocument();
  expect(screen.getByText(/Senha:/i)).toBeInTheDocument();
});

test('Espera-se que na página Carteira, seja possível adicionar a descrição da despesa', async () => {
  const dataTestIdDescription = 'description-input';
  const { getByText, getByTestId, findByTestId } = renderWithRouterAndRedux(
    <App />,
  );

  const usernameInput = getByTestId('email-input') as HTMLInputElement;
  const passwordInput = getByTestId('password-input') as HTMLInputElement;
  fireEvent.change(usernameInput, { target: { value: 'srteste@testado.com' } });
  fireEvent.change(passwordInput, { target: { value: 'suasenha' } });

  // Submeter o formulário de login
  const loginButton = getByText('Entrar');
  fireEvent.click(loginButton);

  // Aguardar a renderização da página de despesas
  await waitFor(() => expect(getByTestId('render-walletform')).toBeInTheDocument());

  // Verificar se o componente de descrição de despesa está presente e funcionando corretamente
  const input = getByTestId(dataTestIdDescription) as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Descrição Teste' } });
  expect(input.value).toBe('Descrição Teste');
});

// Teste para a action currencySuccess
test('currencySuccess action', () => {
  const keys: any = ['USD', 'EUR', 'GBP'];
  const action = currencySuccess(keys);
  expect(action.type).toEqual('CURRENCY_SUCCESS');
  expect(action.payload).toEqual(keys);
});

// Teste para a action expenseConstructor
test('expenseConstructor action', () => {
  const expense : any = {
    description: 'Test expense',
    currency: 'USD',
    method: 'Credit card',
    tag: 'Food',
    value: '100',
    id: 1,
  };
  const action = expenseConstructor(expense);
  expect(action.type).toEqual('EXPENSE_CONSTRUCTOR');
  expect(action.payload).toEqual(expense);
});
