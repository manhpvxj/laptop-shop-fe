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
import ProductListHead from "./TableHead";
import axiosClient from "../../../api/axiosClient";
import Image from "../../../utils/Image";
import { Link } from "react-router-dom";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "productId", label: "ID", alignRight: false },
  { id: "cover", label: "Cover", alignRight: false },
  { id: "name", label: "Name", alignRight: false },
  { id: "priceSell", label: "Price", alignRight: false },
  { id: "quantity", label: "Quantity", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function ProductPage() {
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

  const [listProducts, setListProducts] = useState([]);
  useEffect(() => {
    const getProductsList = async () => {
      const { data } = await axiosClient.get(`/customer/products`, {
        params: {
          search: "",
          page: page + 1,
          size: rowsPerPage,
          category: -1,
        },
      });
      setListProducts(data.data);
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
              <ProductListHead headLabel={TABLE_HEAD} />
              <TableBody>
                {listProducts.map((row) => {
                  const { id, name, priceSell, quantity, cover } = row;

                  return (
                    <TableRow hover key={id} tabIndex={-1} role="checkbox">
                      <TableCell align="left">{id}</TableCell>
                      <TableCell align="left">
                        <Image
                          alt="product image"
                          src={cover}
                          sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 1.5,
                            mr: 2,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        sx={{ pl: 2 }}
                      >
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell align="left">{priceSell}</TableCell>

                      <TableCell align="left">{quantity}</TableCell>

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
            count={total?.total || listProducts.length}
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
