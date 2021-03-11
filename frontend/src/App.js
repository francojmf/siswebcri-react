import Footer from './components/pages/Home/Footer/Footer.js';
import Header from './components/pages/Home/Header/Header.js';
import { Container } from 'react-bootstrap';
import Home from './components/pages/Home/Home.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductDetails from './components/pages/Home/Product/ProductDetails.js';

import Login from './components/pages/Auth/Login.js';
import Register from './components/pages/Auth/Register.js';
import ProfileScreen from './screens/ProfileScreen.js';
import CartScreen from './screens/CartScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import UserListScreen from './screens/UserListScreen.js';
import UserEditScreen from './screens/UserEditScreen.js';
import ProductListScreen from './screens/ProductListScreen.js';
import ProductEditScreen from './screens/ProductEditScreen.js';
import OrderListScreen from './screens/OrderListScreen.js';
import OrderItemScreen from './screens/OrderItemScreen.js';

const App = () => {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <Container>
          <Route path="/shipping">
            <ShippingScreen></ShippingScreen>
          </Route>
          <Route path="/orderitem">
            <OrderItemScreen></OrderItemScreen>
          </Route>
          <Route path="/placeorder">
            <PlaceOrderScreen></PlaceOrderScreen>
          </Route>
          <Route path="/order/:id">
            <OrderScreen></OrderScreen>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/register">
            <Register></Register>
          </Route>
          <Route path="/profile">
            <ProfileScreen></ProfileScreen>
          </Route>
          <Route path="/product/:id">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="/cart/:id?">
            <CartScreen></CartScreen>
          </Route>
          <Route path="/admin/userlist">
            <UserListScreen></UserListScreen>
          </Route>
          <Route path="/admin/user/:id/edit">
            <UserEditScreen></UserEditScreen>
          </Route>
          <Route exact path="/admin/productlist">
            <ProductListScreen />
          </Route>
          <Route exact path="/admin/productlist/:pageNumber">
            <ProductListScreen />
          </Route>
          <Route path="/admin/product/:id/edit">
            <ProductEditScreen></ProductEditScreen>
          </Route>
          <Route path="/admin/orderlist">
            <OrderListScreen></OrderListScreen>
          </Route>
          <Route exact path="/home">
            <Home></Home>
          </Route>
          <Route path="/page/:pageNumber" exact>
            <Home />
          </Route>
          <Route path="/search/:keyword/page/:pageNumber">
            <Home />
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
};

export default App;
