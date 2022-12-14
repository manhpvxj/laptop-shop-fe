import PropTypes from "prop-types";
// @mui
import {
    Box,
    List, ListItemButton, ListItemIcon, ListItemText
} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setPage, setSearchBrand } from "../../../redux/search.slice";

// ----------------------------------------------------------------------

CategoriesSection.propTypes = {
  data: PropTypes.array,
};

export default function CategoriesSection({ data = [] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gotoBrand = (brand) => {
    navigate("/");
    dispatch(setSearchBrand(brand));
    dispatch(setPage(1));
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

