import './styles.css';
import { React, useState } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import FlashMessage from '../../components/FlashMessage';

function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [logged, setLogged] = useState(false);

  const handleSubmit = async () => {
    setTimeout(() => {
      setHasError(false)
      setErrorMessage('')
    }, 20000);

    if (!password.length || !email.length) {
      setIsEmpty(true)
      return;
    } else if (password.length || email.length) {
      setIsEmpty(false)
    }

    const { data } = await axios.get(`http://localhost:3003/main/login/?password=${password}&email=${email}`);

    switch (data.status) {
      case 200:
        setLogged(true)
        return;

      case 400:
        setHasError(true)
        setErrorMessage(data.message)
        return;

      default:
        setHasError(true)
        setErrorMessage('Erro desconhecido, entre em contato com o suporte!')
    }
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="container">
      {!!logged && (<Navigate to={'/painel'} />)}
      <div className="login">
        <h1>QueroFrete</h1>
        <p>A tecnologia que conecta!</p>
        <div className="form">
          <input type="email" onChange={(e) => handleChangeEmail(e)} />
          <input type="password" onChange={(e) => handleChangePassword(e)} />
          <a href="#">
            Esqueci minha senha
          </a>
          {!!isEmpty && (<FlashMessage duration={20} message='O email e a senha precisam ser preenchidos!' type='error' />)}
          {!!hasError && (<FlashMessage duration={20} message={errorMessage} type='error' />)}
          <button onClick={() => handleSubmit()}>Entrar</button>
        </div>
        <p>Não possui conta? <a href="#">Clique aqui</a> para criar uma.</p>
      </div>
    </div>
  );
}

export default Login;
