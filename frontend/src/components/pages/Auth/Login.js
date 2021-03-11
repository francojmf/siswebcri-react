import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { login } from '../../../actions/userActions';

import Message from '../LoadingAndMessage/Message.js';
import Loading from '../LoadingAndMessage/Loader.js';
import FormContainer from './FormContainer.js';

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //Dispatch login

    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <h1>LOGIN</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loading></Loading>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="emails">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Escreva seu endereço de email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="success">
          Entrar
        </Button>
      </Form>

      <Row>
        <Col>
          Não Cadastrado?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Novo Cadastro
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
