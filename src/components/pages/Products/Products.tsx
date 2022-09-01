import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Products = () => {
  return (
    <Container>
      <Row>
        <Col>I am in Product Page {process.env.REACT_APP_API_ENDPOINT}</Col>
      </Row>
    </Container>
  );
};

export default Products;
