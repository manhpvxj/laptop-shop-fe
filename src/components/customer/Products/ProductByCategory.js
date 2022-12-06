// @mui
import { Container, Stack, Box } from '@mui/material';
// components
import ProductSort from './ProductSort';
import ProductList from './ProductList';
import ProductCart from './ProductCart';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosClient from '../../../api/axiosClient';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function ProductsByBrandPage() {
  const [listProducts, setListProducts] = useState([]);
    const {brand} = useParams();
  useEffect(() => {
    const getProductsListByBrand = async () => {
      const products = [];
      const { data } = await axiosClient.get(`/customer/products?category=${brand}`);
      data.forEach((e) => {
        products.push(e);
      })
      setListProducts(products);
     }; 
     getProductsListByBrand();
  }, [brand]) 

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
