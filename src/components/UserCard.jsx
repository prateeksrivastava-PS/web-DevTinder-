import axios from "axios";
import { base_url } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { removeConnections } from "../Utils/connectionSlice";

const UserCard = ({ users, preview = false }) => {
  const userList = Array.isArray(users) ? users : [users];
  const dispatch= useDispatch();

  const handelProfile = async (status, id) => {
    try {
      axios.post(
        base_url + "request/send/" + status + "/" + id,
        {},
        { withCredentials: true },
      );
      dispatch(removeConnections(id))
    } catch (err) {
      console.log("Full error:", err);
    }
  };

  return (
    <div
      className={
        preview
          ? "w-full"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
      }
    >
      {userList.map((user) => (
        <div
          key={user._id || "profile-preview"}
          className={preview ? "w-full" : "w-full max-w-sm"}
        >
          <div
            className={`card bg-base-100 shadow-xl border border-base-300 rounded-2xl overflow-hidden ${
              preview ? "w-full max-w-none" : "w-full"
            }`}
          >
            <figure className="relative h-72 w-full bg-base-300">
              <img
                src={user.photoUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="text-2xl font-bold text-white">
                  {user.firstName} {user.lastName}
                </h2>

                <p className="text-sm text-white/80">
                  {user.age} years • {user.gender}
                </p>
              </div>
            </figure>

            <div className="card-body">
              <h3 className="text-sm font-semibold text-base-content/60 uppercase">
                About
              </h3>

              <p className="text-base-content/80 line-clamp-3 break-words">
                {user.about || "No bio available"}
              </p>

              {!preview && (
                <div className="card-actions justify-center mt-3">
                  <button className="btn btn-outline btn-error flex-1" onClick={()=>handelProfile("ignored",user._id)}>
                    Ignore
                  </button>

                  <button className="btn btn-primary flex-1" onClick={()=>handelProfile("interested",user._id)}>Interested</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
