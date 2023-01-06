// @mui
import { Container, Stack, Box, Pagination } from "@mui/material";
// components
import ProductSort from "./ProductSort";
import ProductList from "./ProductList";
import ProductCart from "./ProductCart";
import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../../../api/axiosClient";
import useDebounce from "../../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import {
  pageSelector,
  searchBrandSelector,
  searchTextSelector,
  setPage,
} from "../../../redux/search.slice";
import { Loading } from "../../common/Loading";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [listProducts, setListProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const page = useSelector(pageSelector);
  const search = useDebounce(useSelector(searchTextSelector), 1000);
  const brand = useSelector(searchBrandSelector);
  const dispatch = useDispatch();
  const getProductsList = async () => {
    const { data } = await axiosClient.get(`/customer/products`, {
      params: {
        category: brand,
        search,
        page,
      },
    });

    setListProducts(data.data);
  };
  useEffect(() => {
    setLoading(true);
    getProductsList();
    setLoading(false);
  }, [search, brand, page]);
  const handleChangePage = (event, value) => {
    dispatch(setPage(value));
  };
  return (
    <>
      <Container>
        <Box sx={{ mb: 5 }} />
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductSort />
          </Stack>
        </Stack>
        <ProductCart />
        {isLoading ? <Loading /> : <ProductList products={listProducts} />}
        {
          listProducts.length > 0 && <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mt: 5 }}
        >
          <Pagination count={10} page={page} onChange={handleChangePage}/>
        </Stack>
        }
        
      </Container>
    </>
  );
}
