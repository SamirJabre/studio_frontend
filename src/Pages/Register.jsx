import { useEffect } from "react";
import { useFormik } from "formik";
import { string, object } from "yup";
import Banner from "../Assets/Banners/LoginBanner.png";
import AuthInput from "../Base/AuthInput";
import { useNavigate } from "react-router";
import db from "../db.json";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Slices/authSlice.js";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated2 = JSON.parse(localStorage.getItem("isAuthenticated"));

  useEffect(() => {
    if (isAuthenticated || isAuthenticated2) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isAuthenticated2, navigate]);

  const userSchema = object({
    name: string().required("Name is required"),
    email: string().email("Enter a valid email").required("Email is required"),
    password: string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    status,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values, actions) => {
      const registerResult = await handleRegister(values);
      if (registerResult === "success") {
        actions.resetForm();
        actions.setStatus("");
        navigate("/dashboard");
      } else {
        actions.setStatus("Used email");
      }
      actions.setSubmitting(false);
    },
  });

  const handleRegister = async (values) => {
    try {
      const user = db?.users?.find((u) => u.email === values.email);
      if (user) {
        console.log("Register Failed, User with this email already exist");
        return "error";
      } else {
        const response = await axios.post("/users", values);
        console.log(response.data);
        console.error("User Registered", user);
        dispatch(login({ ...user, password: undefined }));
        localStorage.setItem("isAuthenticated", "true");
        return "success";
      }
    } catch (error) {
      console.error("Login failed", error);
      return "error";
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
      <div className="w-[400px] sm:w-[600px] h-fit bg-[#F0F1FF] shadow-2xl flex items-center justify-center flex-col gap-y-2 rounded-2xl p-5">
        <div className="w-full h-[40%]">
          <img
            src={Banner}
            alt="Login Banner"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <h1 className="text-3xl font-bold my-10">Welcome to Studio</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full h-fit flex flex-col items-center justify-between"
        >
          <AuthInput
            type="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
          />
          <AuthInput
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />
          <AuthInput
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />
          {status && (
            <p className="w-full text-red-600 text-md mb-2">{status}</p>
          )}
          <button
            className="w-full h-[55px] rounded-lg bg-[#5664F5] text-xl text-white font-bold"
            type="submit"
            disabled={isSubmitting}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
