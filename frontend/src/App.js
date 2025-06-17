import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Room from './components/Room';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import UserDashboard from './components/UserDashboard'; // Import UserDashboard
import Gallery from './components/Gallery'; // Ensure the casing matches the file name


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Room />} />
        <Route
          path="/book/:roomId"
          element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          }
        />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} /> {/* Ensure the casing matches the file name */}


        {/* Add User Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;











// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Home from "./components/Home"
// import About from "./components/About"
// import Room from "./components/Room"
// import BookingForm from "./components/BookingForm"
// import Confirmation from "./components/Confirmation"
// import Navbar from "./components/Navbar"
// import Login from "./components/Login"
// import Register from "./components/Register"
// import ProtectedRoute from "./components/ProtectedRoute"
// import UserDashboard from "./components/UserDashboard"
// import Gallery from "./components/Gallery" // Ensure the casing matches the file name

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/rooms" element={<Room />} />
//         <Route
//           path="/book/:roomId"
//           element={
//             <ProtectedRoute>
//               <BookingForm />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/confirmation" element={<Confirmation />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/Gallery" element={<Gallery />} />
//         {/* Add User Dashboard Route */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <UserDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   )
// }

// export default App
