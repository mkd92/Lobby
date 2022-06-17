/* eslint-disable react-hooks/exhaustive-deps */
// import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import userStore from "../app/userStore";
// import refreshTheToken from "../helpers/refreshTheToken";
// import test from "../helpers/test";
import api from "../services/api";
import ownerStore from "../app/ownerStore";

export default function Dashboard() {
  const userData = userStore((state) => state.userData);
  const ownerData = ownerStore((state) => state.ownerData);
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
  useEffect(() => {
    console.log(ownerData);
  }, [ownerData]);
  const ren = () => {
    if (ownerData.properties) {
      return ownerData.properties.map((property, i) => (
        <p key={i}>{property.prop_name}</p>
      ));
    }
  };

  return (
    <div>
      {/* {ownerData.properties.map((property) => { */}
      {/* return <li>{property.name}</li>; */}
      {/* })} */}
      {ren()}
    </div>
  );
}
