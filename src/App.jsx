import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Appbar from "./components/Appbar";
import { useEffect, useState } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Box } from "@mui/material";
import NewProduct from "./pages/NewProduct";
import NotFound from "./pages/NotFound";
function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchProducts = () => {
    fetch("https://rental-d0go.onrender.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setfilteredProducts(data);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box>
      <Appbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/products"
          element={
            <Products
              products={products}
              filteredProducts={filteredProducts}
              setfilteredProducts={setfilteredProducts}
              cart={cart}
              setCart={setCart}
              isAdmin={isAdmin}
              fetchProducts={fetchProducts}
            />
          }
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/signup"
          element={<Signup isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
        />
        <Route
          path="/login"
          element={<Login isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
        />
        {isAdmin && <Route path="/products/new" element={<NewProduct />} />}
        {isAdmin && <Route path="/products/:id" element={<NewProduct />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
