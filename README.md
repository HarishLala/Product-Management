# Employee Management System (EMS)

A modern React-based Employee Management System with role-based login for Admin and Employee, file upload, product management, and registration.

## Features

- **Role Selection:** Choose between Admin and Employee roles.
- **Authentication:** Secure login with captcha verification.
- **Registration:** New users can register with validation and privacy policy agreement.
- **Admin Dashboard:**
  - Upload Excel files (.xls, .xlsx) with drag-and-drop support.
  - Progress bar and upload status feedback.
- **Employee Dashboard:**
  - View, filter, and sort product list.
  - Edit and update product prices inline.
- **Responsive UI:** Clean, modern design with Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ems.git
   cd ems
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. The app will run at [http://localhost:3000](http://localhost:5173).

### Backend

- This project expects a backend API running at `http://localhost:8081`.
- Endpoints used:
  - `/loginUser`
  - `/addUser`
  - `/product`
  - `/product/upload`
  - `/product/update-price/:productId`

## Project Structure

```
src/
  ├── AdminDashboard.jsx
  ├── AdminLogin.jsx
  ├── EmployeeDashboard.jsx
  ├── EmployeeLogin.jsx
  ├── Register.jsx
  ├── RoleSelector.jsx
  └── ...
```

## Customization

- Update API endpoints in the code if your backend runs elsewhere.
- Tailwind CSS is used for styling; adjust classes as needed.

## License

MIT

---

*Built with ❤️ using React and Tailwind