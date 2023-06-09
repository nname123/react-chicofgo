import style from './ThisCard.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { FaShoppingCart, FaBookmark } from 'react-icons/fa';
import {
  Card,
  Row,
  Col,
  Button,
  Container,
  Modal,
  Placeholder,
  Spinner,
} from 'react-bootstrap';
// import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { productList } from '../../Config/ProductConfig';
import { useShoppingCart } from '../../Contexts/ShoppingCartProvider';

function ThisCard(props) {
  const { isLoggedIn, setIsLoggedIn, setUsername, setUserid, setUserRank } =
    useAuth();
  const { cartList, setCartList, collectList, setCollectList } =
    useShoppingCart();

  const { product_id, goToUrl } = props;
  const redirectTo = goToUrl || '';
  const [backendData, setBackendData] = useState([]);
  const [title, setTitle] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [showMsg, setShowMsg] = useState('');
  const handleClose = () => setIsShow(false);
  const [isShowC, setIsShowC] = useState(false);
  const [showMsgC, setShowMsgC] = useState('');
  const [askDelectShowC, setAskDelectShowC] = useState(false);
  const [showTF, setShowTF] = useState(false);
  const [showTFMsg, setShowTFMsg] = useState({ title: '', msg: '' });
  const handleCloseC = () => setIsShowC(false);
  const handleCloseTF = () => setShowTF(false);
  const navigate = useNavigate();

  useEffect(() => {
    const response = productList.find((item) => item.product_id === product_id);
    if (response && response.name.length > 10) {
      let chunkSize = 10;
      let inputString = response.name;
      let title = [];
      for (let i = 0; i < inputString.length; i += chunkSize) {
        const chunk = inputString.substring(i, i + chunkSize);
        title.push(chunk);
      }

      if (title.length > 2) {
        title[2] += '...';
        title.length = 3;
      } else if (title.length === 2) {
        title[2] = '...';
      }
      setTitle(title);
      setBackendData({ ...response, rating: parseInt(response.rating) });
    }
  }, []);

  // 登入
  function handleLogIn() {
    setIsLoggedIn(true);
    setUserid('12345');
    setUsername('王大明');
    setUserRank('1');
    handleCloseC();
  }

  //加入購物車
  function sendCart() {
    if (isLoggedIn) {
      let newShoppingCartId = 1;
      if (Array.isArray(cartList) && cartList.length > 0) {
        const isProductExist = cartList.some(
          (item) => item.product_id === backendData.product_id
        );
        if (isProductExist) {
          setShowMsg('已加入過購物車囉，看看其他商品吧');
          setIsShow(true);
          return;
        }
        newShoppingCartId = cartList[cartList.length - 1].shoppingcart_id + 1;
      }

      // 處理規格
      let string = backendData.detail;
      let descSubstring = string.substring(
        string.indexOf('：') + 1,
        string.indexOf('<br>')
      );
      if (descSubstring.length <= 0) {
        descSubstring = string.substring(0, string.indexOf('<br>'));
      }

      const newItem = {
        shoppingcart_id: newShoppingCartId,
        // 其他屬性設定
        product_id: backendData.product_id,
        brandname: backendData.brand,
        title: backendData.name,
        desc: descSubstring,
        quantity: 1,
        price: backendData.price,
        checked: false,
      };
      setCartList((prevCartList) => [...prevCartList, newItem]);
      setShowMsg('成功加入購物車');
      setIsShow(true);
    } else {
      setIsShow(true);
    }
    // console.log('通過', cartList);
  }
  //加入收藏
  function sendCollect() {
    if (isLoggedIn) {
      if (Array.isArray(collectList) && collectList.length > 0) {
        const isCollectExist = collectList.includes(backendData.product_id);
        if (isCollectExist) {
          setShowMsgC('已加入過收藏囉，看看其他商品吧');
          setIsShowC(true);
          setAskDelectShowC(true);
          return;
        }
      }

      setCollectList((prev) => [...prev, backendData.product_id]);
      setAskDelectShowC(false);
      setIsShowC(true);
      setShowMsgC('成功加入收藏');
      // console.log('collectList', collectList);
    } else {
      setIsShowC(true);
    }
  }
  // 刪除收藏
  function handleDeleteCollect() {
    if (isLoggedIn) {
      if (Array.isArray(collectList) && collectList.length > 0) {
        const isCollectExist = collectList.includes(backendData.product_id);
        if (isCollectExist) {
          setCollectList((prev) =>
            prev.filter((i) => i !== backendData.product_id)
          );

          setIsShowC(false);
          console.log('刪除成功');
          setShowTF(true);
          // 重整頁面
          if (redirectTo) {
            setShowTFMsg({ title: '刪除結果', msg: '刪除成功,1秒後跳轉' });
            const timeoutId = setTimeout(() => {
              navigate(redirectTo);
            }, 1000);
          } else {
            setShowTFMsg({ title: '刪除結果', msg: '刪除成功' });
          }
        }
      } else {
        console.log('刪除失敗');
        setShowTFMsg({ title: '刪除失敗', msg: '商品不在你的收藏' });
        setShowTF(true);
      }
    } else {
      setIsShowC(true);
    }
    // console.log('collectList', collectList);
  }
  return (
    <Card className={`${style.thisCard} m-0 mx-auto`}>
      <Link
        className={`${style.LinkHover} text-decoration-none chicofgo_dark_font chicofgo-font`}
        to={`/products/product_detail/${product_id}`}
      >
        {product_id ? (
          <Card.Img
            variant="top"
            src={
              product_id <= 50
                ? require(`../../Img/ProductsTest/coffee_${product_id}/coffee_${product_id}-1.png`)
                : ''
            }
          />
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '150px' }}
          >
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="dark" />
          </div>
        )}

        <Card.Body className={`text-center  p-0 ${style.textOverFlowBody}`}>
          {title[0] ? (
            <Card.Text className={`text-center`}>
              {title[0] || ''}
              <br />
              {title[1] || ''}
              <br />
              {title[2] || ''}
            </Card.Text>
          ) : (
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={3} />{' '}
              <Placeholder xs={4} /> <Placeholder xs={6} />{' '}
              <Placeholder xs={8} />
            </Placeholder>
          )}
        </Card.Body>
        <Card.Body className={`text-center py-1`}>
          {new Array(backendData.rating).fill().map((star) => {
            return <span key={uuidv4()}>⭐</span>;
          })}
        </Card.Body>
      </Link>
      <Card.Footer className={` fs-4 py-1`}>
        <Row className={`justify-content-between text-center`}>
          <Col className={`col-6`}>
            <span className={`chicofgo-font-700 text-nowrap`}>
              ${backendData.price}
            </span>
          </Col>
          <Col className={`col-3`}>
            <div className={`${style.useFinger}`} onClick={sendCollect}>
              <span className={`chicofgo_brown_font`}>
                <FaBookmark />
              </span>
            </div>
          </Col>
          <Col className={`col-3`}>
            <div className={`${style.useFinger}`} onClick={sendCart}>
              <span className={`chicofgo_brown_font`}>
                <FaShoppingCart />
              </span>
            </div>
          </Col>
        </Row>
      </Card.Footer>
      {/* 彈出視窗-加入購物車 */}
      <Modal show={isShow} onHide={handleClose} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title className={`fs-5 mx-1`}>加入購物車</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`mx-1`}>
          {isLoggedIn ? showMsg : '尚未登入,請登入後開始購物!'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-chicofgo-brown" onClick={handleClose}>
            關閉
          </Button>
          {isLoggedIn ? (
            ''
          ) : (
            <Button
              as={Link}
              // to="/login"
              onClick={handleLogIn}
              variant="outline-chicofgo-green"
            >
              立即登入
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      {/* 彈出視窗-加入收藏 */}
      <Modal show={isShowC} onHide={handleCloseC} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title className={`fs-5 mx-1`}>加入收藏</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`mx-1`}>
          {isLoggedIn ? showMsgC : '尚未登入,請登入後開始收藏!'}
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row className={`justify-content-between`}>
              {askDelectShowC && isLoggedIn ? (
                <Col className={`p-0 col-auto`}>
                  <Button variant="danger" onClick={handleDeleteCollect}>
                    刪除收藏
                  </Button>
                </Col>
              ) : (
                ''
              )}
              <Col></Col>

              <Col className={`p-0 col-auto`}>
                <Button variant="outline-chicofgo-brown" onClick={handleCloseC}>
                  關閉
                </Button>
              </Col>

              {isLoggedIn ? (
                ''
              ) : (
                <Col className={`pe-0 col-auto`}>
                  <Button
                    as={Link}
                    // to="/login"
                    onClick={handleLogIn}
                    variant="outline-chicofgo-green"
                  >
                    前往登入
                  </Button>
                </Col>
              )}
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
      {/* 彈出視窗-提示訊息 */}
      <Modal show={showTF} onHide={handleCloseTF} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title className={`fs-5 mx-1`}>{showTFMsg.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`mx-1`}>{showTFMsg.msg}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-chicofgo-brown" onClick={handleCloseTF}>
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default ThisCard;
