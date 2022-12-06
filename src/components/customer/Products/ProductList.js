import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import { searchStatusSelector } from '../../../redux/search.slice';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products}) {

  const sortStatus = useSelector(searchStatusSelector);

  return (
    <Grid container spacing={3}>
      {sortStatus.value === 'newest' && products.sort((a, b) => {
        if(a.id > b.id) return 1;
        if(a.id < b.id) return -1;
        return 0;
      }).map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
      {
        sortStatus.value === 'priceAsc' && products.sort((a, b) => {
          if(a.priceSell > b.priceSell) return 1;
          if(a.priceSell < b.priceSell) return -1;
          return 0;
        }).map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        ))
      }
      {
        sortStatus.value === 'priceDesc' && products.sort((a, b) => {
          if(a.priceSell > b.priceSell) return -1;
          if(a.priceSell < b.priceSell) return 1;
          return 0;
        }).map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        ))
      }
    </Grid>
  );
}
