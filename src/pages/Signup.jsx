import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios.post("http://127.0.0.1:5000/auth/signup", data).then((res) => {
      //TODO: handle error 400
      if (res.status === 201) {
        navigate("/login");
      }
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <h3 className="text-2xl font-bold text-center">Join us</h3>
        <form className=" " onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
              {...register("username", { required: true, minLength: 4 })}
            />
            {errors.username?.type === "required" && (
              <div className="text-xs text-red-400">Username Required</div>
            )}
            {errors.username?.type === "minLength" && (
              <div className="text-xs text-red-400">Username is short</div>
            )}
          </div>
          <div>
            <label htmlFor="password1" className="block">
              Password
            </label>
            <input
              placeholder="Password"
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
              {...register("password1", { required: true })}
            />
            {errors.password1?.type === "required" && (
              <div className="text-xs text-red-400">Password is required</div>
            )}
          </div>
          <div>
            <label htmlFor="password2" className="block">
              Confirm Password
            </label>
            <input
              placeholder="Confirm Password"
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
              {...register("password2", {
                required: true,
                validate: (val) => {
                  if (watch("password1") !== val) {
                    return "Your passwords don't match";
                  }
                },
              })}
            />
            {errors.password2?.type === "required" && (
              <div className="text-xs text-red-400">Password is required</div>
            )}
            {errors.password2?.type === "validate" && (
              <div className="text-xs text-red-400">Password must match</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-6 py-2 mt-4 text-white bg-teal-600 rounded-lg hover:bg-teal-900"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
