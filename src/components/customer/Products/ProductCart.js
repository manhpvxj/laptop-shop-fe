// @mui
import { styled, alpha } from '@mui/material/styles';
import { Badge } from '@mui/material';
// component
import Iconify from '../../../utils/Iconify';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../../redux/cart.slice';
import { Link } from 'react-router-dom';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(() => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: '128px',
  height: '40px',
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingTop: '10px',
  boxShadow: `0 20px 40px -4px ${alpha('#919EAB', 0.16)}`,
  color: '#212B36',
  backgroundColor: '#fff',
  borderTopLeftRadius: 8,
  borderBottomLeftRadius: 8,
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function ProductCart() {
    const carts = useSelector(cartSelector);
    const cartAmount = carts.map((cart) => cart.quantity).reduce((acc, curr) => acc + curr, 0);
  return (
    <StyledRoot>
      <Link to="/cart">
      <Badge showZero badgeContent={cartAmount} color="error" max={99}>
        <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
      </Badge>
      </Link>
    </StyledRoot>
  );
}
