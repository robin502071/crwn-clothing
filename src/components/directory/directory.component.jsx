import './directory.styles.scss';
import Category from '../category-item/category-item.component';

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => {
        return <Category key={category.id} category={category} />;
      })}
    </div>
  );
};

export default Directory;
