import { Link as RouterLink } from "react-router-dom";
// form
// @mui
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
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
//
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import CheckoutProductListRow from "../../components/customer/Checkout/CheckoutListProducts";
import CheckoutSummary from "../../components/customer/Checkout/CheckoutSummary";
import Footer from "../../components/customer/Footer/Footer";
import { CheckoutInformation } from "../../components/customer/Checkout/CheckoutInformation";
import CheckoutOrderComplete from '../../components/customer/Checkout/CheckoutComplete';
// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const total = useSelector(totalPriceSelector);
  const totalItems = useSelector(totalItemsSelector);
  const information = useSelector((state) => state.cart.information);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    dispatch(setTotalPrice(cart));
    dispatch(setTotalItems(cart));
  }, [cart?.cart]);
  const handleDeleteCart = (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };
  const Main = styled("div")(() => ({
    overflow: "auto",
    minHeight: "100%",
    padding: "120px 30px 16px 30px",
  }));
  const handleCheckout = async () => {
    setLoading(true);
    const detailInvoices = cart.map((item) => {
      return {
        productId: item.id,
        quantity: item.quantity,
      };
    });
    const data = {
      createdAt: new Date().toUTCString(),
      totalPrice: total,
      fullName: information.fullName,
      phoneNumber: information.phoneNumber,
      address: information.address,
      status: "CHECKING",
      detailInvoices,
    };
    try {
      const res = await axiosClient.post("/customer/invoices/create", data);
      if (res) {
        setOpen(true);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  return (
    <Main>
      {isOpen ? (
        <CheckoutOrderComplete open={true} />
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3 }}>
                <CardHeader
                  title={
                    <Typography variant="h6">
                      Cart
                      <Typography
                        component="span"
                        sx={{ color: "text.secondary" }}
                      >
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
                <CardHeader title="Address" />
                <CardContent>
                  <CheckoutInformation />
                </CardContent>
              </Card>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={cart.length === 0}
                loading={isLoading}
                sx={{
                  mt: 3,
                }}
                onClick={handleCheckout}
              >
                Check Out
              </LoadingButton>
            </Grid>
          </Grid>
          <Footer />
        </>
      )}
    </Main>
  );
}
