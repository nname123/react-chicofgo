import { Row, Col, Button, Form, Image, Table, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../Contexts/AuthContext';
// import axios from 'axios';
import { BsCaretRightSquareFill, BsCaretLeftSquareFill } from 'react-icons/bs';
import { FaWindowClose } from 'react-icons/fa';
import style from './ShoppingItem.module.scss';
import { useShoppingCart } from '../../../../Contexts/ShoppingCartProvider';

const ShoppingItem = ({
  id,
  brandname,
  title,
  desc,
  quantity,
  price,
  checked,
  onCheckboxChange,
  onQuantityChange,
  cartId,
  onDeleteClick,
}) => {
  // 加入收藏
  const { isLoggedIn, userid } = useAuth();
  const { collectList, setCollectList } = useShoppingCart();
  const [isShowCollect, setIsShowCollect] = useState(false);
  const [showMsgCollect, setShowMsgCollect] = useState('');
  const handleCloseCollect = () => setIsShowCollect(false);
  function sendCollect() {
    // console.log(id)
    // try {
    //   let response = await axios.post(
    //     'http://localhost:3001/api/members/sendUserCollect',
    //     {
    //       product_id: id,
    //       member_id: userid,
    //       // cartPrice: backendData.price,
    //       // cartQuantity: 1,
    //     }
    //   );
    //   if (response.data.result === 'ok') {
    //     setIsShowCollect(true);
    //     setShowMsgCollect('成功加入收藏');
    //   } else if (response.data.result === 'been added') {
    //     setIsShowCollect(true);
    //     setShowMsgCollect('已加入過收藏囉，看看其他商品吧');
    //   } else {
    //     setIsShowCollect(true);
    //     setShowMsgCollect('加入失敗');
    //   }
    //   console.log(response.data);
    // } catch (e) {
    //   console.log(e);
    // }
    if (isLoggedIn) {
      if (Array.isArray(collectList) && collectList.length > 0) {
        const isProductExist = collectList.includes(id);
        if (isProductExist) {
          setShowMsgCollect('已加入過收藏囉，看看其他商品吧');
          setIsShowCollect(true);
          return;
        }
      }
      setCollectList((prev) => [...prev, id]);
      setShowMsgCollect('成功加入收藏');
      setIsShowCollect(true);
    }
  }

  return (
    <>
      <Row className={`px-1 px-md-4`} key={id}>
        <Col
          className={`col-1 d-flex justify-content-center align-items-center`}
        >
          <Form.Group className={``}>
            <Form.Check
              type="checkbox"
              // id={id}
              // label=""
              onChange={onCheckboxChange}
              checked={checked}
              controlId="formBasicCheckbox"
            />
          </Form.Group>
        </Col>
        <Col className={`col-11 chicofgo_gray pb-4 mb-4 rounded-3 shadow`}>
          <Row>
            <Col className={`text-end p-0 `}>
              <Button
                variant=""
                value={cartId}
                className={` chicofgo_brown_font m-0 pb-0`}
                onClick={onDeleteClick}
              >
                <h3 className={`p-0 chicofgo_brown_font`}>
                  <FaWindowClose />
                </h3>
              </Button>
            </Col>
          </Row>
          <Row className={`justify-content-center `}>
            <Col
              className={`${style.brandArea} col-2 px-0 align-self-start text-center d-none d-md-block `}
            >
              <Image
                // src={`http://localhost:3001/api/images/productImg/coffee_${id}/coffee_${id}-1.png`}
                src={require(`../../../../Img/ProductsTest/coffee_${id}/coffee_${id}-1.png`)}
                className={`${style.productPic} `}
              />
              <h2 className={`${style.brandname} m-2 chicofgo-font-700`}>
                {brandname}
              </h2>
              <Row className={`justify-content-center text-nowrap `}>
                <Col className={`col-12 col-xxl-6 `}>
                  <Button
                    variant="chicofgo-green"
                    className={`mt-2 chicofgo_white_font ${style.link}`}
                    as={Link}
                    to={`/products/product_detail/${id}`}
                  >
                    商品細節
                  </Button>
                </Col>
                <Col className={`col-12 col-xxl-6 ps-xxl-1`}>
                  <Button
                    variant="chicofgo-brown"
                    className={`mt-2 chicofgo_white_font `}
                    onClick={sendCollect}
                  >
                    加入收藏
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col className={`col-12 col-md-9`}>
              <Table
                hover
                variant=""
                className={`${style.tableText} p-0 m-0 border-chicofgo-white`}
              >
                <thead>
                  <tr>
                    <th colspan="4">
                      <h3>{title}</h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>規格:</th>
                    <td>{desc}</td>
                    {/* <th>粉絲:</th>
                            <td>{props.fans}</td> */}
                  </tr>
                  <tr className={`align-middle `}>
                    <th>數量:</th>
                    <td>
                      <Button
                        variant=""
                        className={` chicofgo_brown_font m-0 py-0`}
                        onClick={() => onQuantityChange(-1)}
                      >
                        <h3 className={`p-0 chicofgo_brown_font`}>
                          <BsCaretLeftSquareFill />
                        </h3>
                      </Button>
                      {quantity}
                      <Button
                        variant=""
                        className={` chicofgo_brown_font m-0 py-0`}
                        onClick={() => onQuantityChange(1)}
                      >
                        <h3 className={`p-0 chicofgo_brown_font`}>
                          <BsCaretRightSquareFill />
                        </h3>
                      </Button>
                      件
                    </td>
                  </tr>
                  <tr>
                    <th>單價:</th>
                    <td>${price}</td>
                  </tr>
                  <tr className={`${style.totalPrice} text-end`}>
                    <th colspan="4">
                      商品小計:<span>${quantity * price}</span>
                    </th>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* 加入收藏通知 */}
      <Modal
        show={isShowCollect}
        onHide={handleCloseCollect}
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title className={`fs-5 mx-1`}>加入收藏</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`mx-1`}>{showMsgCollect}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-chicofgo-brown" onClick={handleCloseCollect}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ShoppingItem;
