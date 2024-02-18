"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuthStore from "../../../../zustand/auth.zustand";
import "./signup.css";
import { useRouter } from "next/router";

const Signup = () => {
  const [flag, setFlag] = useState(false);
  const router = useRouter();
  const { signup } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password must contain at least one letter.")
        .matches(/[0-9]/, "Password must contain at least one number.")
        .matches(
          /[^a-zA-Z0-9]/,
          "Password must contain at least one special character."
        ),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values) => {
      try {
        setFlag(true);
        const result: any = signup(values);
        console.log("res", result);

        if (result) {
          toast.success("Sign up successful!");
          router.push("/");
        } else {
          toast.error("Invalid email or password");
        }
      } catch (error) {
        console.error("Error during sign up:", error);
        toast.error("An error occurred during sign up. Please try again.");
      } finally {
        setFlag(false);
      }
    },
  });

  return (
    <div className="container-contain">
      <div className="heading-contain">Sign Up</div>
      <form className="form-contain" onSubmit={formik.handleSubmit}>
        <input
          placeholder="Name"
          id="name"
          name="name"
          type="text"
          className={`input-contain ${
            formik.touched.name && formik.errors.name ? "error-border" : ""
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="error-message">{formik.errors.name}</div>
        ) : null}
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
            } ${
              formik.touched.password &&
              formik.values.password.length >= 8 &&
              formik.values.password.match(/[a-zA-Z]/) &&
              formik.values.password.match(/[0-9]/) &&
              formik.values.password.match(/[^a-zA-Z0-9]/)
                ? "success-border"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password &&
          formik.values.password.length >= 8 &&
          formik.values.password.match(/[a-zA-Z]/) &&
          formik.values.password.match(/[0-9]/) &&
          formik.values.password.match(/[^a-zA-Z0-9]/) ? (
            <div className="message success-message">Password is Strong!</div>
          ) : formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
          <button
            type="button"
            className="absolute text-slate-400 inset-y-0 right-2 flex items-center"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <select
          className={`input-contain option-select ${
            formik.touched.role && formik.errors.role ? "error-border" : ""
          }`}
          name="role"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.role}
        >
          <option value="">Select Role</option>
          <option value="user">Reader</option>
          <option value="writer">Writer</option>
        </select>
        {formik.touched.role && formik.errors.role ? (
          <div className="error-message">{formik.errors.role}</div>
        ) : null}
        <input
          value={flag ? "Creating Account..." : "Create Account"}
          type="submit"
          className="login-button-contain"
          disabled={flag}
        />
      </form>
      <p className="agreement-contain">
        Already Have An Account?{" "}
        <Link href="/login">
          <span className="account-contain-contain text-[13px]"> Login</span>
        </Link>
      </p>
    </div>
  );
};

export default Signup;