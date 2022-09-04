import { Card, Button, ListGroup } from "react-bootstrap";
import { Product } from "../../../interfaces";
import dummyImage from "../../../assets/images/plank.jpeg";
interface Props {
  product: Product;
  clickHandler: (id:string)=>void;
}
// Adding dummy text for better showcasing the product.
// ListGroup can used for showing some extra data like articke or cost etc.
const ProductCard = ({ product, clickHandler }: Props) => {
  const { name, id } = product;
  return (
    <Card>
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
              <strong>Required Articles:</strong> {product.articles.length}
            </ListGroup.Item>
          </ListGroup>
        )} 
          <Button variant="primary" onClick={()=> clickHandler(id)}>
            View More
          </Button> 
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
