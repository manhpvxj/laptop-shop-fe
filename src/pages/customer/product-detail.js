import { Card, Grid, Container } from '@mui/material';
import ProductCart from "../../components/customer/Products/ProductCart";
import ProductDetailsCarousel from '../../components/customer/ProductDetail/ProductCarousel';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { productDetailSelector, setProductDetail } from '../../redux/product.slice';
import { useDispatch, useSelector } from 'react-redux';
import ProductInformation from '../../components/customer/ProductDetail/ProductInformation';
import { cartSelector, addToCart } from '../../redux/cart.slice';

export const ProductDetailPage = () => {
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const {id} = useParams();
    const {product} = useSelector(productDetailSelector);
    const cart = useSelector(cartSelector);
    const getProductById = async () => {
        const imgs = [];
        const {data} = await axiosClient.get(`/customer/products/${id}`);
        dispatch(setProductDetail(data));
        data.image.forEach(e => {
            imgs.push(e)
        });
        setImages(imgs);
    }
    useEffect(() => {
        getProductById();
    }, [])
    const handleAddToCart = () => {
        dispatch(
          addToCart({
            id: product.id,
            name: product.name,
            priceSell: product.priceSell,
            image: product.image[0],
            quantity: 1,
          })
        );
      };
    return (
        <>
        <Container maxWidth={'lg'}>
            <ProductCart/>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={6}>
                  <ProductDetailsCarousel images={images} />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <ProductInformation
                    product={{...product}}
                    cart={cart}
                    onAddCart={handleAddToCart}
                  />
                </Grid>
            </Grid>
            </Card>
            </Container>
        </>
    )
}