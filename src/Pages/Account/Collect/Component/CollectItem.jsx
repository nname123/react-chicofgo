import { Col, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThisCard from '../../../ComponentShare/ThisCard';
function CollectItem() {
  const [collects, setCollects] = useState([]);
  useEffect(() => {
    async function getCollectData() {
      try {
        let response = await axios.get(
          'http://localhost:3001/api/members/getUserCollect',
          {
            withCredentials: true,
          }
        );
        setCollects(response.data);
        // console.log(response.data);
      } catch (e) {
        if (e.response.status === 400) {
          console.log('收藏是空的');
        }
      }
    }
    getCollectData();
  }, []);

  return (
    <>
      <Row className={`justify-content-center `}>
        {collects.map((v, i) => {
          return (
            <Col className={` col-6 col-md-4 col-xl-3  my-md-3 my-2`}>
              <ThisCard product_id={v} goToUrl="/refresh" />
            </Col>
          );
        })}

        <Col
          className={`${
            collects.length > 0 ? 'd-none' : 'd-inline'
          } shadow p-5 m-5 rounded-5 d-flex flex-column justify-content-center`}
        >
          <h5 className={`chicofgo-font-700 chicofgo_green_font text-center`}>
            還沒有收藏,快去看看吧~
          </h5>
        </Col>
      </Row>
    </>
  );
}

export default CollectItem;
