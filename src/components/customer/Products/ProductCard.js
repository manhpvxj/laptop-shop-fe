import PropTypes from "prop-types";
// @mui
import { Box, Card, Link, Typography, Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../../utils/formatCurrency";
import Iconify from "../../../utils/Iconify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cart.slice";
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
  const { name, priceSell, image = [] } = product;
    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            priceSell: product.priceSell,
            image: product.image[0],
        }))
    }
  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <StyledProductImg alt={name} src={image[0]} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">
            {`${fCurrency(priceSell)} VND`}
          </Typography>
          <Box className="cursor-pointer" onClick={handleAddToCart}>
            <Iconify icon="eva:shopping-cart-fill" />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
