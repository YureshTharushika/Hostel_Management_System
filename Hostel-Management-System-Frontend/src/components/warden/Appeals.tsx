import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LoadingSpin from "../LoadingSpin";

export default function Appeals() {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [appealsData, setAppealsData] = useState([]) as any[];
  const [token, setToken] = useState("");

  useEffect(() => {
    const authToken: any = localStorage.getItem("authToken");
    setToken(authToken);
    getAllAppealsAPICall(authToken);
  }, []);


  const acceptAppeal = async (appealId: any) => {
    setLoadingSpinner(true);

    console.log("TOKEN : " + token);
    console.log("ID : " + appealId);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/acceptappeal/${appealId}`,
        config
      );
      getAllAppealsAPICall(token);
      setLoadingSpinner(false);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const declineAppeal = async (appealId: any) => {
    setLoadingSpinner(true);

    console.log("TOKEN : " + token);
    console.log("ID : " + appealId);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/declineappeal/${appealId}`,
        config
      );
      getAllAppealsAPICall(token);
      setLoadingSpinner(false);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };


  const getAllAppealsAPICall = async (authToken: any) => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/showappeals`,
        config
      );
      setAppealsData(response.data);
      setLoadingSpinner(false);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };


  return (
    <React.Fragment>
      <h1 className="mt-10 ml-5 text-4xl text-gray-900 font-bold">Appeals</h1>
      <div className="mt-20 mx-4">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-200">
                  <th className="px-4 py-3">Student Index</th>
                  <th className="px-4 py-3 w-80">Content</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {appealsData.map((item: any, index: any) => (
                  <tr
                    className="bg-gray-100 hover:bg-gray-300 text-gray-700"
                    key={index.toString()}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">
                            {item.student_index_number}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm w-80">{item.content}</td>
                    <td className="px-4 py-3 text-sm">{item.student_email}</td>
                    <td className="px-4 py-3 text-xs">
                      {item.status === 0 ? (
                        <span className="px-2 py-1 font-semibold leading-tight text-blue-700 bg-blue-100 rounded-full">
                          Pending
                        </span>
                      ) : null}
                      {item.status === 1 ? (
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                          Approved
                        </span>
                      ) : null}
                      {item.status === 2 ? (
                        <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                          Rejected
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-sm justify-center">
                      {item.status === 0 ? (
                        <div>
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => {
                              acceptAppeal(item.id);
                            }}
                          >
                            Approve <i className="fa-solid fa-check"></i>
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                            type="button"
                            onClick={() => {
                              declineAppeal(item.id);
                            }}
                          >
                            Decline <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      ) : null}
                      {item.status === 1 ? (
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                          <i className="fa-solid fa-check"></i>
                        </span>
                      ) : null}
                      {item.status === 2 ? (
                        <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                          <i className="fa-solid fa-xmark"></i>
                        </span>
                      ) : null}
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
