/* eslint-disable react-hooks/exhaustive-deps */
// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";

import userStore from "../app/userStore";
// import refreshTheToken from "../helpers/refreshTheToken";
// import test from "../helpers/test";
import api from "../services/api";
import ownerStore from "../app/ownerStore";
import AddPropertyModel from "../components/model/AddPropertyModel";
// import AddUnitModel from "../components/model/AddUnitModel";

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
        <Box
          component="div"
          sx={{ overflow: "auto", marginY: "1rem", marginX: "1rem" }}
        >
          <Typography variant="h6" sx={{ marginX: "1rem" }}>
            Property List
          </Typography>
          {ownerData.properties.map((property, i) => (
            <Button
              variant="outlined"
              sx={{ marginX: "1rem", marginY: "1rem" }}
            >
              <Link key={i} to={`/dashboard/${property._id}`}>
                {property.prop_name}
              </Link>
            </Button>
          ))}
          <Button
            variant="outlined"
            sx={{ marginX: "1rem" }}
            onClick={onClickHandler}
          >
            ADD Property
          </Button>
          <AddPropertyModel showModal={showModal} setShowModal={setShowModal} />
        </Box>
      );
    }
  };

  return (
    <div className="">
      {ren()}
      {/* <Typography>MAni</Typography> */}
      <Outlet />
    </div>
  );
}
