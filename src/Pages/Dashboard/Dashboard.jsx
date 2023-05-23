import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { PATHS } from "../../Routes/url";
import Popup from "../../Components/Popup/Popup";
import Input from "./../../Components/Input/Input";
import Select from "./../../Components/Input/Select";
import Error from "./../../Components/Input/Error";
import Label from "./../../Components/Input/Label";
import Message from '../../Components/Message/Message';

function Dashboard() {
  const { token, getWithToken, postWithToken } = useAuth();
  const [transactions, setTransactions] = useState({detail: []});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [failure, setFailure] = useState("");
  const [failed, setFailed] = useState("false"); // TO show failed message
  const [categories, setCategories] = useState([]);
  const amountRef = useRef();
  const categoryRef = useRef();

  const [amountError, setAmountError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [status, setStatus] = useState("normal");
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const getWithRef = useRef(getWithToken);
  const tokenRef = useRef(token);
  
  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      try {
        // Get categories and transactions
        const response = await getWithRef.current(PATHS.listCategories, tokenRef.current);
        const trans = await getWithRef.current(PATHS.transactions, tokenRef.current);

        if (!ignore) {
          /// Ignore on clean up
          setCategories(() => response.data);
          setTransactions(() => trans.data);
        }
        
      } catch(error) {
      }

      setLoading(false);
    }

    getData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleAmount = (e) => {
    /**
     * Handling amount validity
     */
     const amount =  /^[0-9]+(\.[0-9]+)?$/;
    
    if (amountRef.current.value.trim() === "") {
      setAmountError(() => "Amount is required");
    } else if (amount.test(amountRef.current.value) === false) {
      setAmountError(() => "Only numbers are allowed");
    } else if (parseFloat(amountRef.current.value) < 0) {
      setAmountError(() => "Amount must be above 0");
    } else {
      setAmountError(() => "");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(() => "loading");
    setSuccess(() => false);
    let bug = false;
    
    if (amountRef.current.value.trim() === "") {
      amountRef.current.focus();
      setAmountError(() => "Amount is required");
      bug = true;
    } else {
      setAmountError(() => "");
    }

    if (categoryRef.current.value.trim() === "") {
      categoryRef.current.focus();
      setCategoryError(() => "Category is required");
      bug = true;
    } else {
      setCategoryError(() => "");
    }

    if (bug) { // Check for any error
      setStatus(() => "normal");
      return;
    }

    const data = {
      amount: amountRef.current.value.trim(),
      category: categoryRef.current.value,
    }

    try {
      // Send request and await response
      const response = await postWithToken(data, PATHS.addTransaction, token);

      if (response.status === 201) { // Successfully created
        setSuccess(() => true);

        setStatus(() => "normal");
        setMessage(() => "Transaction added!");
        amountRef.current.value = "";

        setShowPopup(() => false);
        setTimeout(() => {
          window.location.reload(false);
        }, 2000);
        // Add data to transactions
      }
    } catch(error) {
      const errors = error.response.data;
      if (errors.amount) {
          setAmountError(errors.amount[0]);
      }
      if (errors.category) {
          setCategoryError(errors.category[0]);
      }
      setError(() => `${error.response.statusText}!`) 
    }

    setStatus(() => "normal");
  }

  const sendReceipt = async (id) => {
    setStatus(() => "loading");
    try {
      // Send request and await response
      const response = await getWithToken(`${PATHS.sendReceipt}${id}/`, token);

      if (response.status === 200) { // Successfully created
        setSuccess(() => true);
        setStatus(() => "normal");
        setMessage(() => "Email sent successfully!");
      }
    } catch(error) {
      setFailure(() => "Failed to send email");
      setFailed(() => true);
    }

    setStatus(() => "normal");
  }

  const spinner = (
    <div className="flex h-20 items-center justify-center">
        <div role="status">
            <svg aria-hidden="true" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    </div>
  );

  return (
    <>
      <section id="formWrapper" className="w-full">

        <div className="container mx-auto pt-8 pb-10 flex flex-col">
          <div className="flex items-center justify-end">
              <button type="button" onClick={() => setShowPopup(() => true)}
                  className="flex flex-row items-center text-base font-semibold px-7 py-3.5 bg-primary rounded-md
                    text-white drop-shadow-lg outline-offset-2 outline-primary outline-1 focus:outline
                    active:drop-shadow-none sm:text-lg hover:underline hover:bg-primaryLight">
                Create Transaction
              </button>
          </div>
          <table className="border stretch-0 text-lg mt-6 p-4 block">
            <thead>
              <tr className="text-left text-xl">
                <th className="py-2 px-4 w-1/6 border-b border-b-zinc-100">S/N</th>
                <th className="py-2 px-4 w-1/6 border-b border-b-zinc-100">Category</th>
                <th className="py-2 px-4 w-1/6 border-b border-b-zinc-100">Amount</th>
                <th className="py-2 px-4 w-1/4 border-b border-b-zinc-100">Date</th>
                <th className="py-2 px-4 border-b border-b-zinc-100"></th>
              </tr>
            </thead>

            <tbody>
              {transactions?.detail.map((transaction, index) => {
                return (<tr key={index}>
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{transaction.category}</td>
                  <td className="py-2 px-4">{
                    transaction.amount > 0 ? (
                      <span className="text-green-500">{"$" + transaction.amount.toLocaleString("en-US")}</span>
                    ) : (
                      <span className="text-red-500">{"-$" + (transaction.amount * -1).toLocaleString("en-US")}</span>
                    )
                  }</td>
                  <td className="py-2 px-4">{transaction.date}</td>
                  <td className="flex items-center gap-5 py-2 px-4">
                    <button type="button" onClick={() => sendReceipt(transaction.id)}
                        className="flex flex-row items-center text-base font-semibold px-7 py-3.5 bg-white rounded-md
                          text-primary border border-primary drop-shadow-sm outline-offset-2 outline-primary outline-1 
                          focus:outline active:drop-shadow-none sm:text-lg hover:underline hover:bg-zinc-50">
                      Generate Receipt
                    </button>
                  </td>
                </tr>)
              })}
            </tbody>
          </table>
          
          { loading && spinner}

          { (!loading && transactions.detail.length === 0) && (
            <p className="text-lg flex items-center justify-center p-6">No transactions to show</p>
          ) }
        </div>
      </section>

        {showPopup && (
          <Popup>
            <div className="bg-white max-w-lg w-full shadow-md z-50 p-6 rounded-md">
              <h2 className="font-serif text-3xl text-center font-bold text-black mb-5">
                Add Transaction
              </h2>

              <form onSubmit={handleSubmit} id="contact-form" method="post" className="w-full space-y-4 sm:space-y-4">
                {
                  /** Error message */
                  error && (
                    <Message type="error" message={error} status={true} />
                  )
                }
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="category" text="Category" />
                  <div>
                    <Select disabled={status === "loading"} name="category" id="category" reff={categoryRef} options={categories} error={categoryError !== ""} />
                    <Error active={categoryError} text={categoryError} />
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label htmlFor="amount" text="Amount" />
                  <div>
                    <Input type="text" disabled={status === "loading"} placeholder="Amount" name="amount" id="amount" reff={amountRef} handleChange={handleAmount} error={amountError !== ""} />
                    <Error active={amountError} text={amountError} />
                  </div>
                </div>
                
                <div className="flex justify-center mt-8 sm:mt-10">
                  <button type="submit" disabled={status === "loading"}
                      className="flex flex-row items-center text-base font-semibold px-5 py-4 bg-primary rounded-md w-full justify-center
                        text-white gap-x-2 drop-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed outline-offset-2 outline-primary outline-1 focus:outline
                        active:drop-shadow-none hover:underline hover:bg-primaryLight">
                    <span className={`text-lg sm:text-xl`}>{status === "loading" ? "Adding transaction...." : "Add Transaction"}</span>
                  </button>
                </div>
              </form>
            </div>
          </Popup>
        )}

      {
        success && (
          <div className="fixed left-4 bottom-4 flex flex-col space-y-4 z-10">
            <Message type="success" message={message} status={success} />
          </div>
        )
      }

      {
        failure && (
          <div className="fixed left-4 bottom-4 flex flex-col space-y-4 z-10">
            <Message type="error" message={failure} status={failed} />
          </div>
        )
      }
    </>
  );
}

export default Dashboard;
