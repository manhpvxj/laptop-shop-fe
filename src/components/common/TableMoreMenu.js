// @mui
import { IconButton } from '@mui/material';
//
import Iconify from '../../utils/Iconify';
import { Popover} from "@mui/material";

// ----------------------------------------------------------------------
export default function TableMoreMenu({ actions, open, onClose, onOpen }) {
  return (
    <>
      <IconButton onClick={onOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
            boxShadow: 1,
          },
        }}
      >
        {actions}
      </Popover>
    </>
  );
}
