import { Box, Collapse, Divider, Drawer, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Iconify from "../../../utils/Iconify";
import { CategoryConfig } from "./categories-config";
import CategoriesSection from "./categories-section";
import { Link } from 'react-router-dom';

const StyledAccount = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  padding: "2px",
  marginLeft: "16px",
}));

export default function Category() {
  const categoriesConfig = CategoryConfig();
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(!open);
  };
  const renderContent = (
    <Box className="mb-5 mx-3">
      <Box className="mt-10 mb-10">
      <Link to="/">
        <StyledAccount>
          <Iconify icon="arcticons:animezone" width={40} />
          <Box className="ml-4">
            <Typography variant="h6" className="text-zinc-800">
              Laptop MT
            </Typography>
          </Box>
        </StyledAccount>
        </Link>
      </Box>
      <Divider />
      <Box
        className="mt-4 mb-4 cursor-pointer flex items-center justify-center"
        onClick={handleOpen}
      >
        <Typography variant="h6" align="center">
          Categories
        </Typography>
        {open ? (
          <Iconify icon="ic:outline-expand-less" />
        ) : (
          <Iconify icon="ic:outline-expand-more" />
        )}
      </Box>
      <Divider />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CategoriesSection data={categoriesConfig} />
      </Collapse>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: 240 },
      }}
    >
      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            width: 240,
            bgcolor: "background.default",
          },
        }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
}
