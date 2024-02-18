import Link from "next/link";

// import "./login.css";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";
import useAuthStore from "../../../../zustand/auth.zustand";
import React from "react";

const Login = () => {
  const router = useRouter();
  const [flag, setFlag] = useState(false);
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setFlag(true);
      try {
        const result = await login(values);
        if (result) {
          toast.success("Login successful!");
          router.push("/");
        } else {
          toast.error("Invalid email or password");
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An error occurred during login. Please try again.");
      } finally {
        setFlag(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="container-contain">
      <div className="heading-contain">Sign In</div>
      <form className="form-contain" onSubmit={formik.handleSubmit}>
        <input
          placeholder="E-mail"
          id="email"
          name="email"
          type="email"
          className={`input-contain ${
            formik.touched.email && formik.errors.email ? "error-border" : ""
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error-message">{formik.errors.email}</div>
        ) : null}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            name="password"
            className={`input-contain ${
              formik.touched.password && formik.errors.password
                ? "error-border"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <button
            type="button"
            className="absolute text-slate-400 pt-5 inset-y-0 right-2 flex items-center"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="error-message">{formik.errors.password}</div>
        ) : null}
                <span className="forgot-password-contain">
          <Link href="/forgotpassword">Forgot Password ?</Link>
        </span>
        <input
          value={flag ? "Sigining..." : "Sign in"}
          type="submit"
          className="login-button-contain"
          disabled={flag}
        />
      </form>
      <p className="agreement-contain">
        Not Have An Account?{" "}
        <Link href="/signup">
          <span className="account-contain-contain text-[13px]">
            Create Account
          </span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
