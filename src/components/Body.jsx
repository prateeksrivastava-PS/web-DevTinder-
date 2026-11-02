import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { base_url } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (userData?._id) return;

      try {
        const res = await axios.get(base_url + "profile/view", {
          withCredentials: true,
        });

        dispatch(addUser(res.data));
      } catch (err) {
        console.error("Error fetching user:", err);

        if (err.response?.status === 401 || err.response?.status === 400) {
          navigate("/login", { replace: true });
        }
      }
    };

    fetchUser();
  }, [userData, dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
