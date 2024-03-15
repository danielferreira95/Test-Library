import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { renderWithRouterAndRedux } from './tests/helpers/renderWith';
import WalletForm from './components/WalletForm';

describe('Testes aplicação Trybewallet', () => {
  const testeIdPassword = 'password-input';

  const isValidEmail = 'jonas@gmail.com';
  const isValidPassword = '452896';

  test('Verifica se a tela Login é renderizada', async () => {
    renderWithRouterAndRedux(<App />);

    const iptLogin = screen.getByRole('textbox', { name: 'Email' });
    const iptWatchword = screen.getByLabelText(/senha:/i);

    expect(iptLogin).toBeInTheDocument();
    expect(iptWatchword).toBeInTheDocument();
  });

  test('Verifica se o formulário está em branco', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByTestId(testeIdPassword)).toHaveValue('');
  });

  test('Verifica se existe um botão de login', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEl = screen.getByRole('button', { name: /entrar/i });
    expect(buttonEl).toBeInTheDocument();
  });

  test('Verifica se o botão de login está inicialmente desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEl = screen.getByRole('button', { name: /entrar/i });
    expect(buttonEl).toBeDisabled();
  });

  test('Verifica se os dados do formulários estão corretamente preenchidos', async () => {
    renderWithRouterAndRedux(<App />);

    const iptLogin = screen.getByRole('textbox');
    const iptWatchword = screen.getByTestId(testeIdPassword);
    const buttonEl = screen.getByRole('button', { name: /entrar/i });

    await userEvent.type(iptLogin, isValidEmail);
    await userEvent.type(iptWatchword, '0000');

    expect(buttonEl).toBeDisabled();

    await userEvent.clear(iptLogin);
    await userEvent.clear(iptWatchword);

    await userEvent.type(iptLogin, isValidEmail);
    await userEvent.type(iptWatchword, isValidPassword);

    expect(buttonEl).toBeEnabled();
  });

  test('Da página de login o usuário é redirecionado pra pagina wallet', async () => {
    renderWithRouterAndRedux(<App />);
    const buttonEl = screen.getByRole('button', { name: /entrar/i });
    const iptLog = screen.getByRole('textbox', { name: 'Email' });
    const iptWatchword = screen.getByLabelText(/senha:/i);

    fireEvent.change(iptLog, { target: { value: isValidEmail } });
    fireEvent.change(iptWatchword, { target: { value: isValidPassword } });

    await userEvent.click(buttonEl);

    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(addBtn).toBeInTheDocument();
  });
});

describe('WalletForm Component', () => {
  beforeEach(() => {
    render(
      <Provider store={ store }>
        <WalletForm />
      </Provider>,
    );
  });
  test('Verifica se o componente WalletForm é renderizado', () => {
    const form = screen.getByTestId('form-id');
    expect(form).toBeInTheDocument();
  });

  test('Verifica se os elementos de entrada estão presentes', () => {
    const despElem = screen.getByTestId('value-input');
    const descriptionElement = screen.getByTestId('description-input');
    const currencyElement = screen.getByTestId('currency-input');
    const methodElement = screen.getByTestId('method-input');
    const tagElement = screen.getByTestId('tag-input');

    expect(despElem).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(currencyElement).toBeInTheDocument();
    expect(methodElement).toBeInTheDocument();
    expect(tagElement).toBeInTheDocument();
  });

  test('Verifica se a função de submissão do formulário está funcionando corretamente', () => {
    const despElem = screen.getByTestId('value-input');
    const descriptionElement = screen.getByTestId('description-input');
    const submitButton = screen.getByRole('button');

    fireEvent.change(despElem, { target: { value: '100' } });
    fireEvent.change(descriptionElement, { target: { value: 'Despesa teste' } });
    fireEvent.click(submitButton);
  });
});
