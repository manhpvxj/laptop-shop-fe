// @mui
import { alpha } from '@mui/material/styles';
import { List, IconButton, ListItem } from '@mui/material';
//
import Image from '../../utils/Image';
import Iconify from '../../utils/Iconify';
import getFileData from '../../utils/getFileData';
// ----------------------------------------------------------------------

export default function MultiFilePreview({
  files = [],
  onRemove,
}) {
  const hasFile = files.length > 0;

  return (
    <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
        {files.map((file, index) => {
          const { key, preview } = getFileData(file, index);
            return (
              <ListItem
                key={key}
                component={"div"}
                sx={{
                  p: 0,
                  m: 0.5,
                  width: 80,
                  height: 80,
                  borderRadius: 1.25,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'inline-flex',
                  border: `solid 1px`,
                }}
              >
                <Image alt="preview" src={preview} ratio="1/1" />

                {onRemove && (
                  <IconButton
                    size="small"
                    onClick={() => onRemove(file)}
                    sx={{
                      top: 6,
                      p: '2px',
                      right: 6,
                      position: 'absolute',
                      color: 'common.white',
                      bgcolor: alpha('#161C24', 0.72),
                      '&:hover': {
                        bgcolor: alpha('#161C24', 0.48),
                      },
                    }}
                  >
                    <Iconify icon={'eva:close-fill'} />
                  </IconButton>
                )}
              </ListItem>
            );
          }
        )}
    </List>
  );
}
