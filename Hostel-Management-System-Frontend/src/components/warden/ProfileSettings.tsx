import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInputItem from "../FormInputItem";
import axios from "axios";
import LoadingSpin from "../LoadingSpin";

export default function ProfileSettings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const authToken: any = localStorage.getItem("authToken");
    setToken(authToken);
  }, []);

  function changePassword() {
    if (oldPassword === "") {
      toast.error("Please enter old password..!!");
    } else if (newPassword === "") {
      toast.error("Please enter new password..!!");
    } else if (newPassword.length < 8) {
      toast.error("Password length should be minimum 8 characters..!!");
    } else if (newPassword.length > 12) {
      toast.error("Password length should be maximum 12 characters..!!");
    } else if (confirmNewPassword === "") {
      toast.error("Please enter conofirm password..!!");
    } else if (newPassword !== confirmNewPassword) {
      toast.error("Confirm password is not match..!!");
    } else {
      try {
        changePasswordAPICall();
        setOldPassword("");
        setnewPassword("");
        setConfirmNewPassword("");
      } catch (err: any) {
        toast.error(err);
      }
    }
  }

  const changePasswordAPICall = async () => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const old_password = oldPassword;
    const password = newPassword;
    const password_confirmation = confirmNewPassword;

    try {
      await axios.post(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/changewardenpassword`,
        {
          old_password,
          password,
          password_confirmation,
        },
        config
      );
      setLoadingSpinner(false);
      toast.success("Password change successfully.");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  return (
    <React.Fragment>
      <h1 className="mt-10 ml-5 text-4xl text-gray-900 font-bold">
        Profile Settings
      </h1>
      <div className="container md:w-full">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-4 mt-10">
          <FormInputItem
            label="Old Password"
            type="password"
            placeHolder="Old Password"
            value={oldPassword}
            onChange={setOldPassword}
          />
          <FormInputItem
            label="New Password"
            type="password"
            placeHolder="New Password"
            value={newPassword}
            onChange={setnewPassword}
          />
          <FormInputItem
            label="Confirm Password"
            type="password"
            placeHolder="Confirm Password"
            value={confirmNewPassword}
            onChange={setConfirmNewPassword}
          />
          <div className="flex items-center justify-between md:pl-2 md:pr-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={changePassword}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
      {loadingSpinner ? <LoadingSpin /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
