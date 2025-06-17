// "use client"

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Home, Calendar, DoorClosed, LogOut, LayoutDashboard } from 'lucide-react';
// import "./AdminNavbar.css";

// const AdminNavbar = () => {
//   const [activeLink, setActiveLink] = useState("");
  
//   // Set active link based on current path
//   useEffect(() => {
//     const path = window.location.pathname;
//     if (path.includes("/admin/home")) setActiveLink("home");
//     else if (path.includes("/admin/dashboard")) setActiveLink("booking");
//     else if (path.includes("/admin/rooms")) setActiveLink("rooms");
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     window.location.href = "/admin/login";
//   };

//   return (
//     <motion.nav
//       className="admin-navbar"
//       initial={{ y: -20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//     >
//       <div className="navbar-logo">
//         <LayoutDashboard />
//         <span>Admin Portal</span>
//       </div>
      
//       <div className="nav-links">
//         <motion.div 
//           className="nav-item"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.1 }}
//         >
//           <Link 
//             to="/admin/home" 
//             className={`nav-link ${activeLink === "home" ? "active" : ""}`}
//             onClick={() => setActiveLink("home")}
//           >
//             <Home />
//             <span>Home</span>
//             {activeLink === "home" && (
//               <motion.div 
//                 className="active-indicator"
//                 layoutId="activeIndicator"
//               />
//             )}
//           </Link>
//         </motion.div>

//         <motion.div 
//           className="nav-item"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <Link 
//             to="/admin/dashboard" 
//             className={`nav-link ${activeLink === "booking" ? "active" : ""}`}
//             onClick={() => setActiveLink("booking")}
//           >
//             <Calendar />
//             <span>Booking</span>
//             {activeLink === "booking" && (
//               <motion.div 
//                 className="active-indicator"
//                 layoutId="activeIndicator"
//               />
//             )}
//           </Link>
//         </motion.div>

//         <motion.div 
//           className="nav-item"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <Link 
//             to="/admin/rooms" 
//             className={`nav-link ${activeLink === "rooms" ? "active" : ""}`}
//             onClick={() => setActiveLink("rooms")}
//           >
//             <DoorClosed />
//             <span>Rooms</span>
//             {activeLink === "rooms" && (
//               <motion.div 
//                 className="active-indicator"
//                 layoutId="activeIndicator"
//               />
//             )}
//           </Link>
//         </motion.div>
//       </div>

//       <motion.button
//         className="logout-button"
//         onClick={handleLogout}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.4 }}
//         whileHover={{ 
//           scale: 1.05,
//           backgroundColor: "rgba(239, 68, 68, 0.1)" 
//         }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <LogOut />
//         <span>Logout</span>
//       </motion.button>
//     </motion.nav>
//   );
// };

// export default AdminNavbar;


// "use client"

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Home, Calendar, DoorClosed, LogOut, LayoutDashboard, Users } from 'lucide-react';
// import "./AdminNavbar.css";

// const AdminNavbar = () => {
//   const [activeLink, setActiveLink] = useState("");
  
//   // Set active link based on current path
//   useEffect(() => {
//     const path = window.location.pathname;
//     if (path.includes("/admin/home")) setActiveLink("home");
//     else if (path.includes("/admin/dashboard")) setActiveLink("booking");
//     else if (path.includes("/admin/rooms")) setActiveLink("rooms");
//     else if (path.includes("/admin/users")) setActiveLink("users");
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     window.location.href = "/admin/login";
//   };

//   return (
//     <motion.nav
//       className="admin-navbar"
//       initial={{ y: -20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//     >
//       <div className="navbar-logo">
//         <LayoutDashboard />
//         <span>Admin Portal</span>
//       </div>
      
//       <div className="nav-links">
//         <motion.div 
//           className="nav-item"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.1 }}
//         >
//           <Link 
//             to="/admin/home" 
//             className={`nav-link ${activeLink === "home" ? "active" : ""}`}
//             onClick={() => setActiveLink("home")}
//           >
//             <Home />
//             <span>Home</span>
//             {activeLink === "home" && (
//               <motion.div 
//                 className="active-indicator"
//                 layoutId="activeIndicator"
//               />
//             )}
//           </Link>
//         </motion.div>

//         <motion.div 
//           className="nav-item"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <Link 
//             to="/admin/dashboard" 
//             className={`nav-link ${activeLink === "booking" ? "active" : ""}`}
//             onClick={() => setActiveLink("booking")}
//           >
//             <Calendar />
//             <span>Booking</span>
//             {activeLink === "booking" && (
//               <motion.div 
//                 className="active-indicator"
//                 layoutId="activeIndicator"
//               />
//             )}
//           </Link>
//         </motion.div>

