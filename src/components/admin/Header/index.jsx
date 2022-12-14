import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Stack} from '@mui/material';
// utils
import { bgBlur } from '../../../utils/bgBlur';
//
import { UserPopover } from '..';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_DESKTOP = 92;


const StyledRoot = styled(AppBar)(() => ({
  ...bgBlur({ color: '#fff' }),
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

export default function Header() {
  return (
    <StyledRoot>
      <StyledToolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
            <UserPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
