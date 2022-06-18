import React from "react";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import unitStore from "../../app/unitStore";

export default function AddUnitForm({ setShowModal, prop_id }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const reloadData = unitStore((state) => state.reloadData);
  const onSubmit = (data) => {
    api
      .post(
        `http://192.168.29.112:5000/properties/${prop_id}/create_unit`,
        data
      )
      .then((res) => {
        reloadData(prop_id);
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
        <h3 className="text-3xl font-semibold">Add Unit</h3>
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
            htmlFor="unit_name"
            className="inline-block mb-2 text-gray-700 form-label"
          >
            Unit Name
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
            aria-describedby="unitNameHelp"
            placeholder="Unit Name"
            {...register("unit_name", { required: true, minLength: 4 })}
          />
          {errors.prop_name?.type === "required" && (
            <div className="text-xs text-red-400">Property Name Required</div>
          )}
          {errors.prop_name?.type === "minLength" && (
            <div className="text-xs text-red-400">Min length is 4</div>
          )}
        </div>

        <div className="flex content-center">
          <label
            htmlFor="occupied"
            className="inline-block mx-2 text-gray-700 form-label"
          >
            occupied
          </label>
          <input
            type="checkbox"
            className="form-control block
        my-auto
        mx-2
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
            {...register("occupied")}
          />
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
