import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ThisCard from '../ComponentShare/ThisCard';
import { Button, Nav, Image, Col, Row, Container } from 'react-bootstrap';
import { useProduct } from '../../Contexts/ProductProvider';
import { v4 as uuidv4 } from 'uuid';
import { productList } from '../../Config/ProductConfig';

function List() {
  const { chooseCategory } = useProduct();
  // const { stockId } = useParams();
  // 為了處理網址
  let navigate = useNavigate();
  const { currentPage } = useParams();
  const [page, setPage] = useState(parseInt(currentPage, 10) || 1); // 目前在哪一頁
  const [totalPage, setTotalPage] = useState(0); // 總共有幾頁
  const [data, setData] = useState([]);

  const btnStyle = {
    display: 'inline-block',
    margin: '2px',
    borderColor: '#dbdbdb',
    borderWidth: '1px',
    width: '28px',
    height: '28px',
    borderRadius: '3px',
    // textAlign: 'center',
    cursor: 'pointer',
  };

  // 拿資料
  function getData() {
    let response = productList.slice((page - 1) * 16, page * 16);
    // console.log('chooseCategory', chooseCategory);
    // const filteredProductList = productList.filter((item) => {
    // return chooseCategory.brands.includes(item.brand);
    // &&
    // chooseCategory.packages.includes(item.package || '') &&
    // chooseCategory.types.includes(item.type || '') &&
    // chooseCategory.origins.includes(item.place_of_orgin || '')
    // });

    // console.log('filteredProductList', filteredProductList);

    // let response = await axios.get(
    //   `http://localhost:3001/api/products/?page=${page}`,
    //   {
    //     params: {
    //       // thePage: page,
    //       setFilter: chooseCategory || '',
    //     },
    //   }
    // );
    // console.log('response', response.data);

    // console.log('setData', response);
    //刪掉id=0的空白項目
    const filteredData = response.filter((item) => item.id !== 0);

    //填充不足的項目
    const targetLength = 16;
    const paddingCount = targetLength - filteredData.length;
    const paddingData = Array.from({ length: paddingCount }, () => ({ id: 0 }));
    const filledData = filteredData.concat(paddingData);
    // console.log('filledData', filledData);

    setData(filledData);
    setTotalPage(Math.ceil(productList.length / 16));
  }

  useEffect(() => {
    // console.log('page 改變拿一次資料', page);
    getData();
  }, [page]);

  useEffect(() => {
    // console.log('chooseCategory改變拿一次資料', chooseCategory);
    if (page > 1) {
      setPage(1);
    }
    getData();
  }, [chooseCategory]);

  const getPages = () => {
    let pages = [];
    // 計算顯示的頁數範圍
    let startPage = Math.max(1, page - 3);
    let endPage = Math.min(totalPage, page + 3);

    if (page > 1) {
      pages.push(
        <li
          style={btnStyle}
          key={'one'}
          onClick={(e) => {
            setPage(1);
            navigate(`/products/1`);
          }}
        >
          {`<<`}
        </li>
      );
      if (page > 4) {
        pages.push(
          <li style={btnStyle} key={'first-dot'}>
            ···
          </li>
        );
      }
    }
    // Add previous page button
    if (page > 1) {
      pages.push(
        <li
          style={btnStyle}
          key={'previous'}
          onClick={(e) => {
            setPage(page - 1);
            navigate(`/products/${page - 1}`);
          }}
        >
          {'<'}
        </li>
      );
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          style={{
            display: 'inline-block',
            margin: '2px',
            backgroundColor: page === i ? '#366f54' : '',
            borderColor: page === i ? '#366f54' : '#dbdbdb',
            color: page === i ? '#fff' : '#363636',
            borderWidth: '1px',
            width: '28px',
            height: '28px',
            borderRadius: '3px',
            // textAlign: 'center',
            cursor: page === i ? 'default' : 'pointer',
          }}
          key={i}
          onClick={(e) => {
            setPage(i);
            // 處理網址
            if (page !== i) {
              navigate(`/products/${i}`);
            }
          }}
        >
          {i}
        </li>
      );
    }
    // Add next page button
    if (page < totalPage) {
      pages.push(
        <li
          style={btnStyle}
          key={'next'}
          onClick={(e) => {
            setPage(page + 1);
            navigate(`/products/${page + 1}`);
          }}
        >
          {'>'}
        </li>
      );
    }

    // Add last page button
    if (page < endPage) {
      if (page < totalPage - 3) {
        pages.push(
          <li style={btnStyle} key={'back-dot'}>
            ···
          </li>
        );
      }
      pages.push(
        <li
          style={btnStyle}
          key={'lastPage'}
          onClick={() => {
            setPage(totalPage);
            navigate(`/products/${totalPage}`);
          }}
        >
          {'>>'}
        </li>
      );
    }

    return pages;
  };
  return (
    <Container>
      <Row
        className="px-4"
        // style={{ minHeight: '1470px' }}
      >
        {data.map((item) => {
          return (
            <Col
              key={uuidv4()}
              className={`col-6 col-md-4 col-lg-3 col-xxl-2 my-2 my-xxl-1 ${
                item.id <= 0 ? 'invisible' : ''
              }`}
            >
              <ThisCard product_id={item.id} />
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col className="text-center mt-3 ">
          <ul
            className="align-middle"
            style={{
              lineHeight: '1.8rem',
            }}
          >
            {getPages()}
          </ul>
          {/* 目前在第 {page} 頁 */}
        </Col>
      </Row>
    </Container>
  );
}
export default List;
