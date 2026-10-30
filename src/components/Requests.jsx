import axios from "axios";
import { base_url } from "../Utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../Utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(base_url + "user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      // Block for handel err
      console.log(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        base_url + "request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id))
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0)
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="card bg-base-100 shadow-xl max-w-md w-full">
          <div className="card-body items-center text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h1 className="text-2xl font-bold">No Requests Found</h1>
            <p className="text-base-content/60 mt-2">
              You don't have any connection requests yet.
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Connection Requests
          </h1>
          <p className="text-base-content/60 mt-2">
            People who are interested in connecting with you.
          </p>

          <div className="badge badge-primary badge-outline mt-4 p-3">
            {requests.length} Pending Requests
          </div>
        </div>

        {/* Request Cards */}
        <div className="flex flex-col gap-5">
          {requests.map((request) => {
            const { _id, fromUserId, status, createdAt } = request;

            return (
              <div
                key={_id}
                className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="card-body p-5">
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    {/* Profile Image */}
                    <div className="avatar shrink-0">
                      <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={fromUserId?.photoUrl} alt="User Profile" />
                      </div>
                    </div>

                    {/* User Information */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <h2 className="text-xl font-bold">
                        {fromUserId?.firstName} {fromUserId?.lastName}
                      </h2>

                      <span className="badge badge-success badge-outline mt-2">
                        {status}
                      </span>

                      <p className="text-sm text-base-content/50 mt-3">
                        <span className="font-medium">Received:</span>{" "}
                        {new Date(createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Action Buttons - UI Only */}
                    <div className="flex gap-3 w-full sm:w-auto">
                      <button className="btn btn-primary flex-1 sm:w-28" onClick={()=>reviewRequest("accepted",_id)}>
                        ✓ Accept
                      </button>

                      <button className="btn btn-outline btn-error flex-1 sm:w-28" onClick={()=>reviewRequest("rejected",_id)}>
                        ✕ Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
