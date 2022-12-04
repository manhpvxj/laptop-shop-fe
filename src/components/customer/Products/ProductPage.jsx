// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import ProductSort from './ProductSort';
import ProductList from './ProductList';
import CartWidget from './ProductCart';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosClient from '../../../api/axiosClient';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    const getProductsList = async () => {
      const products = [];
      const { data } = await axiosClient.get("/customer/products");
      data.forEach((e) => {
        products.push(e);
      })
      setListProducts(products);
     }; 
     getProductsList()
  }, []) 

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={listProducts} />
        <CartWidget />
      </Container>
    </>
  );
}
