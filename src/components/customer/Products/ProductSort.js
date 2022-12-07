import { useState } from 'react';
// @mui
import { Menu, Button, MenuItem, Typography, Stack } from '@mui/material';
// component
import Iconify from '../../../utils/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { searchStatusSelector, setSearchBrand, setSearchStatus, setSearchText } from '../../../redux/search.slice';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];

export default function ShopProductSort() {
  const [open, setOpen] = useState(null);
  const status = useSelector(searchStatusSelector);
  const dispatch = useDispatch();
  const handleResetFilter = () => {
    dispatch(setSearchStatus({
      value: 'newest',
      label: 'Newest',
    }));
    dispatch(setSearchBrand(-1));
    dispatch(setSearchText(''));
  }
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
     <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {status.label}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === status}
            onClick={() => {
                dispatch(setSearchStatus(option));
                handleClose();}}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
      <Button color='inherit' onClick={handleResetFilter}>Reset</Button>
      </Stack>
    </>
  );
}
