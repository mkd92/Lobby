import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { Typography } from "@mui/material";

// import api from "../../services/api";
import unitStore from "../../app/unitStore";
import AddUnitModel from "../model/AddUnitModel";

export default function UnitSelector() {
  const params = useParams();
  const unitData = unitStore((state) => state.unitData);
  const reloadData = unitStore((state) => state.reloadData);
  //   const reloadData = unitStore((state) => state.reloadData);
  const [showModal, setShowModal] = useState(false);

  const onClickHandler = () => {
    setShowModal(true);
  };
  useEffect(() => {
    reloadData(params.prop_id);
  }, [params.prop_id, reloadData]);

  return (
    <Box
      component="div"
      sx={{ overflow: "auto", marginY: "1rem", marginX: "1rem" }}
    >
      <Typography variant="h6" sx={{ marginX: "1rem" }}>
        Unit List
      </Typography>
      {unitData &&
        unitData.map((unit, i) => (
          <Button variant="outlined" sx={{ marginX: "1rem", marginY: "1rem" }}>
            <Link key={i} to={`/dashboard/${params.prop_id}/${unit._id}`}>
              {unit.unit_name}
            </Link>
          </Button>
        ))}
      <Button onClick={onClickHandler}>Add Unit</Button>
      <AddUnitModel
        showModal={showModal}
        setShowModal={setShowModal}
        prop_id={params.prop_id}
      />
      <Outlet />
    </Box>
  );
}
