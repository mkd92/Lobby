import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UnitSelector(props) {
  const params = useParams();
  useEffect(() => {}, []);

  return <div>{params.prop_id}</div>;
}
