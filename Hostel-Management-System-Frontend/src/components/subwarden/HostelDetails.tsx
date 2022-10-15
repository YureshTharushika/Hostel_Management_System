import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LoadingSpin from "../LoadingSpin";

export default function HostelDetails() {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [hostelData, setHostelData] = useState([]) as any[];
  const [token, setToken] = useState("");


  useEffect(() => {
    setLoadingSpinner(true);
    const authToken: any = localStorage.getItem("authToken");
    setToken(authToken);
    getHostelDetailsAPICall(authToken);
  }, []);

  const getHostelDetailsAPICall = async (token: any) => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/showsubwardenhostel`,
        config
      );
      console.log(response.data);
      setLoadingSpinner(false);
      if (response.data.message) {
        toast.info("You have not yet assigned to a hostel.");
        setHostelData([]);
      } else {
        setHostelData(response.data.bed_details[0]);
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };


  return (
    <React.Fragment>
      <h1 className="mt-10 ml-5 text-4xl text-gray-900 font-bold">My Hostel</h1>
      <div className="mt-20 mx-4">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-200 ">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                <tr className="bg-gray-100 hover:bg-gray-300 text-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">Hostel Name</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {hostelData.hostel_name}
                  </td>
                </tr>
                <tr className="bg-gray-100 hover:bg-gray-300 text-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">Hostel Type</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {hostelData.hostel_type}
                  </td>
                </tr>
                <tr className="bg-gray-100 hover:bg-gray-300 text-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">Room No</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                      {hostelData.room_id}
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-100 hover:bg-gray-300 text-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">Bed No</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                      {hostelData.bed_id}
                    </span>
                  </td>
                </tr>
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
