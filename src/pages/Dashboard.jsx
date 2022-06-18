/* eslint-disable react-hooks/exhaustive-deps */
// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

import userStore from "../app/userStore";
// import refreshTheToken from "../helpers/refreshTheToken";
// import test from "../helpers/test";
import api from "../services/api";
import ownerStore from "../app/ownerStore";
import AddPropertyModel from "../components/model/AddPropertyModel";
import AddUnitModel from "../components/model/AddUnitModel";

export default function Dashboard() {
  const userData = userStore((state) => state.userData);
  const ownerData = ownerStore((state) => state.ownerData);
  const [showModal, setShowModal] = useState(false);
  const updateOwnerData = ownerStore((state) => state.updateOwnerData);

  const navigate = useNavigate();
  const getData = async () => {
    // console.log(data.data);
    // console.log(ownerData);
    const data = await api.get("/properties/");

    return data;
  };
  useEffect(() => {
    if (!userData.user_id) {
      navigate("/login");
    }
    return () => {};
  }, [navigate, userData]);
  useEffect(() => {
    getData().then((data) => {
      updateOwnerData(data.data);
    });
  }, []);
  // useEffect(() => {
  //   console.log(ownerData);
  // }, [ownerData]);
  const onClickHandler = () => {
    setShowModal(true);
  };
  const ren = () => {
    if (ownerData.properties) {
      return (
        <div className="flex w-screen">
          {ownerData.properties.map((property, i) => (
            <Link
              key={i}
              to={`/dashboard/${property._id}`}
              className="px-4 py-2 mx-4 my-2 text-white bg-teal-600"
            >
              {property.prop_name}
            </Link>
          ))}
          <button
            className="px-4 py-2 mx-4 my-2 text-white bg-teal-600"
            onClick={onClickHandler}
          >
            ADD Property
          </button>
          <AddPropertyModel showModal={showModal} setShowModal={setShowModal} />
        </div>
      );
    }
  };

  return (
    <div className="">
      {ren()}
      <Outlet />
    </div>
  );
}
