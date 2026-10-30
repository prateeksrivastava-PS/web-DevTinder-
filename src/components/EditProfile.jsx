import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { base_url } from "../Utils/constants";
import { addUser } from "../Utils/userSlice";

const EditProfile = ({ userInfo }) => {
  const [firstName, setFirstName] = useState(userInfo?.firstName ?? "");
  const [lastName, setLastName] = useState(userInfo?.lastName ?? "");
  const [age, setAge] = useState(userInfo?.age ?? "");
  const [gender, setGender] = useState(userInfo?.gender ?? "");
  const [about, setAbout] = useState(userInfo?.about ?? "");
  const [photoUrl, setPhotoUrl] = useState(userInfo?.photoUrl ?? "");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        base_url + "profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        {
          withCredentials: true,
        },
      );
      console.log("Edit Profile res", res.data.data);
     setShowToast(true)
      setTimeout(()=>{
        setShowToast(false)
      },2000)
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center gap-4">
      <div className="flex justify-center items-center my-10">
        <div className="card bg-base-300 w-96 shadow-sm ">
          <div className="card-body">
            <h2 className="card-title justify-center mb-3">Edit Profile</h2>
            <div>
              <fieldset className="fieldset mb-3">
                <label className="label" htmlFor="firtName">
                  FirstName
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                  placeholder="FirstName"
                />
              </fieldset>

              <fieldset className="fieldset mb-3">
                <label className="label" htmlFor="lastName">
                  LastName
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                  placeholder="LastName"
                />
              </fieldset>

              <fieldset className="fieldset mb-3">
                <label className="label" htmlFor="age">
                  Age
                </label>
                <input
                  type="text"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input"
                  placeholder="Age"
                />
              </fieldset>

              <fieldset className="fieldset mb-3">
                <label className="label" htmlFor="gender">
                  Gender
                </label>
                <input
                  type="text"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input"
                  placeholder="Gender"
                />
              </fieldset>
              <fieldset className="fieldset mb-3">
                <label className="label" htmlFor="phtourl">
                  Photo Url
                </label>
                <input
                  type="text"
                  id="photourl"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input"
                  placeholder="PhotoUrl"
                />
              </fieldset>

              <fieldset className="fieldset mb-3">
                <label className="label" htmlFor="about">
                  About
                </label>

                <textarea
                  id="about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="textarea"
                  placeholder="About"
                  rows={4}
                />
              </fieldset>
            </div>
            <div className="card-actions justify-center">
              {/* <p className="text-red-50">{error}</p> */}
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <UserCard
          users={{ firstName, lastName, age, gender, about, photoUrl }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success mt-10">
            <span>Profile Update successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditProfile;
