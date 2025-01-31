/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "@/Context/HookContext";
import { useNavigate, useParams, Route, Routes } from "react-router-dom";
import TopNav from "@/Layouts/TopNav";
import { ToastContainer, toast } from "react-toastify";
import Mainboard from "./MainBoard";
// import handleLogout from "../SigoutAll/handleLogout";
import Loading from "@/utils/Loading";
import AddBooks from "./AddBooks";
import MainBoard from "./MainBoard";
import SuperAdminNav from "../../Layouts/SuperAdminNav";
import axiosInstance from "../../axiosIntance";
import handleLogout from "./signout";

const AdminPage = () => {
  const {
    auth,
    setAuth,
    theme,
    userDetails,
    setUserDetails,
    loading,
    setLoading,
  } = useContext(UserContext);
  const navigate = useNavigate();

  console.log(theme)
  // const [courses, setCourses] = useState([]);

  const handleLogoutHandler = () => {
    handleLogout({ setAuth, setUserDetails, navigate });
  };

  useEffect(() => {
    // Fetch user data on app load
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/admin"); // Replace with your user data endpoint
        console.log(response.data);
        if (response.data.results) {
          setAuth(true); // User is authenticated
          // setName(response.data.results[0].first_name);
          setUserDetails(response.data.results);
          console.log(response.data.results);
        } else {
          setAuth(false); // No valid user session
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setAuth(false);
        navigate("/login");

        console.log("Failed to load admin data")
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchUserData();
  }, [navigate, setAuth, setUserDetails, setLoading]);

  // Fetch courses and departments

  return auth && userDetails ? (
    <section
      className="max-w-[1300px] shadow-md md:p-2 md:rounded-md m-auto"
      data-theme={theme}
    >
      <TopNav  handleLogoutHandler={handleLogoutHandler}/>
      <div className="dashboard grid grid-cols-9 relative">
        <SuperAdminNav />
        <div
          className="shadow-inner md:p-2 rounded col-span-9 md:col-span-7 md:m-2"
          data-theme={theme}
        >
          <Routes>
            <Route path="/" element={<MainBoard />} />
            <Route path="/addbooks" element={<AddBooks />} />
          </Routes>
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
};

export default AdminPage;
