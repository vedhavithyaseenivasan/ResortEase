// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import AdminLogin from "./components/AdminLogin"
// import AdminDashboard from "./components/AdminDashboard"
// import AdminNavbar from "./components/AdminNavbar"
// import Room from "./components/room"
// import AdminHome from "./components/AdminHome"
// import UsersList from "./components/UsersList"
// import UserDetails from "./components/UserDetails"

// // Protected Route for Admin
// const ProtectedRouteAdmin = ({ children }) => {
//   const adminToken = localStorage.getItem("adminToken")
//   return adminToken ? children : <Navigate to="/admin/login" />
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Admin Login Route */}
//         <Route path="/admin/login" element={<AdminLogin />} />

//         {/* Admin Home Route (Protected) */}
//         <Route
//           path="/admin/home"
//           element={
//             <ProtectedRouteAdmin>
//               <>
//                 <AdminNavbar />
//                 <AdminHome />
//               </>
//             </ProtectedRouteAdmin>
//           }
//         />

//         {/* Admin Dashboard Route (Protected) */}
//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRouteAdmin>
//               <>
//                 <AdminNavbar />
//                 <AdminDashboard />
//               </>
//             </ProtectedRouteAdmin>
//           }
//         />

//         {/* Admin Rooms Route (Protected) */}
//         <Route
//           path="/admin/rooms"
//           element={
//             <ProtectedRouteAdmin>
//               <>
//                 <AdminNavbar />
//                 <Room />
//               </>
//             </ProtectedRouteAdmin>
//           }
//         />

//         {/* Admin Users List Route (Protected) */}
//         <Route
//           path="/admin/users"
//           element={
//             <ProtectedRouteAdmin>
//               <>
//                 <AdminNavbar />
//                 <UsersList />
//               </>
//             </ProtectedRouteAdmin>
//           }
//         />

//         {/* Admin User Details Route (Protected) */}
//         <Route
//           path="/admin/users/:userId"
//           element={
//             <ProtectedRouteAdmin>
//               <>
//                 <AdminNavbar />
//                 <UserDetails />
//               </>
//             </ProtectedRouteAdmin>
//           }
//         />

//         {/* Redirect /admin to /admin/home */}
//         <Route path="/admin" element={<Navigate to="/admin/home" />} />

//         {/* Catch-all route */}
//         <Route path="*" element={<Navigate to="/admin/login" />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App





import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import AdminLogin from "./components/AdminLogin"
import AdminDashboard from "./components/AdminDashboard"
import AdminNavbar from "./components/AdminNavbar"
import Room from "./components/room"
import AdminHome from "./components/AdminHome"
import UsersList from "./components/UsersList"
import UserDetails from "./components/UserDetails"
import RoomManagement from "./components/room-management" // Import the new component

// Protected Route for Admin
const ProtectedRouteAdmin = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken")
  return adminToken ? children : <Navigate to="/admin/login" />
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Home Route (Protected) */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRouteAdmin>
              <>
                <AdminNavbar />
                <AdminHome />
              </>
            </ProtectedRouteAdmin>
          }
        />

        {/* Admin Dashboard Route (Protected) */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRouteAdmin>
              <>
                <AdminNavbar />
                <AdminDashboard />
              </>
            </ProtectedRouteAdmin>
          }
        />

        {/* Admin Rooms Route (Protected) */}
        <Route
          path="/admin/rooms"
          element={
            <ProtectedRouteAdmin>
              <>
                <AdminNavbar />
                <Room />
              </>
            </ProtectedRouteAdmin>
          }
        />

        {/* Admin Room Management Route (Protected) */}
        <Route
          path="/admin/room-management"
          element={
            <ProtectedRouteAdmin>
              <>
                <AdminNavbar />
                <RoomManagement />
              </>
            </ProtectedRouteAdmin>
          }
        />

        {/* Admin Users List Route (Protected) */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRouteAdmin>
              <>
                <AdminNavbar />
                <UsersList />
              </>
            </ProtectedRouteAdmin>
          }
        />

        {/* Admin User Details Route (Protected) */}
        <Route
          path="/admin/users/:userId"
          element={
            <ProtectedRouteAdmin>
              <>
                <AdminNavbar />
                <UserDetails />
              </>
            </ProtectedRouteAdmin>
          }
        />

        {/* Redirect /admin to /admin/home */}
        <Route path="/admin" element={<Navigate to="/admin/home" />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  )
}

export default App
