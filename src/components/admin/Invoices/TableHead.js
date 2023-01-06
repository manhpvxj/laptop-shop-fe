import PropTypes from 'prop-types';
// @mui
import { TableCell, TableHead, TableRow } from '@mui/material';

// ----------------------------------------------------------------------
InvoicesListHead.propTypes = {
  headLabel: PropTypes.array,
};

export default function InvoicesListHead({
  headLabel,
}) {

  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
          >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
