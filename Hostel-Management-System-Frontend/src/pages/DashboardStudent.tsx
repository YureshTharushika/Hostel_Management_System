import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideNavBarItem from "../components/SideNavBarItem";
import TopNavBar from "../components/TopNavBar";
import ProfileSettings from "../components/student/ProfileSettings";
import { VIEWS } from "../utils";
import HostelDetails from "../components/student/HostelDetails";
import AddAppeals from "../components/student/AddAppeals";
import ViewAppeals from "../components/student/ViewAppeals";
import ViewMessages from "../components/student/ViewMessages";
import axios from "axios";
import LoadingSpin from "../components/LoadingSpin";


export default function DashboardStudent() {
  const navigate = useNavigate();
  const [displayHostelDetails, setDisplayHostelDetails] = useState(true);
  const [displayAddAppeals, setDisplayAddAppeals] = useState(false);
  const [displayViewAppeals, setDisplayViewAppeals] = useState(false);
  const [displayProfileSettings, setDisplayProfileSettings] = useState(false);
  const [displayMessages, setDisplayMessages] = useState(false);
  const [isActiveItem1, setIsActiveItem1] = useState(true);
  const [isActiveItem2, setIsActiveItem2] = useState(false);
  const [isActiveItem3, setIsActiveItem3] = useState(false);
  const [isActiveItem4, setIsActiveItem4] = useState(false);
  const [isActiveItem5, setIsActiveItem5] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const authToken: any = localStorage.getItem("authToken");
    setToken(authToken);
  }, []);


  function showHostelDetails() {
    setDisplayHostelDetails(true);
    setDisplayAddAppeals(false);
    setDisplayViewAppeals(false);
    setDisplayProfileSettings(false);
    setDisplayMessages(false);
    setIsActiveItem1(true);
    setIsActiveItem2(false);
    setIsActiveItem3(false);
    setIsActiveItem4(false);
    setIsActiveItem5(false);
  }

  function showAddAppeals() {
    setDisplayHostelDetails(false);
    setDisplayAddAppeals(true);
    setDisplayViewAppeals(false);
    setDisplayProfileSettings(false);
    setDisplayMessages(false);
    setIsActiveItem1(false);
    setIsActiveItem2(true);
    setIsActiveItem3(false);
    setIsActiveItem4(false);
    setIsActiveItem5(false);
  }

  function showViewAppeals() {
    setDisplayHostelDetails(false);
    setDisplayAddAppeals(false);
    setDisplayViewAppeals(true);
    setDisplayProfileSettings(false);
    setDisplayMessages(false);
    setIsActiveItem1(false);
    setIsActiveItem2(false);
    setIsActiveItem3(true);
    setIsActiveItem4(false);
  }

  function showViewMessages() {
    setDisplayHostelDetails(false);
    setDisplayAddAppeals(false);
    setDisplayViewAppeals(false);
    setDisplayProfileSettings(false);
    setDisplayMessages(true);
    setIsActiveItem1(false);
    setIsActiveItem2(false);
    setIsActiveItem3(false);
    setIsActiveItem4(true);
    setIsActiveItem5(false);
  }

  function showProfileSettings() {
    setDisplayHostelDetails(false);
    setDisplayAddAppeals(false);
    setDisplayViewAppeals(false);
    setDisplayProfileSettings(true);
    setDisplayMessages(false);
    setIsActiveItem1(false);
    setIsActiveItem2(false);
    setIsActiveItem3(false);
    setIsActiveItem4(false);
    setIsActiveItem5(true);
  }

  function signOut() {
    setLoadingSpinner(true);

    const config: any = {
		headers: {
		"Authorization" : `Bearer ${token}`,
		"Content-Type" : "application/json",        
      }, 
    };

    try {
      axios.post(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/logout`,
        config
      );
      localStorage.clear();
      navigate(VIEWS.HOME);
      setLoadingSpinner(false);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  }

  return (
    <React.Fragment>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white">
        <TopNavBar />
        <div className="fixed flex flex-col top-20 left-0 w-14 hover:w-64 md:w-64 bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
          <div className="hidden md:block">
            <p className="flex flex-col justify-center items-center text-white font-semibold text-center h-fit mt-10 uppercase">
              <i className="fa-solid fa-circle-user text-6xl mb-5"></i>
              Welcome, Student
            </p>
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <SideNavBarItem
                iconClass={"fa-solid fa-people-roof"}
                linkText={"My Hostel"}
                action={showHostelDetails}
                isActiveItem={isActiveItem1}
              />
              <SideNavBarItem
                iconClass={"fa-solid fa-file-circle-plus"}
                linkText={"New Appeal"}
                action={showAddAppeals}
                isActiveItem={isActiveItem2}
              />
              <SideNavBarItem
                iconClass={"fa-solid fa-file"}
                linkText={"View Appeals"}
                action={showViewAppeals}
                isActiveItem={isActiveItem3}
              />
              <SideNavBarItem
                iconClass={"fa-solid fa-message"}
                linkText={"Messages"}
                action={showViewMessages}
                isActiveItem={isActiveItem4}
              />
              <SideNavBarItem
                iconClass={"fa-solid fa-gear"}
                linkText={"Profile Settings"}
                action={showProfileSettings}
                isActiveItem={isActiveItem5}
              />
              <SideNavBarItem
                iconClass={"fa-solid fa-arrow-right-from-bracket"}
                linkText={"Sign Out"}
                action={signOut}
              />
            </ul>
          </div>
        </div>
        <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
          {displayHostelDetails ? <HostelDetails /> : null}
          {displayAddAppeals ? <AddAppeals /> : null}
          {displayViewAppeals ? <ViewAppeals /> : null}
          {displayProfileSettings ? <ProfileSettings /> : null}
          {displayMessages ? <ViewMessages /> : null}
        </div>
      </div>
      {loadingSpinner ? <LoadingSpin /> : null}
    </React.Fragment>
  );
}
