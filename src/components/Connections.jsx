import axios from "axios";
import { base_url } from "../Utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(base_url + "user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      console.log("Get Response of Connections", res);
    } catch (err) {
      // Handel the Error
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;

  if (connections.length === 0)
    return (
      <div>
        <h1>No Connections Found</h1>
      </div>
    );
 return (
  <div className="max-w-4xl mx-auto my-10 px-4">
    <h1 className="text-3xl font-bold mb-2">My Connections</h1>
    <p className="text-gray-500 mb-6">
      People you are connected with
    </p>

    <div className="flex flex-col gap-4">
      {connections.map((data) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        } = data;

        return (
          <div
            key={_id}
            className="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow"
          >
            <div className="card-body flex flex-row items-center gap-5 p-5">
              
              {/* Profile Image */}
              <div className="avatar shrink-0">
                <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={photoUrl || "https://via.placeholder.com/150"}
                    alt={`${firstName} profile`}
                  />
                </div>
              </div>

              {/* User Details */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold truncate">
                  {firstName} {lastName}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {age ? `${age} years` : "Age not specified"}
                  {gender ? ` • ${gender}` : ""}
                </p>

                <p className="text-sm mt-3 text-base-content/80 line-clamp-2 break-words">
                  {about || "No bio available"}
                </p>
              </div>

              {/* Connection Badge */}
              <div className="hidden sm:block shrink-0">
                <span className="badge badge-success badge-outline">
                  Connected
                </span>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  </div>
);
};

export default Connections;
