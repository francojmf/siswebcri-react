import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import FormContainer from '../components/pages/Auth/FormContainer.js';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions.js';
import CheckoutSteps from '../components/pages/Checkout/CheckoutSteps.js';

const ShippingScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [state, setState] = useState(shippingAddress.state);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, postalCode, city, state }));
    history.push('/orderitem');
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Endereço de Envio</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Endereço</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escreva o logradouro, número e complemento"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>CEP</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o CEP do logradouro"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>Cidade</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escreva o nome da cidade"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escreva o nome do estado"
            value={state}
            required
            onChange={(e) => setState(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="success">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
