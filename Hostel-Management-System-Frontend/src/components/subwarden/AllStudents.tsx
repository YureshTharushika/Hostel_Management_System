import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LoadingSpin from "../LoadingSpin";

export default function AllStudents() {

  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [token, setToken] = useState("");
  const [studentData, setStudentData] = useState([]) as any[];

  useEffect(() => {
    const authToken: any = localStorage.getItem("authToken");
    setToken(authToken);
    getAllStudentsAPICall();
  }, []);

  const getAllStudentsAPICall = async () => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/students`,
        config
      );
      setStudentData(response.data);
      setLoadingSpinner(false);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  return (
    <React.Fragment>
    <h1 className="mt-10 ml-5 text-4xl text-gray-900 font-bold">
      All Students
    </h1>
    <div className="mt-20 mx-4">
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-200 ">
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Index No</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Academic Year</th>
                <th className="px-4 py-3">Email</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {studentData.map((item: any, index: any) => (
                <tr className="bg-gray-100 hover:bg-gray-300 text-gray-700" key={index.toString()} >
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{item.first_name} {item.last_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{item.index_number}</td>
                  <td className="px-4 py-3 text-sm">{item.gender}</td>
                  <td className="px-4 py-3 text-sm">{item.academic_year}</td>
                  <td className="px-4 py-3 text-sm">
                    {item.email}
                  </td>
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
  )
}
