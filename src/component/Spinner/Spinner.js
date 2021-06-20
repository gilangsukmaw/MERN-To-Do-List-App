import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const Spinners = () => {
  return (
    <>
      <hr />
      <div className="spinner">
        <Container>
          <Row className="justify-content-sm-center pt-5">
            <Col xs lg="2">
              <Spinner animation="border" variant="info" />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Spinners;
