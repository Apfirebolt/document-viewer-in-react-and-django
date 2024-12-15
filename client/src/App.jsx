import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Footer from "./components/Footer";
import Header from "./components/Header";
// import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./views/Home";
import Admin from "./views/admin/Home";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;
