import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";

import { v4 as uuidv4 } from "uuid";

//date
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Cart = ({ cart, setCart }) => {
  const [total, setTotal] = useState(0);
  const [cartData, setCartData] = useState(cart);

  const calcTotal = () => {
    let res = 0;
    cartData.forEach((item) => {
      const d1 = dayjs(item.end);
      const d2 = dayjs(item.start);
      const days = d1.diff(d2, "day");
      res = res + +item.qty * +item.price * days;
    });
    setTotal(res);
  };

  useEffect(() => {
    calcTotal();
  }, []);

  function handleChange(e, id) {
    let index = cart.findIndex((item) => item._id == id);
    let temp = cart;
    temp[index].qty = e.target.value;
    setCartData([...temp]);
    calcTotal();
  }

  function handleDateChange(e, id, date) {
    let index = cart.findIndex((item) => item._id == id);
    let temp = cart;
    temp[index][date] = e.$d;
    setCartData([...temp]);
    calcTotal();
  }

  const handleOrder = () => {
    fetch("https://rental-d0go.onrender.com/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: uuidv4(),
        price: total,
        order_details: cartData,
      }),
    })
      .then((res) => res.json())
      .then(({ key, data }) => {
        console.log(data);
        const options = {
          key,
          amount: data.amount,
          currency: "INR",
          name: "Rapid Rental",
          description: "Test Transaction",
          image:
            "https://thumbs.dreamstime.com/b/dslr-camera-front-view-22052058.jpg",
          order_id: data.id,
          callback_url: "https://rental-d0go.onrender.com/payment/",
          prefill: {
            name: "Test user",
            email: "test@example.com",
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#373c3e",
          },
        };
        const razor = new Razorpay(options);
        razor.open();
      });
  };
  return (
    <Box marginTop={"70px"} height={"100%"}>
      {cartData.map((item) => (
        <Paper
          key={item._id}
          elevation={4}
          sx={{ padding: "5px", margin: "5px" }}
        >
          <Stack
            spacing={3}
            p={3}
            direction={"row"}
            justifyContent={"space-between"}
            alignContent={"center"}
          >
            <Box>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body1">
                ₹ {item.price} {item.duration}
              </Typography>
            </Box>
            <Box m={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From"
                  onChange={(e) => handleDateChange(e, item._id, "start")}
                  defaultValue={dayjs(Date.now())}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="To"
                  onChange={(e) => handleDateChange(e, item._id, "end")}
                  defaultValue={dayjs(Date.now())}
                />
              </LocalizationProvider>
            </Box>
            <TextField
              label="Quantity"
              type="number"
              InputProps={{
                inputProps: {
                  min: 1,
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              onChange={(e) => handleChange(e, item._id)}
              value={item.qty}
              required
            />
          </Stack>
        </Paper>
      ))}
      {cartData.length > 0 ? (
        <Box
          sx={{
            height: "60px",
            position: "absolute",
            bottom: "0px",
            left: "0px",
            backgroundColor: "#0a0a0a",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="h6" color={"white"}>
            Total: ₹ {total}
          </Typography>
          <Button
            variant="contained"
            endIcon={<PaymentIcon />}
            onClick={handleOrder}
            sx={{ backgroundColor: "#fff", color: "#000" }}
          >
            Pay
          </Button>
        </Box>
      ) : (
        <Typography variant="h4" align="center" color={"GrayText"}>
          No items in cart
        </Typography>
      )}
    </Box>
  );
};

export default Cart;
