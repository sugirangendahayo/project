import { toast } from "react-toastify";
import axiosInstance from "../../axiosIntance";


const handleLogout = async ({ setAuth,setUserDetails, navigate }) => {
  try {
    const response = await axiosInstance.post("/auth/logout"); // Check the exact route
    console.log("Logout response:", response.data); // Debugging
    setAuth(false);
    setUserDetails(null);
    navigate("/login");
    toast.success("Logged out successfully!");
  } catch (err) {
    console.error("Logout failed:", err);
    toast.error(
      err.response?.data?.message || "Error logging out. Please try again."
    );
  }
};

export default handleLogout;
