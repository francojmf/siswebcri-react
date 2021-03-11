import React, { useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../LoadingAndMessage/Message.js';
import Loading from '../../LoadingAndMessage/Loader.js';
import Meta from '../../Meta/Meta.js';
import { saveOrderItem } from '../../../../actions/cartActions.js';

const ProductDetails = () => {
  const { id } = useParams();

  const [entity, setEntity] = useState('');
  const [cpf_cnpj, setCpfCnpj] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  //  const userLogin = useSelector((state) => state.userLogin);
  //  const { userInfo } = userLogin;

  const history = useHistory();
  const addToCardHandler = () => {
    history.push(`/cart/${id}?qty=${1}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveOrderItem({ entity, cpf_cnpj }));
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Voltar
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={4}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                style={{ width: '25em' }}
              />
            </Col>
            <Col md={4} className="home-contents">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h6>Descrição:</h6> {product.description}
                </ListGroup.Item>
              </ListGroup>
              <p>
                Para continuar com o pedido você precisa informar a entidade a
                qual pertence e o CNPJ desta ou o CPF do responsável.
              </p>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="entity">
                          <Form.Label>Entidade</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Digite o nome da Entidade"
                            value={entity}
                            required
                            onChange={(e) => setEntity(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="city">
                          <Form.Label>CPF ou CNPJ</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Digite o CPF ou CNPJ"
                            value={cpf_cnpj}
                            required
                            onChange={(e) => setCpfCnpj(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                          Continue
                        </Button>
                      </Form>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tipo:</Col>
                      <Col>
                        <strong>{product.name}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0
                          ? 'Disponível'
                          : 'Não Disponível'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantidade:</Col>
                        <Col>
                          <strong>1</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCardHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Adicionar Pedido
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetails;

/*
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    //    loading: loadingProductReview,
    //    error: errorProductReview,
  } = productReviewCreate;
  //console.log(productDetails);

  useEffect(() => {
    if (successProductReview) {
 alert('successfully review Submitted');
      setRating(0);
      setComment('');
    }
    if (!product._id || product._id !== id) {
      dispatch(listProductDetails(`${id}`));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, id, successProductReview]);
  //   }, [dispatch, id, successProductReview]);


                      <Row>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
*/
