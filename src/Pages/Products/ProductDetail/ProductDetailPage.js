import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Path from '../../../Layout/Item/Path/Path';
import { BsFillReplyFill } from 'react-icons/bs';
import ShowPic from './Component/ShowPic';
// import axios from 'axios';
import { useAuth } from '../../../Contexts/AuthContext';
import { useShoppingCart } from '../../../Contexts/ShoppingCartProvider';
import {
  Image,
  Row,
  Col,
  Button,
  Container,
  Modal,
  InputGroup,
  Form,
  Spinner,
} from 'react-bootstrap';
import style from './ProductDetail.module.scss';
import {
  BsFillBellFill,
  BsSuitHeartFill,
  BsFillPersonFill,
  BsFillCartFill,
} from 'react-icons/bs';
import MoreCard from '../../ComponentShare/MoreCard';
import { productList } from '../../../Config/ProductConfig';

const ProductDetail = () => {
  const {
    isLoggedIn,
    userid,
    setIsLoggedIn,
    setUsername,
    setUserid,
    setUserRank,
  } = useAuth();
  const { cartList, setCartList, collectList, setCollectList } =
    useShoppingCart();

  const [backendData, setBackendData] = useState([]);
  const [backendReview, setBackendReview] = useState([]);
  const [productAmount, setProductAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
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

  const location = useLocation();
  const urlArray = location.pathname.split('/');
  const product_id = parseInt(urlArray[urlArray.length - 1]);

  useEffect(() => {
    //存入看過的產品
    const existingData =
      JSON.parse(localStorage.getItem('productsViewed')) || [];
    const currentUserId = userid;

    const currentUserDataIndex = existingData.findIndex(
      (item) => item.userId === currentUserId
    );

    if (currentUserDataIndex === -1) {
      localStorage.removeItem('productsViewed');
      if (product_id) {
        localStorage.setItem(
          'productsViewed',
          JSON.stringify([
            { userId: currentUserId, productsViewed: [product_id] },
          ])
        );
      } else {
        localStorage.setItem(
          'productsViewed',
          JSON.stringify([{ userId: currentUserId, productsViewed: [] }])
        );
      }
    } else {
      const currentUserData = existingData[currentUserDataIndex];

      const isExisting = currentUserData.productsViewed.includes(product_id);
      if (!isExisting && product_id != null) {
        if (currentUserData.productsViewed.length >= 10) {
          currentUserData.productsViewed.shift();
        }
        currentUserData.productsViewed.push(product_id);
      }
      existingData[currentUserDataIndex] = currentUserData;
      localStorage.setItem('productsViewed', JSON.stringify(existingData));
    }
    // 撈商品資料
    getProductData();
    // 撈評論資料
    // getProductReview();
  }, []);

  // 0.5秒後自動關掉spinner
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  }, [isLoading]);

  // 網址改就更新資料
  useEffect(() => {
    setIsLoading(true);
    getProductData();
    // getProductReview();
  }, [location]);

  // 星星製造機
  function Rating({ value }) {
    const rating = Array.from({ length: value }, (_, index) => (
      <span key={index}>⭐</span>
    ));
    return <>{rating}</>;
  }
  // 數量輸入框偵測
  function handleChange(event) {
    const newValue = event.target.value;
    const regex = /^[0-9\b]+$/;
    if (
      regex.test(newValue) &&
      parseInt(newValue) > 0 &&
      parseInt(newValue) < 1000
    ) {
      setProductAmount(parseInt(newValue));
    } else {
      setProductAmount(parseInt(productAmount));
    }
  }

  // 撈商品資料
  function getProductData() {
    const response = productList.find((item) => item.product_id === product_id);
    setBackendData(response);
  }
  // 撈評論資料
  // function getProductReview() {
  // try {
  //   let response = await axios.get(
  //     `http://localhost:3001/api/products/productReview/${product_id}`
  //   );
  //   // console.log(response.data.productReview);
  //   setBackendReview(response.data.productReview);
  // } catch (e) {
  //   if (e.response.status === 400) {
  //     console.log('無資料');
  //   }
  // }
  // }

  //加入購物車
  function sendCart() {
    if (isLoggedIn) {
      let newShoppingCartId = 1;
      if (Array.isArray(cartList) && cartList.length > 0) {
        const isProductExist = cartList.some(
          (item) => item.product_id === product_id
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
        quantity: productAmount,
        price: backendData.price,
        checked: false,
      };
      setCartList((prevCartList) => [...prevCartList, newItem]);
      setShowMsg('成功加入購物車');
      setIsShow(true);
    } else {
      setIsShow(true);
    }
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
          setShowTFMsg({ title: '刪除結果', msg: '刪除成功' });
          setShowTF(true);
        }
      } else {
        console.log('刪除失敗');
        setShowTFMsg({ title: '刪除失敗', msg: '商品不在你的收藏' });
        setShowTF(true);
      }
    } else {
      setIsShowC(true);
    }
  }

  // 登入
  function handleLogIn() {
    setIsLoggedIn(true);
    setUserid('12345');
    setUsername('王大明');
    setUserRank('1');
    handleClose();
    handleCloseC();
  }

  return (
    <>
      <Container>
        <Row className={`justify-content-center`}>
          <Col className="col-10 mb-5">
            <Row className={`justify-content-between`}>
              <Col className={`col-auto`}>
                {isLoading ? (
                  <div
                    className="d-flex justify-content-center text-center fs-6"
                    style={{ marginTop: '70px' }}
                  >
                    <Spinner size="sm" animation="grow" variant="secondary" />
                    &nbsp;
                    <Spinner size="sm" animation="grow" variant="secondary" />
                    &nbsp;
                    <Spinner size="sm" animation="grow" variant="secondary" />
                    &nbsp;
                    <Spinner size="sm" animation="grow" variant="secondary" />
                    &nbsp;
                    <Spinner size="sm" animation="grow" variant="secondary" />
                  </div>
                ) : (
                  <Path
                    pathObj={{
                      path: [
                        '商品列表',
                        `${
                          backendData.name
                            ? backendData.name.length < 40
                              ? backendData.name
                              : backendData.name.substr(0, 40) + '...'
                            : ''
                        }`,
                      ],
                    }}
                    url={['/products']}
                  />
                )}
              </Col>
              <Col className={`col-auto align-self-end`}>
                <Button
                  variant="chicofgo-brown"
                  className={`d-flex align-items-center chicofgo_white_font`}
                  as={Link}
                  to="/products"
                >
                  <BsFillReplyFill />
                  回商品列表
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row className={`chicofgo_gray p-4 mt-2 rounded-4 shadow`}>
                  <Col className={`col-6`}>
                    <div
                      style={{ position: 'sticky', top: '100px' }}
                      className={`mb-2`}
                    >
                      {isLoading ? (
                        <div
                          className="d-flex justify-content-center align-items-center rounded-4"
                          style={{
                            height: '530px',
                            backgroundColor: 'rgb(254,254,254)',
                          }}
                        >
                          <Spinner animation="border" variant="secondary" />
                        </div>
                      ) : (
                        <ShowPic product_id={product_id} />
                      )}
                    </div>
                  </Col>
                  <Col className={`${style.textArea} col-6 chicofgo-font px-4`}>
                    {isLoading ? (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: '530px' }}
                      >
                        <Spinner animation="border" variant="secondary" />
                      </div>
                    ) : (
                      <>
                        <Row>
                          <h3 className={`chicofgo-font-700 `}>
                            {backendData.name}
                          </h3>
                        </Row>
                        <Row>
                          <h5 style={{ whiteSpace: 'pre-wrap' }}>
                            {backendData.introduction
                              ? backendData.introduction.replace(
                                  /<br\s*\/?>/gm,
                                  '\n'
                                )
                              : ''}
                          </h5>
                        </Row>
                        <Row className={`my-3`}>
                          <Col className={`col-auto`}>
                            <p>價格:</p>
                          </Col>
                          <Col>
                            <span
                              className={`chicofgo_green_font chicofgo-font-700`}
                            >
                              $ {backendData.price}
                            </span>
                          </Col>
                        </Row>
                        <Row className={`my-3`}>
                          <Col className={`col-auto`}>
                            <p>規格:</p>
                          </Col>
                          <Col>
                            <span
                              className={`${style.productSpec}  align-middle rounded-3 px-2 py-1`}
                            >
                              {backendData.product_package
                                ? backendData.product_package
                                : '單一規格'}
                            </span>
                          </Col>
                        </Row>
                        <Row className={`my-3`}>
                          <Col className={`col-auto`}>
                            <p>數量:</p>
                          </Col>
                          <Col className={`col`}>
                            {/* <span>{backendData.price}</span> */}
                            <span className="">
                              <InputGroup
                                size="sm"
                                className="m-0 p-0 overflow-visible"
                              >
                                <Button
                                  variant="outline-secondary"
                                  onClick={() => {
                                    setProductAmount(
                                      parseInt(productAmount) - 1
                                    );
                                    if (productAmount <= 1) {
                                      setProductAmount(1);
                                    }
                                  }}
                                >
                                  -
                                </Button>
                                <Form.Control
                                  type="text"
                                  className={`text-center p-0`}
                                  value={productAmount}
                                  onChange={handleChange}
                                />
                                <Button
                                  variant="outline-secondary"
                                  onClick={() => {
                                    setProductAmount(
                                      parseInt(productAmount) + 1
                                    );
                                    if (productAmount >= 999) {
                                      setProductAmount(999);
                                    }
                                  }}
                                >
                                  +
                                </Button>
                              </InputGroup>
                            </span>
                          </Col>
                          <Col className="w-100 d-none d-lg-inline"></Col>
                        </Row>
                        <Row className={`my-2`}>
                          <Col
                            className={`d-grid gap-2 d-lg-block mx-auto chicofgo_white_font `}
                          >
                            <Button
                              variant="chicofgo-dark"
                              className={`me-0 me-lg-3`}
                              onClick={sendCollect}
                            >
                              <BsSuitHeartFill />
                              &ensp;加入收藏
                            </Button>

                            <Button
                              variant="chicofgo-green"
                              className={``}
                              onClick={sendCart}
                            >
                              <BsFillCartFill />
                              &ensp;加入購物車
                            </Button>
                          </Col>
                        </Row>

                        <Row>
                          <h4>產品詳細資料:</h4>
                          <h5 style={{ whiteSpace: 'pre-wrap' }}>
                            {backendData.detail
                              ? backendData.detail.replace(/<br\s*\/?>/gm, '\n')
                              : backendData.introduction
                              ? backendData.introduction.replace(
                                  /<br\s*\/?>/gm,
                                  '\n'
                                )
                              : ''}
                          </h5>
                        </Row>
                        <Row>
                          <h4>聯絡服務:</h4>
                          <h5>
                            如有任何需求或業務諮詢，歡迎來電洽詢。
                            <br />
                            來電詢問：(02)7355-6087 #520 服務時間：週一~週五
                            9:00~18:00
                          </h5>
                        </Row>
                      </>
                    )}
                    {/* 彈出視窗-加入購物車 */}
                    <Modal
                      show={isShow}
                      onHide={handleClose}
                      centered
                      size="sm"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className={`fs-5 mx-1`}>
                          加入購物車
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className={`mx-1`}>
                        {isLoggedIn ? showMsg : '尚未登入,請登入後開始購物!'}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="outline-chicofgo-brown"
                          onClick={handleClose}
                        >
                          關閉
                        </Button>
                        {isLoggedIn ? (
                          ''
                        ) : (
                          <Button
                            // as={Link}
                            // to="/login"
                            variant="outline-chicofgo-green"
                            onClick={handleLogIn}
                          >
                            立刻登入
                          </Button>
                        )}
                      </Modal.Footer>
                    </Modal>
                    {/* 彈出視窗-加入收藏 */}
                    <Modal
                      show={isShowC}
                      onHide={handleCloseC}
                      centered
                      size="sm"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className={`fs-5 mx-1`}>
                          加入收藏
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className={`mx-1`}>
                        {isLoggedIn ? showMsgC : '尚未登入,請登入後開始收藏!'}
                      </Modal.Body>
                      <Modal.Footer>
                        <Container>
                          <Row className={`justify-content-between`}>
                            {askDelectShowC ? (
                              <Col className={`p-0 col-auto`}>
                                <Button
                                  variant="danger"
                                  onClick={handleDeleteCollect}
                                >
                                  刪除收藏
                                </Button>
                              </Col>
                            ) : (
                              ''
                            )}
                            <Col></Col>

                            <Col className={`p-0 col-auto`}>
                              <Button
                                variant="outline-chicofgo-brown"
                                onClick={handleCloseC}
                              >
                                關閉
                              </Button>
                            </Col>

                            {isLoggedIn ? (
                              ''
                            ) : (
                              <Col className={`pe-0 col-auto`}>
                                <Button
                                  // as={Link}
                                  // to="/login"
                                  variant="outline-chicofgo-green"
                                  onClick={handleLogIn}
                                >
                                  立刻登入
                                </Button>
                              </Col>
                            )}
                          </Row>
                        </Container>
                      </Modal.Footer>
                    </Modal>
                    {/* 彈出視窗-提示訊息 */}
                    <Modal
                      show={showTF}
                      onHide={handleCloseTF}
                      centered
                      size="sm"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className={`fs-5 mx-1`}>
                          {showTFMsg.title}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className={`mx-1`}>
                        {showTFMsg.msg}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="outline-chicofgo-brown"
                          onClick={handleCloseTF}
                        >
                          確定
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className={`chicofgo_gray pt-4 px-2 mt-5 rounded-4 shadow`}>
              <Col
                className={`text-center ${style.subTitle} chicofgo_brown_font chicofgo-font-700`}
              >
                相關產品
              </Col>
              <Col
                className={`d-flex justify-content-center flex-wrap mx-0 mt-3 mb-5`}
              >
                <MoreCard amount={12} />
                {/* <MoreCard amount={12} product_id={[9, 11, 15, 18, 22]} /> */}
              </Col>
            </Row>

            <Row
              className={`chicofgo_gray pt-4 px-2 my-5 rounded-4 d-flex flex-column justify-content-center shadow`}
            >
              <Col
                className={`text-center ${style.subTitle} chicofgo_brown_font chicofgo-font-700`}
              >
                顧客評論
              </Col>
              <Col className={`p-4 pt-3`}>
                {backendReview.length <= 0 ? (
                  <>
                    <Row>
                      <h5
                        className={`py-5 chicofgo_white rounded-5 chicofgo-font-700 chicofgo_green_font text-center`}
                      >
                        此商品暫無評論
                      </h5>
                    </Row>
                  </>
                ) : (
                  backendReview.map((review) => {
                    return (
                      <>
                        <Row className={`justify-content-center px-3 my-4`}>
                          <Col className={`text-center col-3`}>
                            <Image
                              alt=""
                              width={100}
                              height={100}
                              // src={require('../../../Img/messagedefultimg.png')}
                              src={
                                review.img
                                  ? `http://localhost:3001/api/images/member/${review.img}`
                                  : require('../../../Img/messagedefultimg.png')
                              }
                              className={`border border-3 rounded-circle my-2`}
                            />
                            <h4 className={`fs-6 mb-1`}>{review.name}</h4>
                            <span className={`m-0`}>
                              <Rating value={parseInt(review.message_rating)} />
                            </span>
                          </Col>
                          <Col
                            className={`col-9 chicofgo_white rounded-4 p-3 d-flex flex-column justify-content-between`}
                          >
                            <p>{review.speak}</p>
                            <span className="">
                              {new Date(review.message_time).toLocaleString(
                                'zh-TW',
                                {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                }
                              )}
                            </span>
                          </Col>
                        </Row>
                      </>
                    );
                  })
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetail;
