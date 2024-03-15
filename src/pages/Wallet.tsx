import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WalletForm from '../components/WalletForm';
import { IExpensive, IStorage } from '../redux/types';
import Table from '../components/Table';
import { getValueConvert } from '../utils/servicesCurencies';

function Wallet() {
  const [currency, setCrenc] = useState('BRL');
  const userEmail = useSelector((state: any) => state.user.email);
  const storeExpense = useSelector((state: IStorage) => state.wallet.expenses);

  const getSome = () => {
    const totalExpenses = storeExpense.reduce((prev: number, cur: IExpensive): number => {
      const sum = getValueConvert(cur);
      const soma = prev + sum;
      return Number(soma);
    }, 0);
    return totalExpenses;
  };

  return (
    <>
      <div>
        TrybeWallet
      </div>
      <header data-testid="email-field">
        <section data-testid="user-email">
          {' '}
          {userEmail}
        </section>
        <section data-testid="total-field">
          { getSome().toFixed(2) }
        </section>
        <section data-testid="header-currency-field">
          {currency}
        </section>
      </header>
      <WalletForm />
      <Table />
    </>
  );
}

export default Wallet;
