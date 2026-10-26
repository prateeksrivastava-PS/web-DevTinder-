import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { base_url } from "../Utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("Shivansh@gmail.com");
  const [password, setPassword] = useState("Kobe@2001");
  // const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogin = async () => {
    try {
      const res = await fetch(base_url + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          emailId,
          password,
        }),
      });
      const data = await res.json();
      console.log("Backend response:", data);
       console.log("errror", res.ok);
      if (!res.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }
      // Saving the data using redux
      dispatch(addUser(data));
      return navigate("/");
    } catch (err) {
      setError(err);
      console.log("errror", err);
    }
  };
  return (
    <div className="flex justify-center items-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center mb-3">Login</h2>
          <div>
            <fieldset className="fieldset mb-3">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input"
                placeholder="Email"
              />
            </fieldset>

            <fieldset className="fieldset mb-3">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Password"
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            {/* <p className="text-red-50">{error}</p> */}
            <button className="btn btn-primary" onClick={handelLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
