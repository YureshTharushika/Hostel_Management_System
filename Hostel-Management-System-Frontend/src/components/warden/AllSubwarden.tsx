import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LoadingSpin from "../LoadingSpin";
import FormInputItem from "../FormInputItem";

export default function AllSubwarden() {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [token, setToken] = useState("");
  const [subwardensData, setSubwardensData] = useState([]) as any[];
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");
  const [noSubwardensBanner, setNoSubwardensBanner] = useState(false);
  const [availableRoomsData, setAvailableRoomsData] = useState([]) as any[];
  const [subwardenId, setSubwardenId] = useState("");
  const [availableRoomsSection, setAvailableRoomsSection] = useState(false);

  useEffect(() => {
    const authToken: any = localStorage.getItem("authToken");
    setToken(authToken);
    console.log("Mount All Students Component");
    getAllSubwardensAPICall();
  }, []);

  const getAllSubwardensAPICall = async () => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/showallsubwardens`,
        config
      );
      console.log(response.data);
      if (response.data.subwardens) {
        setNoSubwardensBanner(false);
        setSubwardensData(response.data.subwardens);
      } else {
        setNoSubwardensBanner(true);
        setSubwardensData([]);
      }
      setLoadingSpinner(false);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const addNewSubwarden = async () => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const first_name = firstName;
    const last_name = secondName;
    const password_confirmation = confirmPassword;

    try {
      await axios.post(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/subwardensignup`,
        {
          first_name,
          last_name,
          gender,
          email,
          password,
          password_confirmation,
        },
        config
      );
      getAllSubwardensAPICall();
      setFirstName("");
      setSecondName("");
      setGender("");
      setEmail("");
      setLoadingSpinner(false);
      toast.success("Subwarden added successfully.");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const editSubwarden = async (subwardenId: any) => {};

  const deleteSubwarden = async (subwardenId: any) => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/deletesubwarden/${subwardenId}`,
        config
      );
      getAllSubwardensAPICall();
      setLoadingSpinner(false);
      toast.success("Subwarden deleted successfully.");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const checkRoomAvailability = async (subwardenId: any) => {
    setLoadingSpinner(true);
    setSubwardenId(subwardenId);
    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/availablehostelsforsubwarden/${subwardenId}`,
        config
      );
      console.log(response.data.available_beds);
      setAvailableRoomsData(response.data.available_beds);
      setAvailableRoomsSection(true);
      setLoadingSpinner(false);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const assignHostelToSubwarden = async (BedId: any) => {
    setLoadingSpinner(true);
    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const subwarden_id = subwardenId;
    const bed_id = BedId;
    try {
      await axios.put(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/assignsubwarden`,
        {
          subwarden_id,
          bed_id,
        },
        config
      );
      setAvailableRoomsSection(false);
      getAllSubwardensAPICall();
      setLoadingSpinner(false);
      toast.success("Assign subwarden to a hostels successfully.");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  return (
    <React.Fragment>
      <h1 className="mt-10 ml-5 text-4xl text-gray-900 font-bold">
        All Subwarden
      </h1>
      <div className="container md:w-full">
        <h6 className="mt-10 ml-5 text-md text-gray-900 font-bold">
          Add a new subwarden
        </h6>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-4 mt-5">
          <div className="w-full md:flex md:flex-row">
            <FormInputItem
              label="First Name"
              type="text"
              placeHolder="First Name"
              value={firstName}
              onChange={setFirstName}
            />
            <FormInputItem
              label="Last Name"
              type="text"
              placeHolder="Last Name"
              value={secondName}
              onChange={setSecondName}
            />
            <div className="mb-4 md:w-fit md:pl-2 md:pr-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Gender
              </label>
              <select
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="hostelTypes"
                onChange={(e: any) => {
                  setGender(e.target.value);
                }}
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled>
                  -- select an option --
                </option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
          </div>
          <div className="w-full md:flex md:flex-row">
            <FormInputItem
              label="Email"
              type="text"
              placeHolder="Email"
              value={email}
              onChange={setEmail}
            />
            <FormInputItem
              label="Password"
              type="password"
              placeHolder="Password"
              value={password}
              onChange={setPassword}
              disabled={true}
            />
            <FormInputItem
              label="Confirm Password"
              type="password"
              placeHolder="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              disabled={true}
            />
          </div>
          <div className="flex items-center justify-between md:pl-2 md:pr-2 md:mt-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={addNewSubwarden}
            >
              Add Subwarden
            </button>
          </div>
        </form>
      </div>

      <div className="mx-4">
        <h6 className="mt-20 ml-5 text-md text-gray-900 font-bold">
          Registered subwardens
        </h6>
        <div className="w-full overflow-hidden rounded-lg shadow-xs mt-5">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-200 ">
                  <th className="px-4 py-3">Subwarden Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Assign to a hostel?</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {noSubwardensBanner ? (
                  <tr className="bg-gray-100 hover:bg-gray-300 text-gray-700">
                    <td className="px-4 py-3 text-sm">
                      No subwardens have been created yet.
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : null}
                {subwardensData.map((item: any, index: any) => (
                  <tr
                    className="bg-gray-100 hover:bg-gray-300 text-gray-700"
                    key={index.toString()}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">
                            {item.first_name} {item.last_name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{item.email}</td>
                    <td className="px-4 py-3 text-sm">{item.gender}</td>
                    <td className="px-4 py-3 text-sm">
                      {item.is_assigned === 0 ? (
                        <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                          Pending
                        </span>
                      ) : (
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                          Done
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.is_assigned === 0 ? (
                        <div>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                            type="button"
                            onClick={(e: any) => {
                              checkRoomAvailability(item.id);
                            }}
                          >
                            Assign <i className="fa-solid fa-arrow-right"></i>
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                            type="button"
                            onClick={(e: any) => {
                              deleteSubwarden(item.id);
                            }}
                          >
                            Delete <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                          type="button"
                          onClick={(e: any) => {
                            deleteSubwarden(item.id);
                          }}
                        >
                          Delete <i className="fa-solid fa-trash"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {availableRoomsSection ? (
        <div className="mx-4 pl-5">
          <div className="w-full flex justify-between align-middle items-center mt-20 mb-10 ">
            <h6 className="text-md text-gray-900 font-bold">
              Available Rooms
            </h6>
            <button
                  className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 text-xs mt-2 h-fit"
                  type="button"
                  onClick={() => {
                    setAvailableRoomsSection(false);
                  }}
                >
                  Cancel Assigning <i className="fa-solid fa-xmark"></i>
                </button>
          </div>
          <div className="flex flex-row flex-wrap w-full justify-center">
            {availableRoomsData.map((item: any, index: any) => (
              <div
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight w-36 h-fit text-center flex flex-col justify-center align-middle items-center font-semibold text-sm m-2"
                key={index.toString()}
              >
                <p className="p-2">{item.hostel_name}</p>
                <p className="p-2">
                  <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                    Room : {item.room_id}
                  </span>
                </p>
                <p className="p-2">
                  <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
                    Bed : {item.bed_id}
                  </span>
                </p>
                <button
                  className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 text-xs mt-2"
                  type="button"
                  onClick={(e: any) => {
                    assignHostelToSubwarden(item.bed_id);
                  }}
                >
                  Confirm <i className="fa-solid fa-bookmark"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {loadingSpinner ? <LoadingSpin /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
