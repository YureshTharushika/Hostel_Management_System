import React from "react";
// import FormInputItem from "./FormInputItem";


export default function SignUpComponent(props: {
  signUp: any;
  showLogin: any;
  firstName: any;
  setFirstName: any;
  lastName: any;
  setLastName: any;
  indexNo: any;
  setIndexNo: any;
  gender: any;
  setGender: any;
  academicYear: any;
  setAcademicYear: any;
  email: any;
  setEmail: any;
  password: any;
  setPassword: any;
  confirmpassword: any;
  setConfirmPassword: any;
}) {
  return (
    <React.Fragment>
      {/* <div className="w-screen">
        <div className="flex mb-4 justify-center items-center">
          <div className="container md:w-1/2">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-4 mt-40 md:flex md:flex-wrap">
              <FormInputItem
                label="First Name"
                type="text"
                placeHolder="First Name"
                value={props.firstName}
                onChange={props.setFirstName}
              />
              <FormInputItem
                label="Last Name"
                type="text"
                placeHolder="Last Name"
                value={props.lastName}
                onChange={props.setLastName}
              />
              <FormInputItem
                label="Index No"
                type="text"
                placeHolder="Index No"
                value={props.indexNo}
                onChange={props.setIndexNo}
              />
              <FormInputItem
                label="Gender"
                type="text"
                placeHolder="Gender"
                value={props.gender}
                onChange={props.setGender}
              />
              <FormInputItem
                label="Academic Year"
                type="text"
                placeHolder="Academic Year"
                value={props.academicYear}
                onChange={props.setAcademicYear}
              />
              <FormInputItem
                label="Email"
                type="text"
                placeHolder="Email"
                value={props.email}
                onChange={props.setEmail}
              />
              <FormInputItem
                label="Password"
                type="password"
                placeHolder="Password"
                value={props.password}
                onChange={props.setPassword}
              />
              <FormInputItem
                label="Confirm Password"
                type="password"
                placeHolder="Confirm Password"
                value={props.confirmpassword}
                onChange={props.setConfirmPassword}
              />

              <div className="flex items-center justify-between ml-2 w-full">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={props.signUp}
                >
                  Sign Up
                </button>
                <p
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
                  onClick={props.showLogin}
                >
                  Already have an account?
                </p>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </React.Fragment>
  );
}
