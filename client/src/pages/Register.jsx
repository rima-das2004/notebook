import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input name="name" value={form.name} onChange={onChange} placeholder="Name" />
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" />
        <input name="password" value={form.password} onChange={onChange} placeholder="Password" type="password" />
        <button type="submit" className="btn-primary">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
