import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import './category.styles.scss';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/categories.selector';
import Spinner from '../../components/spinner/spinner.component';
const Category = () => {
  // 從網址列上提取 :category
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const IsLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {IsLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default Category;
