import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInputItem from "../FormInputItem";
import axios from "axios";
import LoadingSpin from "../LoadingSpin";

export default function AddAppeals() {
  const [content, setContent] = useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const authToken: any = localStorage.getItem("authToken");
    setToken(authToken);
  }, []);

  function sendAppeal() {
    if (content === "") {
      toast.error("Please enter content..!!");
    } else if (content.length <= 20) {
      toast.error("Minimum charcters in content should be 20..!!");
    } else {
      try {
        sendAppealAPICall();
        setContent("");
      } catch (err: any) {
        toast.error(err);
      }
    }
  }

  const sendAppealAPICall = async () => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/appeal`,
        {
          content,
        },
        config
      );
      setLoadingSpinner(false);
      toast.success("Appeal send successfully.");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  return (
    <React.Fragment>
      <h1 className="mt-10 ml-5 text-4xl text-gray-900 font-bold">
        Create New Appeal
      </h1>
      <div className="container md:w-full">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-4 mt-10">
          <div className="mb-4 md:w-full md:pl-2 md:pr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={content}
              onChange={(e: any) => setContent(e.target.value)}
              placeholder="Enter your appeal here..."
			  rows={10}
            ></textarea>
          </div>
          <div className="flex items-center justify-between md:pl-2 md:pr-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={sendAppeal}
            >
              Send Appeal
            </button>
          </div>
        </form>
      </div>
      {loadingSpinner ? <LoadingSpin /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
