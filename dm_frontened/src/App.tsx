import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/auth/register";
import Login from "./pages/auth/login";
import MainLayout from "./pages/main-layout";
import Product from "./pages/module/dashboard/product/product";
import Shop from "./pages/module/shop";
import Business from "./pages/module/dashboard/productTransaction";
import { Layout } from "./pages/module/dashboard/layout";
import { Expenses } from "./pages/module/dashboard/expenses/expenses";
import TotalBuySell from "./pages/module/dashboard/tbuysell/tbuy";
import { Calculations } from "./pages/module/dashboard/calculations";
import TotalBuy from "./pages/module/dashboard/tbuysell/tbuy";
import TotalSell from "./pages/module/dashboard/tbuysell/tsell";
import Stock from "./pages/module/dashboard/stock";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="shoplist" element={<Shop />} />

            <Route path="/" element={<Layout />}>
              <Route index path="dashboard" element={<Business />} />
              <Route path="product" element={<Product />} />
              <Route path="tbuy" element={<TotalBuy />} />
              <Route path="stock" element={<Stock />} />
              <Route path="tsell" element={<TotalSell />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="calculations" element={<Calculations />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
