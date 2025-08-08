import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelector from "./RoleSelector";
import AdminLogin from "./AdminLogin";
import EmployeeLogin from "./EmployeeLogin";
import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import Register from "./Register";
// import ForgotPassword from "./ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelector />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
