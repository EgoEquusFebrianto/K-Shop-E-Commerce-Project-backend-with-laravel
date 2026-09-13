import { createContext, useEffect, useState } from "react";
import { loadProductCached, saveProducts, isProductCachedExpired } from "../../utils/cache/product-cache"
import { ShopServicePostgreSQL } from "./service/ShopServicePostgreSQL";
import { ShopServiceRedis } from "./service/ShopServiceRedis";
import { getVisiblePage } from "../../components/pagination/getVisiblePage";
import { LoadCategoryCache, SaveCategories } from "../../utils/cache/category-cache"

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, SetCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [page, SetPage] = useState(0);
  const [first, setFirst] = useState(true);
  const [last, setLast] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // console.log(localStorage.getItem("categories"))

  const fetchProducts = async (pageTarget = page, keywordTarget = keyword) => {
    try {
      const payload = await ShopServicePostgreSQL.getAll(pageTarget, keywordTarget, categoryId);

      saveProducts(pageTarget, keywordTarget, categoryId, payload);
      updatePageState(payload);
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(loading ? false : true);
    }
  }

  const fetchCategories = async () => {
    const cache = LoadCategoryCache();

    if (cache) {
      SetCategories(cache);
      return;
    }
    
    try {
      const payload = await ShopServicePostgreSQL.getAllCategories();
      // console.log("payload", payload)

      SetCategories(payload['data']);
      SaveCategories(payload['data']);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * mengambil daftar rekomendasi produk berdasrkan keyword
   * 
   * @param {string} word keyword yang diketik user
   * @param {AbortSignal} signal signal untuk membatalkan request yang sedang berjalan
   * 
   * @returns {Promise<void>} 
   */
  const fetchSuggestions = async (word, signal) => {
    try {
      if (!word.trim()) {
        setSuggestions([]);
        return;
      }

      const payload = await ShopServicePostgreSQL.getSuggestions(word, signal);
      setSuggestions(payload);

    } catch (error) {
      /** @type {AxiosError} */
      const err = error;
      
      /** 
       * ada versi err.name === "CanceledError"
       */
      if (err.code === "ERR_CANCELED") { 
        return;
      }

      console.error(err);
    }
  };

  const updatePageState = (payloadData) => {
    const products = payloadData?.['data']
    const pagination = payloadData?.['pagination']

    setProducts(products);
    SetPage(pagination["page"]);
    setFirst(pagination["first"]);
    setLast(pagination["last"]);
    setTotalPage(pagination["totalPage"]);
  };
  
  const callProducts = async (target, keywordTarget = keyword) => {
    setLoading(true);

    try {
      const cache = loadProductCached(target, keywordTarget, categoryId);
      
      if (cache && !isProductCachedExpired(cache)) {
        updatePageState(cache);
        return;
      }
      await fetchProducts(target, keywordTarget);

    } catch (err) {
      console.error(err)
    } finally {
        setLoading(false);
    }
  }

  const initializeProducts = async () => {
    await Promise.all([
      fetchCategories(),
      callProducts(0)
    ]);
  };

  useEffect(() => {
    initializeProducts();
  }, []);

  const visiblePages = getVisiblePage(page, totalPage);

  const contextValue = {
    products,
    categories,
    loading,
    categoryId,
    setCategoryId,

    page,
    first,
    last,
    totalPage,

    visiblePages,
    callProducts,

    keyword,
    setKeyword,

    suggestions,
    setSuggestions,
    fetchSuggestions,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
