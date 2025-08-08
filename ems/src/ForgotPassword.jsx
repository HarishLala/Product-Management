// import React, { useState } from "react";
// import axios from "axios";

// function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleForgotPassword = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8081/forgot-password", { email });
//       setMessage(response.data); // message from backend
//     } catch (error) {
//       setMessage("Error sending reset instructions.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded shadow">
//         <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
//         <form onSubmit={handleForgotPassword} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Enter your registered email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
//           >
//             Send Reset Link
//           </button>
//         </form>
//         {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;
