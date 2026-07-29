import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { loadProductCached, saveProducts, isProductCachedExpired } from "../../utils/cache/product-cache"
import { ShopService } from "./service/shop-service";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const payload = await ShopService.getAll();
      const products = payload['data'];

      setProducts(products);
      saveProducts(products);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(loading ? false : true);
    }
  }

  const initializeProducts = async () => {
    const cache = loadProductCached();

    if (cache && !isProductCachedExpired(cache)) {
      setProducts(cache['data']);
      setLoading(false);
      return;
    }

    await fetchProducts();
  }

  useEffect(() => {
    initializeProducts();
  }, []);

  const contextValue = {
    products,
    loading,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
