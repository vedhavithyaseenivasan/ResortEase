// "use client"

// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, Search, Users, AlertCircle, ChevronDown, X, Filter, Mail } from 'lucide-react';
// import "./UsersList.css";

// const UsersList = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [selectedDomains, setSelectedDomains] = useState([]);

//   // Extract unique email domains from users
//   const emailDomains = useMemo(() => {
//     if (!users.length) return [];
    
//     const domains = users.map(user => {
//       const emailParts = user.email.split('@');
//       return emailParts.length > 1 ? emailParts[1] : null;
//     }).filter(Boolean);
    
//     return [...new Set(domains)];
//   }, [users]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const adminToken = localStorage.getItem("adminToken");
//         if (!adminToken) {
//           navigate("/admin/login");
//           return;
//         }

//         const response = await fetch("http://localhost:5000/api/admin/users", {
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }

//         const data = await response.json();
//         setUsers(data.users);
//         setFilteredUsers(data.users);
//       } catch (err) {
//         setError("Error fetching users");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [navigate]);

//   useEffect(() => {
//     let result = [...users];
    
//     // Apply search filter
//     if (searchTerm.trim() !== "") {
//       result = result.filter(
//         (user) =>
//           user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.email.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Apply domain filter
//     if (selectedDomains.length > 0) {
//       result = result.filter(user => {
//         const emailParts = user.email.split('@');
//         const domain = emailParts.length > 1 ? emailParts[1] : null;
//         return domain && selectedDomains.includes(domain);
//       });
//     }
    
//     setFilteredUsers(result);
//   }, [searchTerm, users, selectedDomains]);

//   const handleViewDetails = (userId) => {
//     navigate(`/admin/users/${userId}`);
//   };

//   const toggleDomainSelection = (domain) => {
//     setSelectedDomains(prev => 
//       prev.includes(domain) 
//         ? prev.filter(d => d !== domain) 
//         : [...prev, domain]
//     );
//   };

//   const clearFilters = () => {
//     setSelectedDomains([]);
//     setSearchTerm("");
//   };

//   return (
//     <div className="users-container">
//       <div className="users-card">
//         <div className="users-header">
//           <div className="header-content">
//             <div className="header-icon">
//               <Users />
//             </div>
//             <div className="header-text">
//               <h1>Users Management</h1>
//               <p>View and manage all registered users</p>
//             </div>
//           </div>
//           <div className="users-count">
//             <span className="count-number">{users.length}</span>
//             <span className="count-label">Total Users</span>
//           </div>
//         </div>
        
//         <div className="search-filter-bar">
//           <div className="search-container">
//             <Search className="search-icon" />
//             <input
//               type="search"
//               placeholder="Search by username or email..."
//               className="search-input"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button 
//                 className="clear-search" 
//                 onClick={() => setSearchTerm("")}
//                 aria-label="Clear search"
//               >
//                 <X size={16} />
//               </button>
//             )}
//           </div>
          
//           <div className="filter-container">
//             <button 
//               className={`filter-button ${isFilterOpen || selectedDomains.length > 0 ? 'active' : ''}`}
//               onClick={() => setIsFilterOpen(!isFilterOpen)}
//             >
//               <Filter size={16} />
//               <span>Filter</span>
//               {selectedDomains.length > 0 && (
//                 <span className="filter-badge">{selectedDomains.length}</span>
//               )}
//               <ChevronDown size={16} className={`chevron ${isFilterOpen ? 'open' : ''}`} />
//             </button>
            
