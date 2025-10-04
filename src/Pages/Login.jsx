import React, { useState } from "react";
import { useFormik } from "formik";
import { string, object } from "yup";
import AuthInput from "../Base/AuthInput";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");

  const userSchema = object({
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
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    // onSubmit: async (values, actions) => {
    //   const loginResult = await handleLogin();
    //   if (loginResult === "success") {
    //     actions.resetForm();
    //   }
    //   actions.setSubmitting(false);
    // },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
      <div className="w-[450px] sm:w-[600px] h-2/3 bg-[#F0F1FF] shadow-xl flex items-center justify-center flex-col rounded-2xl px-5">
        <div className="bg-red-200 w-full h-1/3"></div>
        <h1 className="text-3xl font-bold mb-6">Welcome to Studio</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full h-fit flex flex-col items-center justify-between bg-red-500"
        >
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
        </form>
      </div>
    </div>
  );
}

export default Login;
