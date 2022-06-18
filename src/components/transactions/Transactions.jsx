import React from "react";
import { useParams } from "react-router-dom";

export default function Transactions() {
  const params = useParams();

  return <div>{`prop_id:${params.prop_id} unit_id:${params.unit_id}`}</div>;
}
