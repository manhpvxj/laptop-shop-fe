import { useState } from 'react';
import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fCurrency } from '../../../utils/formatCurrency';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cart.slice';
import Iconify from '../../../utils/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  padding: '40px 64px',
}));

// ----------------------------------------------------------------------

export default function ProductInformation({
  cart,
  product,
  onAddCart,
}) {
    const [value, setValue] = useState(1);
    const dispatch = useDispatch();
  const {
    id,
    name,
    priceSell,
    quantity,
  } = product;
  const currentProduct = cart.find((item) => item.id === id); 
  const handleIncreaseQuantity = () => {
    dispatch(addToCart({...currentProduct, quantity: currentProduct.quantity + 1}));
  }
  const handleDecreaseQuantity = () => {
    dispatch(addToCart({...currentProduct, quantity: currentProduct.quantity - 1}));
  }
  const isMaxQuantity = cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >= quantity;

  return (
    <RootStyle>
        <Typography variant="h5" paragraph>
          {name}
        </Typography>

        <Typography variant="h4" sx={{ mb: 3 }}>
            {`${fCurrency(priceSell)}₫`}
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Quantity
          </Typography>

          <div>
            <Incrementer
              name="quantity"
              quantity={value}
              available={quantity}
              onIncrementQuantity={() => {setValue(value + 1); handleIncreaseQuantity()}}
              onDecrementQuantity={() => {setValue(value - 1); handleDecreaseQuantity()}}
            />
            <Typography
              variant="caption"
              component="div"
              sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}
            >
              Available: {quantity}
            </Typography>
          </div>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
          <Button
            fullWidth
            disabled={isMaxQuantity}
            size="large"
            color="warning"
            variant="contained"
            startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
            onClick={onAddCart}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Add to Cart
          </Button>

          <Button fullWidth size="large" type="submit" variant="contained">
            Buy Now
          </Button>
        </Stack>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------



function Incrementer({
  available,
  quantity,
  onIncrementQuantity,
  onDecrementQuantity,
}) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton
        size="small"
        color="inherit"
        disabled={quantity <= 1}
        onClick={onDecrementQuantity}
      >
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton
        size="small"
        color="inherit"
        disabled={quantity >= available}
        onClick={onIncrementQuantity}
      >
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}
