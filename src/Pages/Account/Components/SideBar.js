import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import {
  BsFillPersonFill,
  BsCartCheck,
  BsFillBookmarkHeartFill,
} from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import { RiCoupon2Line } from 'react-icons/ri';

import style from './SideBar.module.scss';
function SideBar() {
  return (
    <>
      <Nav
        defaultActiveKey="/member"
        className={`${style.SideBarBody} flex-md-column justify-content-center justify-content-md-start flex-nowrap h-100 chicofgo-font px-md-4`}
        variant=""
      >
        <Nav.Link as={Link} to="/member" className="my-md-3 " disabled>
          <p>
            <BsFillPersonFill />
            &thinsp;我的帳號
          </p>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/member/orderHistory"
          className="my-md-3 "
          disabled
        >
          <p>
            <FaSearch />
            &thinsp;歷史訂單
          </p>
        </Nav.Link>
        <Nav.Link as={Link} to="/member/shoppingcart" className="my-md-3 ">
          <p>
            <BsCartCheck />
            &thinsp;購物清單
          </p>
        </Nav.Link>
        <Nav.Link as={Link} to="/member/coupons" className="my-md-3 " disabled>
          <p>
            <RiCoupon2Line />
            &thinsp;我的優惠券
          </p>
        </Nav.Link>
        <Nav.Link as={Link} to="/member/collect" className="my-md-3 ">
          <p>
            <BsFillBookmarkHeartFill />
            &thinsp;我的收藏
          </p>
        </Nav.Link>
        {/* <Nav.Link as={Link} to="/member/messages">
          <p>
            <RiMessage2Fill />
            &thinsp; 通知總覽
          </p>
        </Nav.Link> */}
      </Nav>
    </>
  );
}

export default SideBar;
