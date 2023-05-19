import { CardGroup, Image, Card, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function CardListS(props) {
  const imgName = props.showImg;
  return (
    <>
      {imgName.map((v, i) => {
        let product_id = v;
        return (
          <Col
            key={i}
            className={`text-white`}
            style={{
              border: '0px solid #000',
            }}
          >
            <Link className={``} to={`/products/product_detail/${product_id}`}>
              <Image
                fluid
                src={require(`../../../Img/ProductsTest/coffee_${product_id}/coffee_${product_id}-1.png`)}
                alt="Card image"
                style={
                  {
                    // height: props.cardHeight,
                    // objectFit: 'contain',
                  }
                }
                className={`rounded-5`}
              />
            </Link>
          </Col>
        );
      })}
    </>
  );
}

export default CardListS;
