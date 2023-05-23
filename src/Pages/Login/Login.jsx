import React, { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/img/logo-white.svg";
import googleLogo from "../../Assets/img/google.svg";
import Input from "./../../Components/Input/Input";
import Error from "./../../Components/Input/Error";
import Label from "./../../Components/Input/Label";
import Message from '../../Components/Message/Message';
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import LoginSpinner from '../../Components/Spinner/LoginSpinner';
import { PATHS } from "../../Routes/url";
import { handleBlankInput, loginBookhub } from "../../Components/Form/Utils";


function Login() {
  const nameRef = useRef();
  const passwordRef = useRef();

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [status, setStatus] = useState("normal");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [oauthSuccess, setOauthSuccess] = useState(false);

  const { postData, setToken, setLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Holding temporary fields
  const fields = [
    { ref: passwordRef, errorSetter: setPasswordError, errorMessage: "Password is required" },
    { ref: nameRef, errorSetter: setNameError, errorMessage: "Username is required" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(() => "loading");
    setSuccess(() => false);
    let bug = false;
    

    // Error checking
    fields.forEach(({ref, errorSetter, errorMessage}) => {
      bug = handleBlankInput(ref, errorSetter, errorMessage); // Set error on form
    });

    if (bug) { // Check for any error
      setStatus(() => "normal");
      return;
    }

    const data = {
      username: nameRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    }

    try {
      // Send request and await response
      const response = await postData(data, PATHS.login);

      if (response.status === 200) { // Successfully created
        setSuccess(() => true);
        setMessage(() => "Login successful!");

        setStatus(() => "normal");
        nameRef.current.value = "";
        passwordRef.current.value = "";

        const token = response.data.token;
        // Storing token
        localStorage.setItem("token", token);
        setToken(() => token);
        
        // Set LoggedIn state
        setLoggedIn(() => true);

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/dashboard", {replace: true});
        }, 2000);
      }
    } catch(error) {
        if (error?.response?.statusText === undefined) {
          setError(() => `No internet connection!`);  
        } else {
          setError(() => `Invalid username or password`);  
        }
    }

    setStatus(() => "normal");
  }

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const data = {
        "code": codeResponse.code
      }

      setOauthSuccess(() => true);

      try {
        const response = await postData(data, PATHS.googleOAUTH);

        if (response.status === 200) {
          setSuccess(() => true);
          setMessage("Login successful!");

          const token = response.data.token;
          // Storing token
          localStorage.setItem("token", token);
          setToken(() => token);
          
          // Set LoggedIn state
          setLoggedIn(() => true);
          navigate("/dashboard", {replace: true});
        }
      } catch(error) {
        setOauthSuccess(() => false);
        setError("An error occured, try again.");
        setStatus(() => "normal");
      }
    },
    onError: () => {
      setStatus(() => "normal");
      setError("An error occured, try again.");
    },
    flow: "auth-code"
  });

  return (
    <>
      {
        oauthSuccess ? (
          <LoginSpinner />
        ) : (
          <>
            <aside id="content" className="w-full bg-zinc-20 bg-primary">
              <div className="container mx-auto pt-8 pb-24 sm:py-16 sm:pb-20 flex items-center justify-center">
                <figure>
                    <img src={logo} alt="Logo for FinTrack" />
                </figure>
              </div>
            </aside>

            <section id="formWrapper" className="w-full">
              <div className="container mx-auto py-10 px-4 flex flex-col lg:flex-row">
                <article className="w-full flex justify-center items-center py-10">
                  <div className="bg-white -mt-32 rounded-xl p-6 max-w-3xl w-full space-y-2 flex flex-col 
                      items-center drop-shadow-lg sm:p-8 md:p-10 sm:py-12 md:mx-0">

                      <div className="flex flex-col justify-center w-full">
                        <h1 className="font-serif text-[40px] text-center font-bold text-black mb-10">
                          Login
                        </h1>

                        <div className="flex items-start flex-col gap-y-10 md:gap-y-0 md:flex-row md:gap-x-16">
                          <div className="w-full self-stretch md:border-r md:border-zinc-100 md:w-1/2 md:pr-6">
                            <p className="text-lg text-black mb-4 text-center md:text-left">
                              Using social networking accounts
                            </p>

                            <div className="flex flex-col gap-4 items-center md:items-start">
                              <button onClick={() => {
                                setStatus(() => "loading");
                                login();
                              }} className="group text-google text-xl py-3 px-5 rounded-md 
                                  border border-google flex items-center flex-wrap gap-6 w-max">
                                <img src={googleLogo} className="h-6 w-6 transition-transform" alt="Google logo" />
                                <span className="group-hover:underline">Login with Google</span>
                              </button>

                              <button onClick={() => {
                                setStatus(() => "loading");
                                loginBookhub(setStatus);
                              }} className="group text-bookhub bg-white text-lg py-3 px-8 rounded-md flex items-center 
                                  gap-6 w-max border hover:border-bookhub shadow-md hover:shadow-none"
                                  disabled={status === "loading"}>
                                <span className="group-hover:underline">Login with FastWallet</span>
                              </button>
                            </div>
                          </div>

                          <article className="w-full flex flex-col items-center md:px-0 lg:items-start md:w-1/2">
                            <form onSubmit={handleSubmit} id="login-form" method="post" className="w-full space-y-4 sm:space-y-4">
                              {
                                /** Error message */
                                error && (
                                  <Message type="error" message={error} show={error} setShow={setError} />
                                )
                              }
                              <div className="flex flex-col space-y-2">
                                <Label htmlFor="username" text="Username" />
                                <div>
                                  <Input type="text" disabled={status === "loading"} placeholder="Username" name="username" id="username" reff={nameRef} handleChange={() => handleBlankInput(nameRef, setNameError, "Name is required")} error={nameError !== ""} />
                                  <Error active={nameError} text={nameError} />
                                </div>
                              </div>
                              <div className="flex flex-col space-y-2">
                                  <Label htmlFor="password" text="Password" />
                                <div>
                                  <Input type="password" disabled={status === "loading"} placeholder="Password" name="password" id="password" reff={passwordRef} handleChange={() => handleBlankInput(passwordRef, setPasswordError, "Password is required")} error={passwordError !== ""} />
                                  <Error active={passwordError} text={passwordError} />
                                </div>
                              </div>
                              <div className="flex justify-center mt-8 sm:mt-10">
                                <button type="submit" disabled={status === "loading"}
                                    className="flex flex-row items-center text-base font-semibold px-5 py-4 bg-primary rounded-md w-full justify-center
                                      text-white gap-x-2 drop-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed outline-offset-2 outline-primary outline-1 focus:outline
                                      active:drop-shadow-none hover:underline hover:bg-primaryLight">
                                  <span className={`text-lg sm:text-xl`}>{status === "loading" ? "Logging in...." : "Login"}</span>
                                </button>
                              </div>
                            </form>

                            <Link to="/signup" className="text-lg text-black mt-5 group">
                              Don't have an account? <span className="text-primary group-hover:underline">Register</span>
                            </Link>
                          </article>
                        </div>
                      </div>

                  </div>
                </article>
              </div>
            </section>

            {
              success && (
                <div className="fixed left-4 bottom-4 flex flex-col space-y-4 z-10">
                  <Message type="success" message={message} show={error} setShow={setError} />
                </div>
              )
            }
          </>
        )
      }
    </>
  )
}

export default Login;