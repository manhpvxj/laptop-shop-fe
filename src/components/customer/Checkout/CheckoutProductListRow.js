// @mui
import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
  } from "@mui/material";
  import { alpha, styled } from "@mui/material/styles";
  import { fCurrency } from "../../../utils/formatCurrency";
  // components
  import Iconify from "../../../utils/Iconify";
  import Image from "../../../utils/Image";
  import ProductListHead from "../../admin/Products/TableHead";
  import { memo } from 'react';

function CheckoutProductListRow({ row, onDelete, onDecrease, onIncrease }) {
    const { name, priceSell, cover, quantity, available } = row;
    return (
      <TableRow>
        <TableCell sx={{ display: "flex", alignItems: "center" }}>
          <Image
            alt="product image"
            src={cover}
            sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
          />
          <Typography variant="subtitle2" sx={{ maxWidth: 240 }}>
            {name}
          </Typography>
        </TableCell>
  
        <TableCell>{fCurrency(priceSell)}₫</TableCell>
  
        <TableCell>
          <Incrementer
            quantity={quantity}
            available={available}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
          />
        </TableCell>
  
        <TableCell align="left">{fCurrency(priceSell * quantity)}₫</TableCell>
  
        <TableCell align="left">
          <IconButton onClick={onDelete} sx={{ color: "red" }}>
            <Iconify icon={"eva:trash-2-outline"} width={20} height={20} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
  export default memo(CheckoutProductListRow)
  // ----------------------------------------------------------------------
  const IncrementerStyle = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "4px",
    padding: "4px 6px",
    borderRadius: 4,
    border: `solid 1px ${alpha("#919EAB", 0.32)}`,
  }));

  
  function Incrementer({ available, quantity, onIncrease, onDecrease }) {
    return (
      <Box sx={{ width: 96, textAlign: "left" }}>
        <IncrementerStyle>
          <IconButton
            size="small"
            color="inherit"
            onClick={onDecrease}
            disabled={quantity <= 1}
          >
            <Iconify icon={"eva:minus-fill"} width={16} height={16} />
          </IconButton>
  
          {quantity}
  
          <IconButton
            size="small"
            color="inherit"
            onClick={onIncrease}
            disabled={quantity >= available}
          >
            <Iconify icon={"eva:plus-fill"} width={16} height={16} />
          </IconButton>
        </IncrementerStyle>
  
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Available: {available}
        </Typography>
      </Box>
    );
  }
  