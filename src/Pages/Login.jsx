import { useState, useEffect, useMemo, useCallback } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthBG from "../Assets/Banners/AuthBG.jpg";
import AuthInput from "../Base/AuthInput";
import { useToast } from "../Context/ToastContext";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginRequest } from "../Redux/Slices/authSlice.js";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { showSuccess, showError } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const EMAIL_REGEX = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const validate = useCallback(
    (values) => {
      const e = { email: "", password: "" };
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const currentErrors = validate(formData);
    setErrors(currentErrors);
    const hasErrors = Object.values(currentErrors).some(Boolean);
    if (hasErrors) return;

    setSubmitting(true);

    try {
      await dispatch(
        loginRequest({ email: formData.email, password: formData.password })
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
            src={AuthBG}
            alt="Login Background"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-16 py-8 md:py-0">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Login</h1>
            <p className="text-sm md:text-base text-gray-500">
              Welcome back! Please login to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="w-full">
            {/* Email Field */}
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

            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="w-4 h-4 rounded border-gray-300 focus:ring-[#5664F5] accent-[#5664F5]"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <button
              className="w-full h-[45px] md:h-[50px] rounded-lg bg-[#5664F5] text-base md:text-lg text-white font-semibold hover:bg-[#4553E4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={submitting || Object.values(errors).some(Boolean)}
            >
              {submitting ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-4 md:mt-6 text-center">
            <span className="text-sm md:text-base text-gray-600">
              New User?{" "}
            </span>
            <button
              onClick={() => navigate("/register")}
              className="text-sm md:text-base text-[#5664F5] font-semibold hover:underline"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
