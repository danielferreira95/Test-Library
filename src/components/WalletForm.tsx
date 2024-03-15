import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurency, getCurencyFormatInput } from '../utils/servicesCurencies';
import { Currency } from './types';
import { currencySuccess, expenseConstructor } from '../redux/actions';
import { IStorage } from '../redux/types';
import { fetchAPI } from '../services/awesomeapi';

function WalletForm() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [valueInput, setValueInput] = useState('0');
  const [currencyInput, setCurrencyInput] = useState('USD');
  const [paymentMethod, setPaymentMethod] = useState('Dinheiro');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [category, setCategory] = useState('');
  const [apiCalled, setApiCalled] = useState(false); // State para controlar se a API foi chamada

  const dispatch = useDispatch();
  const storing = useSelector((state: IStorage) => state.wallet.expenses);

  useEffect(() => {
    if (!apiCalled) { // Verifica se a API já foi chamada
      const fetchData = async () => {
        try {
          const response = await getCurency();
          const initialData = await getCurencyFormatInput();
          dispatch(currencySuccess(initialData));
          setCurrencies(response);
          setApiCalled(true); // Marca a API como chamada
        } catch (error) {
          console.error('Error fetching currencies:', error);
        }
      };
      fetchData();
    }
  }, [dispatch, apiCalled]); // Dependência do useEffect inclui apiCalled

  const handleCustom = (e: any) => {
    const { value } = e.target;
    setCurrencyInput(value);
  };

  const handleClick = async () => {
    const response = await fetchAPI();
    dispatch(
      expenseConstructor({
        description: descriptionInput,
        currency: currencyInput,
        method: paymentMethod,
        tag: category,
        value: valueInput,
        id: storing.length,
        exchangeRates: response,
      }),
    );
    setDescriptionInput('');
    setValueInput('');
  };

  return (
    <div data-testid="render-walletform">
      <div>WalletForm</div>
      <input
        data-testid="value-input"
        type="number"
        onChange={ (v) => setValueInput(v.target.value) }
        value={ valueInput }
      />
      <input
        data-testid="description-input"
        type="text"
        onChange={ (v) => setDescriptionInput(v.target.value) }
        value={ descriptionInput }
      />
      <select
        data-testid="currency-input"
        value={ currencyInput }
        onChange={ (v) => handleCustom(v) }
      >
        {currencies.map((currency) => (
          <option key={ currency.code } value={ currency.code }>
            {currency.name}
            {' '}
            {currency.code}
          </option>
        ))}
      </select>
      <select
        id="method-input"
        name="method"
        data-testid="method-input"
        onChange={ (v) => setPaymentMethod(v.target.value) }
      >
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
      <label htmlFor="tag-select">Categoria:</label>
      <select
        id="tag-select"
        name="tag"
        data-testid="tag-input"
        value={ category }
        onChange={ (v) => setCategory(v.target.value) }
      >
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
      <button type="submit" onClick={ handleClick }>
        Adicionar despesa
      </button>
    </div>
  );
}

export default WalletForm;
