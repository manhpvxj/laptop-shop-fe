import { useEffect, useState } from "react";
// @mui
import {
  Card, Chip, Container, IconButton, MenuItem, Popover, Stack, Table, TableBody,
  TableCell, TableContainer,
  TablePagination, TableRow, Typography
} from "@mui/material";
// components
import axiosClient from "../../../api/axiosClient";
import { formatDate } from '../../../utils/formatDate';
import { fCurrency } from "../../../utils/formatCurrency";
import Iconify from "../../../utils/Iconify";
import InvoicesListHead from "./TableHead";
import TableMoreMenu from '../../common/TableMoreMenu';
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

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

  const handleEditRow = (id) => {
    navigate(`/admin/invoices/${id}`)
  }
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
            Invoice
          </Typography>
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
                            {formatDate(createAt)}
                      </TableCell>

                      <TableCell align="left">{formatDate(updateAt)}</TableCell>
                      <TableCell align="left">
                      <Chip label={status} color={
                        (status === 'DELIVERING' && 'warning') ||
                        (status === 'CHECKING' && 'info') ||
                        (status === 'SUCCESS' && 'success') ||
                        'default'
                      } variant="outlined" />
                      </TableCell>
                      <TableCell align="left">{fCurrency(totalPrice)}</TableCell>

                      <TableCell align="right">
                      <TableMoreMenu
                          open={open}
                          onOpen={handleOpenMenu}
                          onClose={handleCloseMenu}
                          actions={
                            <>
                              <MenuItem
                                onClick={() => {
                                  handleEditRow(id);
                                  handleCloseMenu();
                                }}>
                                <Iconify
                                  icon={"eva:edit-fill"}
                                  sx={{ mr: 2 }}
                                />
                                Edit
                              </MenuItem>

                              <MenuItem sx={{ color: "error.main" }}>
                                <Iconify
                                  icon={"eva:trash-2-outline"}
                                  sx={{ mr: 2 }}
                                />
                                Delete
                              </MenuItem>
                            </>
                          }
                        />
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
    </>
  );
}
