import './styles.css';
import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import FlashMessage from '../../components/FlashMessage';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [hasSendEmail, setHasSendEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setTimeout(() => {
      setHasError(false)
      setErrorMessage('')
    }, 20000);

    if (!email.length) {
      setIsEmpty(true)
      return;
    }

    const data = {
      status: 200,
    }

    // const { data } = await axios.get(`http://localhost:3003/main/login/?password=${password}&email=${email}`);

    switch (data.status) {
      case 200:
        setHasError(false)
        setErrorMessage('')
        setHasSendEmail(true)
        setSuccessMessage('As informações de recuperação foram enviadas para o email!')
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

  return (
    <div className="container">
      <div className="forgot-password">
        <h1>QueroFrete</h1>
        <p>A tecnologia que conecta!</p>
        <div class="horizontal-line" />
        <div className="form">
          <label>Digite o email da sua conta abaixo e você receberá as instruções via email para recuperar sua senha</label>
          <input type="email" placeholder='Digite seu email' onChange={(e) => handleChangeEmail(e)} />
          {!!isEmpty && (<FlashMessage duration={20} message='O email e a senha precisam ser preenchidos!' type='error' />)}
          {!!hasSendEmail && (<FlashMessage duration={20} message={successMessage} type='success' />)}
          {!!hasError && (<FlashMessage duration={20} message={errorMessage} type='error' />)}
          <button onClick={() => handleSubmit()}>Recuperar Senha</button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
