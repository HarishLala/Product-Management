import React, { useState } from "react";
import axios from "axios";

function EmployeeLogin() {
  const [userId, setUserIdValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("KPoh89");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (captcha !== generatedCaptcha) {
      alert("Invalid captcha");
      return;
    }

    const data = {email:userId, password };

    try {
      const response = await axios.post("http://localhost:8081/loginUser", data);

      if (!response.data) {
        alert("Invalid User Id or Password");
      } else {
        alert("Login Successfully");
        localStorage.setItem("username", response.data.name);
        localStorage.setItem("role", response.data.role);

        if (response.data.role === "admin") {
          window.location.href = "/admin-dashboard";
        } else if (response.data.role === "employee") {
          window.location.href = "/employee-dashboard";
        } else {
          window.location.href = "/employee-dashboard";
        }
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  const regenerateCaptcha = () => {
    const newCaptcha = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCaptcha(newCaptcha);
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#f4f4fc] hidden md:flex items-center justify-center">
        {/* Illustration */}
        <img
          src="https://www.simummuangonline.com/images/user-login.svg"
          alt="Illustration"
          className="max-w-md"
        />
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-right text-[#3e4aac]">Sign In</h2>
          <p className="text-right text-gray-600 mb-6">to your Employee Panel</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={userId}
              onChange={(e) => setUserIdValue(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPasswordValue(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Captcha */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter Captcha"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={regenerateCaptcha}
                className="px-2 py-2 border rounded-md bg-gray-100 hover:bg-gray-200"
              >
                🔄
              </button> 
               <div className="px-4 py-3 bg-gray-200 rounded-md text-center font-mono text-lg">
                {generatedCaptcha}
              </div>
            </div>

            {/* <div className="text-right">
              <a href="/ForgotPassword" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div> */}

            <button
              type="submit"
              className="w-full bg-[#3e4aac] text-white py-3 rounded-md font-semibold hover:bg-[#2f3991] transition"
            >
              Sign In
            </button>
             <button
              onClick={() => (window.location.href = "/register")}
              type="submit"
              className="w-full bg-[#3e4aac] text-white py-3 rounded-md font-semibold hover:bg-[#2f3991] transition"
            >
              Register
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default EmployeeLogin;


