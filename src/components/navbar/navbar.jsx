import React from "react";
import { Link } from "react-router-dom";
import userStore from "../../app/userStore";

export default function navbar() {
  const userData = userStore((state) => state.userData);
  const logout = userStore((state) => state.logout);
  return (
    <div className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <Link to="/">
        <button className="font-semibold text-xl tracking-tight text-white">
          Lobby
        </button>
      </Link>
      {userData.user_id ? (
        <div className="flex items-center justify-between w-1/5">
          <button
            onClick={logout}
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white hover:border-transparent hover:text-teal-500 hover:bg-white  lg:mt-0"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between w-1/5">
          <Link
            to="/login"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white hover:border-transparent hover:text-teal-500 hover:bg-white  lg:mt-0"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white hover:border-transparent hover:text-teal-500 hover:bg-white  lg:mt-0"
          >
            Signup
          </Link>
        </div>
      )}
    </div>
  );
}
