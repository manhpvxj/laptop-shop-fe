// @mui
import { Container, Stack, Box } from '@mui/material';
// components
import ProductSort from './ProductSort';
import ProductList from './ProductList';
import ProductCart from './ProductCart';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import useDebounce from '../../../hooks/useDebounce';
import { useSelector } from 'react-redux';
import { searchBrandSelector, searchTextSelector } from '../../../redux/search.slice';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [listProducts, setListProducts] = useState([]);
  const search = useDebounce(useSelector(searchTextSelector), 1000);
  const brand = useSelector(searchBrandSelector);
  useEffect(() => {
    const getProductsList = async () => {
      const products = [];
      const { data } = await axiosClient.get(`/customer/products?category=${brand}&search=${search}`);
      data.forEach((e) => {
        products.push(e);
      })
      setListProducts(products);
     }; 
     getProductsList()
  }, [search, brand]) 

  return (
    <>
      <Container>
        <Box sx={{ mb: 5 }}/>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={listProducts} />
        <ProductCart />
      </Container>
    </>
  );
}