//             {isFilterOpen && (
//               <div className="filter-dropdown">
//                 <div className="filter-header">
//                   <h3>Filter by Email Domain</h3>
//                   {selectedDomains.length > 0 && (
//                     <button className="clear-filters" onClick={clearFilters}>
//                       Clear all
//                     </button>
//                   )}
//                 </div>
//                 <div className="domain-list">
//                   {emailDomains.map(domain => (
//                     <label key={domain} className="domain-option">
//                       <input
//                         type="checkbox"
//                         checked={selectedDomains.includes(domain)}
//                         onChange={() => toggleDomainSelection(domain)}
//                       />
//                       <span className="domain-name">{domain}</span>
//                       <span className="domain-count">
//                         {users.filter(user => user.email.endsWith(`@${domain}`)).length}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="users-content">
//           {loading ? (
//             <div className="loading-state">
//               {[1, 2, 3, 4, 5].map((i) => (
//                 <div key={i} className="loading-item">
//                   <div className="loading-avatar"></div>
//                   <div className="loading-details">
//                     <div className="loading-line loading-name"></div>
//                     <div className="loading-line loading-email"></div>
//                   </div>
//                   <div className="loading-action"></div>
//                 </div>
//               ))}
//             </div>
//           ) : error ? (
//             <div className="error-state">
//               <div className="error-icon">
//                 <AlertCircle />
//               </div>
//               <h3>{error}</h3>
//               <p>We couldn't retrieve the user information. Please try again.</p>
//               <button 
//                 className="retry-button"
//                 onClick={() => window.location.reload()}
//               >
//                 Retry
//               </button>
//             </div>
//           ) : filteredUsers.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">
//                 <Users />
//               </div>
//               <h3>No Users Found</h3>
//               <p>
//                 {searchTerm || selectedDomains.length > 0
//                   ? "No users match your current filters"
//                   : "There are no users in the system yet"}
//               </p>
//               {(searchTerm || selectedDomains.length > 0) && (
//                 <button className="clear-filters-button" onClick={clearFilters}>
//                   Clear Filters
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="users-table-wrapper">
//               <table className="users-table">
//                 <thead>
//                   <tr>
//                     <th className="user-column">User</th>
//                     <th className="email-column">Email</th>
//                     <th className="status-column">Status</th>
//                     <th className="actions-column">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredUsers.map((user, index) => (
//                     <tr 
//                       key={user._id} 
//                       className="user-row"
//                       style={{ animationDelay: `${index * 0.05}s` }}
//                     >
//                       <td className="user-cell">
//                         <div className="user-info">
//                           <div className="user-avatar">
//                             {user.username.substring(0, 2).toUpperCase()}
//                           </div>
//                           <span className="username">{user.username}</span>
//                         </div>
//                       </td>
//                       <td className="email-cell">
//                         <div className="email-container">
//                           <Mail size={14} className="email-icon" />
//                           <span className="email-text">{user.email}</span>
//                         </div>
//                       </td>
//                       <td className="status-cell">
//                         <div className="status-badge active">
//                           <span className="status-indicator"></span>
//                           <span>Active</span>
//                         </div>
//                       </td>
//                       <td className="actions-cell">
//                         <button
//                           onClick={() => handleViewDetails(user._id)}
//                           className="view-button"
//                           aria-label="View user details"
//                         >
//                           <Eye size={16} />
//                           <span>View</span>
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
        
//         <div className="users-footer">
//           <div className="pagination-info">
//             <span>Showing {filteredUsers.length} of {users.length} users</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersList;


// "use client"

// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, Search, Users, AlertCircle, ChevronDown, X, Filter, Mail } from 'lucide-react';
// import "./UsersList.css";

// const UsersList = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [selectedDomains, setSelectedDomains] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 6;

//   // Extract unique email domains from users
//   const emailDomains = useMemo(() => {
//     if (!users.length) return [];
    
//     const domains = users.map(user => {
//       const emailParts = user.email.split('@');
//       return emailParts.length > 1 ? emailParts[1] : null;
//     }).filter(Boolean);
    
//     return [...new Set(domains)];
//   }, [users]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const adminToken = localStorage.getItem("adminToken");
//         if (!adminToken) {
//           navigate("/admin/login");
//           return;
//         }

//         const response = await fetch("http://localhost:5000/api/admin/users", {
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }

