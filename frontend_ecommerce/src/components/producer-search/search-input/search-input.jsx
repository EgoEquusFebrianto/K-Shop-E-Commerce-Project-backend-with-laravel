import React, { useEffect, useRef } from 'react'
import "./search-input.css";
import { useShop } from '../../../context/shop/hook/shop-hook';
import { RecommendationPanel } from '../recommendation/recommendation';

export const SearchInput = () => {
  const { keyword, setKeyword, callProducts, setSuggestions, fetchSuggestions} = useShop();
  
  /**
   * Menyimpan ID timer debounce untuk request suggestion.
   * 
   * @type {React.RefObject<number | null>}
   */
  const debounceRef = useRef(null);

  /**
   * Referensi elemen search wrapper.
   * Digunakan untuk mendeteksi klik di luar area pencarian.
   * 
   * @type {React.RefObject<HTMLDivElement | null>}
   */
  const wrapperRef = useRef(null);


  /**
   * Menyimpan AbortController aktif untuk request suggestion.
   * Digunakan untuk membatalkan request sebelumnya ketika user
   * mengetik keyword baru.
   * 
   * @type {React.RefObject<AbortController | null>}
   */
  const abortControllerRef = useRef(null);

  /**
   * @param {string} value 
   */
  const handleKeywordChange = (value) => {

      setKeyword(value);

      clearTimeout(debounceRef.current);

      if (!value.trim()) {
          setSuggestions([]);
          return;
      }

      debounceRef.current = setTimeout(() => {
        abortControllerRef.current?.abort();

        const controller = new AbortController();
        abortControllerRef.current = controller;

        fetchSuggestions(value, controller.signal);
      }, 300);

  };

  useEffect(() => {
    /**
     * @param {MouseEvent} e 
     */
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  useEffect(() => {
    return () => {
        clearTimeout(debounceRef.current);
        abortControllerRef.current?.abort();
    };
  }, []);

  /**
   * 
   * @param {React.KeyboardEvent<HTMLElement>} e 
   */
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") {
      return;
    }

    // console.log("CAllPRODUCTS");
    abortControllerRef.current?.abort();
    setSuggestions([]);
    callProducts(0);
  }

  // console.log("keyword = ", keyword)

  return (
    <div className='search-wrapper' ref={wrapperRef}>
      <input 
          className='search-input'
          type='text'
          placeholder='Search Product...'
          value={keyword}
          onChange={(e) => handleKeywordChange(e.target.value)}
          onKeyDown={handleKeyDown}
      />

      <RecommendationPanel />
    </div>
  )
}