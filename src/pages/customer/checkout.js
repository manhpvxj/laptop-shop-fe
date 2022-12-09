import { Link as RouterLink } from "react-router-dom";
// @mui
import { Button, Card, CardHeader, Grid, Typography } from "@mui/material";
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
  totalPriceSelector,
} from "../../redux/cart.slice";
// components
import Iconify from "../../utils/Iconify";
import Scrollbar from "../../utils/Scrollbar";
//
import { useEffect } from "react";
import CheckoutProductListRow from "../../components/customer/Checkout/CheckoutListProducts";
import CheckoutSummary from "../../components/customer/Checkout/CheckoutSummary";

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

  return (
    <Grid container spacing={3}>
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

          <Scrollbar>
            <CheckoutProductListRow
              products={cart}
              onDelete={handleDeleteCart}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
            />
          </Scrollbar>
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
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={cart.length === 0}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
}
