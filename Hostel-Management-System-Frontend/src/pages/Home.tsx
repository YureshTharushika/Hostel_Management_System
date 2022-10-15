import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LoadingSpin from "../components/LoadingSpin";
import SignInComponent from "../components/SignInComponent";
import TopNavBar from "../components/TopNavBar";
import { VIEWS } from "../utils";

export default function Home() {
  const navigate = useNavigate();
  const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);


  const signIn = async () => {
    if (email === "" || !checkEmail.test(email)) {
      toast.error("Please enter a valid email..!!");
    } else if (password === "") {
      toast.error("Please enter password..!!");
    } else {
      if (email.includes("admin")) {
        userRedirectSignIn("wardenlogin", VIEWS.WARDENDASHBOARD);
      } else if (email.includes("std")) {
        userRedirectSignIn("studentlogin", VIEWS.STUDENTDASHBOARD);
      } else {
        userRedirectSignIn("subwardenlogin", VIEWS.SUBWARDENDASHBOARD);
      }
    }
  };

  const userRedirectSignIn = async (endPoint:string, navigateLocation:any) => {
    setLoadingSpinner(true);

    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/${endPoint}`,
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem("authToken", response.data.token);
      console.log(response.data.token);
      navigate(navigateLocation);
      setLoadingSpinner(false);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };


  return (
    <React.Fragment>
      <div className="w-screen min-h-screen bg-gray-900">
        <TopNavBar />

        <SignInComponent
          signIn={signIn}
          signInEmail={email}
          setSignInEmail={setEmail}
          signInPassword={password}
          setSignInPassword={setPassword}
        />
        
        <ToastContainer />
        {loadingSpinner ? <LoadingSpin /> : null}
      </div>
    </React.Fragment>
  );
}
