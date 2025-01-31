import Navbar from "./Layouts/Navbar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import Home from "./ui/components/Home";
import Footer from "./Layouts/Footer";
import Books from "./ui/components/Books";
import handleLogout from "./auth/admin/signout";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/HookContext";
import Loading from "./utils/Loading";
import axiosInstance from "./axiosIntance";
import AdminForm from "./Forms/AdminForm";
import Login from "./Forms/Login";
import Register from "./Forms/Register";
import AdminPage from "./auth/admin/AdminPage";
import Cart from "./ui/components/Cart";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSuperAdminRegistered, setIsSuperAdminRegistered] = useState(null);
  const { setAuth, setUserDetails } = useContext(UserContext);

  const widePaths = ["/adminpage"];
  const isWidePath = widePaths.some((path) =>
    window.location.pathname.includes(path)
  );
  useEffect(() => {
    // Fetch the status of the superadmin from the backend
    const checkSuperAdminStatus = async () => {
      try {
        const response = await axiosInstance.get("/auth/check-admin"); // Correct route
        if (response.data.error) {
          // Superadmin already exists
          setIsSuperAdminRegistered(true);
        } else {
          // No superadmin registered yet
          setIsSuperAdminRegistered(false);
        }
      } catch (error) {
        console.error("Error checking superadmin status:", error);
      }
    };

    checkSuperAdminStatus();
  }, []);
  if (isSuperAdminRegistered === null) {
    // While checking the status, render a loading spinner or placeholder
    return <Loading />;
  }
  const handleLogoutHandler = () => {
    handleLogout({ setAuth, setUserDetails, navigate });
  };
  return (
    <>
      <CartProvider>
        <div
          className={`m-auto overflow-hidden ${
            isWidePath ? "max-w-[1250px]" : "max-w-[1100px]"
          }`}
        >
          {/* Conditionally render Navbar */}
          <header>
            {location.pathname !== "/login" &&
              location.pathname !== "/register" &&
              !location.pathname.startsWith("/adminpage") && (
                <Navbar handleLogoutHandler={handleLogoutHandler} />
              )}
          </header>
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  isSuperAdminRegistered === false ? (
                    <AdminForm />
                  ) : (
                    <div>
                      <Home />
                    </div>
                  )
                }
              />
              <Route path="/books" element={<Books />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/store" element={<Cart />} />
              <Route path="/adminpage/*" element={<AdminPage />} />
            </Routes>
          </main>

          {/* Conditionally render Footer */}
          <footer>
            {location.pathname !== "/login" &&
              location.pathname !== "/register" &&
              location.pathname !== "/adminpage" &&
              location.pathname !== "/edititems" && <Footer />}
          </footer>
        </div>
      </CartProvider>
    </>
  );
}

export default App;
