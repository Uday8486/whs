import { Card, Button, ListGroup } from "react-bootstrap";
import { Product } from "../../../interfaces";

import dummyImage from "../../../assets/images/plank.jpeg";
interface Props {
  product: Product;
}
// Adding dummy text for better showcasing the product.
// ListGroup can used for showing some extra data like articke or cost etc.
const ProductCard = ({ product }: Props) => {
  const { name } = product;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={dummyImage} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </Card.Text>
        {product.articles.length > 0 && (
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Required Articles: {product.articles.length}
            </ListGroup.Item>
          </ListGroup>
        )}
        <Button variant="primary">View More</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
