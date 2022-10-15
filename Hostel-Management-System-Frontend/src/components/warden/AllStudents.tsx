import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LoadingSpin from "../LoadingSpin";
import FormInputItem from "../FormInputItem";
import { read, utils, readFile } from "xlsx";

export default function AllStudents() {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [token, setToken] = useState("");
  const [studentData, setStudentData] = useState([]) as any[];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [indexNo, setIndexNo] = useState("");
  const [gender, setGender] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");
  const [csvFileName, setCsvFileName] = useState("");
  const [csvFileIsSelect, setCsvFileIsSelect] = useState("");
  const [csvStudentData, setCsvStudentData] = useState([]) as any[];
  const [noStudentsBanner, setNoStudentsBanner] = useState(false);
  const fileUploadField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const authToken: any = localStorage.getItem("authToken");
    setToken(authToken);
    getAllStudentsAPICall();
  }, []);

  const handleCSVfile = async (e: any) => {
    setCsvFileName(e.target.files[0].name);
    setCsvFileIsSelect(e.target.value);
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = readFile(data);
    const workSheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = utils.sheet_to_json(workSheet);
    setCsvStudentData(jsonData);
  };

  const getStudentsDataUsingCSV = async () => {
    setLoadingSpinner(true);

    if (csvFileIsSelect !== "") {
      for (let i = 0; i <= csvStudentData.length; i++) {
        let first_name = csvStudentData[i].first_name;
        let last_name = csvStudentData[i].last_name;
        let index_number = csvStudentData[i].index_number;
        let gender = csvStudentData[i].gender;
        let email = csvStudentData[i].email;
        let academic_year = csvStudentData[i].academic_year;
        let password = "12345678";
        let password_confirmation = "12345678";
        addStudentsUsingCSV(
          first_name,
          last_name,
          index_number,
          gender,
          email,
          academic_year,
          password,
          password_confirmation
        );
        toast.success(index_number + "added successfully.");
      }
    } else {
      toast.error("Please select a file..!!");
    }
    setLoadingSpinner(false);
  };

  const addStudentsUsingCSV = async (
    first_name: string,
    last_name: string,
    index_number: string,
    gender: string,
    email: string,
    academic_year: string,
    password: string,
    password_confirmation: string
  ) => {
    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/studentsignup`,
        {
          first_name,
          last_name,
          index_number,
          gender,
          academic_year,
          email,
          password,
          password_confirmation,
        },
        config
      );
      getAllStudentsAPICall();
    } catch (err: any) {
      toast.error(err.response.data.message);
      setLoadingSpinner(false);
    }
  };

  const getAllStudentsAPICall = async () => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/students`,
        config
      );
      if (response.data.length === 0) {
        setNoStudentsBanner(true);
        setStudentData([]);
      } else {
        setNoStudentsBanner(false);
        setStudentData(response.data);
      }
      setLoadingSpinner(false);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const addNewStudent = async () => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const first_name = firstName;
    const last_name = lastName;
    const index_number = indexNo;
    const academic_year = academicYear;
    const password_confirmation = confirmPassword;

    try {
      await axios.post(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/studentsignup`,
        {
          first_name,
          last_name,
          index_number,
          gender,
          academic_year,
          email,
          password,
          password_confirmation,
        },
        config
      );
      setFirstName("");
      setLastName("");
      setIndexNo("");
      setGender("");
      setAcademicYear("");
      setEmail("");
      getAllStudentsAPICall();
      setLoadingSpinner(false);
      toast.success("Student added successfully.");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  const editStudent = async (studentId: any) => {};

  const deleteStudent = async (studentId: any) => {
    setLoadingSpinner(true);

    const config: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(
        `${process.env.REACT_APP_LOCAL_BACKEND}api/deletestudent/${studentId}`,
        config
      );
      getAllStudentsAPICall();
      setLoadingSpinner(false);
      toast.success("Student deleted successfully.");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setLoadingSpinner(false);
  };

  return (
    <React.Fragment>
      <h1 className="mt-10 ml-5 text-4xl text-gray-900 font-bold">
        All Students
      </h1>
      <div className="container md:w-full">
        <h6 className="mt-10 ml-5 text-md text-gray-900 font-bold">
          Add students using CSV file
        </h6>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-4 mt-5">
          <div className="mb-4 md:w-1/2 md:pl-2 md:pr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload CSV
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              onChange={(e: any) => {
                handleCSVfile(e);
              }}
              ref={fileUploadField}
            />
          </div>
          <p className="font-semibold text-gray-700 ml-2 text-sm">
            {csvFileName}
            {csvFileName
              ? "has been selected. If you are sure to add this CSV data to the database please click the below button."
              : ""}
          </p>
          <div className="flex items-center justify-start md:pl-2 md:pr-2 md:mt-3">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={getStudentsDataUsingCSV}
            >
              Upload to Database <i className="fa-solid fa-cloud-arrow-up"></i>
            </button>
            {/* {csvFileName ? (
              <button
                className="ml-2 text-red-500 bg-red-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => setCsvFileIsSelect("")}
              >
                Clear Selection
              </button>
            ) : null} */}
          </div>
        </form>
      </div>
      <div className="container md:w-full">
        <h6 className="mt-10 ml-5 text-md text-gray-900 font-bold">
          Add a new student
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
              value={lastName}
              onChange={setLastName}
            />

            <FormInputItem
              label="Email"
              type="text"
              placeHolder="Email"
              value={email}
              onChange={setEmail}
            />
          </div>
          <div className="w-full md:flex md:flex-row">
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
            <div className="mb-4 md:w-fit md:pl-2 md:pr-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Academic Year
              </label>
              <select
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="hostelTypes"
                onChange={(e: any) => {
                  setAcademicYear(e.target.value);
                }}
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled>
                  -- select an option --
                </option>
                <option value="2016/2017">2016/2017</option>
                <option value="2017/2018">2017/2018</option>
                <option value="2018/2019">2018/2019</option>
                <option value="2019/2020">2019/2020</option>
                <option value="2020/2021">2020/2021</option>
                <option value="2021/2022">2021/2022</option>
              </select>
            </div>
            <div className="w-full md:flex md:flex-row">
              <FormInputItem
                label="Index Number"
                type="text"
                placeHolder="UWU/XXX/XX/XXX"
                value={indexNo}
                onChange={setIndexNo}
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
          </div>
          <div className="flex items-center justify-between md:pl-2 md:pr-2 md:mt-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={addNewStudent}
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
      <div className="mt-20 mx-4">
        <h6 className="mt-20 ml-5 text-md text-gray-900 font-bold">
          Registered students
        </h6>
        <div className="w-full overflow-hidden rounded-lg shadow-xs mt-5">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-200 ">
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Index No</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Academic Year</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {noStudentsBanner ? (
                  <tr className="bg-gray-100 hover:bg-gray-300 text-gray-700">
                    <td className="px-4 py-3 text-sm">
                      No students have been created yet.
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : null}
                {studentData.map((item: any, index: any) => (
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
                    <td className="px-4 py-3 text-sm">{item.index_number}</td>
                    <td className="px-4 py-3 text-sm">{item.gender}</td>
                    <td className="px-4 py-3 text-sm">{item.academic_year}</td>
                    <td className="px-4 py-3 text-sm">{item.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                        type="button"
                        onClick={(e: any) => {
                          deleteStudent(item.id);
                        }}
                      >
                        Delete <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {loadingSpinner ? <LoadingSpin /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
