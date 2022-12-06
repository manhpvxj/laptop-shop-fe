import PropTypes from "prop-types";
// @mui
import {
    Box,
    List, ListItemButton, ListItemIcon, ListItemText
} from "@mui/material";
import {useNavigate} from 'react-router-dom';

// ----------------------------------------------------------------------

CategoriesSection.propTypes = {
  data: PropTypes.array,
};

export default function CategoriesSection({ data = [] }) {
  const navigate = useNavigate();
  const gotoBrand = (brand) => {
    navigate(`/category/${brand}`)
  }

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
    >
      {data.map((item) => {
        return (
          <Box key={item.title} onClick={() => gotoBrand(item.id)}>
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

