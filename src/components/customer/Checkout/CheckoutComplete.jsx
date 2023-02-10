import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Divider, Typography, Stack } from '@mui/material';
// redux
import { useDispatch } from 'react-redux';
// components
import Iconify from '../../../utils/Iconify';
import { removeAllFromCart } from '../../../redux/cart.slice';
import Image from '../../../utils/Image';

// ----------------------------------------------------------------------

const DialogStyle = styled('div')(() => ({
  '& .MuiDialog-paper': {
    margin: 0,
      maxWidth: 'calc(100% - 48px)',
      maxHeight: 'calc(100% - 48px)',
  },
}));

// ----------------------------------------------------------------------

export default function CheckoutOrderComplete({ open }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleGoBack = () => {
    dispatch(removeAllFromCart([]));
    navigate('/');
  };

  return (
    <DialogStyle fullScreen open={open}>
      <Box sx={{ p: 4, maxWidth: 480, margin: 'auto' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" paragraph>
            Thank you for your purchase!
          </Typography>

          <Image ratio='1/1' src={'/assets/checkout_complete.png'} sx={{ height: 260, my: 10 }} />

          <Typography align="left" paragraph>
            Thanks for placing order &nbsp;
            <Link href="#">01dc1370-3df6-11eb-b378-0242ac130002</Link>
          </Typography>

          <Typography align="left" sx={{ color: 'text.secondary' }}>
            We will send you a notification within 5 days when it ships.
            <br /> <br /> If you have any question or queries then fell to get in contact us. <br />{' '}
            <br /> All the best,
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Button
            color="inherit"
            onClick={handleGoBack}
            startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
          >
            Continue Shopping
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon={'ant-design:file-pdf-filled'} />}
          >
            Download as PDF
          </Button>
        </Stack>
      </Box>
    </DialogStyle>
  );
}
