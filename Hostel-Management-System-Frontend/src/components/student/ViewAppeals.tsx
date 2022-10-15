import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LoadingSpin from "../LoadingSpin";

export default function ViewAppeals() {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [appealsData, setAppealsData] = useState([]) as any[];
  const [noAppealsBanner, setNoAppealsBanner] = useState(false);

  useEffect(() => {
    setLoadingSpinner(true);
    const authToken: any = localStorage.getItem("authToken");
    getAllMyAppealsAPICall(authToken);
  }, []);

  const getAllMyAppealsAPICall = async (token: any) => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/showmyappeals`,
        config
      );
      if (response.data.appeals) {
        setAppealsData(response.data.appeals);
        console.log(response.data.appeals);
      } else {
        setAppealsData([]);
        setNoAppealsBanner(true);
        toast.info("You don't have appeals.");
      }
      setLoadingSpinner(false);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  return (
    <React.Fragment>
      <h1 className="mt-10 ml-5 text-4xl text-gray-900 font-bold">
        View All Appeals
      </h1>
      <div className="mt-20 mx-4">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-200 ">
                  <th className="px-4 py-3">Index No</th>
                  <th className="px-4 py-3">Content</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {noAppealsBanner ? (
                  <tr className="bg-gray-100 hover:bg-gray-300 text-gray-700">
                    <td className="px-4 py-3 text-sm">
                      You don't have appeals.
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : null}
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
                    <td className="px-4 py-3 text-sm">{item.content}</td>
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
