import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import axios from "axios";

const Login = ({ isAdmin, setIsAdmin }) => {
  const nav = useNavigate();
  let initial = {
    username: "",
    password: "",
  };
  const [data, setData] = useState(initial);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, data) => {
    e.preventDefault();
    axios
      .post("https://rental-d0go.onrender.com/login", data)
      .then((res) => {
        console.log(res.data);
        setIsAdmin(true);
        nav("/products");
      })
      .catch((err) => alert(err.response.data));
  };

  //styles
  const inputBox = {
    m: 1,
    input: { color: "white" },
    label: { color: "white" },
    width: "250px",
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
      <h3 sx={{ m: 1 }}>Login</h3>
      <form>
        <TextField
          onChange={handleChange}
          sx={inputBox}
          label="Username"
          name="username"
          type="text"
          value={data.username}
          required
        />
        <br />
        <TextField
          onChange={handleChange}
          label="Password"
          name="password"
          type="password"
          sx={inputBox}
          value={data.password}
          required
        />
        <br />

        <Button
          type="submit"
          variant="contained"
          sx={{ m: 1 }}
          onClick={(e) => handleSubmit(e, data)}
        >
          Login
        </Button>
      </form>
      <Typography>
        Don't have an account?{" "}
        <Link to="/signup" style={{ marginLeft: "10px", color: "#000" }}>
          Signup
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
