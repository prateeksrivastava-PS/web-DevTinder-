import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
const Profile = ()=>{
     const user = useSelector((store) => store.user);

  if (!user) {
    return <p>Loading profile...</p>;
  }
    return (
        <div>
           <EditProfile userInfo={user}/>
        </div>
    )
}

export default Profile;