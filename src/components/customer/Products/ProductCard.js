import PropTypes from "prop-types";
// @mui
import { Box, Card, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from 'react-router-dom';
// utils
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cart.slice";
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
  const { id, name, priceSell, image = [] } = product;
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        name,
        priceSell,
        image: image[0],
        quantity: 1,
      })
    );
  };
  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <StyledProductImg alt={name} src={image[0]} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={`/products/${id}`}>
        <Typography variant="subtitle1" noWrap sx={{fontWeight: 600}}>
          {name}
        </Typography>
        </Link>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1" sx={{color: 'red', fontWeight: 600}}>
            {`${fCurrency(priceSell)}₫`}
          </Typography>
          <Box className="cursor-pointer" onClick={handleAddToCart}>
            <Iconify icon="eva:shopping-cart-fill" />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
