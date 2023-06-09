import { createContext, useContext, useState } from 'react';
// import axios from 'axios';

const ProductContext = createContext();

export function useProduct() {
  return useContext(ProductContext);
}

function ProductProvider(props) {
  const { children } = props;
  const [products, setProducts] = useState([]);
  const [chooseCategory, setChooseCategory] = useState({
    brands: [],
    types: [],
    packages: [],
    origins: [],
    theStyles: [],
    theSearches: [],
  });

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        chooseCategory,
        setChooseCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
