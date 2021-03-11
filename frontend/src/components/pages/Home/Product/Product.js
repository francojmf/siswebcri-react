import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import Rating from '../Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded h-70">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" width="40" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title>
            <strong>
              {product.name} - {product.description}
            </strong>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;

/*
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews}reviews`}
          ></Rating>
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
*/
