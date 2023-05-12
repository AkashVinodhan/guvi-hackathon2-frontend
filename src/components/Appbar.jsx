import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

//icons
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ChatIcon from "@mui/icons-material/Chat";
import InventoryIcon from "@mui/icons-material/Inventory";

const Navbar = () => {
  const nav = useNavigate();

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#121210" }}>
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
            sx={{ color: "white" }}
            onClick={() => nav("/contact")}
            endIcon={<ChatIcon />}
          >
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
