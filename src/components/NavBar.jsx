import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { base_url } from "../Utils/constants";
import { removeUser } from "../Utils/userSlice";
import { removeFeed } from "../Utils/feedSlice";

const NavBar = () => {
  // Geeting the data  from redux
  const user = useSelector((store) => store.user);
  console.log("USer Data", user);

  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await axios.post(base_url + "logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      <div className="flex gap-2">
        {user ? (
          <p className="font-black font-medium px-4 flex align-middle">
            Welcome {user.firstName} !
          </p>
        ) : (
          ""
        )}
        <div className="dropdown dropdown-end mx-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {user ? (
              <div className="w-10 rounded-full">
                <img alt="User Photo" src={user.photoUrl} />
              </div>
            ) : (
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            )}
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
            <li>
              <Link to="/requests">Requests</Link>
            </li>
            <li>
              <a onClick={logout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
