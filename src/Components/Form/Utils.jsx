import { bookHubClientID, bookHubURL, bookHubCodeChallange, redirectURI } from "../../Routes/url";

export const handleBlankInput = (objRef, setErrorObj, errorMessage) => {
    /**
     * objRef: Used to check the inputs value
     * setErrorObj: Used to set the error state of the input
     * errorMessage: Error message to set in state
     */
    if (objRef.current.value.trim() === "") {
      setErrorObj(() => errorMessage);
      return true; // Error occured
    } else {
      setErrorObj(() => "");
      return false;
    }
}

export const loginBookhub = (setStatus) => {
    /** Login to using bookstore oauth process */
    const url = `${bookHubURL}/oauth/authorize/?response_type=code&code_challenge=${bookHubCodeChallange}&code_challenge_method=S256&client_id=${bookHubClientID}&redirect_uri=${redirectURI}&scope=read`;
    window.location.replace(url);
    setStatus(() => "normal");
};

// return { handleBlankInput }