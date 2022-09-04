import { find } from "lodash";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import dummyImage from "../../../assets/images/plank.jpeg";
import { Article, Product } from "../../../interfaces";
import { getArticles } from "../../../services/article";
import { getProductDetails } from "../../../services/products";
import Loader from "../../common/Loader/Loader";

type ProductArticleDetails = Article & { amountRequired: number };
type ProductWithArticleDetails = Pick<Product, "name" | "id"> & {
  articles: ProductArticleDetails[];
};

const ProductDetail = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [productWithArticleDetails, SetProductWithArticleDetails] =
    useState<ProductWithArticleDetails>();

  const [error, setError] = useState(false);

  if (!productId) {
    setError(true);
  }
  const refreshPage = () => {
    window.location.reload();
  };
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const [product, articles] = await Promise.all([
          getProductDetails(productId!),
          getArticles(),
        ]);
        const productArticles: ProductArticleDetails[] = [];

        // TODO: create a helper function to merge these objects.
        // normally it should be coming from BE.
        if (product && articles) {
          for (const productArticle of product.articles) {
            let amountInStock = 0;
            let name = "";
            const productArticleDetail = find(
              articles,
              (mainArticle) => mainArticle.id === productArticle.id
            );
            if (productArticleDetail) {
              amountInStock = productArticleDetail.amountInStock;
              name = productArticleDetail.name;
            }
            productArticles.push({
              ...productArticle,
              amountInStock,
              name,
            });
          }
        }
        if (productArticles) {
          SetProductWithArticleDetails({
            ...product,
            articles: productArticles,
          });
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (productId) {
    return (
      <Container className="product-page mt-5">
        <h1>Products Details</h1>
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
        {!error && productWithArticleDetails && (
          <Row>
            <Col md={4}>
              <Image
                fluid
                src={dummyImage}
                alt={productWithArticleDetails.name}
              />
            </Col>
            <Col md={8}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {productWithArticleDetails.name}
                    {productId}
                  </Card.Title>
                  <Card.Text>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English.
                  </Card.Text>
                  <Card.Subtitle>Required Articles</Card.Subtitle>
                  <Row>
                    <Col>Article</Col>
                    <Col>Quantity required</Col>
                  </Row>
                  {productWithArticleDetails.articles.length > 0 &&
                    productWithArticleDetails.articles.map((article) => (
                      <Row key={article.id}>
                        <Col>{article.name}</Col>
                        <Col>{article.amountRequired}</Col>
                      </Row>
                    ))}
                  <Button variant="primary">Buy Now</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    );
  } else {
    return (
      <h1>
        Something went wrong when trying to get product details {productId}
      </h1>
    );
  }
};

export default ProductDetail;
