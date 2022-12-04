import PropTypes from "prop-types";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
// @mui
import {
  Box,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Collapse,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
  isHasChildren: PropTypes.bool,
};
const StyledNavItem = styled((props) => <ListItemButton {...props} />)(() => ({
  lineHeight: 22,
  fontSize: "1rem",
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: "#637381",
  borderRadius: 15,
}));

const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function NavSection({ data = [] }) {
  const [open, setOpen] = useState({});
  const handleOpen = (key) => {
    setOpen({
      [key]: !open[key],
    });
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
    >
      {data.map((item) => {
        const { children = [] } = item;
        const isHasChildren = children.length !== 0;
        return (
          <Box key={item.title}>
            <ListItemButton onClick={() => handleOpen(item.title)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
      {isHasChildren ? ( 
        <>              
        {open[item.title] ? <ExpandLess /> : <ExpandMore />}
        </> ) : ( <></>)
              }
            </ListItemButton>
            {isHasChildren ? ( 
        <>  
          <Collapse in={open[item.title]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {children.map((child) => {
                  return (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      component={RouterLink}
                      to={child.path}
                    >
                      <ListItemText primary={child.title} />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>            
        </> ) : ( <></>)
              }
            
          
          </Box>
        );
      })}
    </List>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  isHaschildren: PropTypes.bool,
};

function NavItem({item}) {
  const { title, path, icon, children = [] } = item;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      onClick={handleOpen}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon}</StyledNavItemIcon>
      <ListItemText disableTypography primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          {children.map((child) => {
            return (
              <ListItemButton
                sx={{ ml: 12, height: 80 }}
              >
                <ListItemText primary={child.title} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>      
    </StyledNavItem>
  );
}
