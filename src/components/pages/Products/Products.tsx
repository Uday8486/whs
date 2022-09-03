import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Product } from "../../../interfaces";
import { getProducts } from "../../../services/products";
import ProductCard from "./ProductCard";
import Loader from "../../common/Loader/Loader";

const renderProducts = (products: Product[]) =>{
  return (
    <Row xs={1} md={4} className="g-4">
      {products.map(product => (
        <Col key={product.id}>
          <ProductCard  product={product} />
        </Col>
      ))}
    </Row>
  );
}

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const products = await getProducts();
        setProducts(products);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Container className="product-page mt-5">
      <h1>Products</h1>
      {loading && <Loader />}
      {products.length > 0 && renderProducts(products)}
    </Container>
  );
};

export default Products;
