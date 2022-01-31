import './styles.css';
import React from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import FlashMessage from '../../components/FlashMessage';

class Login extends React.Component {

  state = {
    password: '',
    email: '',
    isEmpty: false,
    hasError: false,
    errorMessage: '',
    logged: false,
  }

  async handleSubmit() {
    const { password, email } = this.state;

    setTimeout(() => {
      this.setState({ hasError: false, errorMessage: '' });
    }, 20000);

    if (!password.length || !email.length) {
      this.setState({ isEmpty: true });
      return;
    } else if (password.length || email.length) {
      this.setState({ isEmpty: false });
    }

    const { data } = await axios.get(`http://localhost:3003/main/login/?password=${password}&email=${email}`);

    switch (data.status) {
      case 200:
        this.setState({ logged: true });
        return;

      case 400:
        this.setState({ hasError: true, errorMessage: data.message });
        return;
    }
  }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { isEmpty, hasError, errorMessage, logged } = this.state;

    return (
      <div className="container">
        {!!logged && (<Navigate to={'/painel'} />)}
        <div className="login">
          <h1>QueroFrete</h1>
          <p>A tecnologia que conecta!</p>
          <div className="form">
            <input type="email" onChange={(e) => this.handleChangeEmail(e)} />
            <input type="password" onChange={(e) => this.handleChangePassword(e)} />
            <a href="#">
              Esqueci minha senha
            </a>
            {!!isEmpty && (<FlashMessage duration={20} message='O email e a senha precisam ser preenchidos!' type='error' />)}
            {!!hasError && (<FlashMessage duration={20} message={errorMessage} type='error' />)}
            <button onClick={() => this.handleSubmit()}>Entrar</button>
          </div>
          <p>Não possui conta? <a href="#">Clique aqui</a> para criar uma.</p>
        </div>
      </div>
    );
  }

}

export default Login;
