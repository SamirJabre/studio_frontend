import { useFormik } from "formik";
import { string, object } from "yup";
import Banner from "../Assets/Banners/LoginBanner.png";
import AuthInput from "../Base/AuthInput";
import db from "../db.json";

function Login() {
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
    status,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values, actions) => {
      const loginResult = await handleLogin(values);
      if (loginResult === "success") {
        actions.resetForm();
        actions.setStatus("");
        window.location.href = "/dashboard";
      } else {
        actions.setStatus("Invalid email or password");
      }
      actions.setSubmitting(false);
    },
  });

  const handleLogin = async (values) => {
    try {
      const user = db?.users?.find(
        (u) => u.email === values.email && u.password === values.password
      );
      if (user) {
        console.log("Logged in", user);
        return "success";
      } else {
        console.error("Invalid credentials");
        return "error";
      }
    } catch (error) {
      console.error("Login failed", error);
      return "error";
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
      <div className="w-[450px] sm:w-[600px] h-fit bg-[#F0F1FF] shadow-2xl flex items-center justify-center flex-col gap-y-2 rounded-2xl p-5">
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

export default Login;
