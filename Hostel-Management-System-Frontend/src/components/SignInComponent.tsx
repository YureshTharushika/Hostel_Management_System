import React from "react";

export default function SignInComponent(props: {
  signIn: any;
  signInEmail: any;
  setSignInEmail: any;
  signInPassword: any;
  setSignInPassword: any;
}) {
  return (
    <React.Fragment>
      <div className="w-screen">
        <div className="flex mb-4 justify-center items-center">
          <div className="container md:w-1/2">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-4 mt-40">
              <h1 className="mt-3 mb-10 text-4xl text-gray-900 font-bold"><i className="fa-solid fa-graduation-cap"></i> Sign In</h1>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="email"
                  value={props.signInEmail}
                  onChange={(e: any) => props.setSignInEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="password"
                  placeholder="Password"
                  value={props.signInPassword}
                  onChange={(e: any) => props.setSignInPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={props.signIn}
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
