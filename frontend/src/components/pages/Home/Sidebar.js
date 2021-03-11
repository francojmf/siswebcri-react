import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product/Product.js';
import { listProducts } from '../../../actions/productActions.js';
import Loading from '../LoadingAndMessage/Loader.js';
import Message from '../LoadingAndMessage/Message.js';
import { useParams } from 'react-router-dom';
import Paginate from '../Paginate/Paginate.js';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Nav } from 'react-bootstrap';
import Meta from '../Meta/Meta.js';
import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
//import '../../../../node_modules/font-awesome/less/font-awesome.less';
//import { Icon } from 'sitb-react-icon';
//import { render } from 'react-dom';

//const node = <Icon faStyle="gg" />;
//render(node);

const Home = () => {
  const { keyword, pageNumber } = useParams();
  const pageNumberParam = pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumberParam));
  }, [dispatch, keyword, pageNumberParam]);

  return (
    <>
      <Meta />
      <Row>
        <Col md={3}>
          <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/management/members"
            onSelect={({ itemId }) => {
              // maybe push to the route
            }}
            items={[
              {
                title: 'Pedidos',
                itemId: [<LinkContainer to="/cart"></LinkContainer>],
              },
              {
                title: 'Management',
                itemId: '/management',
                //elemBefore: () => <Icon name="users" />,
                subNav: [
                  {
                    title: 'Projects',
                    itemId: '/management/projects',
                  },
                  {
                    title: 'Members',
                    itemId: '/management/members',
                  },
                ],
              },
              {
                title: 'Another Item',
                itemId: '/another',
                subNav: [
                  {
                    title: 'Teams',
                    itemId: '/management/teams',
                  },
                ],
              },
            ]}
          />

          <Row>
            <div className="home-contents">
              <p></p>
              <h4>Aviso</h4>
              <p>
                - Ao realizar o cadastro você estará concordando com os Termos
                de Uso da UNIFESP.
              </p>
              <a href="https://www.unifesp.br/termos-de-uso">
                Termos de Uso - UNIFESP
              </a>
              <p></p>
            </div>
          </Row>
          <Row>
            <LinkContainer to="/register">
              <Nav.Link>
                <i className="fa fa-user fa-lg"></i>Novo Cadastro
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>
                <i className="fa fa-user fa-lg"></i>Login
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
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className="mb-2"
                  >
                    <h4>Cadeira de Rodas Disponível</h4>
                    <Product product={product}></Product>
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
