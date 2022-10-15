import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LoadingSpin from "../LoadingSpin";

export default function AssignStudents() {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [token, setToken] = useState("");
  const [maleHostelsData, setMaleHostelsData] = useState([]) as any[];
  const [femaleHostelsData, setFemaleHostelsData] = useState([]) as any[];
  const [noMaleStudentBanner, setNoMaleStudentBanner] = useState(false);
  const [noFemaleStudentBanner, setNoFemaleStudentBanner] = useState(false);
  const [potentialHostelsData, setPotentialHostelsData] = useState([]) as any[];
  const [selectHostelManuallySection, setSelectHostelManuallySection] = useState(false);
  const [studentIndex, setStudentIndex] = useState("");

  useEffect(() => {
    const authToken: any = localStorage.getItem("authToken");
    setToken(authToken);
    getAllMaleHostelsData(authToken);
    getAllFemaleHostelsData(authToken);
  }, []);

  const getAllMaleHostelsData = async (token: any) => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/showmalestudenthosteldetails`,
        config
      );
      if (response.data.bed_details) {
        setMaleHostelsData(response.data.bed_details);
        setNoMaleStudentBanner(false);
      } else {
        setMaleHostelsData([]);
        setNoMaleStudentBanner(true);
      }
      setLoadingSpinner(false);
    } catch (err: any) {
      setLoadingSpinner(false);
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const getAllFemaleHostelsData = async (token: any) => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/showfemalestudenthosteldetails`,
        config
      );
      if (response.data.bed_details) {
        setFemaleHostelsData(response.data.bed_details);
        setNoFemaleStudentBanner(false);
      } else {
        setFemaleHostelsData([]);
        setNoFemaleStudentBanner(true);
      }
      setLoadingSpinner(false);
    } catch (err: any) {
      setLoadingSpinner(false);
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const assignMaleHostels = async () => {
    setLoadingSpinner(true);
    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/malerandom`,
        config
      );
      getAllMaleHostelsData(token);
      setLoadingSpinner(false);
      toast.success("Assign male students to the hostels successfully.");
    } catch (err: any) {
      setLoadingSpinner(false);
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const assignFemaleHostels = async () => {
    setLoadingSpinner(true);
    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/femalerandom`,
        config
      );
      getAllFemaleHostelsData(token);
      setLoadingSpinner(false);
      toast.success("Assign female students to the hostels successfully.");
    } catch (err: any) {
      setLoadingSpinner(false);
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const changeStudentHostelManually = async (hostelId: any, studentID:any) => {
    setLoadingSpinner(true);
    setStudentIndex(studentID)
    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/potentialhostels/${hostelId}`,
        config
      );
      console.log(response.data.potential_hostels);
      if (response.data.potential_hostels) {
        setPotentialHostelsData(response.data.potential_hostels);
        setSelectHostelManuallySection(true);
      } else {
        setPotentialHostelsData([]);
        setSelectHostelManuallySection(false);
      }
      setLoadingSpinner(false);
    } catch (err: any) {
      setLoadingSpinner(false);
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const confirmManuallyAssign = async (hostelId: any) => {
    setLoadingSpinner(true);
    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const hostel_id = hostelId;
    const student_index = studentIndex;
    try {
      await axios.put(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/changestudenthostel`,
        {
          hostel_id,
          student_index,
        },
        config
      );
      setSelectHostelManuallySection(false);
      getAllMaleHostelsData(token);
      getAllFemaleHostelsData(token);
      setLoadingSpinner(false);
      toast.success(
        student_index + "Manually assign to the hostel successfully."
      );
    } catch (err: any) {
      setLoadingSpinner(false);
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  return (
    <React.Fragment>
      <h1 className="mt-10 ml-5 text-4xl text-gray-900 font-bold">
        Assign Students
      </h1>
      <div>
        <div className="container md:w-full">
          <h6 className="mt-10 ml-5 text-md text-gray-900 font-bold">
            Assign to male hostels
          </h6>
          <div className="flex items-center justify-between md:pl-5 md:pr-2 md:mt-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={assignMaleHostels}
            >
              <i className="fa-solid fa-person"></i> Assign Male Students
            </button>
          </div>
          <h6 className="mt-10 ml-5 text-md text-gray-900 font-bold">
            Assign to female hostels
          </h6>
          <div className="flex items-center justify-between md:pl-5 md:pr-2 md:mt-3">
            <button
              className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={assignFemaleHostels}
            >
              <i className="fa-solid fa-person-dress"></i> Assign Female
              Students
            </button>
          </div>
        </div>
        {selectHostelManuallySection ? (
          <div className="container md:w-full px-20">
            <div className="w-full flex justify-between align-middle items-center mt-20 mb-10 ">
              <h6 className="text-md text-gray-900 font-bold">
                Available Hostels
              </h6>
              <button
                className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 text-xs mt-2 h-fit"
                type="button"
                onClick={() => {
                  setSelectHostelManuallySection(false);
                }}
              >
                Cancel Manual Assigning <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="flex flex-row flex-wrap w-full justify-center">
              {potentialHostelsData.map((item: any, index: any) => (
                <div
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight w-36 h-fit text-center flex flex-col justify-center align-middle items-center font-semibold text-sm m-2"
                  key={index.toString()}
                >
                  <p className="p-2">Hostel Name</p>
                  <p className="p-2">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                      {item.name}
                    </span>
                  </p>
                  <button
                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 text-xs mt-2"
                    type="button"
                    onClick={(e: any) => {
                      confirmManuallyAssign(item.id);
                    }}
                  >
                    Confirm <i className="fa-solid fa-bookmark"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="mx-4 ml-5">
              <h6 className="mt-20 ml-5 text-md text-gray-900 font-bold">
                Assigned male students
              </h6>
              <div className="w-full overflow-hidden rounded-lg shadow-xs mt-5">
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-200 ">
                        <th className="px-4 py-3">Index Number</th>
                        <th className="px-4 py-3">Hostel Name</th>
                        <th className="px-4 py-3">Hostel Type</th>
                        <th className="px-4 py-3">Room No</th>
                        <th className="px-4 py-3">Bed No</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y">
                      {noMaleStudentBanner ? (
                        <tr className="bg-gray-100 hover:bg-gray-300 text-gray-700">
                          <td className="px-4 py-3 text-sm">
                            No male students have been assigned yet.
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      ) : null}
                      {maleHostelsData.map((item: any, index: any) => (
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
                          <td className="px-4 py-3 text-sm">
                            {item.hostel_name}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {item.hostel_type}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                              {item.room_id}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                              {item.bed_id}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center justify-between md:pl-2 md:pr-2">
                              <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => {
                                  changeStudentHostelManually(item.hostel_id, item.student_index_number);
                                }}
                              >
                                Change Manually{" "}
                                <i className="fa-solid fa-bolt"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mx-4 ml-5">
              <h6 className="mt-20 ml-5 text-md text-gray-900 font-bold">
                Assigned female students
              </h6>
              <div className="w-full overflow-hidden rounded-lg shadow-xs mt-5">
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-200 ">
                        <th className="px-4 py-3">Index Number</th>
                        <th className="px-4 py-3">Hostel Name</th>
                        <th className="px-4 py-3">Hostel Type</th>
                        <th className="px-4 py-3">Room No</th>
                        <th className="px-4 py-3">Bed No</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y">
                      {noFemaleStudentBanner ? (
                        <tr className="bg-gray-100 hover:bg-gray-300 text-gray-700">
                          <td className="px-4 py-3 text-sm">
                            No female students have been assigned yet.
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      ) : null}
                      {femaleHostelsData.map((item: any, index: any) => (
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
                          <td className="px-4 py-3 text-sm">
                            {item.hostel_name}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {item.hostel_type}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                              {item.room_id}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                              {item.bed_id}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center justify-between md:pl-2 md:pr-2">
                              <button
                                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => {
                                  changeStudentHostelManually(item.hostel_id, item.student_index_number);
                                }}
                              >
                                Change Manually{" "}
                                <i className="fa-solid fa-bolt"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {loadingSpinner ? <LoadingSpin /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
