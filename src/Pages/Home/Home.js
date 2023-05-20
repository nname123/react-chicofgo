import style from './Home.module.scss';
import Carousels from './Component/Carousels';
import CardListS from './Component/CardListS';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Nav, Image, Col, Row, Container } from 'react-bootstrap';
import MoreCard from '../ComponentShare/MoreCard';
import { useProduct } from '../../Contexts/ProductProvider';
import { useShoppingCart } from '../../Contexts/ShoppingCartProvider';
import { React, useEffect, useState } from 'react';
import PopupWindow from '../ComponentShare/PopupWindow';

function Home() {
  const { chooseCategory, setChooseCategory } = useProduct();
  const { selectProducts, setSelectProducts } = useShoppingCart();
  const [showWelcomeMsg, setShowWelcomeMsg] = useState(false);

  const navigate = useNavigate();
  let localData = JSON.parse(localStorage.getItem('productsViewed')) || [
    { userId: 99999, productsViewed: [] },
  ];
  let productsViewedItem = localData[0].productsViewed || [];

  useEffect(() => {
    const WcMsg = localStorage.getItem('WcMsg');
    if (WcMsg !== 'true') {
      setShowWelcomeMsg(true);
    }
  }, []);

  function getRandomNumbers(numbers, length) {
    const randomNumber = Math.floor(Math.random() * 50) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
    if (numbers.length < length) {
      getRandomNumbers(numbers, length);
    }
    return numbers;
  }
  const randomNumbersArray = getRandomNumbers([], 42);
  return (
    <Container fluid>
      <Row className={`p-0 justify-content-center ${style.homePage} mx-auto`}>
        <Col xl={12} xxl={10}>
          <Carousels
            showImg={['Carousels-1.png', 'Carousels-2.png', 'Carousels-3.png']}
            changeDelay={2000}
            fade={true}
          />
          <Row className={`justify-content-center m-0  ${style.adBanner}`}>
            <Col className={`align-self-center col-xl-10 px-0`}>
              <Carousels
                showImg={['ads-1.png', 'ads-2.png', 'ads-3.png']}
                changeDelay={1500}
                fade={false}
              />
            </Col>
          </Row>
          <Row className={`align-content-center ${style.homeCategory}`}>
            <Nav className={`d-flex justify-content-center`}>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                  <span className={`${style.categoryTitle}`}>篩選類別</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    setChooseCategory((prev) => ({
                      ...prev,
                      types: ['即飲咖啡'],
                    }));
                    navigate('/products/category');
                  }}
                >
                  <span>即飲咖啡</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    setChooseCategory((prev) => ({
                      ...prev,
                      types: ['即溶咖啡'],
                    }));
                    navigate('/products/category');
                  }}
                >
                  <span>即溶咖啡</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    setChooseCategory((prev) => ({
                      ...prev,
                      types: ['咖啡豆'],
                    }));
                    navigate('/products/category');
                  }}
                >
                  <span>咖啡豆</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    setChooseCategory((prev) => ({
                      ...prev,
                      types: ['咖啡膠囊'],
                    }));
                    navigate('/products/category');
                  }}
                >
                  <span>膠囊咖啡</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    setChooseCategory((prev) => ({
                      ...prev,
                      types: ['奶精'],
                    }));
                    navigate('/products/category');
                  }}
                >
                  <span>奶精</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    setChooseCategory((prev) => ({
                      ...prev,
                      types: ['濾掛式/茶包式'],
                    }));
                    navigate('/products/category');
                  }}
                >
                  <span>濾掛式/茶包式</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    setChooseCategory((prev) => ({
                      ...prev,
                      types: ['咖啡粉'],
                    }));
                    navigate('/products/category');
                  }}
                >
                  <span>咖啡粉</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>

          <Row className={`${style.pageOne} justify-content-center`}>
            <Col>
              <Row>
                <Col
                  className={`${style.pageTitle} text-center mt-5 mb-3 chicofgo_brown_font`}
                >
                  <p>本日精選商品!站長推薦</p>
                </Col>
              </Row>
              <Row>
                <Col className={`${style.cardListS} position-relative m-5`}>
                  <p className="position-absolute top-0 start-2 translate-middle ">
                    為您推薦
                  </p>
                  <Row className={`row-cols-1 row-cols-md-2 `}>
                    <Col>
                      <Row className={`row-cols-2  row-cols-lg-4 g-2`}>
                        <CardListS
                          className={`start-5 position-relative`}
                          showImg={randomNumbersArray.slice(0, 4)}
                          cardHeight={'153px'}
                        />
                      </Row>
                    </Col>
                    <Col>
                      <Row className={`row-cols-2  row-cols-lg-4 g-2`}>
                        <CardListS
                          className={`start-5 position-relative`}
                          showImg={randomNumbersArray.slice(4, 8)}
                          cardHeight={'153px'}
                        />
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col
                  className={`d-flex justify-content-center flex-wrap mx-0 my-5`}
                >
                  <MoreCard
                    amount={12}
                    product_id={randomNumbersArray.slice(8, 16)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row
        className={`${style.pageTwo} ${style.homePage} justify-content-center mx-auto`}
      >
        <Col>
          <Row>
            <Col className={`${style.pageTitle2} text-center mt-5 mb-3`}>
              <p>眾多咖啡商品任君挑選</p>
            </Col>
          </Row>
          <Row className={`justify-content-center`}>
            <Col
              className={`${style.pageTwoBg} col-2 position-relative  d-none d-xl-inline`}
            >
              <p
                className={`position-absolute top-0 start-2 translate-middle `}
              >
                New!
              </p>
              <Row className={`row-cols-1 g-5 `}>
                <CardListS
                  // className={`start-5`}
                  showImg={randomNumbersArray.slice(16, 18)}
                  cardHeight={'153px'}
                />
              </Row>
            </Col>
            <Col
              className={`${style.pageTwoBg} col-md-8 col-xl-6 justify-content-center text-center px-5`}
            >
              <span className={`${style.subTitle} mb-md-5`}>
                新春優惠價!眾多折扣商品
                <br className={`d-none d-md-inline`} />
                開放搶購!
              </span>
              <div className={`py-3 my-xl-5`}>
                <Row className={`row-cols-2 row-cols-md-4 g-2`}>
                  <CardListS
                    showImg={randomNumbersArray.slice(18, 22)}
                    cardHeight={'153px'}
                  />
                </Row>
              </div>
              <Button
                variant="chicofgo-green"
                className={`mt-4 px-5 py-1 chicofgo-font-700 rounded-5`}
                as={Link}
                to={'/products'}
              >
                立即前往商場
              </Button>
            </Col>
          </Row>
          <Row className={`justify-content-center`}>
            <Col
              className={`${style.pageTwoBg} col-md-8 col-xl-6 position-relative text-center`}
            >
              <h5
                className={`position-absolute top-0 start-2 translate-middle `}
              >
                限時
                <br />
                搶購
              </h5>
              <span className={`${style.subTitle}`}>
                新春優惠價!眾多折扣商品
                <br />
                開放搶購!
              </span>
              <Row className={`row-cols-2 row-cols-md-4 g-2`}>
                <CardListS
                  showImg={randomNumbersArray.slice(22, 30)}
                  cardHeight={'153px'}
                />
              </Row>
              <Button
                variant="chicofgo-green"
                className={` mt-5 mb-3 px-5 py-1 chicofgo-font-700 rounded-5`}
                as={Link}
                to={'/products'}
              >
                立即前往商場
              </Button>
            </Col>
            <Col
              className={`${style.pageTwoBg} col-3 text-center  d-none d-xl-inline`}
            >
              <span className={`${style.subTitle}`}>
                日本熱銷新品
                <br />
                立即購買!
              </span>
              <div className={`pt-4 pb-4`}>
                <Row className={`row-cols-2 g-5`}>
                  <CardListS
                    showImg={randomNumbersArray.slice(30, 34)}
                    cardHeight={'153px'}
                  />
                </Row>
              </div>
              <Button
                variant="chicofgo-green"
                className={`mt-4 mb-3 px-4 py-1 chicofgo-font-700 rounded-5`}
                as={Link}
                to={'/products'}
              >
                立即前往商場
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className={`${style.pageTitle} text-center mt-5 mb-3`}>
              <p>最熱門商品</p>
            </Col>
          </Row>
          <Row>
            <Col
              className={`d-flex justify-content-center flex-wrap mx-0 my-5`}
            >
              <MoreCard
                amount={12}
                product_id={randomNumbersArray.slice(34, 42)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={`justify-content-center ${style.homePage} mx-auto`}>
        <Col>
          <Row>
            <Col className={`${style.pageTitle2} text-center my-5 `}>
              <p>CHICOGO推廣環境友善認證商品</p>
            </Col>
          </Row>
          <Row className={`justify-content-center  text-center`}>
            <Col
              className={`${style.pageBgGray} position-relative mx-5 col-md-4 ms-md-2 me-md-3 py-3`}
            >
              <span className={`${style.subTitle} my-5`}>環境友善相關商品</span>
              <br />
              <p
                className={`${style.leftUpImgBody} position-absolute top-5 start-0 translate-middle d-none d-xl-inline`}
              >
                <Image src={require('../../Img/Home/bird_friendly.png')} />
                {/* ./Component/bird_friendly.png */}
              </p>
              <Link to={`/products/product_detail/${43}`}>
                <Image
                  className={`${style.leftUpImg} m-3`}
                  src={require(`../../Img/ProductsTest/coffee_${43}/coffee_${43}-1.png`)}
                />
              </Link>
              <Link to={`/products/product_detail/${44}`}>
                <Image
                  className={`${style.leftUpImg} m-3`}
                  src={require(`../../Img/ProductsTest/coffee_${44}/coffee_${44}-1.png`)}
                />
              </Link>
            </Col>
            <Col
              className={`${style.pageBgGray} position-relative  col-md-3 ms-md-3 py-3 d-none d-md-inline`}
            >
              <span className={`${style.subTitle} `}>環境友善認證</span>
              <p
                className={`${style.leftUpImgBody} position-absolute top-0 start-0 translate-middle  d-none d-xl-inline`}
              >
                <Image src={require('../../Img/Home/rain_friendly.png')} />
              </p>
              <br />
              <Image
                className={`${style.leftUpImg2} m-0 `}
                src={require('../../Img/Home/total_friendly.png')}
              />
            </Col>
          </Row>
          <Row className={`justify-content-center my-5`}>
            <Col
              className={`${style.pageBgGray}  position-relative col-10 col-md-7 ms-md-3 py-3 d-flex `}
            >
              <p
                className={`${style.leftUpImgBody} position-absolute top-5 start-0 translate-middle d-none d-xl-inline`}
              >
                <Image
                  src={require('../../Img/Home/organic_certification.png')}
                />
              </p>
              <Row
                className={`justify-content-between align-items-center  text-center my-5`}
              >
                <Col className={`col-12 col-xl-7 `}>
                  <Image
                    className={`${style.leftUpImg3} m-0`}
                    src={require('../../Img/Home/p3_big.png')}
                    thumbnail
                  />
                </Col>
                <Col className={`col-12 col-xl-5 px-3`}>
                  <article className={`${style.picWithText} text-start`}>
                    關於去咖購 chicofgo
                    <br />
                    <br />
                    <br />
                    藝術是設計師創造的經典，追求細節。用心觀察。激發創意，只為完美的作品。而咖啡何嘗不是藝術的一種？
                    <br />
                    <br />
                    <br />
                    去咖購 chicofgo
                    團隊為設計師出身，並將設計精神帶進咖啡的世界。去咖購
                    chicofgo 源自於一種獨特的設計手法，又稱作『圖地反轉』。
                    <br />
                    <br />
                    <br />
                    去咖購 chicofgo
                    團隊從選購高品質生豆，到研究並訂定出最佳的烘焙法層層把關，只為了呈現一
                    杯表現極致風味的咖啡。除了專注於咖啡的風味，我們更將咖啡外包裝加以設計，為每款咖啡豆細心打造獨特的包裝視覺，為每日的咖啡添上活潑的藝術氣息。每個細節，都是整體的一部分。
                    <br />
                    <br />
                    <br />
                    秉持這個精神，我們創造了去咖購 chicofgo
                  </article>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className={`${style.pageBgGray2} justify-content-center my-5`}>
            <Col
              className={`${style.pageBgWhite} shadow  col-8 m-5 px-5  d-flex justify-content-center rounded-pill`}
            >
              <Image
                className={` my-4 img-fluid object-fit-contain`}
                src={require('../../Img/Home/brand_list.png')}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={`justify-content-center ${style.homePage} mx-auto`}>
        <Col>
          <Row>
            <Col className={`${style.pageTitle} text-center my-5`}>
              <p>您最近看過的商品</p>
            </Col>
          </Row>
          <Row>
            <Col
              className={`${
                productsViewedItem.length > 0 ? 'd-inline' : 'd-none'
              } d-flex justify-content-center flex-wrap mx-0 my-5`}
            >
              <MoreCard product_id={productsViewedItem} />
            </Col>
          </Row>
          {/* ----------------------------------- */}
          <Row className={`px-5`}>
            <Col
              className={`${
                productsViewedItem.length > 0 ? 'd-none' : 'd-inline'
              } shadow p-md-5 rounded-5 chicofgo-font text-center m-5`}
            >
              <h5
                className={`py-5 rounded-5 chicofgo-font-700 chicofgo_green_font text-center`}
              >
                還沒有看過的商品
                <br />
                趕快去看看吧!~
              </h5>
            </Col>
          </Row>

          {/* ----------------------------------- */}
        </Col>
      </Row>
      <PopupWindow
        show={showWelcomeMsg}
        onclose={() => {
          localStorage.setItem('WcMsg', 'true');
          setShowWelcomeMsg(false);
        }}
        title="請注意"
        content={
          <>
            此內容僅做為個人前端網頁練習使用，
            <br />
            如有侵權情形，請
            <a href="mailto:ryanworktw123@gmai1.com">來信告知</a>
            ，我將盡快刪除相關內容。
          </>
        }
        btnContent="確定"
      />
    </Container>
  );
}

export default Home;
