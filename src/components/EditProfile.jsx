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
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      dispatch(addUser(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Edit Your Profile</h1>
          <p className="text-base-content/60 mt-2">
            Update your personal information and customize your profile.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Edit Profile Form */}
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-1">Personal Information</h2>
              <p className="text-sm text-base-content/60 mb-5">
                Make changes to your profile details.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <fieldset className="fieldset">
                  <label className="label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Enter first name"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <label className="label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Enter last name"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <label className="label" htmlFor="age">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Enter age"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <label className="label" htmlFor="gender">
                    Gender
                  </label>
                  <input
                    type="text"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Enter gender"
                  />
                </fieldset>
              </div>

              {/* Photo URL */}
              <fieldset className="fieldset mt-4">
                <label className="label" htmlFor="photourl">
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  id="photourl"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Paste your image URL"
                />
              </fieldset>

              {/* About */}
              <fieldset className="fieldset mt-4">
                <label className="label" htmlFor="about">
                  About Me
                </label>
                <textarea
                  id="about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Tell something about yourself..."
                  rows={4}
                />
              </fieldset>

              {/* Save Button */}
              <div className="mt-6">
                <button
                  className="btn btn-primary w-full"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>

          {/* Live Profile Preview */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-24">
            <div>
              <h2 className="text-2xl font-bold">Profile Preview</h2>
              <p className="text-sm text-base-content/60 mt-1">
                This is how your profile will look to others.
              </p>
            </div>

            <div className="bg-base-100 rounded-2xl border border-base-300 shadow-xl p-4 w-full min-w-0">
              <UserCard
                preview={true}
                users={{
                  firstName,
                  lastName,
                  age,
                  gender,
                  about,
                  photoUrl,
                }}
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-base-content/50 justify-center">
              <span>✦</span>
              <p>Your profile preview updates as you edit.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-lg">
            <span>✓</span>
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditProfile;
