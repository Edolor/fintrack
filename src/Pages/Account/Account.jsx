import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Input from "./../../Components/Input/Input";
import Error from "./../../Components/Input/Error";
import Label from "./../../Components/Input/Label";
import Message from '../../Components/Message/Message';
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { PATHS } from "../../Routes/url";


function Account() {
    const nameRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();

    const passwordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    const navigate = useNavigate();

    const { patchWithToken, user, token, putWithToken, logout } = useAuth();
    const [formShown, setFormShown] = useState(0); // To toggle the user detail and password form
  
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    let message = "";
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

  
    const [status, setStatus] = useState("normal");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
  
    const handleBlankInput = (objRef, setErrorObj, errorMessage) => {
      /**
       * objRef: Used to check the inputs value
       * setErrorObj: Used to set the error state of the input
       * errorMessage: Error message to set in state
       */
      if (objRef.current.value.trim() === "") {
        setErrorObj(() => errorMessage);
      } else {
        setErrorObj(() => "");
      }
    }
  
    const handleEmail = (e) => {
      /**
       * Handling email validity
       */
      const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
      
      if (emailRef.current.value.trim() === "") {
        setEmailError(() => "Email is required");
      } else if (emailRegex.test(emailRef.current.value) === false) {
        setEmailError(() => "Invalid email address");
      } else {
        setEmailError(() => "");
      }
    }
    
    /** Handle change details form */
    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus(() => "loading");
      setSuccess(() => false);
      let bug = false;
      
      if (nameRef.current.value.trim() === "") {
        nameRef.current.focus();
        setNameError(() => "Username is required");
        bug = true;
      } else {
        setNameError(() => "");
      }
  
      if (emailRef.current.value.trim() === "") {
        emailRef.current.focus();
        setEmailError(() => "Email is required");
        bug = true;
      } else {
        setEmailError(() => "");
      }
  
      if (lastNameRef.current.value.trim() === "") {
        lastNameRef.current.focus();
        setLastNameError(() => "Last name is required");
        bug = true;
      } else {
        setLastNameError(() => "");
      }
  
      if (firstNameRef.current.value.trim() === "") {
        firstNameRef.current.focus();
        setFirstNameError(() => "First name is required");
        bug = true;
      } else {
        setFirstNameError(() => "");
      }
  
      if (bug) { // Check for any error
        setStatus(() => "normal");
        return;
      }
  
      const data = {
        username: nameRef.current.value.trim(),
        first_name: firstNameRef.current.value.trim(),
        last_name: lastNameRef.current.value.trim(),
        email: emailRef.current.value.trim()
      }
  
      try {
        const response = await patchWithToken(data, PATHS.details, token);
        // Send request and await response
  
        if (response.status === 200) { // Successfully created
            message = "Account updated successfully!";
            setSuccess(() => true);
  
            nameRef.current.value = response.data.username;
            firstNameRef.current.value = response.data.first_name;
            lastNameRef.current.value = response.data.last_name;
            emailRef.current.value = response.data.email;
        }
      } catch(error) {
            const errors = error.response.data;
            if (errors.email) {
                setEmailError(errors.email[0]);
            }
            if (errors.username) {
                setNameError(errors.username[0]);
            }

            if (errors.first_name) {
                setFirstNameError(errors.first_name[0]);
            }

            if (errors.last_name) {
                setLastNameError(errors.last_name[0]);
            }
          setError(() => `${error.response.statusText}!`)  
        }
  
      setStatus(() => "normal");
    }

    /** Handle change password form */
    const handlePassSubmit = async (e) => {
        e.preventDefault();
        setStatus(() => "loading");
        setSuccess(() => false);
        let bug = false;


        if (confirmPasswordRef.current.value.trim() === "") {
            confirmPasswordRef.current.focus();
            setConfirmPasswordError(() => "Confirm Password is required");
            bug = true;
        } else {
            setConfirmPasswordError(() => "");
        }

        if (newPasswordRef.current.value.trim() === "") {
            newPasswordRef.current.focus();
            setNewPasswordError(() => "New Password is required");
            bug = true;
        } else {
            setNewPasswordError(() => "");
        }

        if (passwordRef.current.value.trim() === "") {
            passwordRef.current.focus();
            setPasswordError(() => "Old Password is required");
            bug = true;
        } else {
            setPasswordError(() => "");
        }
    
        if (bug) { // Check for any error
          setStatus(() => "normal");
          return;
        }

        // Check if new and confirm passwords match
        if (newPasswordRef.current.value.trim() !== confirmPasswordRef.current.value.trim()) {
            newPasswordRef.current.focus();
            setNewPasswordError(() => "Passwords do not match");
            setConfirmPasswordError(() => "Passwords do not match");
            bug = true;
            setStatus(() => "normal");
            return;
        }
    
        const data = {
          old_password: passwordRef.current.value.trim(),
          new_password: newPasswordRef.current.value.trim()
        }
    
        try {
          // Send request and await response
          const response = await putWithToken(data, PATHS.changePassword, token);
    
          if (response.status === 200) { // Successfully changed
            message = "Password changed successfully!";
            setSuccess(() => true);
    
            passwordRef.current.value = "";
            confirmPasswordRef.current.value = "";
            newPasswordRef.current.value = "";

            // Logout user
            setTimeout(() => {
              logout();
              navigate("/login");
            }, 2000);
          }
        } catch(error) {
            const errors = error.response.data;
            if (errors.old_password) {
                setPasswordError(errors.old_password[0]);
            }
            if (errors.new_password) {
                setNewPasswordError(errors.new_password[0]);
            }
            setError(() => `${error.response.statusText}!`)  
          }
    
        setStatus(() => "normal");
      }
    return (
      <>
  
        <section id="formWrapper" className="w-full">

            <h1 className="font-serif text-[40px] text-center pt-8 font-bold text-black mb-5">
                Account Settings
            </h1>

            <div className="flex items-center justify-center">
                <div className="div flex bg-zinc-100 p-2.5 rounded-md shadow-md">
                    <button className={`text-lg font-medium px-5 py-3 rounded-md hover:underline ${formShown === 0 ? "bg-primary text-white shadow-md" : ""}`}
                        onClick={() => setFormShown(() => 0)}>Edit details</button>
                    <button className={`text-lg font-medium px-5 py-3 rounded-md hover:underline ${formShown === 1 ? "bg-primary text-white shadow-md" : ""}`}
                        onClick={() => setFormShown(() => 1)}>Change password</button>
                </div>
            </div>
          <div className="container mx-auto pb-10 flex flex-col lg:flex-row">
            <article className="w-full flex justify-center items-center py-10">
              <div className="bg-white rounded-xl p-6 max-w-xl w-full space-y-2 flex flex-col 
                  items-center drop-shadow-lg sm:p-10 sm:py-12 md:mx-0">
  
                  <div className="flex flex-col justify-center w-full">
  
                    <div className="flex flex-col items-start gap-y-8">
                      <article className="w-full flex flex-col items-center gap-8 px-4 md:px-0">
                        <form onSubmit={handleSubmit} id="details-form" method="post" className={`w-full space-y-4 sm:space-y-4 ${formShown === 0 ? "block" : "hidden"}`}>
                          {
                            /** Error message */
                            error && (
                              <Message type="error" message={error} status={true} />
                            )
                          }
                          <div className="flex flex-col space-y-2">
                            <Label htmlFor="firstname" text="First name" />
                            <div>
                              <Input type="text" def={user.first_name} disabled={status === "loading"} placeholder="First name" name="firstname" id="firstname" reff={firstNameRef} handleChange={() => handleBlankInput(firstNameRef, setFirstNameError, "First name is required")} error={firstNameError !== ""} />
                              <Error active={firstNameError} text={firstNameError} />
                            </div>
                          </div>
  
                          <div className="flex flex-col space-y-2">
                            <Label htmlFor="lastname" text="Last name" />
                            <div>
                              <Input type="text" def={user.last_name} disabled={status === "loading"} placeholder="Last name" name="lastname" id="lastname" reff={lastNameRef} handleChange={() => handleBlankInput(lastNameRef, setLastNameError, "Last name is required")} error={lastNameError !== ""} />
                              <Error active={lastNameError} text={lastNameError} />
                            </div>
                          </div>
  
                          <div className="flex flex-col space-y-2">
                            <Label htmlFor="email" text="Email" />
                            <div>
                              <Input type="text" def={user.email} disabled={status === "loading"} placeholder="Email" name="email" id="email" reff={emailRef} handleChange={handleEmail} error={emailError !== ""} />
                              <Error active={emailError} text={emailError} />
                            </div>
                          </div>
  
                          <div className="flex flex-col space-y-2">
                            <Label htmlFor="username" text="Username" />
                            <div>
                              <Input type="text" def={user.username} disabled={status === "loading"} placeholder="Username" name="username" id="username" reff={nameRef} handleChange={() => handleBlankInput(nameRef, setNameError, "Name is required")} error={nameError !== ""} />
                              <Error active={nameError} text={nameError} />
                            </div>
                          </div>
                          <div className="flex justify-center mt-8 sm:mt-10">
                            <button type="submit" disabled={status === "loading"}
                                className="flex flex-row items-center text-base font-semibold px-5 py-4 bg-primary rounded-md w-full justify-center
                                  text-white gap-x-2 drop-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed outline-offset-2 outline-primary outline-1 focus:outline
                                  active:drop-shadow-none hover:underline hover:bg-primaryLight">
                              <span className={`text-lg sm:text-xl`}>{status === "loading" ? "Saving...." : "Save Changes"}</span>
                            </button>
                          </div>
                        </form>

                        <form onSubmit={handlePassSubmit} id="pass-form" method="post" className={`w-full space-y-4 sm:space-y-4 ${formShown === 1 ? "block" : "hidden"}`}>
                          {
                            /** Error message */
                            error && (
                              <Message type="error" message={error} status={true} />
                            )
                          }
                          
  
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="password" text="Old Password" />
                                <div>
                                    <Input type="password" disabled={status === "loading"} placeholder="Password" name="password" id="password" reff={passwordRef} handleChange={() => handleBlankInput(passwordRef, setPasswordError, "Password is required")} error={passwordError !== ""} />
                                    <Error active={passwordError} text={passwordError} />
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="new-password" text="New Password" />
                                <div>
                                    <Input type="password" disabled={status === "loading"} placeholder="New Password" name="new-password" id="new-password" reff={newPasswordRef} handleChange={() => handleBlankInput(newPasswordRef, setNewPasswordError, "New Password is required")} error={newPasswordError !== ""} />
                                    <Error active={newPasswordError} text={newPasswordError} />
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="confirm-password" text="Confirm Password" />
                                <div>
                                    <Input type="password" disabled={status === "loading"} placeholder="Confrim Password" name="confirm-password" id="confirm-password" reff={confirmPasswordRef} handleChange={() => handleBlankInput(confirmPasswordRef, setConfirmPasswordError, "Confirm Password is required")} error={confirmPasswordError !== ""} />
                                    <Error active={confirmPasswordError} text={confirmPasswordError} />
                                </div>
                            </div>
                          <div className="flex justify-center mt-8 sm:mt-10">
                            <button type="submit" disabled={status === "loading"}
                                className="flex flex-row items-center text-base font-semibold px-5 py-4 bg-primary rounded-md w-full justify-center
                                  text-white gap-x-2 drop-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed outline-offset-2 outline-primary outline-1 focus:outline
                                  active:drop-shadow-none hover:underline hover:bg-primaryLight">
                              <span className={`text-lg sm:text-xl`}>{status === "loading" ? "Changing...." : "Change Password"}</span>
                            </button>
                          </div>
                        </form>
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
                <Message type="success" message={message} status={success} />
            </div>
            )
        }
      </>
    )
}

export default Account;