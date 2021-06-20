import React, { useState, useEffect, useContext } from "react";
import Redirect from "../../component/Redirect/UnAuthRedirect";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { loggedIn } = useContext(AuthContext);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const getUserData = axios
      .get("https://simple-to-do-list-app-0.herokuapp.com/api/v1/")
      .then((response) => {
        const resData = response.data;
        setProfileData([resData]);
        console.log(profileData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const RenderProfileList = profileData.map((data) => {
    const { username, date } = data;
    return (
      <>
        <div className="profile-content text-center">
          <h1>@{username}</h1>
          <h6>Joined at {date}</h6>
        </div>
      </>
    );
  });
  return <>{loggedIn ? RenderProfileList : <Redirect />}</>;
};

export default Profile;
