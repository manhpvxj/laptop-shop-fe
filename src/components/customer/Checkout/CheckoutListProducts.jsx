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
import CheckoutProductListRow from './CheckoutProductListRow';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "product", label: "Product" },
  { id: "price", label: "Price" },
  { id: "quantity", label: "Quantity" },
  { id: "totalPrice", label: "Total Price", align: "right" },
  { id: "" },
];



// ----------------------------------------------------------------------

export default function CheckoutProductList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <ProductListHead headLabel={TABLE_HEAD} />

        <TableBody>
          {products.map((row) => (
            <CheckoutProductListRow
              key={row.id}
              row={row}
              onDelete={() => onDelete(row.id)}
              onDecrease={() => onDecreaseQuantity(row.id)}
              onIncrease={() => onIncreaseQuantity(row.id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ----------------------------------------------------------------------

