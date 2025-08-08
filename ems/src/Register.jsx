// import React, { useState } from "react";
// import axios from "axios";

// function Register() {
//   const [register, setRegister] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [apiError, setApiError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setRegister({
//       ...register,
//       [e.target.name]: e.target.value,
//     });

//     setErrors({ ...errors, [e.target.name]: "" }); // Clear field-specific error
//     setApiError(""); // Clear API error
//     setSuccess(""); // Clear success message
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!register.name.trim()) newErrors.name = "Name is required";
//     if (!register.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(register.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!register.password) {
//       newErrors.password = "Password is required";
//     } else if (register.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formErrors = validate();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8081/addUser", register);
//       console.log(response.data);
//       setSuccess("User registered successfully");
//       setRegister({ name: "", email: "", password: "" });
//     } catch (error) {
//       console.error(error);
//       setApiError(
//         error?.response?.data?.message || "Something went wrong. Please try again."
//       );
//     }
//   };

//   const redirectToLogin = (e) => {
//     e.preventDefault();
//     window.location.href = "/login";
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 overflow-x-hidden transition-all duration-300">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white transition-all">
//         Register
//       </h1>
//       <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm transition-all duration-300">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name Field */}
//           <div>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter your name"
//               value={register.name}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border ${
//                 errors.name ? "border-red-500" : "border-gray-300"
//               } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
//             />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//           </div>

//           {/* Email Field */}
//           <div>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={register.email}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//           </div>

//           {/* Password Field */}
//           <div>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={register.password}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border ${
//                 errors.password ? "border-red-500" : "border-gray-300"
//               } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//             )}
//           </div>

//           {/* API Error */}
//           {apiError && (
//             <div className="text-red-600 text-sm text-center">{apiError}</div>
//           )}

//           {/* Success Message */}
//           {success && (
//             <div className="text-green-600 text-sm text-center">{success}</div>
//           )}

//           {/* Register Button */}
//           <button
//             id="register"
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//           >
//             Register
//           </button>

//           {/* Redirect to Login */}
//           <div className="text-center">
//             <a
//               href="#"
//               onClick={redirectToLogin}
//               className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
//             >
//               Already have an account? Login
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;
import React, { useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [register, setRegister] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  };

  const validate = () => {
    const newErrors = {};
    if (!register.name.trim()) newErrors.name = "Name is required";
    if (!register.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(register.email)) newErrors.email = "Invalid email";
    if (!register.password) newErrors.password = "Password is required";
    else if (register.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!agreePolicy) newErrors.policy = "You must agree to the Privacy Policy";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await axios.post("http://localhost:8081/addUser", register);
      setSuccess("User registered successfully");
      setRegister({ name: "", email: "", password: "" });
      setAgreePolicy(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-tr from-green-50 to-white">
      {/* Left Panel - Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white px-12 animate-fade-in">
        <div className="mb-6 text-center transition-all">
          <h2 className="text-4xl font-bold mb-1">Sign up</h2>
          <p className="text-gray-600">Welcome to Handspace – Let's create account</p>
        </div>

        {/* Social Buttons */}
       
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {/* Name */}
          <div className="relative">
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={register.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-full border ${
                errors.name ? "border-red-400" : register.name ? "border-green-400" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-200 transition-all`}
              placeholder="Your name"
            />
            {register.name && !errors.name && (
              <FaCheckCircle className="absolute right-4 top-9 text-green-500" />
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <label className="text-sm text-gray-600">E-mail</label>
            <input
              type="email"
              name="email"
              value={register.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-full border ${
                errors.email ? "border-red-400" : register.email ? "border-green-400" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-green-200 transition-all`}
              placeholder="Your email"
            />
            {register.email && errors.email && (
              <FaTimesCircle className="absolute right-4 top-9 text-red-500" />
            )}
            {register.email && !errors.email && (
              <FaCheckCircle className="absolute right-4 top-9 text-green-500" />
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={register.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
              placeholder="Create your password"
            />
            <div
              className="absolute right-4 top-9 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={agreePolicy}
              onChange={(e) => setAgreePolicy(e.target.checked)}
              className="mr-2"
            />
            <label>
              I agree to the <span className="font-bold">Privacy & Policy</span>
            </label>
          </div>

          {/* Errors */}
          {Object.values(errors).map((err, i) => (
            <p key={i} className="text-red-500 text-sm">{err}</p>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-16 h-16 rounded-full bg-red-100 text-2xl hover:bg-red-300 mx-auto flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            👉
          </button>

          {/* Success Message */}
          {success && <p className="text-green-600 text-center">{success}</p>}
        </form>
      </div>

      {/* Right Panel - Image */}
      <div className="w-1/2 bg-green-100 flex items-center justify-center overflow-hidden animate-fade-in">
        <img
          src="https://assets.lummi.ai/assets/Qme3nun4ivyXoqPHv4tDxRxGyWEEZVYDwNo5Y87PKReHjT?auto=format&w=640"
          alt="Illustration"
          className="max-h-[80%] rounded-xl shadow-lg transition-all scale-100 hover:scale-105 duration-700"
        />
      </div>
    </div>
  );
}

export default Register;
