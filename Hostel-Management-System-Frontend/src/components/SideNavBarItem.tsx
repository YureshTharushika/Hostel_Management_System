import React from "react";


export default function SideNavBarItem(props:{iconClass:string, linkText:string, action:any, isActiveItem?:any}) {

  return (
    <React.Fragment>
      <li>
        <button 
          onClick={props.action}
          className={props.isActiveItem? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-600  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 pr-6 w-full bg-cyan-600" : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-600  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-cyan-500 pr-6 w-full"}
        >
          <span className="inline-flex justify-center items-center ml-4">
            <i className={props.iconClass}></i>
          </span>
          <span className="ml-2 text-sm tracking-wide truncate">{props.linkText}</span>
        </button>
      </li>
    </React.Fragment>
  );
}
