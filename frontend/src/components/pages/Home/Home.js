import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product/Product.js';
import { listProducts } from '../../../actions/productActions.js';
import { logout } from '../../../actions/userActions.js';
import Loading from '../LoadingAndMessage/Loader.js';
import Message from '../LoadingAndMessage/Message.js';
import { useParams } from 'react-router-dom';
import Paginate from '../Paginate/Paginate.js';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav, NavDropdown } from 'react-bootstrap';
import Meta from '../Meta/Meta.js';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

const Home = () => {
  const { keyword, pageNumber } = useParams();
  const pageNumberParam = pageNumber || 1;

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumberParam));
  }, [dispatch, keyword, pageNumberParam]);

  return (
    <>
      <Meta />
      <Row>
        <Col md={3} className="outlined">
          <Row>
            <Nav className="home-contents">
              <p>Você está logado como:</p>
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  className="fa fa-user"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Sair
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fa fa-user fa-lg"></i>Fazer Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Row>
          <Row>
            <Nav className="home-contents">
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Usuários</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Produtos</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Pedidos</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Row>
          <Row>
            <LinkContainer to="/register">
              <Nav.Link>
                <i className="fa fa-user fa-lg"></i>Novo Cadastro
              </Nav.Link>
            </LinkContainer>
          </Row>
          <Row>
            <div className="home-contents">
              <p></p>
              <h4>Aviso</h4>
              <p>
                - Ao realizar o cadastro você estará concordando com os Termos
                de Uso da UNIFESP.
              </p>
              <a href="https://www.unifesp.br/termos-de-uso">
                - Termos de Uso : UNIFESP
              </a>
              <p></p>
            </div>
          </Row>

          <Row></Row>
          <Row>
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fa fa-chair fa-lg"></i>Pedidos
              </Nav.Link>
            </LinkContainer>
          </Row>
        </Col>
        <Col md={9}>
          <h1>Bem-vindo ao SisWeb-CRI </h1>

          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Row className="mb-4">
                {products.map((product) => (
                  <Col
                    key={product._id}
                    sm={10}
                    md={6}
                    lg={4}
                    xl={3}
                    className="mb-2"
                  >
                    <h4>Cadeira de Rodas Disponível</h4>
                    <Product product={product}> </Product>
                  </Col>
                ))}
                <Col>
                  <Container>
                    <div className="home-contents">
                      <h4>Cadastro</h4>
                      <p>
                        - Para acessar o sistema e fazer pedidos é necessário um
                        cadastro.
                      </p>
                      <p>- Clique em "Novo Cadastro".</p>
                      <p>- Preencha todos os campos obrigatórios.</p>
                      <p>- Em seguida acesse o sistema com "Login".</p>
                    </div>
                  </Container>

                  <p></p>
                  <Container>
                    <h4>Pedidos</h4>
                    <div className="home-contents">
                      <p>
                        {' '}
                        Depois de efetuar o login você pode fazer um pedido para
                        cada criança que necessitar de uma cadeira de rodas,
                        onde é necessário que sejam inseridas algumas medidas
                        para personalizar a CRIA de acordo com o tamanho da
                        criança.
                      </p>
                      <p>- Clique na imagem ao lado para iniciar um pedido.</p>
                    </div>
                  </Container>
                </Col>
              </Row>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              ></Paginate>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Home;
