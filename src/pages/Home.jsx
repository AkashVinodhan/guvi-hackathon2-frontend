import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "grey",
        height: "100vh",
        backgroundImage: "url(https://wallpaperaccess.com/full/1358215.jpg)",
        backgroundSize: "100%",
        marginTop: "0px",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={5}
        sx={{
          height: "50%",
        }}
      >
        <Stack direction={"column"}>
          <Typography
            variant="h1"
            sx={{ width: "100%", margin: "250px 10px 10px 30px" }}
          >
            Rent the smart way!
          </Typography>

          <Button
            variant="contained"
            color="info"
            onClick={() => nav("/products")}
            sx={{
              width: "100px",
              marginTop: "50px",
              marginLeft: "30px",
              backgroundColor: "#121210",
            }}
          >
            Explore
          </Button>
        </Stack>
        <Typography
          variant="h5"
          fontStyle={"italic"}
          sx={{ width: "50%", marginTop: "70px" }}
        >
          Rent photography products like DSLR Lens, Cameras, GoPro, Mobile Phone
          Gimbal and Accessories at low price here at Rapid Rentals
        </Typography>
      </Stack>
    </Box>
  );
};

export default Home;
