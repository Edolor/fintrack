import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { PATHS } from "../../Routes/url";
import LoginSpinner from '../../Components/Spinner/LoginSpinner';


function RegisterOauth() {
  const navigate = useNavigate();
  const { postData, setToken, setLoggedIn } = useAuth();

  // Get query string
  const queryStr = window.location.search;

  // Extract the query strings from the query paraneters
  const urlParams = new URLSearchParams(queryStr);

  const code = urlParams.get("code"); // Extract code from url

  if (code) {
      console.log(code);
    const getToken = async () => {
      const data = {
        "code": code
      }

      try {
        const response = await postData(data, PATHS.bookstoreOAUTH);

        if (response.status === 200) {
          const token = response.data.token;
          // Storing token
          localStorage.setItem("token", token);
          setToken(() => token);
          
          // Set LoggedIn state
          setLoggedIn(() => true);
          navigate("/dashboard", {replace: true});
        }
      } catch(error) {
        navigate("/signup");
      }
    }

    getToken();
  } else {
    // Redirect
    navigate("/signup");
  }

  return (
    <LoginSpinner />
  );
}

export default RegisterOauth;