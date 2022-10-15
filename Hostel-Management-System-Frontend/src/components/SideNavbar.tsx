import React from "react";
import { VIEWS } from "../utils";
import SideNavBarItem from "./SideNavBarItem";

export default function SideNavbar(props: { dashboardRole: string }) {
  return (
    <React.Fragment>
      {/* <div className="fixed flex flex-col top-20 left-0 w-14 hover:w-64 md:w-64 bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
        <div className="hidden md:block">
          <p className="flex flex-col justify-center items-center text-white font-semibold text-center h-fit mt-10 uppercase">
            <i className="fa-solid fa-circle-user text-6xl mb-5"></i>
            Welcome, {props.dashboardRole}
          </p>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <SideNavBarItem iconClass={"fa-brands fa-java"} linkText={"Dash"} />
            <SideNavBarItem
              iconClass={"fa-brands fa-java"}
              linkText={"dffsdfds"}
            />
          </ul>
        </div>
      </div> */}
    </React.Fragment>
  );
}
