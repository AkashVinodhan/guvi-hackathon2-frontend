import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Appbar from "./components/Appbar";
import { useEffect, useState } from "react";
function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
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
    <>
      <Appbar />
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
            />
          }
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
