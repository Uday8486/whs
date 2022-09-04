import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../../../interfaces";
import { getProducts } from "../../../services/products";
import ProductCard from "./ProductCard";
import Loader from "../../common/Loader/Loader";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const refreshPage = () => {
    window.location.reload();
  };


  const handleClick = (productId: string) => {
    navigate(`/products/details/${productId}`);
  }

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const products = await getProducts();
        setProducts(products);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    })();
  }, []);

  return (
    <Container className="product-page mt-5">
      <h1>Products</h1>
      {loading && <Loader />}
      {error && (
        <div className="alert">
          Something went wrong, click{" "}
          <Button variant="secondary" size="sm" onClick={refreshPage}>
            here
          </Button>{" "}
          to refresh.
        </div>
      )}
      {!error && products.length > 0 && (
        <Row>
          {products.map((product) => (
            <Col className="mt-5" xs={12} md={6} key={product.id}>
              <ProductCard product={product} clickHandler={handleClick} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Products;
