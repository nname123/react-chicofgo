import {
  createContext,
  useContext,
  useState,
  // useEffect
} from 'react';
// import axios from 'axios';

const ShoppingCartContext = createContext();

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

function ShoppingCartProvider(props) {
  const { children } = props;
  const [selectProducts, setSelectProducts] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [collectList, setCollectList] = useState([]);

  // useEffect(() => {
  // async function getShoppingCart() {
  //   let response = await axios.get('http://localhost:3001/api/shoppingcart', {
  //     withCredentials: true,
  //   });
  //   setSelectProducts(response.data);
  // }
  // getShoppingCart();
  // }, []);

  // let data = [
  //   {
  //     shoppingcart_id: 35,
  //     product_id: 72,
  //     brandname: 'Beanies',
  //     title: '【Beanies-即期品】香濃焦糖風味即溶咖啡50g(有效日期2023/08/24)',
  //     desc: '50g/罐',
  //     quantity: 1,
  //     price: 199,
  //     checked: false,
  //   },
  //   {
  //     shoppingcart_id: 36,
  //     product_id: 661,
  //     brandname: '半天水',
  //     title: '【半天水】研讀咖啡10入(單一原豆)',
  //     desc: '泰國、阿拉比卡原豆',
  //     quantity: 1,
  //     price: 267,
  //     checked: false,
  //   },
  // ];

  return (
    <ShoppingCartContext.Provider
      value={{
        selectProducts,
        setSelectProducts,
        cartList,
        setCartList,
        collectList,
        setCollectList,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
