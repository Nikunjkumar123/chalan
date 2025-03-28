"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { AuthContext } from "../component/context/AuthContext";

const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const {token,setToken,login} = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/api/v1/auth/login", formData);

      if (response.status === 200) {
        login(response.data.token,response.data.email);
        router.push("/");
        toast.success("Login successful!");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };


  return (
    <div className="h-[100vh] w-screen bg-black flex justify-center items-center">
      <div className="flex flex-auto rounded-lg justify-center items-center content-center bg-black shadow-md p-4">
        <div>
          <form onSubmit={handleLogin}>
            <div className="text-yellow-300 text-3xl font-semibold flex mb-2 justify-center content-center">
              <h2>Login</h2>
            </div>
            <label className="text-white">Email:</label>
            <br />
            <input
              type="email"
              className="input w-[400]"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />

            <label className="text-white">Password:</label>
            <br />
            <input
              type="password"
              className="w-[400] input"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <br />

            <button
              type="submit"
              className="btn btn-primary mt-4 w-full text-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
