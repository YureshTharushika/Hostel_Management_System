import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LoadingSpin from "../LoadingSpin";
import FormInputItem from "../FormInputItem";

export default function Hostels() {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [token, setToken] = useState("");
  const [hostelsData, setHostelsData] = useState([]) as any[];
  const [hostelName, setHostelName] = useState("");
  const [hostelType, setHostelType] = useState("");
  const [noHostelsBanner, setNoHostelsBanner] = useState(false);
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [bedCount, setBedCount] = useState("");
  const [deleteBedNo, setDeleteBedNo] = useState("");


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

  const addNewHostel = async () => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const name = hostelName;
    const type = hostelType;

    try {
      await axios.post(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/newhostel`,
        {
          name,
          type,
        },
        config
      );
      getAllHostelsAPICall();
      setHostelName("");
      setHostelType("");
      setLoadingSpinner(false);
      toast.success("Hostel added successfully.");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const deleteHostel = async (hostelId: any) => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/deletehostel/${hostelId}`,
        config
      );
      getAllHostelsAPICall();
      setLoadingSpinner(false);
      toast.success("Hostel deleted successfully.");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const addRoomCountForHostel = async (hostelId: any) => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const room_count = numberOfRooms;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/newroom/${hostelId}`,
        {
          room_count,
        },
        config
      );
      setNumberOfRooms("");
      getAllHostelsAPICall();
      setLoadingSpinner(false);
      toast.success(response.data.message);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const addBeds = async () => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const bed_count = bedCount;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/newbed/${roomNo}`,
        {
          bed_count,
        },
        config
      );
      setBedCount("");
      setRoomNo("");
      getAllHostelsAPICall();
      setLoadingSpinner(false);
      toast.success(response.data.message);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const deleteBed = async () => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/deletebed/${deleteBedNo}`,
        config
      );
      setDeleteBedNo("");
      getAllHostelsAPICall();
      setLoadingSpinner(false);
      toast.success(response.data.message);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  return (
    <React.Fragment>
      <h1 className="mt-10 ml-5 text-4xl text-gray-900 font-bold">Hostels</h1>
      <div className="container md:w-full">
        <h6 className="mt-10 ml-5 text-md text-gray-900 font-bold">
          Add a new hostel
        </h6>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-4 md:flex md:flex-row">
          <FormInputItem
            label="Hostel Name"
            type="text"
            placeHolder="Hostel Name"
            value={hostelName}
            onChange={setHostelName}
          />
          <div className="mb-4 md:w-fit md:pl-2 md:pr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Hostel Type
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="hostelTypes"
              onChange={(e: any) => {
                setHostelType(e.target.value);
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
          <div className="flex items-center justify-between md:pl-2 md:pr-2 md:mt-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={addNewHostel}
            >
              Add <i className="fa-solid fa-hotel"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="mx-4">
        <h6 className="mt-20 ml-5 text-md text-gray-900 font-bold">
          All hostels
        </h6>
        <div className="w-full overflow-hidden rounded-lg shadow-xs mt-5">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-200 ">
                  <th className="px-4 py-3">Hostel Name</th>
                  <th className="px-4 py-3">Hostel Type</th>
                  <th className="px-4 py-3">Action</th>
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
                    <td className="px-4 py-3 text-sm">
                      <FormInputItem
                        type="text"
                        placeHolder="Room count"
                        value={item.numberOfRooms}
                        onChange={setNumberOfRooms}
                      />
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                        type="button"
                        onClick={(e: any) => {
                          addRoomCountForHostel(item.id);
                        }}
                      >
                        Add Rooms <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                        type="button"
                        onClick={(e: any) => {
                          deleteHostel(item.id);
                        }}
                      >
                        Delete Hostel <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container md:w-full mt-20">
        <h6 className="mt-10 ml-5 text-md text-gray-900 font-bold">
          Add a new bed
        </h6>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-4 md:flex md:flex-row">
          <FormInputItem
            label="Room NO"
            type="number"
            placeHolder="Room NO"
            value={roomNo}
            onChange={setRoomNo}
          />
          <FormInputItem
            label="Bed Count"
            type="number"
            placeHolder="Bed Count"
            value={bedCount}
            onChange={setBedCount}
          />
          <div className="flex items-center justify-between md:pl-2 md:pr-2 md:mt-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => addBeds()}
            >
              Add <i className="fa-solid fa-bed"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="container md:w-full mt-20">
        <h6 className="mt-10 ml-5 text-md text-gray-900 font-bold">
          Delete a bed
        </h6>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-4 md:flex md:flex-row">
          <FormInputItem
            label="Bed No"
            type="number"
            placeHolder="Bed NO"
            value={deleteBedNo}
            onChange={setDeleteBedNo}
          />
          <div className="flex items-center justify-between md:pl-2 md:pr-2 md:mt-3">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => deleteBed()}
            >
              Delete <i className="fa-solid fa-bed"></i>
            </button>
          </div>
        </form>
      </div>
      {loadingSpinner ? <LoadingSpin /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
