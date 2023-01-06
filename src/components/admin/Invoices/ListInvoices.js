import { useState, useEffect } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Iconify from "../../../utils/Iconify";
import InvoicesListHead from "./TableHead";
import axiosClient from "../../../api/axiosClient";
import { Link } from "react-router-dom";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "invoiceId", label: "ID", alignRight: false },
  { id: "createAt", label: "Create Date", alignRight: false },
  { id: "updateAt", label: "Update Date", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "totalPrice", label: "Total Price", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function ListInvoices() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [total, setTotal] = useState({});

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const [listInvoices, setListInvoices] = useState([]);
  useEffect(() => {
    const getProductsList = async () => {
      const { data } = await axiosClient.get(`/invoices`, {
        params: {
          page: page + 1,
          size: rowsPerPage,
        },
      });
      setListInvoices(data.data);
      setTotal(data.total);
    };
    getProductsList();
  }, [page, rowsPerPage]);
  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Product
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            <Link to={"create"}>New Product</Link>
          </Button>
        </Stack>

        <Card>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <InvoicesListHead headLabel={TABLE_HEAD} />
              <TableBody>
                {listInvoices.map((row) => {
                  const { id, createAt, updateAt, status, totalPrice } = row;

                  return (
                    <TableRow hover key={id} tabIndex={-1} role="checkbox">
                      <TableCell align="left">{id}</TableCell>
                      <TableCell align="left">
                            {createAt}
                      </TableCell>

                      <TableCell align="left">{updateAt}</TableCell>

                      <TableCell align="left">{totalPrice}</TableCell>

                      <TableCell align="right">
                        <IconButton
                          size="large"
                          color="inherit"
                          onClick={handleOpenMenu}
                        >
                          <Iconify icon={"eva:more-vertical-fill"} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total?.total || listInvoices.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
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
          },
        }}
      >
        <MenuItem>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
