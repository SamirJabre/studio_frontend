import { useState, useEffect, useMemo, useCallback } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthBanner from "../Assets/Banners/AuthBG.jpg";
import AuthInput from "../Base/AuthInput";
import { useToast } from "../Context/ToastContext";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerRequest } from "../Redux/Slices/authSlice.js";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { showSuccess, showError } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const EMAIL_REGEX = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const validate = useCallback(
    (values) => {
      const e = { name: "", email: "", password: "" };

      if (!values.name) {
        e.name = "Name is required.";
      } else if (values.name.length > 15) {
        e.name = "Name must not exceed 15 characters.";
      }

      if (!values.email) {
        e.email = "Email is required.";
      } else if (!EMAIL_REGEX.test(values.email)) {
        e.email = "Enter a valid email address.";
      }

      if (!values.password) {
        e.password = "Password is required.";
      } else if (values.password.length < 5) {
        e.password = "Password must be at least 5 characters.";
      }

      return e;
    },
    [EMAIL_REGEX]
  );

  useEffect(() => {
    setErrors(validate(formData));
  }, [formData, validate]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const isAuthenticated2 = JSON.parse(localStorage.getItem("isAuthenticated"));

  // useEffect(() => {
  //   if (isAuthenticated || isAuthenticated2) {
  //     navigate("/dashboard");
  //   }
  // }, [isAuthenticated, isAuthenticated2, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });

    const currentErrors = validate(formData);
    setErrors(currentErrors);
    const hasErrors = Object.values(currentErrors).some(Boolean);
    if (hasErrors) return;

    setSubmitting(true);
    try {
      await dispatch(
        registerRequest({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();
      showSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setSubmitting(false);
      showError(error || "Login failed.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-200 p-4">
      <div className="w-full max-w-[1200px] h-auto md:h-[700px] bg-white shadow-2xl flex flex-col md:flex-row rounded-2xl overflow-hidden">
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <img
            src={AuthBanner}
            alt="Register Background"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-16 py-8 md:py-0">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Register</h1>
            <p className="text-sm md:text-base text-gray-500">
              Create your account to get started
            </p>
          </div>

          <form onSubmit={handleRegister} className="w-full">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <AuthInput
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                error={errors.name}
                touched={touched.name}
                required
                maxLength={15}
                autoComplete="name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <AuthInput
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                error={errors.email}
                touched={touched.email}
                required
                pattern={EMAIL_REGEX.source}
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <AuthInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  error={errors.password}
                  touched={touched.password}
                  required
                  minLength={5}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-7 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              className="w-full h-[45px] md:h-[50px] rounded-lg bg-[#5664F5] text-base md:text-lg text-white font-semibold hover:bg-[#4553E4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              type="submit"
              disabled={submitting || Object.values(errors).some(Boolean)}
            >
              {submitting ? "Creating account..." : "Register"}
            </button>
          </form>

          <div className="mt-4 md:mt-6 text-center">
            <span className="text-sm md:text-base text-gray-600">
              Already have an account?{" "}
            </span>
            <button
              onClick={() => navigate("/login")}
              className="text-sm md:text-base text-[#5664F5] font-semibold hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
