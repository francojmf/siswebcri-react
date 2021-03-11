import React, { useEffect } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import CheckoutSteps from '../components/pages/Checkout/CheckoutSteps.js';
import Message from '../components/pages/LoadingAndMessage/Message.js';
import { createOrder } from '../actions/orderActions.js';
import { ORDER_CREATE_RESET } from '../constants/orderConstants.js';
import { USER_DETAILS_RESET } from '../constants/userConstants.js';

const PlaceOrderScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history.push('/shipping');
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        entity: cart.entity,
        cpf_cnpj: cart.cpf_cnpj,
        shippingAddress: cart.shippingAddress,
        shippingPrice: cart.shippingPrice,
      })
    );
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Endereço de Entrega</h2>
              <p>
                <strong>Endereço: </strong>
                {cart.shippingAddress.address},{cart.shippingAddress.postalCode}
                ,{cart.shippingAddress.city},{cart.shippingAddress.state}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Entidade cadastrada</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Não há itens no Pedido</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={6}>
                          <Link to={`/product/${item.product}`}>
                            Entidade: {item.entity}
                          </Link>
                        </Col>
                        <Col md={6}>CPF/CNPJ: {item.cpf_cnpj}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Item do Pedido</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Não há itens no Pedido</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>Quantidade: {item.qty}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Resumo do Pedido</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Nome da Criança: </Col>
                  <Col>{cart.orderItems.name}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Idade: </Col>
                  <Col>{cart.orderItems.age} anos</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="submit"
                  className="btn-block"
                  variant="success"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Confirmar Pedido
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
