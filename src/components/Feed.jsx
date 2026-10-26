import axios from "axios";
import { base_url } from "../Utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(base_url + "feed", {
        withCredentials: true,
        params: {
          page: 2,
          limit: 2,
        },
      });
      dispatch(addFeed(res.data));

      console.log("Feed response!", res.data);
    } catch (err) {
      console.log("Feed error:", err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);
  return (
    <div>
      <h1>This is feed comoponent</h1>
      {feed?.length > 0 && <UserCard users={feed} />}
    </div>
  );
};

export default Feed;
