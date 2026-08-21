import React from 'react'
import "./recommendation.css";
import { useShop } from '../../../context/shop/hook/shop-hook';

export const RecommendationPanel = () => {
    const { suggestions, setSuggestions, callProducts, setKeyword} = useShop();
    console.log("suggestions: ", suggestions);

    if (suggestions?.length === 0) {
        return null;
    }

    const handleRecommendationClick = (value) => {
        setKeyword(value);
        setSuggestions([]);

        callProducts(0, value);
    };

    return (
        <div className='recommendation'>
            {
                suggestions['data'].map((product) => (
                    <div
                        key={product.id}
                        className='recommendation-item'
                        onClick={() => handleRecommendationClick(product.name)}
                    >
                        {product.name}
                    </div>
                ))
            }
        </div>
    )
}