import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = ({
  products,
  filteredProducts,
  setfilteredProducts,
  cart,
  setCart,
  isAdmin,
  fetchProducts,
}) => {
  const nav = useNavigate();
  useEffect(() => {
    fetchProducts();
  }, []);
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddToCart = (_id) => {
    let p = cart.filter((product) => product._id == _id)[0];
    if (p) {
      alert("Item is already in cart");
    } else {
      let item = products.filter((product) => product._id == _id)[0];
      item.qty = 1;
      let dup = cart;
      dup.push(item);
      setCart(dup);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // filter category
  const handleClick = (e) => {
    setCategory(e.target.innerText);
    if (e.target.innerText == "All") setfilteredProducts(products);
    else {
      let temp = products.filter(
        (product) => product.category == e.target.innerText
      );
      setfilteredProducts(temp);
    }
  };

  //handle search
  const handleSearch = (e) => {
    let temp = products.filter(({ name }) =>
      name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setfilteredProducts(temp);
  };

  return (
    <>
      <Stack
        direction={"row"}
        marginTop={"70px"}
        sx={{
          ml: "100px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction={"row"} spacing={1}>
          <Chip
            color={category == "All" ? "info" : "default"}
            label="All"
            variant={category == "All" ? "filled" : "outlined"}
            onClick={handleClick}
          />
          <Chip
            color={category == "Photography" ? "info" : "default"}
            label="Photography"
            variant={category == "Photography" ? "filled" : "outlined"}
            onClick={handleClick}
          />
          <Chip
            color={category == "Adventure" ? "info" : "default"}
            label="Adventure"
            variant={category == "Adventure" ? "filled" : "outlined"}
            onClick={handleClick}
          />
          <Chip
            color={category == "Camping" ? "info" : "default"}
            label="Camping"
            variant={category == "Camping" ? "filled" : "outlined"}
            onClick={handleClick}
          />
        </Stack>
        {isAdmin && (
          <Button
            size="small"
            variant="contained"
            onClick={() => nav("/products/new")}
            startIcon={<AddCircleOutlineIcon />}
            sx={{ backgroundColor: "#121210" }}
          >
            Add Product
          </Button>
        )}

        <TextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          onChange={handleSearch}
          sx={{ marginRight: "100px" }}
        />
      </Stack>
      <Grid container spacing={5} justifyContent="center" marginTop={3}>
        {filteredProducts.map(
          ({ name, price, picture, duration, _id, inCart }, index) => (
            <Grid item key={index}>
              <Card
                sx={{
                  width: 345,
                  height: 420,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  border: "1px solid grey",
                  borderRadius: "10px",
                }}
              >
                <CardMedia sx={{ height: 140 }} image={picture} title={name} />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {name}
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    {`${price} ${duration}`}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleAddToCart(_id)}
                    startIcon={<AddShoppingCartIcon />}
                    sx={{ backgroundColor: "#121210" }}
                  >
                    Add to Cart
                  </Button>
                  {isAdmin && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => nav("/products/" + _id)}
                      startIcon={<ModeEditIcon />}
                      sx={{ backgroundColor: "#121210" }}
                    >
                      Edit
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          )
        )}
      </Grid>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        message="Cart updated!"
      />
    </>
  );
};

export default Products;
