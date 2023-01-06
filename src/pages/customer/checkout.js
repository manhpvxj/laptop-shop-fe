import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { Button, Card, CardHeader, Grid, Typography, CardContent, Stack, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  decreaseQuantity,
  increaseQuantity,
  removeProductFromCart,
  setTotalItems,
  setTotalPrice,
  totalItemsSelector,
  totalPriceSelector
} from "../../redux/cart.slice";
// components
import Iconify from "../../utils/Iconify";
//
import { useEffect } from "react";
import CheckoutProductListRow from "../../components/customer/Checkout/CheckoutListProducts";
import CheckoutSummary from "../../components/customer/Checkout/CheckoutSummary";
import Footer from '../../components/customer/Footer/Footer';
import {FormProvider, RHFTextField } from '../../components/common/react-hook-form';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const total = useSelector(totalPriceSelector);
  const totalItems = useSelector(totalItemsSelector);
  useEffect(() => {
    dispatch(setTotalPrice(cart));
    dispatch(setTotalItems(cart));
  }, [cart, dispatch]);
  const handleDeleteCart = (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };
  const Main = styled('div')(() => ({
    overflow: 'auto',
    minHeight: '100%',
    padding: '120px 30px 16px 30px',
  }));

  const onSubmit = async () => {

  }
  const BillingSchema = Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().min(8, "Phone Number is invalid"),
    address: Yup.string().required("Address is required"),
  });
  const defaultValues = {
    createAt: new Date(),
    totalPrice: total,
    fullName: '',
    phoneNumber: '',
    address: '',
    product: [],
  }
  const methods = useForm({
    resolver: yupResolver(BillingSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Main>
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Cart
                <Typography component="span" sx={{ color: "text.secondary" }}>
                  &nbsp;({totalItems} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />
            <CheckoutProductListRow
              products={cart}
              onDelete={handleDeleteCart}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
            />
        </Card>

        <Button
          color="inherit"
          component={RouterLink}
          to={"/"}
          startIcon={<Iconify icon={"eva:arrow-ios-back-fill"} />}
        >
          Continue Shopping
        </Button>
      </Grid>

      <Grid item xs={12} md={4}>
        <CheckoutSummary total={total} /> 
        <Card>
          <CardHeader title="Address"/>
          <CardContent>
            <Stack spacing={3}>
          <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="fullName" label="Full Name" />
              <RHFTextField name="phone" label="Phone Number" />
            </Box>

            <RHFTextField name="address" label="Address" />
            </Stack>
          </CardContent>
        </Card>
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={cart.length === 0}
          sx={{
            mt: 3,
          }}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
    <Footer/>
    </Main>
    </FormProvider>
  );
}
