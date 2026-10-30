const UserCard = ({ users }) => {
    const userList = Array.isArray(users) ? users : [users];
  return (
    <div className="flex flex-row justify-around">
      {userList.map((user) => (
        <div key={user._id}>
          <div className="card bg-base-300 w-96 shadow-sm p-2  ">
            <figure>
              <img src={user.photoUrl} alt="phto" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {user.firstName + " " + user.lastName}
              </h2>
              <p>{user.age}</p>
              <p>{user.gender}</p>
              <p>{user.about}</p>
            </div>

            <div className="card-actions justify-center">
              <button className="btn btn-primary">Ignore Profile</button>
              <button className="btn btn-secondary">Intrested</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
