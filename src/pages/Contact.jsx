import React, { useState } from "react";
import { Box, Button, TextField, Toolbar } from "@mui/material";

const Contact = () => {
  let initial = {
    name: "",
    email: "",
    description: "",
  };
  const [data, setData] = useState(initial);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (data) => {
    if (data.name && data.email && data.description) {
      fetch("https://rental-d0go.onrender.com/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // nav(-1);
    }
  };
  //styles
  const inputBox = {
    m: 1,
    input: { color: "white" },
    label: { color: "white" },
    width: "500px",
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
      <h3 sx={{ m: 1 }}>Get in touch</h3>
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
          label="email"
          name="email"
          type="text"
          sx={inputBox}
          value={data.email}
          required
        />
        <br />
        <TextField
          onChange={handleChange}
          id="outlined-multiline-static"
          label="What would you like to discuss?"
          name="description"
          multiline
          sx={inputBox}
          rows={4}
          value={data.description}
          required
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          sx={{ m: 1 }}
          onClick={() => handleSubmit(data)}
        >
          Send
        </Button>
      </form>
    </Box>
  );
};

export default Contact;
