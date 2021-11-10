import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

class Bootstrap extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col className="bg1">1 of 2</Col>
            <Col className="bg2">2 of 2</Col>
          </Row>
          <Row>
            <Col>1 of 3</Col>
            <Col>2 of 3</Col>
            <Col>3 of 3</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Bootstrap;
