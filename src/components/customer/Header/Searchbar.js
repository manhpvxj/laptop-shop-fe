import { useState } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/bgBlur';
// component
import Iconify from '../../../utils/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { searchTextSelector, setPage, setSearchText } from '../../../redux/search.slice';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;

const StyledSearchbar = styled('div')(() => ({
  ...bgBlur({ color: '#F9FAFB' }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: '0 12px',
  boxShadow: `0 8px 16px 0 ${alpha('#919EAB', 0.16 )}`,
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const searchText = useSelector(searchTextSelector);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              value={searchText}
              onChange={(e) => {
                dispatch(setSearchText(e.target.value));
                setTimeout(dispatch(setPage(1)), 1000);
              }}
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: "fontWeightBold" }}
            />
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
