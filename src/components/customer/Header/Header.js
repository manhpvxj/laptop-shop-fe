import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/bgBlur';
// components
import Iconify from '../../../utils/Iconify';
//
import Searchbar from './Searchbar';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_DESKTOP = 92;


const StyledRoot = styled(AppBar)(() => ({
  ...bgBlur({ color: '#F9FAFB' }),
  boxShadow: 'none',
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
}));

const StyledToolbar = styled(Toolbar)(() => ({
  minHeight: HEADER_DESKTOP,
  padding: '0 40px',
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />
      </StyledToolbar>
    </StyledRoot>
  );
}
