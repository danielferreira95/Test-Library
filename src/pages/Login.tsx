import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateEmail } from '../redux/actions/index';

function Login() {
  const [mail, setMail] = useState('');
  const [watchword, setWatchword] = useState('');
  const [butOn, setButOn] = useState(false);

  const browsing = useNavigate();
  const remittance = useDispatch();

  const handleConect = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    remittance(updateEmail(mail));
    browsing('/carteira');
  };

  const handleWatchword = (event: { target: { value: React
    .SetStateAction<string>; }; }) => {
    setWatchword(event.target.value);
  };

  const handleEmail = (event: { target: { value: React
    .SetStateAction<string>; }; }) => {
    setMail(event.target.value);
  };

  useEffect(() => {
    const loginRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const isMailValid = loginRegex.test(mail);
    const isWatchwordValid = watchword.length >= 6;
    setButOn(isMailValid && isWatchwordValid);
  }, [mail, watchword]);

  return (
    <div>
      <form onSubmit={ handleConect }>
        <input
          type="email"
          name="email"
          aria-label="Email"
          data-testid="email-input"
          value={ mail }
          onChange={ handleEmail }
        />
        <input
          type="password"
          name="password"
          aria-label="Senha:"
          data-testid="password-input"
          value={ watchword }
          onChange={ handleWatchword }
          autoComplete="current-password"
        />
        <button
          type="submit"
          disabled={ !butOn }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
