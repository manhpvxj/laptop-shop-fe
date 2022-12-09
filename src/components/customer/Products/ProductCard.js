import PropTypes from "prop-types";
// @mui
import { Box, Card, Stack, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
// utils
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  cartSelector,
  setTotalItems,
} from "../../../redux/cart.slice";
import { fCurrency } from "../../../utils/formatCurrency";
import Iconify from "../../../utils/Iconify";
// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const dispatch = useDispatch();
  const { id, name, priceSell, image = [], quantity } = product;
  const cart = useSelector(cartSelector);
  const handleAddToCart = () => {
    const currentProduct = cart.find((item) => item.id === id);
    if (currentProduct) {
      dispatch(
        addToCart({ ...currentProduct, quantity: currentProduct.quantity + 1 })
      );
      dispatch(setTotalItems(cart));
      return;
    }
    dispatch(
      addToCart({
        id,
        name,
        priceSell,
        image: image[0],
        available: quantity,
        quantity: 1,
      })
    );
    dispatch(setTotalItems(cart));
  };
  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <StyledProductImg alt={name} src={image[0]} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={`/products/${id}`}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>
        </Link>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="subtitle1"
            sx={{ color: "red", fontWeight: 600 }}
          >
            {`${fCurrency(priceSell)}₫`}
          </Typography>
          <IconButton variant="text" onClick={handleAddToCart}>
            <Iconify icon="eva:shopping-cart-fill" />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}
