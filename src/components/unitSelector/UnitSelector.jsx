import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import api from "../../services/api";
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
    <div>
      {unitData &&
        unitData.map((unit, i) => (
          <Link
            key={i}
            to={`/dashboard/${params.prop_id}/${unit._id}`}
            className="px-4 py-2 mx-4 my-2 text-white bg-teal-600"
          >
            {unit.unit_name}
          </Link>
        ))}
      <button
        className="px-4 py-2 mx-4 my-2 text-white bg-teal-600"
        onClick={onClickHandler}
      >
        Add Unit
      </button>
      <AddUnitModel
        showModal={showModal}
        setShowModal={setShowModal}
        prop_id={params.prop_id}
      />
      <Outlet />
    </div>
  );
}
