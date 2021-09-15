import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from "../../firebase";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);

      setLoading(false);
    } catch (e) {
      setErrorFromSubmit(e.message);
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  return (
    <div className="auth-wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div style={{ textAlign: "center" }} className="title">
          <h3 style={{ fontSize: 70, fontWeight: 700 }}>Login</h3>
        </div>
        <input
          placeholder="Email"
          name="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This field is required</p>}
        {/* include validation with required or other standard HTML validation rules */}

        <input
          placeholder="Password"
          name="password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>This name password is required</p>
        )}

        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input
          type="submit"
          value="SUBMIT"
          className="register"
          disabled={loading}
        />
        <Link to="/register" style={{ color: "gray", textDecoration: "none" }}>
          if you don't have Registered Id...
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
