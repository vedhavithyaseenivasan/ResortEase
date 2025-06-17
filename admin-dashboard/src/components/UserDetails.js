"use client"

// UserDetails.js
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Mail, Phone, User, AlertCircle, MapPin, Shield, Clock, Trash, Calendar, Home, X, RefreshCw, Activity, Key, Lock, FileText, Download, UserCheck, Bell } from 'lucide-react'
import "./UserDetails.css"

const UserDetails = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("profile")

  // State variables for activity data
  const [activities, setActivities] = useState([])
  const [activityLoading, setActivityLoading] = useState(false)
  const [activityError, setActivityError] = useState("")

  // Backend URL for serving static files
  const backendUrl = "http://localhost:5000"

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken")
        if (!adminToken) {
          navigate("/admin/login")
          return
        }

        const response = await fetch(`${backendUrl}/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch user details")
        }

        const data = await response.json()
        setUser(data.user)
      } catch (err) {
        setError("Error fetching user details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [userId, navigate, backendUrl])

  // Effect to fetch user activity when the activity tab is selected
  useEffect(() => {
    const fetchUserActivity = async () => {
      if (activeTab !== "activity") return

      try {
        setActivityLoading(true)
        const adminToken = localStorage.getItem("adminToken")
        if (!adminToken) {
          navigate("/admin/login")
          return
        }

        const response = await fetch(`${backendUrl}/api/admin/user-activity/${userId}`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch user activity")
        }

        const data = await response.json()
        setActivities(data.activities || [])
        setActivityError("")
      } catch (err) {
        setActivityError("Error fetching user activity")
        console.error(err)
      } finally {
        setActivityLoading(false)
      }
    }

    fetchUserActivity()
  }, [activeTab, userId, navigate, backendUrl])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (username) => {
    return username ? username.substring(0, 2).toUpperCase() : "U"
  }

  const getJoinDate = () => {
    // This is a placeholder - in a real app, you'd use the user's creation date
    return "January 15, 2023"
  }

  const getLastActive = () => {
    // This is a placeholder - in a real app, you'd use the user's last login date
    return "2 hours ago"
  }

  // Helper function to get the appropriate icon for activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case "booking":
        return <Home className="activity-type-icon booking" />
      case "cancellation":
        return <X className="activity-type-icon cancellation" />
      case "update":
        return <RefreshCw className="activity-type-icon update" />
      default:
        return <Clock className="activity-type-icon" />
    }
  }

  // Helper function to format activity details
  const formatActivityDetails = (type, details) => {
    switch (type) {
      case "booking":
        return `Booked room ${details.roomId} from ${new Date(details.startDate).toLocaleDateString()} to ${new Date(details.endDate).toLocaleDateString()}`
      case "cancellation":
        return `Cancelled booking for room ${details.roomId}`
      case "update":
        return `Updated profile information: ${Object.keys(details).join(", ")}`
      default:
        return "Performed an action"
    }
  }

  const handleDeleteUser = async () => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) {
          navigate("/admin/login");
          return;
        }

        const response = await fetch(`${backendUrl}/api/admin/delete-user/${userId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        alert("User has been deleted successfully");
        navigate("/admin/users");
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user account");
      }
    }
  };

  const handleVerifyAccount = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken")
      if (!adminToken) {
        navigate("/admin/login")
        return
      }

      const response = await fetch(`${backendUrl}/api/admin/verify-user/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to verify user")
      }

      // Show success message
      alert("User account has been verified successfully")

      // Refresh user data
      const updatedUserResponse = await fetch(`${backendUrl}/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })

      if (updatedUserResponse.ok) {
        const data = await updatedUserResponse.json()
        setUser(data.user)
      }
    } catch (err) {
      console.error("Error verifying user:", err)
      alert("Failed to verify user account")
    }
  }

  const handleToggleAccountLock = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        navigate("/admin/login");
        return;
      }

      const action = user.isLocked ? 'unlock' : 'lock';
    
      const response = await fetch(`${backendUrl}/api/admin/${action}-user/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} user account`);
      }

      // Show success message
      alert(`User account has been ${action}ed successfully`);
    
      // Refresh user data
      const updatedUserResponse = await fetch(`${backendUrl}/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
    
      if (updatedUserResponse.ok) {
        const data = await updatedUserResponse.json();
        setUser(data.user);
      }
    } catch (err) {
      console.error(`Error ${user.isLocked ? 'unlocking' : 'locking'} user:`, err);
      alert(`Failed to ${user.isLocked ? 'unlock' : 'lock'} user account`);
    }
  };

  return (
    <div className="user-details-container">
      <div className="navigation-header">
        <button className="back-button" onClick={() => navigate("/admin/users")} aria-label="Back to users list">
          <ArrowLeft className="back-icon" />
          <span>Back to Users</span>
        </button>

        {/* {!loading && !error && user && (
          <div className="action-buttons">
            <button className="edit-button" aria-label="Edit user">
              <Edit className="action-icon" />
              <span>Edit</span>
            </button>
            <button className="delete-button" onClick={handleDeleteUser} aria-label="Delete user">
              <Trash className="action-icon" />
              <span>Delete</span>
            </button>
          </div>
        )} */}
      </div>

      {loading ? (
        <div className="user-profile-card skeleton-card">
          <div className="profile-header skeleton">
            <div className="profile-cover skeleton-cover"></div>
            <div className="profile-user-info">
              <div className="skeleton-avatar"></div>
              <div className="skeleton-header-info">
                <div className="skeleton-name"></div>
                <div className="skeleton-email"></div>
              </div>
              <div className="skeleton-badge"></div>
            </div>
          </div>

          <div className="profile-tabs skeleton-tabs">
            <div className="skeleton-tab"></div>
            <div className="skeleton-tab"></div>
            <div className="skeleton-tab"></div>
          </div>

          <div className="profile-content">
            <div className="skeleton-section">
              <div className="skeleton-section-header"></div>
              <div className="skeleton-grid">
                <div className="skeleton-field"></div>
                <div className="skeleton-field"></div>
                <div className="skeleton-field"></div>
                <div className="skeleton-field"></div>
              </div>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="error-card">
          <div className="error-content">
            <div className="error-icon-container">
              <AlertCircle className="error-icon" />
            </div>
            <h3 className="error-title">{error}</h3>
            <p className="error-message">
              We couldn't retrieve the user information you requested. Please try again later.
            </p>
            <button className="return-button" onClick={() => navigate("/admin/users")}>
              Return to Users List
            </button>
          </div>
        </div>
      ) : user ? (
        <div className="user-profile-card">
          <div className="profile-header">
            <div className="profile-cover"></div>
            <div className="profile-user-info">
              <div className="profile-avatar">
                {user.profileImage ? (
                  <img
                    src={`${backendUrl}${user.profileImage}`}
                    alt={`${user.username}'s profile`}
                    className="avatar-image"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.style.display = "none"
                      e.target.nextSibling.style.display = "flex"
                    }}
                  />
                ) : null}
                <div className="avatar-content" style={{ display: user.profileImage ? "none" : "flex" }}>
                  {getInitials(user.username)}
                </div>
                <div className="avatar-status active"></div>
              </div>
              <div className="profile-details">
                <h2 className="profile-name">{user.username}</h2>
                <div className="profile-meta">
                  <div className="meta-item">
                    <Mail className="meta-icon" />
                    <span>{user.email}</span>
                  </div>
                  <div className="meta-item">
                    <Phone className="meta-icon" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>
              <div className="profile-badge">
                <span className={`role-badge ${user.role}`}>{user.role}</span>
              </div>
            </div>
          </div>

          <div className="profile-tabs">
            <button
              className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
              aria-label="View profile information"
            >
              <User className="tab-icon" />
              <span>Profile</span>
            </button>
            <button
              className={`tab-button ${activeTab === "activity" ? "active" : ""}`}
              onClick={() => setActiveTab("activity")}
              aria-label="View activity history"
            >
              <Activity className="tab-icon" />
              <span>Activity</span>
            </button>
            <button
              className={`tab-button ${activeTab === "security" ? "active" : ""}`}
              onClick={() => setActiveTab("security")}
              aria-label="View security settings"
            >
              <Shield className="tab-icon" />
              <span>Security</span>
            </button>
          </div>

          <div className="profile-content">
            {activeTab === "profile" && (
              <div className="profile-tab-content">
                <div className="profile-section">
                  <h3 className="section-title">
                    <User className="section-icon" />
                    Personal Information
                  </h3>
                  <div className="section-divider"></div>

                  <div className="info-grid">
                    <div className="info-card">
                      <div className="info-label">Username</div>
                      <div className="info-value">{user.username}</div>
                    </div>

                    <div className="info-card">
                      <div className="info-label">Date of Birth</div>
                      <div className="info-value">{formatDate(user.dob)}</div>
                    </div>

                    <div className="info-card">
                      <div className="info-label">Member Since</div>
                      <div className="info-value">{getJoinDate()}</div>
                    </div>

                    <div className="info-card">
                      <div className="info-label">Last Active</div>
                      <div className="info-value">{getLastActive()}</div>
                    </div>
                  </div>
                </div>

                <div className="profile-section">
                  <h3 className="section-title">
                    <Mail className="section-icon" />
                    Contact Information
                  </h3>
                  <div className="section-divider"></div>

                  <div className="info-grid">
                    <div className="info-card">
                      <div className="info-label">Email</div>
                      <div className="info-value">{user.email}</div>
                    </div>

                    <div className="info-card">
                      <div className="info-label">Phone</div>
                      <div className="info-value">{user.phone}</div>
                    </div>

                    <div className="info-card">
                      <div className="info-label">Address</div>
                      <div className="info-value">
                        <MapPin className="inline-icon" />
                        <span>Not provided</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="activity-content">
                {activityLoading ? (
                  <div className="activity-loading">
                    <div className="loading-spinner-container">
                      <Clock className="loading-spinner" />
                    </div>
                    <p>Loading activity data...</p>
                  </div>
                ) : activityError ? (
                  <div className="activity-error">
                    <AlertCircle className="error-icon" />
                    <h3>Error Loading Activity</h3>
                    <p>{activityError}</p>
                  </div>
                ) : activities && activities.length > 0 ? (
                  <div className="activity-timeline">
                    <h3 className="section-title">
                      <Activity className="section-icon" />
                      User Activity History
                    </h3>
                    <div className="section-divider"></div>

                    <div className="timeline">
                      {activities.map((activity, index) => (
                        <div key={index} className="timeline-item">
                          <div className="timeline-icon">{getActivityIcon(activity.type)}</div>
                          <div className="timeline-content">
                            <div className="timeline-time">
                              <Calendar className="time-icon" />
                              <span>{new Date(activity.date).toLocaleString()}</span>
                            </div>
                            <div className="timeline-details">
                              <h4 className={`activity-type ${activity.type}`}>
                                {activity.type === "booking"
                                  ? "Room Booking"
                                  : activity.type === "cancellation"
                                    ? "Booking Cancellation"
                                    : "Profile Update"}
                              </h4>
                              <p className="activity-description">
                                {formatActivityDetails(activity.type, activity.details)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="empty-activity">
                    <Clock className="empty-icon" />
                    <h3>No Activity Found</h3>
                    <p>This user hasn't performed any actions yet.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "security" && (
              <div className="security-content">
                <div className="security-section">
                  <h3 className="section-title">
                    <Shield className="section-icon" />
                    Security Settings
                  </h3>
                  <div className="section-divider"></div>

                  <div className="security-actions">
                    <div className="action-card">
                      <div className="action-header">
                        <Key className="action-icon" />
                        <h4>Password Management</h4>
                      </div>
                      <p>Reset the user's password or force a password change on next login.</p>
                      <button className="action-button primary-button">Reset Password</button>
                    </div>

                    <div className="action-card">
                      <div className="action-header">
                        <UserCheck className="action-icon" />
                        <h4>Account Verification</h4>
                      </div>
                      <p>Verify user's identity or send a new verification email.</p>
                      <button className="action-button primary-button" onClick={handleVerifyAccount}>
                        Verify Account
                      </button>
                    </div>

                    <div className="action-card">
                      <div className="action-header">
                        <Bell className="action-icon" />
                        <h4>Login Notifications</h4>
                      </div>
                      <p>Enable or disable login notifications for this user.</p>
                      <button className="action-button primary-button">Manage Notifications</button>
                    </div>

                    <div className="action-card">
                      <div className="action-header">
                        <FileText className="action-icon" />
                        <h4>Security Logs</h4>
                      </div>
                      <p>View and download security logs for this user account.</p>
                      <button className="action-button download-button">
                        <Download size={14} className="button-icon" />
                        Download Logs
                      </button>
                    </div>

                    <div className="action-card danger">
                      <div className="action-header">
                        <Lock className="action-icon" />
                        <h4>Account Access</h4>
                      </div>
                      <p>Temporarily lock this account to prevent any login attempts.</p>
                      <button 
                        className="action-button warning-button"
                        onClick={handleToggleAccountLock}
                      >
                        {user.isLocked ? 'Unlock Account' : 'Lock Account'}
                      </button>
                    </div>

                    <div className="action-card danger">
                      <div className="action-header">
                        <Trash className="action-icon" />
                        <h4>Delete Account</h4>
                      </div>
                      <p>Permanently delete this user account and all associated data.</p>
                      <button className="action-button delete-button" onClick={handleDeleteUser}>
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="not-found-card">
          <div className="not-found-content">
            <div className="not-found-icon-container">
              <User className="not-found-icon" />
            </div>
            <h3 className="not-found-title">User Not Found</h3>
            <p className="not-found-message">The user you are looking for doesn't exist or has been removed.</p>
            <button className="return-button" onClick={() => navigate("/admin/users")}>
              Return to Users List
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDetails
