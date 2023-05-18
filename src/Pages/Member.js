import { Outlet, useNavigate } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import SideBar from './Account/Components/SideBar';
import memberBackground from './Account/Components/member_background.png';
import { useAuth } from '../Contexts/AuthContext';
function Member() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const { isLoggedIn, setIsLoggedIn, setUsername, setUserid, setUserRank } =
    useAuth();

  function handleLogIn() {
    setIsLoggedIn(true);
    setUserid('12345');
    setUsername('王大明');
    setUserRank('1');
    handleClose();
  }

  useEffect(() => {
    if (!isLoggedIn) {
      setShow(true);
    }
  }, []);

  return (
    <>
      <Container
        fluid
        style={{
          backgroundImage: `url(${memberBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Row>
          <Col xs={12} md={2} className={`p-0`}>
            {/* <MemberSideBar /> */}
            <SideBar />
          </Col>
          <Col xs={12} md={10}>
            <Outlet />
          </Col>
        </Row>
      </Container>
      {/* 提示訊息 */}
      <Modal
        size="sm"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>未登入</Modal.Title>
        </Modal.Header>
        <Modal.Body>請先登入</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              navigate(-1);
              handleClose();
            }}
          >
            返回上一頁
          </Button>
          <Button variant="primary" onClick={handleLogIn}>
            立即登入
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Member;
