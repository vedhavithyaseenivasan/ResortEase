"use client"

import { useState } from "react"
import { AlertTriangle, Key, Trash2, Eye, EyeOff, Shield, Info } from 'lucide-react'
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import './settings-styles.css';

const SettingsSection = ({ userData, navigate }) => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordFeedback, setPasswordFeedback] = useState("")

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setPasswordError("")

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match")
      return
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return
    }

    // Check if current password and new password are the same
    if (currentPassword === newPassword) {
      setPasswordError("New password must be different from current password")
      return
    }

    try {
      setIsChangingPassword(true)
      const token = localStorage.getItem("token")

      await axios.post(
        "https://resortease-2.onrender.com/api/user/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      // Clear form and show success
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setPasswordError("")
      showNotification("Password changed successfully", "success")
      setIsChangingPassword(false)
    } catch (error) {
      setIsChangingPassword(false)
      if (error.response && error.response.status === 401) {
        setPasswordError("Current password is incorrect")
      } else {
        console.error("Error changing password:", error)
        showNotification("Failed to change password", "error")
      }
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== userData.email) {
      showNotification("Please enter your email correctly to confirm deletion", "error")
      return
    }

    try {
      setIsDeleting(true)
      const token = localStorage.getItem("token")

      await axios.delete("https://resortease-2.onrender.com/api/user/delete-account", {
        headers: { Authorization: `Bearer ${token}` },
      })

      // Clear local storage and redirect to home
      localStorage.removeItem("token")
      showNotification("Your account has been deleted", "success")
      setTimeout(() => {
        navigate("/")
      }, 2000)
    } catch (error) {
      setIsDeleting(false)
      console.error("Error deleting account:", error)
      showNotification("Failed to delete account", "error")
    }
  }

  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength(0)
      setPasswordFeedback("")
      return
    }

    // Simple password strength check
    let strength = 0
    let feedback = ""

    // Length check
    if (password.length >= 8) strength += 1
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1
    
    // Contains numbers
    if (/[0-9]/.test(password)) strength += 1
    
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    // Set feedback based on strength
    if (strength <= 2) {
      feedback = "Weak password"
    } else if (strength <= 4) {
      feedback = "Medium strength password"
    } else {
      feedback = "Strong password"
    }

    setPasswordStrength(strength)
    setPasswordFeedback(feedback)
  }

  const handleNewPasswordChange = (e) => {
    const value = e.target.value
    setNewPassword(value)
    checkPasswordStrength(value)
  }

  const showNotification = (message, type) => {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">×</button>
      </div>
    `
    document.body.appendChild(notification)

    // Add the 'show' class after a small delay to trigger the animation
    setTimeout(() => {
      notification.classList.add("show")
    }, 10)

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)

    // Close button functionality
    const closeButton = notification.querySelector(".notification-close")
    closeButton.addEventListener("click", () => {
      notification.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      className="settings-section"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <motion.div className="section-header" variants={itemVariants}>
        <h2>Settings</h2>
        <p>Manage your account settings and preferences</p>
      </motion.div>

      <motion.div className="settings-card" variants={itemVariants}>
        <motion.div className="settings-group" variants={itemVariants}>
          <h4>
            <Shield size={20} className="settings-icon" />
            Security Settings
          </h4>
          <form onSubmit={handleChangePassword} className="password-form">
            <div className="form-group">
              <label htmlFor="current-password">Current Password</label>
              <div className="password-input-container">
                <input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <div className="password-input-container">
                <input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {newPassword && (
                <div className="password-strength">
                  <div className="strength-meter">
                    <div 
                      className={`strength-fill strength-${passwordStrength}`} 
                      style={{ width: `${Math.min(100, passwordStrength * 20)}%` }}
                    ></div>
                  </div>
                  <span className="strength-text">{passwordFeedback}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm New Password</label>
              <div className="password-input-container">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {passwordError && (
                <motion.div 
                  className="password-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertTriangle size={16} />
                  <span>{passwordError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="password-tips">
              <Info size={16} />
              <span>Password should be at least 6 characters and include a mix of letters, numbers, and symbols.</span>
            </div>

            <motion.button 
              type="submit" 
              className="change-password-button" 
              disabled={isChangingPassword}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isChangingPassword ? (
                <span className="button-loading"></span>
              ) : (
                <>
                  <Key size={16} />
                  <span>Change Password</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        <motion.div className="settings-group danger-zone" variants={itemVariants}>
          <h4>
            <Trash2 size={20} className="settings-icon" />
            Account Deletion
          </h4>
          <div className="delete-account-section">
            <div className="delete-warning">
              <AlertTriangle size={20} />
              <p>
                Deleting your account is permanent. All your data will be permanently removed. This action cannot be
                undone.
              </p>
            </div>

            <div className="delete-confirmation">
              <label htmlFor="delete-confirmation">
                Type your email <strong>{userData?.email}</strong> to confirm:
              </label>
              <input
                id="delete-confirmation"
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="form-input"
                placeholder="Enter your email"
              />
            </div>

            <motion.button
              className="delete-account-button"
              onClick={handleDeleteAccount}
              disabled={isDeleting || deleteConfirmation !== userData?.email}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isDeleting ? (
                <span className="button-loading"></span>
              ) : (
                <>
                  <Trash2 size={16} />
                  <span>Delete My Account</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default SettingsSection
