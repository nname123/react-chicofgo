import { Row, Col, Form, Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
// import Nav from 'react-bootstrap/Nav';
// import { Link, NavLink } from 'react-router-dom';
import ChContainer from '../../ComponentShare/ChContainer';
import style from './Collect.module.scss';
// import CollectItem from './Component/CollectItem';
function Collect() {
  return (
    <ChContainer
      ChClass={'chicofgo-font-700 border border-5'}
      breadCrumb={'我的收藏'}
    >
      <Col>
        <Row>
          <Col>
            <h1
              className={`${style.collectTitle} text-center pt-3 pb-2 py-md-5  `}
            >
              我的收藏
            </h1>
          </Col>
        </Row>

        <Row
          className={`${style.collectAreaHeight} mb-5 justify-content-center`}
        >
          <Outlet />
        </Row>
      </Col>
    </ChContainer>
  );
}

export default Collect;
