import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer-user">
      <Container>
        <Row>
          <Col className="text-center py-3 ">
            copyright &copy; {new Date().getFullYear()} UNIFESP by Franco JM{' '}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