//         <motion.div 
//           className="nav-item"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <Link 
//             to="/admin/rooms" 
//             className={`nav-link ${activeLink === "rooms" ? "active" : ""}`}
//             onClick={() => setActiveLink("rooms")}
//           >
//             <DoorClosed />
//             <span>Rooms</span>
//             {activeLink === "rooms" && (
//               <motion.div 
//                 className="active-indicator"
//                 layoutId="activeIndicator"
//               />
//             )}
//           </Link>
//         </motion.div>

//         <motion.div 
//           className="nav-item"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           <Link 
//             to="/admin/users" 
//             className={`nav-link ${activeLink === "users" ? "active" : ""}`}
//             onClick={() => setActiveLink("users")}
//           >
//             <Users />
//             <span>Users</span>
//             {activeLink === "users" && (
//               <motion.div 
//                 className="active-indicator"
//                 layoutId="activeIndicator"
//               />
//             )}
//           </Link>
//         </motion.div>
//       </div>

//       <motion.button
//         className="logout-button"
//         onClick={handleLogout}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//         whileHover={{ 
//           scale: 1.05,
//           backgroundColor: "rgba(239, 68, 68, 0.1)" 
//         }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <LogOut />
//         <span>Logout</span>
//       </motion.button>
//     </motion.nav>
//   );
// };

// export default AdminNavbar;


"use client"

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Calendar, DoorClosed, LogOut, LayoutDashboard, Users } from 'lucide-react';
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const [activeLink, setActiveLink] = useState("");
  
  // Set active link based on current path
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("/admin/home")) setActiveLink("home");
    else if (path.includes("/admin/dashboard")) setActiveLink("booking");
    else if (path.includes("/admin/rooms")) setActiveLink("rooms");
    else if (path.includes("/admin/users")) setActiveLink("users");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  // Animation variants
  const navbarVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * custom,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const indicatorVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { 
      width: "100%", 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  return (
    <motion.nav
      className="admin-navbar"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="navbar-container">
        <motion.div 
          className="navbar-logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="logo-icon">
            <LayoutDashboard />
          </div>
          <span>Admin Portal</span>
        </motion.div>
        
        <div className="nav-links">
          <motion.div 
            className="nav-item"
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link 
              to="/admin/home" 
              className={`nav-link ${activeLink === "home" ? "active" : ""}`}
              onClick={() => setActiveLink("home")}
            >
              <div className="nav-icon">
                <Home />
              </div>
              <span>Home</span>
              {activeLink === "home" && (
                <motion.div 
                  className="active-indicator"
                  layoutId="activeIndicator"
                  variants={indicatorVariants}
                  initial="initial"
                  animate="animate"
                />
              )}
            </Link>
          </motion.div>

          <motion.div 
            className="nav-item"
            custom={2}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link 
              to="/admin/dashboard" 
              className={`nav-link ${activeLink === "booking" ? "active" : ""}`}
              onClick={() => setActiveLink("booking")}
            >
              <div className="nav-icon">
                <Calendar />
              </div>
              <span>Booking</span>
              {activeLink === "booking" && (
                <motion.div 
                  className="active-indicator"
                  layoutId="activeIndicator"
                  variants={indicatorVariants}
                  initial="initial"
                  animate="animate"
                />
              )}
            </Link>
          </motion.div>

          <motion.div 
            className="nav-item"
            custom={3}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link 
              to="/admin/rooms" 
              className={`nav-link ${activeLink === "rooms" ? "active" : ""}`}
              onClick={() => setActiveLink("rooms")}
            >
              <div className="nav-icon">
                <DoorClosed />
              </div>
              <span>Rooms</span>
              {activeLink === "rooms" && (
                <motion.div 
                  className="active-indicator"
                  layoutId="activeIndicator"
                  variants={indicatorVariants}
                  initial="initial"
                  animate="animate"
                />
              )}
            </Link>
          </motion.div>

          <motion.div 
            className="nav-item"
            custom={4}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link 
              to="/admin/users" 
              className={`nav-link ${activeLink === "users" ? "active" : ""}`}
              onClick={() => setActiveLink("users")}
            >
              <div className="nav-icon">
                <Users />
              </div>
              <span>Users</span>
              {activeLink === "users" && (
                <motion.div 
                  className="active-indicator"
                  layoutId="activeIndicator"
                  variants={indicatorVariants}
                  initial="initial"
                  animate="animate"
                />
              )}
            </Link>
          </motion.div>
        </div>

        <motion.button
          className="logout-button"
          onClick={handleLogout}
          custom={5}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "rgba(239, 68, 68, 0.1)" 
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="logout-icon">
            <LogOut />
          </div>
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default AdminNavbar;
