// import React, { useState } from "react";

// function RoleSelector() {
//   const [role, setRole] = useState("employee");

//   const handleRoleChange = (e) => {
//     setRole(e.target.value);
//   };

//   const handleContinue = () => {
//     if (role === "admin") {
//       window.location.href = "/admin-login";
//     } else {
//       window.location.href = "/employee-login";
//     }
//   };

//   return (
//     // <div className="min-h-screen flex flex-col items-center justify-center bg-gray-600 px-4">
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-600 px-4">
//       <h1 className="text-3xl font-bold mb-6">Determine a role</h1>
//       <select
//         value={role}
//         onChange={handleRoleChange}
//         className="px-4 py-2 border rounded"
//       >
//         <option value="employee">Employee</option>
//         <option value="admin">Admin</option>
//       </select>
//       <button
//         onClick={handleContinue}
//         className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//       >
//         Continue
//       </button>
//     </div>
//   );
// }

// export default RoleSelector;
import React, { useState } from "react";

function RoleSelector() {
  const [role, setRole] = useState("employee");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleContinue = () => {
    if (role === "admin") {
      window.location.href = "/admin-login";
    } else {
      window.location.href = "/employee-login";
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Glassy Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#f0f0f0]">
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-3xl px-10 py-12 max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Select Your Role
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Choose Role
            </label>
            <select
              value={role}
              onChange={handleRoleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-blue-600 text-white py-3 mt-4 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Right Abstract Panel (hidden on small screens) */}
      <div className="hidden md:block w-1/2 bg-gradient-to-br from-black via-indigo-900 to-blue-700 relative">
        <img
          
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ-urJgUAnOvL139l9d3Qh24y0LIhrEfTlXA&s"
          alt="Background Abstract"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
      </div>
    </div>
  );
}

export default RoleSelector;

