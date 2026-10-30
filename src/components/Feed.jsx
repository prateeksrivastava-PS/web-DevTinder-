import axios from "axios";
import { base_url } from "../Utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

const fetchFeed = async () => {
  try {
    const res = await axios.get(base_url + "feed", {
      withCredentials: true,
      params: {
        page: page,
        limit: 2,
      },
    });

    dispatch(addFeed(res.data.data));
    setTotalPages(res.data.totalPages);

    console.log("Feed response:", res.data);
  } catch (err) {
    console.log("Full error:", err);
  }
};

  useEffect(() => {
    fetchFeed();
  }, [page]);

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Discover People
          </h1>

          <p className="text-base-content/60 mt-2">
            Find interesting people and build meaningful connections.
          </p>
        </div>

        {/* Feed */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : feed?.length > 0 ? (
          <UserCard users={feed} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">👥</div>

            <h2 className="text-2xl font-semibold">
              No Profiles Available
            </h2>

            <p className="text-base-content/60 mt-2">
              We couldn't find anyone right now. Please check back later.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">

          <button
            className="btn btn-primary"
            disabled={page === 1 || loading}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span className="font-bold">
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-primary"
            disabled={page >= totalPages || loading}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
};

export default Feed;