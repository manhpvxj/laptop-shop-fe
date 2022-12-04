import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Drawer, Typography, Avatar } from '@mui/material';

// components
import NavSection from './navbar-section';
//
import navConfig from './navbar-config';
// ----------------------------------------------------------------------

const StyledAccount = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '2px',
  marginLeft: '16px',
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav() {
  const renderContent = (
    <Box className='mb-5 mx-3'>
      <Box className='mt-10 mb-10'>
          <StyledAccount>
            <Avatar src={""} alt="photoURL" />
            <Box className='ml-4'>
              <Typography variant="subtitle2" className="text-zinc-800">
                {localStorage.getItem('username')}
              </Typography>
            </Box>
          </StyledAccount>
      </Box>
      <NavSection data={navConfig}/>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: 240 },
      }}
    >
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: 240,
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
    </Box>
  );
}
