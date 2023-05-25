import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import axios from "axios";

//icons
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ChatIcon from "@mui/icons-material/Chat";
import InventoryIcon from "@mui/icons-material/Inventory";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = ({ isAdmin, setIsAdmin }) => {
  const nav = useNavigate();

  const handleLogout = () => {
    axios
      .get("https://rental-d0go.onrender.com/logout", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setIsAdmin(false);
        nav("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <AppBar sx={{ bgcolor: "#121210", height: "60px" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          onClick={() => nav("/")}
          sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
        >
          Rapid Rentals
        </Typography>
        <LibraryBooksOutlinedIcon
          fontSize="large"
          sx={{ color: "white", display: { xs: "block", sm: "none" } }}
        />
        <Box>
          <Button
            onClick={() => nav("/products")}
            sx={{ color: "white", mr: "10px" }}
            endIcon={<InventoryIcon />}
          >
            Products
          </Button>
          <Button
            onClick={() => nav("/cart")}
            sx={{ color: "white", mr: "10px" }}
            endIcon={<ShoppingCartCheckoutIcon />}
          >
            Cart
          </Button>
          <Button
            sx={{ color: "white", mr: "10px" }}
            onClick={() => nav("/contact")}
            endIcon={<ChatIcon />}
          >
            Contact
          </Button>
          {isAdmin ? (
            <Button
              sx={{ color: "white" }}
              onClick={handleLogout}
              endIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          ) : (
            <Button
              sx={{ color: "white" }}
              onClick={() => nav("/login")}
              endIcon={<AdminPanelSettingsIcon />}
            >
              Admin
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
