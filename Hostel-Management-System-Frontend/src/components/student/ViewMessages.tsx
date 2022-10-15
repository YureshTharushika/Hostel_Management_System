import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LoadingSpin from "../LoadingSpin";

export default function ViewMessages() {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [messagesData, setMessagesData] = useState([]) as any[];
  const [noMessagesBanner, setNoMessagesBanner] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const authToken: any = localStorage.getItem("authToken");
    setToken(authToken);
    getMessagesAPICall(authToken);
  }, []);

  const getMessagesAPICall = async (token: any) => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/messages`,
        config
      );
      console.log(response.data.messages);
      if (response.data.messages.constructor.name == "Array") {
        setMessagesData(response.data.messages);
        setNoMessagesBanner(false);
      } else {
        setMessagesData([]);
        setNoMessagesBanner(true);
        toast.info("You don't have messages.");
      }
      setLoadingSpinner(false);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const deleteMessage = async (messageId: any) => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/deletemessage/${messageId}`,
        config
      );
      getMessagesAPICall(token);
      setLoadingSpinner(false);
    } catch (err: any) {
      setLoadingSpinner(false);
      toast.error(err.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <h1 className="mt-10 ml-5 text-4xl text-gray-900 font-bold">Messages</h1>
      <div className="mt-20 mx-4">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-200 ">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {noMessagesBanner ? (
                  <tr className="bg-gray-100 hover:bg-gray-300 text-gray-700">
                    <td className="px-4 py-3 text-sm">
                      You don't have messages.
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : null}
                {messagesData.map((item: any, index: any) => (
                  <tr
                    className="bg-gray-100 hover:bg-gray-300 text-gray-700"
                    key={index.toString()}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{item.updated_at.substring(0,10)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{item.content.charAt(0).toUpperCase() + item.content.slice(1) +"."}</td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                        type="button"
                        onClick={(e: any) => {
                          deleteMessage(item.id);
                        }}
                      >
                        Delete <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                )).reverse()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {loadingSpinner ? <LoadingSpin /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
