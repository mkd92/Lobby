import React from "react";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import ownerStore from "../../app/ownerStore";

export default function AddPropertyForm({ setShowModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const reloadData = ownerStore((state) => state.reloadData);
  const onSubmit = (data) => {
    api
      .post("http://192.168.29.112:5000/properties/create", data)
      .then((res) => {
        reloadData();
        setShowModal(false);
      });
    // TODO: handle errors
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none"
    >
      <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
        <h3 className="text-3xl font-semibold">Add Property</h3>
        <button
          className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
          onClick={() => setShowModal(false)}
        >
          <span className="block w-6 h-6 text-2xl text-black outline-none bg-blue opacity-5 focus:outline-none">
            x
          </span>
        </button>
      </div>
      {/*body*/}
      <div className="relative flex-auto p-6">
        <div className="mb-6 form-group">
          <label
            htmlFor="prop_name"
            className="inline-block mb-2 text-gray-700 form-label"
          >
            Property Name
          </label>
          <input
            type="text"
            className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-describedby="propNameHelp"
            placeholder="Property Name"
            {...register("prop_name", { required: true, minLength: 4 })}
          />
          {errors.prop_name?.type === "required" && (
            <div className="text-xs text-red-400">Property Name Required</div>
          )}
          {errors.prop_name?.type === "minLength" && (
            <div className="text-xs text-red-400">Min length is 4</div>
          )}
        </div>

        <div className="mb-6 form-group">
          <label
            htmlFor="address"
            className="inline-block mb-2 text-gray-700 form-label"
          >
            Property Address
          </label>
          <textarea
            type="text"
            className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Property address"
            {...register("address", { required: true, minLength: 10 })}
          />
          {errors.prop_name?.type === "required" && (
            <div className="text-xs text-red-400">
              Property Address Required
            </div>
          )}
          {errors.prop_name?.type === "minLength" && (
            <div className="text-xs text-red-400">Min length is 10</div>
          )}
        </div>
      </div>
      {/*footer*/}
      <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
        <button
          className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
          type="button"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
        <button
          className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
          type="submit"
          // onClick={() => setShowModal(false)}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
