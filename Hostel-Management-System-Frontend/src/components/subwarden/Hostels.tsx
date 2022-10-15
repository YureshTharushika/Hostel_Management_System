import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LoadingSpin from "../LoadingSpin";

export default function Hostels() {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [token, setToken] = useState("");
  const [hostelsData, setHostelsData] = useState([]) as any[];
  const [noHostelsBanner, setNoHostelsBanner] = useState(false);

  useEffect(() => {
    const authToken: any = localStorage.getItem("authToken");
    setToken(authToken);
    getAllHostelsAPICall();
  }, []);

  const getAllHostelsAPICall = async () => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/showallhostels`,
        config
      );
      if (response.data.hostels) {
        setHostelsData(response.data.hostels);
        setNoHostelsBanner(false);
      } else {
        setHostelsData([]);
        setNoHostelsBanner(true);
        toast.info("No hostels have been created yet.");
      }
      setLoadingSpinner(false);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  return (
    <React.Fragment>
      <h1 className="mt-10 ml-5 text-4xl text-gray-900 font-bold">Hostels</h1>
      <div className="mx-4">
        <div className="w-full overflow-hidden rounded-lg shadow-xs mt-20">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-200 ">
                  <th className="px-4 py-3">Hostel Name</th>
                  <th className="px-4 py-3">Hostel Type</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {noHostelsBanner ? (
                  <tr className="bg-gray-100 hover:bg-gray-300 text-gray-700">
                    <td className="px-4 py-3 text-sm">
                      No hostels have been created yet.
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : null}
                {hostelsData.map((item: any, index: any) => (
                  <tr
                    className="bg-gray-100 hover:bg-gray-300 text-gray-700"
                    key={index.toString()}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{item.type}</td>
                  </tr>
                ))}
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
