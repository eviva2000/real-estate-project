import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../assets/unisexavatar.png";
const Profile = (props) => {
  const { userData } = props;
  // console.log(loggedUserInfo.username);
  return (
    <div className="profileContainer">
      <div className="imgWrapper">
        <img src={Avatar} id="avatar" alt="" />
      </div>
      <div className="userInfo">
        <p>
          <span> Email Address:</span>
          <div>
            <input
              className="profileInput"
              type="text"
              value={userData.email}
            />
          </div>
        </p>
        <p>
          <span> Full name: </span>
          <div className="profileInput" id="fullName">
            <input type="text" name="" id="" value={userData.firstname} />
            <input type="text" name="" id="" value={userData.lastname} />
          </div>
        </p>

        <div className="resetBtn">
          {" "}
          <li style={{ listStyle: "none" }}>
            {" "}
            <Link to="resetpassword">Change password</Link>{" "}
          </li>
        </div>
      </div>
    </div>
  );
};
export default Profile;
