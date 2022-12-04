// @mui
import { styled, alpha } from '@mui/material/styles';
import { Badge } from '@mui/material';
// component
import Iconify from '../../../utils/Iconify';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../../redux/cart.slice';

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

export default function CartWidget() {
    const cartAmount = useSelector(cartSelector)
  return (
    <StyledRoot>
      <Badge showZero badgeContent={cartAmount.length} color="error" max={99}>
        <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
      </Badge>
    </StyledRoot>
  );
}
