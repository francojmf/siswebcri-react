import React, { useEffect, useState } from 'react';
import Message from '../components/pages/LoadingAndMessage/Message.js';

import { addToCart, removeFromCart } from '../actions/cartActions.js';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  Container,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';

const CartScreen = () => {
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const productId = id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const orderItem = cart;
  const [entity, setEntity] = useState(orderItem.entity);
  const [cpf_cnpj, setCpfCnpj] = useState(orderItem.cpf_cnpj);

  const { cartItems } = cart;
  /*  console.log(cartItems) */
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, entity, cpf_cnpj));
    }
  }, [dispatch, productId, qty, entity, cpf_cnpj]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    // console.log('checkout');
    history.push('/login?redirect=shipping');
  };
  return (
    <Row>
      <Col md={8} sm={6}>
        <h1 className="text-center mb-5">Tela de Pedido</h1>
        {cartItems.length === 0 ? (
          <Message>
            Não há pedidos<Link to="/"> Voltar</Link>{' '}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.qty}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.qty).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
                <Container className="home-contents">
                  <h3>Informação importante:</h3>
                  <Row>
                    <p>
                      - Por favor informe a Entidade que apoia a criança e o
                      CNPJ ou CPF do responsável
                    </p>
                  </Row>
                </Container>
              </ListGroup>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} sm={6}>
        <Card>
          {cartItems.map((item) => (
            <ListGroup key={item.product}>
              <Form.Group controlId="entity">
                <Form.Label>Entidade</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Escreva o nome da entidade"
                  value={entity}
                  onChange={(e) => setEntity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="cpf_cnpj">
                <Form.Label>CPF ou CNPJ</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Digite um CPF ou CNPJ"
                  value={cpf_cnpj}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </ListGroup>
          ))}
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                {' '}
                <span className="text-success">Subtotal Items:</span>{' '}
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}{' '}
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button "
                className="btn-block"
                variant="success"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Continuar Pedido
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
