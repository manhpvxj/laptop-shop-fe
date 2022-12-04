import PropTypes from "prop-types";
// @mui
import {
    Box,
    List, ListItemButton, ListItemIcon, ListItemText
} from "@mui/material";

// ----------------------------------------------------------------------

CategoriesSection.propTypes = {
  data: PropTypes.array,
};

export default function CategoriesSection({ data = [] }) {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
    >
      {data.map((item) => {
        return (
          <Box key={item.title}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </Box>
        );
      })}
    </List>
  );
}

