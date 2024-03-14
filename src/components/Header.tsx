import { useSelector } from 'react-redux';
import { RootState } from '../types';

function Header() {
  const mailContent = useSelector((state: RootState) => state.user.email);
  const totalCost = useSelector((state: RootState) => state.wallet.totalExpense);
  const coin = useSelector((state: RootState) => state.wallet.currency);

  return (
    <header>
      <h1>Trybewallet</h1>
      <p data-testid="email-field">{`Email: ${mailContent}`}</p>
      <p data-testid="total-field">{`Total: ${totalCost}`}</p>
      <p data-testid="header-currency-field">{`${coin}`}</p>
    </header>
  );
}

export default Header;
