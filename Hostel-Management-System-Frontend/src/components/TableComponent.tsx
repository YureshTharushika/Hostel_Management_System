import React from "react";

export default function TableComponent() {
  return (
    <React.Fragment>
      <div className="mt-20 mx-4">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-200 ">
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Batch</th>
                  <th className="px-4 py-3">Appeal</th>
                  <th className="px-4 py-3">Hostel</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                <tr className="bg-gray-100 hover:bg-gray-300 text-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">Ayesh Perera</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">2018/2019</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                      Approved
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">Nilwala B</td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Edit <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                      type="button"
                    >
                      Delete <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
