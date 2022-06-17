import React from "react";
import AddPropertyForm from "../forms/AddPropertyForm";

export default function AddPropertyModel({
  children,
  showModal,
  setShowModal,
}) {
  const onCloseHandler = (e) => {
    console.log(e);
  };
  if (!showModal) return null;
  return (
    <div className="">
      <div
        id="backdrop"
        onClick={onCloseHandler}
        className="fixed inset-0 z-40 bg-black opacity-25"
      ></div>
      <div
        // onClick={onCloseHandler}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
      >
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          <AddPropertyForm setShowModal={setShowModal} />
        </div>
      </div>
    </div>
  );
}
