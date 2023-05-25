import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Toolbar } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NewProduct = () => {
  const nav = useNavigate();
  let initial = {
    name: "",
    price: "",
    picture: "",
    category: "",
  };
  const [data, setData] = useState(initial);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetch("https://rental-d0go.onrender.com/products/" + id)
        .then((res) => res.json())
        .then(({ name, price, picture, category }) => {
          let temp = { name, price, picture, category };
          setData(temp);
        });
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, data) => {
    e.preventDefault();
    if (!id) {
      axios
        .post("https://rental-d0go.onrender.com/newProduct", data)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
    if (id) {
      //put req
      axios
        .put("https://rental-d0go.onrender.com/products/" + id, data)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };

  //styles
  const inputBox = {
    m: 1,
    input: { color: "white" },
    label: { color: "white" },
    width: "500px",
    "& :-webkit-autofill": {
      transitionDelay: "9999s",
    },
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        bgcolor: "#5E6872",
        color: "white",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Toolbar />
      <h3 sx={{ m: 1 }}>{id ? "Edit Product" : "Create new Product"}</h3>
      <form>
        <TextField
          onChange={handleChange}
          sx={inputBox}
          id="outlined-search"
          label="Name"
          name="name"
          type="text"
          value={data.name}
          required
        />
        <br />
        <TextField
          onChange={handleChange}
          id="outlined-search"
          label="Price per day"
          name="price"
          type="number"
          sx={inputBox}
          value={data.price}
          required
        />
        <br />
        <TextField
          onChange={handleChange}
          id="outlined-search"
          label="Picture"
          name="picture"
          type="text"
          sx={inputBox}
          value={data.picture}
          required
        />
        <br />
        <TextField
          onChange={handleChange}
          id="outlined-search"
          label="Category"
          name="category"
          type="text"
          sx={inputBox}
          value={data.category}
          required
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          sx={{ m: 1 }}
          onClick={(e) => handleSubmit(e, data)}
        >
          {id ? "Edit Product" : "Add Product"}
        </Button>
      </form>
    </Box>
  );
};

export default NewProduct;
