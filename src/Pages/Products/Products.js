import React from 'react';
import List from './List';
import ProductFilter from './ProductFilter';
import './Products.scss';
import { Button, Form, InputGroup, Col, Row, Container } from 'react-bootstrap';

const Products = () => {
  return (
    <Container fluid>
      <Row className="justify-content-evenly">
        <Col className="w-100">
          <List />
        </Col>
      </Row>
      <ProductFilter />
    </Container>
  );
};

export default Products;
