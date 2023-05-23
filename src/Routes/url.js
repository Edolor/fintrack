/** BASE URL FOR BACKEND API */
const baseURL = process.env.REACT_APP_BASE_URL;

const PATHS = {
    register: "/account/register/",
    login: "/account/login/",
    details: "/account/details/",
    changePassword: "/account/change-password/",
    addTransaction: "/transaction/add/",
    transactions: "/transaction/",
    listCategories: "/transaction/list-categories/",
    sendReceipt: "/transaction/reciept/",

    googleOAUTH: "/oauth/google-auth/",
    bookstoreOAUTH: "/oauth/bookstore-auth/",
};

/** Google oauth client id */
const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

/** BookHub redirect URI */
const bookHubURL = process.env.REACT_APP_BOOKHUB_URL;
const bookHubClientID = process.env.REACT_APP_BOOKHUB_CLIENT_ID;
const bookHubCodeChallange = process.env.REACT_APP_BOOKHUB_CODE_CHALLANGE;
const redirectURI = `${process.env.REACT_APP_WEB_URL}/oauth`;


export { baseURL, PATHS, clientID, bookHubClientID, bookHubCodeChallange, bookHubURL, redirectURI };