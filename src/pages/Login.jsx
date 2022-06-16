import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import userStore from "../app/userStore";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const addToken = userStore((state) => state.addToken);
  const addUser = userStore((state) => state.addUser);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios.post("http://127.0.0.1:5000/auth/login", data).then((res) => {
      //TODO: handle error 400
      // console.log(res.status);
      if (res.status === 200) {
        let token = res.data.token;
        const authString = "Bearer ".concat(token);
        addToken(authString, res.data.expires);
        axios
          .get("http://127.0.0.1:5000/properties/user", {
            headers: { Authorization: authString },
          })
          .then((res1) => {
            addUser(res1.data._id, res1.data.username);
            navigate("/dashboard");
          });
      }
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <h3 className="text-2xl font-bold text-center">Login</h3>
        <form className=" " onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
              {...register("username", { required: true, minLength: 4 })}
            />
            {errors.username?.type === "required" && (
              <div className="text-xs text-red-400">Username Required</div>
            )}
            {errors.username?.type === "minLength" && (
              <div className="text-xs text-red-400">Username is short</div>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              placeholder="Password"
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
              {...register("password", { required: true })}
            />
            {errors.password1?.type === "required" && (
              <div className="text-xs text-red-400">Password is required</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-900"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
