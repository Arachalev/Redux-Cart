import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id:'p1',
    price:6,
    title: 'My first book',
    describtion: 'The first novel i\'ve ever written'
  },
  {
    id: 'p2',
    price: 90,
    title: 'My second book',
    describtion: 'This book is about monsters and wolves'
  },
  // {
  //   id: 'p3',
  //   price: 45,
  //   title: 'My third book',
  //   describtion: 'This book is about love and heartbreak'
  // },

]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product)=>(         
         <ProductItem
         key = {product.id }
         id = {product.id}
          title={product.title}
          price={product.price}
          description={product.describtion}
        />))}
      </ul>
    </section>
  );
};

export default Products;
