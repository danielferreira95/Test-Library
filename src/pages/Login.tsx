import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveEmail } from '../redux/actions';
import store from '../redux';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const MIN_CHARACTER = 6;
  const REGEX_SPECIAL_CHAR = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/;
  // const REGEX_SPECIAL_CHAR = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    store.dispatch(saveEmail(email));
    navigate('/carteira');
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div>Login</div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ handleChangeEmail }
        />
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ handleChangePassword }
        />
        <button
          type="submit"
          disabled={ password.length < MIN_CHARACTER || !REGEX_SPECIAL_CHAR.test(email) }
        >
          Entrar
        </button>
      </form>
    </>
  );
}

export default Login;