//         const data = await response.json();
//         setUsers(data.users);
//         setFilteredUsers(data.users);
//       } catch (err) {
//         setError("Error fetching users");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [navigate]);

//   useEffect(() => {
//     let result = [...users];
    
//     // Apply search filter
//     if (searchTerm.trim() !== "") {
//       result = result.filter(
//         (user) =>
//           user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           user.email.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Apply domain filter
//     if (selectedDomains.length > 0) {
//       result = result.filter(user => {
//         const emailParts = user.email.split('@');
//         const domain = emailParts.length > 1 ? emailParts[1] : null;
//         return domain && selectedDomains.includes(domain);
//       });
//     }
    
//     setFilteredUsers(result);
//     setCurrentPage(1); // Reset to first page when filters change
//   }, [searchTerm, users, selectedDomains]);

//   // Calculate paginated users
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   const handleViewDetails = (userId) => {
//     navigate(`/admin/users/${userId}`);
//   };

//   const toggleDomainSelection = (domain) => {
//     setSelectedDomains(prev => 
//       prev.includes(domain) 
//         ? prev.filter(d => d !== domain) 
//         : [...prev, domain]
//     );
//   };

//   const clearFilters = () => {
//     setSelectedDomains([]);
//     setSearchTerm("");
//   };

//   return (
//     <div className="users-container">
//       <div className="users-card">
//         <div className="users-header">
//           <div className="header-content">
//             <div className="header-icon">
//               <Users />
//             </div>
//             <div className="header-text">
//               <h1>Users Management</h1>
//               <p>View and manage all registered users</p>
//             </div>
//           </div>
//           <div className="users-count">
//             <span className="count-number">{users.length}</span>
//             <span className="count-label">Total Users</span>
//           </div>
//         </div>
        
//         <div className="search-filter-bar">
//           <div className="search-container">
//             <Search className="search-icon" />
//             <input
//               type="search"
//               placeholder="Search by username or email..."
//               className="search-input"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {searchTerm && (
//               <button 
//                 className="clear-search" 
//                 onClick={() => setSearchTerm("")}
//                 aria-label="Clear search"
//               >
//                 <X size={16} />
//               </button>
//             )}
//           </div>
          
//           <div className="filter-container">
//             <button 
//               className={`filter-button ${isFilterOpen || selectedDomains.length > 0 ? 'active' : ''}`}
//               onClick={() => setIsFilterOpen(!isFilterOpen)}
//             >
//               <Filter size={16} />
//               <span>Filter</span>
//               {selectedDomains.length > 0 && (
//                 <span className="filter-badge">{selectedDomains.length}</span>
//               )}
//               <ChevronDown size={16} className={`chevron ${isFilterOpen ? 'open' : ''}`} />
//             </button>
            
//             {isFilterOpen && (
//               <div className="filter-dropdown">
//                 <div className="filter-header">
//                   <h3>Filter by Email Domain</h3>
//                   {selectedDomains.length > 0 && (
//                     <button className="clear-filters" onClick={clearFilters}>
//                       Clear all
//                     </button>
//                   )}
//                 </div>
//                 <div className="domain-list">
//                   {emailDomains.map(domain => (
//                     <label key={domain} className="domain-option">
//                       <input
//                         type="checkbox"
//                         checked={selectedDomains.includes(domain)}
//                         onChange={() => toggleDomainSelection(domain)}
//                       />
//                       <span className="domain-name">{domain}</span>
//                       <span className="domain-count">
//                         {users.filter(user => user.email.endsWith(`@${domain}`)).length}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="users-content">
//           {loading ? (
//             <div className="loading-state">
//               {[1, 2, 3, 4, 5, 6].map((i) => (
//                 <div key={i} className="loading-item">
//                   <div className="loading-avatar"></div>
//                   <div className="loading-details">
//                     <div className="loading-line loading-name"></div>
//                     <div className="loading-line loading-email"></div>
//                   </div>
//                   <div className="loading-action"></div>
//                 </div>
//               ))}
//             </div>
//           ) : error ? (
//             <div className="error-state">
//               <div className="error-icon">
//                 <AlertCircle />
//               </div>
//               <h3>{error}</h3>
//               <p>We couldn't retrieve the user information. Please try again.</p>
//               <button 
//                 className="retry-button"
//                 onClick={() => window.location.reload()}
//               >
//                 Retry
//               </button>
//             </div>
//           ) : filteredUsers.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">
//                 <Users />
//               </div>
//               <h3>No Users Found</h3>
//               <p>
//                 {searchTerm || selectedDomains.length > 0
//                   ? "No users match your current filters"
//                   : "There are no users in the system yet"}
//               </p>
//               {(searchTerm || selectedDomains.length > 0) && (
//                 <button className="clear-filters-button" onClick={clearFilters}>
//                   Clear Filters
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="users-table-wrapper">
//               <table className="users-table">
//                 <thead>
//                   <tr>
//                     <th className="user-column">User</th>
//                     <th className="email-column">Email</th>
//                     <th className="status-column">Status</th>
//                     <th className="actions-column">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentUsers.map((user, index) => (
//                     <tr 
//                       key={user._id} 
//                       className="user-row"
//                       style={{ animationDelay: `${index * 0.05}s` }}
//                     >
//                       <td className="user-cell">
//                         <div className="user-info">
//                           <div className="user-avatar">
//                             {user.username.substring(0, 2).toUpperCase()}
//                           </div>
//                           <span className="username">{user.username}</span>
//                         </div>
//                       </td>
//                       <td className="email-cell">
//                         <div className="email-container">
//                           <Mail size={14} className="email-icon" />
//                           <span className="email-text">{user.email}</span>
//                         </div>
//                       </td>
//                       <td className="status-cell">
//                         <div className="status-badge active">
//                           <span className="status-indicator"></span>
//                           <span>Active</span>
//                         </div>
//                       </td>
//                       <td className="actions-cell">
//                         <button
//                           onClick={() => handleViewDetails(user._id)}
//                           className="view-button"
//                           aria-label="View user details"
//                         >
//                           <Eye size={16} />
//                           <span>View</span>
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
        
//         {filteredUsers.length > usersPerPage && (
//           <div className="users-footer">
//             <div className="pagination-info">
//               <span>Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users</span>
//             </div>
//             <div className="pagination-controls">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="pagination-button"
//               >
//                 Previous
//               </button>
//               <div className="page-numbers">
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
//                   <button
//                     key={number}
//                     onClick={() => setCurrentPage(number)}
//                     className={`pagination-button ${currentPage === number ? 'active' : ''}`}
//                   >
//                     {number}
//                   </button>
//                 ))}
//               </div>
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="pagination-button"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UsersList;











"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Search, Users, AlertCircle, ChevronDown, X, Filter, Mail } from 'lucide-react';
import "./UsersList.css";

const UsersList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const emailDomains = useMemo(() => {
    if (!users.length) return [];

    const domains = users.map(user => {
      const emailParts = user.email?.split('@');
      return emailParts?.length > 1 ? emailParts[1] : null;
    }).filter(Boolean);

    return [...new Set(domains)];
  }, [users]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
          navigate("/admin/login");
          return;
        }

        const response = await fetch("http://localhost:5000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data.users);
        setFilteredUsers(data.users);
      } catch (err) {
        setError("Error fetching users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  useEffect(() => {
    let result = [...users];

    if (searchTerm.trim() !== "") {
      result = result.filter(
        (user) =>
          user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDomains.length > 0) {
      result = result.filter(user => {
        const emailParts = user.email?.split('@');
        const domain = emailParts?.length > 1 ? emailParts[1] : null;
        return domain && selectedDomains.includes(domain);
      });
    }

    setFilteredUsers(result);
    setCurrentPage(1);
  }, [searchTerm, users, selectedDomains]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleViewDetails = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  const toggleDomainSelection = (domain) => {
    setSelectedDomains(prev =>
      prev.includes(domain)
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    );
  };

  const clearFilters = () => {
    setSelectedDomains([]);
    setSearchTerm("");
  };

  return (
    <div className="users-container">
      <div className="users-card">
        <div className="users-header">
          <div className="header-content">
            <div className="header-icon">
              <Users />
            </div>
            <div className="header-text">
              <h1>Users Management</h1>
              <p>View and manage all registered users</p>
            </div>
          </div>
          <div className="users-count">
            <span className="count-number">{users.length}</span>
            <span className="count-label">Total Users</span>
          </div>
        </div>

        <div className="search-filter-bar">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="search"
              placeholder="Search by username or email..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="filter-container">
            <button
              className={`filter-button ${isFilterOpen || selectedDomains.length > 0 ? 'active' : ''}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} />
              <span>Filter</span>
              {selectedDomains.length > 0 && (
                <span className="filter-badge">{selectedDomains.length}</span>
              )}
              <ChevronDown size={16} className={`chevron ${isFilterOpen ? 'open' : ''}`} />
            </button>

            {isFilterOpen && (
              <div className="filter-dropdown">
                <div className="filter-header">
                  <h3>Filter by Email Domain</h3>
                  {selectedDomains.length > 0 && (
                    <button className="clear-filters" onClick={clearFilters}>
                      Clear all
                    </button>
                  )}
                </div>
                <div className="domain-list">
                  {emailDomains.map(domain => (
                    <label key={domain} className="domain-option">
                      <input
                        type="checkbox"
                        checked={selectedDomains.includes(domain)}
                        onChange={() => toggleDomainSelection(domain)}
                      />
                      <span className="domain-name">{domain}</span>
                      <span className="domain-count">
                        {users.filter(user => user.email?.endsWith(`@${domain}`)).length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="users-content">
          {loading ? (
            <div className="loading-state">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="loading-item">
                  <div className="loading-avatar"></div>
                  <div className="loading-details">
                    <div className="loading-line loading-name"></div>
                    <div className="loading-line loading-email"></div>
                  </div>
                  <div className="loading-action"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="error-state">
              <div className="error-icon">
                <AlertCircle />
              </div>
              <h3>{error}</h3>
              <p>We couldn't retrieve the user information. Please try again.</p>
              <button
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Users />
              </div>
              <h3>No Users Found</h3>
              <p>
                {searchTerm || selectedDomains.length > 0
                  ? "No users match your current filters"
                  : "There are no users in the system yet"}
              </p>
              {(searchTerm || selectedDomains.length > 0) && (
                <button className="clear-filters-button" onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="users-table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th className="user-column">User</th>
                    <th className="email-column">Email</th>
                    <th className="status-column">Status</th>
                    <th className="actions-column">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className="user-row"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="user-cell">
                        <div className="user-info">
                          <div className="user-avatar">
                            {(user.username || "NA").substring(0, 2).toUpperCase()}
                          </div>
                          <span className="username">{user.username || "Unknown"}</span>
                        </div>
                      </td>
                      <td className="email-cell">
                        <div className="email-container">
                          <Mail size={14} className="email-icon" />
                          <span className="email-text">{user.email || "N/A"}</span>
                        </div>
                      </td>
                      <td className="status-cell">
                        <div className="status-badge active">
                          <span className="status-indicator"></span>
                          <span>Active</span>
                        </div>
                      </td>
                      <td className="actions-cell">
                        <button
                          onClick={() => handleViewDetails(user._id)}
                          className="view-button"
                          aria-label="View user details"
                        >
                          <Eye size={16} />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {filteredUsers.length > usersPerPage && (
          <div className="users-footer">
            <div className="pagination-info">
              <span>
                Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
              </span>
            </div>
            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`pagination-button ${currentPage === number ? 'active' : ''}`}
                  >
                    {number}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersList;
