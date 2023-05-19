import { Row, Col, Button, Form, InputGroup, Table } from 'react-bootstrap';
import ChContainer from '../../ComponentShare/ChContainer';
import style from './ShoppingCart.module.scss';
import React, { useState, useEffect } from 'react';
import CheckoutItem from './Components/CheckoutItem';
import { useShoppingCart } from '../../../Contexts/ShoppingCartProvider';
import axios from 'axios';
import PopupWindow from '../../ComponentShare/PopupWindow';
import { useNavigate } from 'react-router-dom';

function Checkout(props) {
  const navigate = useNavigate();
  // ---勾選商品---
  const [products, setProducts] = useState([]);
  const { setCartList, selectProducts, setSelectProducts } = useShoppingCart();
  // ---會員資料---
  const [memberInfo, setMemberInfo] = useState({});
  const [errors, setErrors] = useState({
    nameError: '',
    name: false,
    phoneError: '',
    phone: false,
    addressError: '',
    address: false,
    payError: '',
    pay: false,
    bill_idError: '',
    bill_id: false,
    send_informationError: '',
    send_information: false,
  });
  const [showModal, setShowModal] = useState(false);
  let result = {};

  useEffect(() => {
    setProducts(selectProducts);
    // -----------------------------------
    // async function getAccountData() {
    // let response = await axios.get(
    //   'http://localhost:3001/api/members/toShoppingcart',
    //   {
    //     withCredentials: true,
    //   }
    // );
    // -----------------------------------
    let response = {
      data: {
        id: 123,
        name: '王大明',
        phone: '0987654321',
        address: '地球',
      },
    };

    setMemberInfo({
      product_id: response.data.id,
      name: response.data.name,
      phone: response.data.phone,
      pay: '',
      address: response.data.address,
      send_information: '',
      bill_id: '',
      totalPrice: '',
      status: '1',
      mail: response.data.email,
      pay_info: '',
    });
    // console.log(memberInfo);
    // getAccountData()
    // -----------------------------------
  }, []);

  function handleChange(e) {
    let newMemberInfo = { ...memberInfo };
    newMemberInfo[e.target.name] = e.target.value;
    setMemberInfo(newMemberInfo);
    // console.log(memberInfo);
  }

  //---優惠券---
  const [coupon, setCoupon] = useState(0);
  function couponChange(e) {
    setCoupon(e.target.value);
  }
  // ---訂單加總---
  const thisprice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // ---訂單加總(扣優惠券)---
  const totalPrice =
    products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    ) - coupon;

  // ---下單---
  function handleSubmit(e) {
    e.preventDefault();
    memberInfo.totalPrice = totalPrice;
    memberInfo.discount = coupon;
    memberInfo.price = thisprice;
    // memberInfo.totalAmount = products.length;
    memberInfo.totalAmount = products.reduce(
      (total, product) => total + product.quantity,
      0
    );
    console.log('products', products);
    setShowModal(true);
  }
  // 清空購物車
  function clearCart() {
    setShowModal(false);
    setCartList([]);
    navigate('/products');
  }

  return (
    <ChContainer
      ChClass={'chicofgo-font'}
      breadCrumb={'下單結帳'}
      ChBorder={'0px'}
    >
      {/* 標題 */}

      <Col>
        <Row>
          <Col>
            <h1
              className={`${style.shoppingcartTitle} text-center pt-3 pb-2 py-md-5`}
            >
              下單結帳
            </h1>
          </Col>
        </Row>
        <Row>
          <Col className={` pb-5 px-0 chicofgo-font-700`}>
            {/* 內容 */}
            {/* ----------------------------------- */}
            {products.map((p) => (
              <CheckoutItem
                id={p.shoppingcart_id}
                product_id={p.product_id}
                brandname={p.brandname}
                title={p.title}
                desc={p.desc}
                quantity={p.quantity}
                checked={p.checked}
                price={p.price}
              />
            ))}

            {/* ----------------------------------- */}
            <div className="chicofgo_yello">
              <Form className="p-3 p-md-5 chicofgo_yello">
                <h5 className="chicofgo-font-700">編輯買家資訊</h5>
                <Row>
                  <Col xs={12} md={6}>
                    <InputGroup className="align-items-center mb-2">
                      收件人姓名：
                      <Form.Control
                        size="sm"
                        type="text"
                        // id="name"
                        name="name"
                        onChange={handleChange}
                        value={memberInfo.name}
                        className={'chicofgo_yello'}
                        isInvalid={errors.name}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="text-end"
                      >
                        {errors.nameError}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="align-items-center mb-2">
                      行動電話：
                      <Form.Control
                        size="sm"
                        type="text"
                        // id="phone"
                        name="phone"
                        onChange={handleChange}
                        value={memberInfo.phone}
                        className={'chicofgo_yello'}
                        isInvalid={errors.phone}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="text-end"
                      >
                        {errors.phoneError}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="align-items-center mb-2">
                      使用票券：
                      <Form.Select
                        aria-label="Default select example"
                        size="sm"
                        name="coupon_id"
                        onChange={(handleChange, couponChange)}
                        className={'chicofgo_yello'}
                      >
                        <option selected value="0">
                          選擇票券
                        </option>
                        <option value="60">$60免運券</option>
                        <option value="200">$200折價券</option>
                      </Form.Select>
                    </InputGroup>
                    <InputGroup className="align-items-center mb-2">
                      付款方式：
                      <Form.Select
                        aria-label="Default select example"
                        size="sm"
                        name="pay"
                        onChange={handleChange}
                        className={'chicofgo_yello'}
                        isInvalid={errors.pay}
                      >
                        <option selected disabled>
                          選擇付款方式
                        </option>
                        <option value="1">貨到付款</option>
                        <option value="2">信用卡/金融卡</option>
                        <option value="3">銀行轉帳</option>
                        <option value="4">LINE PAY</option>
                      </Form.Select>
                      <Form.Control.Feedback
                        type="invalid"
                        className="text-end"
                      >
                        {errors.payError}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <InputGroup className="align-items-center mb-2">
                      地址：
                      <Form.Control
                        size="sm"
                        type="text"
                        // id="address"
                        name="address"
                        onChange={handleChange}
                        value={memberInfo.address}
                        className={'chicofgo_yello'}
                        isInvalid={errors.address}
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="text-end"
                      >
                        {errors.addressError}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="align-items-center mb-2">
                      寄送門市：
                      <Form.Select
                        aria-label="Default select example"
                        size="sm"
                        name="send_information"
                        onChange={handleChange}
                        className={'chicofgo_yello'}
                        isInvalid={errors.send_information}
                      >
                        <option selected disabled>
                          物流選擇
                        </option>
                        <option value="1">7-ELEVEN</option>
                        <option value="2">全家</option>
                        <option value="3">萊爾富</option>
                        <option value="4">OK</option>
                        <option value="5">宅配</option>
                      </Form.Select>
                      <Form.Control.Feedback
                        type="invalid"
                        className="text-end"
                      >
                        {errors.send_informationError}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="align-items-center mb-2">
                      電子發票：
                      <Form.Select
                        aria-label="Default select example"
                        size="sm"
                        name="bill_id"
                        onChange={handleChange}
                        className={'chicofgo_yello'}
                        isInvalid={errors.bill_id}
                      >
                        <option selected disabled>
                          選擇發票
                        </option>
                        <option value="1">二聯式發票</option>
                        <option value="2">三聯式發票</option>
                        <option value="3">捐贈發票</option>
                      </Form.Select>
                      <Form.Control.Feedback
                        type="invalid"
                        className="text-end"
                      >
                        {errors.bill_idError}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <InputGroup className="align-items-center mb-2">
                      備註：
                      <Form.Control
                        size="sm"
                        type="text"
                        // id="address"
                        name="pay_info"
                        onChange={handleChange}
                        value={memberInfo.pay_info}
                        className={'chicofgo_yello'}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <h5 className={'pt-3 pt-md-5 chicofgo-font-700'}>折扣計算</h5>
                <Row className={`${style.totalSum}`}>
                  <Col>
                    折抵：$
                    {coupon}
                  </Col>
                  <Col className="text-end">
                    訂單加總:<span>{totalPrice}</span>
                  </Col>
                </Row>
              </Form>
            </div>
            <Row className={`mt-5`}>
              <Col className={`text-center`}>
                <Button
                  variant="chicofgo-brown"
                  className={` px-5 py-1 shadow chicofgo_white_font`}
                  onClick={handleSubmit}
                >
                  確認下單
                </Button>
                <PopupWindow
                  show={showModal}
                  onclose={clearCart}
                  title="下單結果"
                  content={
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>商品名稱</th>
                          <th>數量</th>
                          <th>價格</th>
                          <th>小計</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className={`${style.truncate}`}>
                              {item.title}
                            </td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.price * item.quantity}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={2}>商品數量:</td>
                          <td>{memberInfo.totalAmount}</td>

                          <td>總金額:</td>
                          <td>{memberInfo.totalPrice}</td>
                        </tr>
                      </tbody>
                    </Table>
                  }
                  btnContent="清空購物車"
                />
                {/* <PopupWindow
                  show={showModal}
                  onclose={() => navigate('/member/orderHistory')}
                  title="下單結果"
                  content="下單成功!"
                  btnContent="查看訂單"
                /> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </ChContainer>
  );
}

export default Checkout;
