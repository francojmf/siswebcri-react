import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveOrderItem } from '../actions/cartActions.js';
import CheckoutSteps from '../components/pages/Checkout/CheckoutSteps.js';

const OrderItemScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { orderItems } = cart;

  const [name, setName] = useState(orderItems.name);
  const [age, setAge] = useState(orderItems.age);
  const [medA, setMedA] = useState(orderItems.medA);
  const [medB, setMedB] = useState(orderItems.medB);
  const [medC, setMedC] = useState(orderItems.medC);
  const [medD, setMedD] = useState(orderItems.medD);
  const [medE, setMedE] = useState(orderItems.medE);
  const [medF, setMedF] = useState(orderItems.medF);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveOrderItem({ name, age, medA, medB, medC, medD, medE, medF }));
    history.push('/placeorder');
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <h1>- Medidas da Criança -</h1>
      <Row>
        <Col md={7}>
          <Row>
            <Col>
              <img src="/Images/medidas2.jpg" alt="pics" width="500" />
              <p> </p>
            </Col>
          </Row>
          <Row className="home-contents">
            <p>- Faça as medidas em cm conforme a imagem acima - </p>
          </Row>
        </Col>
        <Col md={5}>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col>
                <Form.Group controlId="name">
                  <Form.Label>Nome da criança</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Escreva o nome completo da criança"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="age">
                  <Form.Label>Idade</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Digite a idade da criança (anos)"
                    value={age}
                    required
                    onChange={(e) => setAge(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="medA">
                  <Form.Label>Medida A</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Digite a Medida A (cm)"
                    value={medA}
                    required
                    onChange={(e) => setMedA(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="medB">
                  <Form.Label>Medida B</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Digite a Medida B (cm)"
                    value={medB}
                    required
                    onChange={(e) => setMedB(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="medC">
                  <Form.Label>Medida C</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Digite a Medida C (cm)"
                    value={medC}
                    required
                    onChange={(e) => setMedC(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="medD">
                  <Form.Label>Medida D</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Digite a Medida D (cm)"
                    value={medD}
                    required
                    onChange={(e) => setMedD(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="medE">
                  <Form.Label>Medida E</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Digite a Medida E (cm)"
                    value={medE}
                    required
                    onChange={(e) => setMedE(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="medF">
                  <Form.Label>Medida F</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Digite a Medida F (cm)"
                    value={medF}
                    required
                    onChange={(e) => setMedF(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="success">
                  Continuar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default OrderItemScreen;
