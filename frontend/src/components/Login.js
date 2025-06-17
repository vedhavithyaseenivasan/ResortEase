// "use client"

// import { useState } from "react"
// import axios from "axios"
// import { Link, useNavigate } from "react-router-dom"
// import { motion, AnimatePresence } from "framer-motion"
// import "./Login.css"

// const Login = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [message, setMessage] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [showForgotPassword, setShowForgotPassword] = useState(false)
//   const [pin, setPin] = useState("")
//   const [newPassword, setNewPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [tempToken, setTempToken] = useState("")
//   const [step, setStep] = useState(1) // 1: email, 2: pin, 3: new password
//   const navigate = useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       const response = await axios.post("https://resortease-2.onrender.com/api/login", {
//         email,
//         password,
//       })

//       const token = response.data.token
//       localStorage.setItem("token", token)
//       setMessage("Login successful")

//       // Redirect to home page after successful login
//       navigate("/")
//     } catch (error) {
//       setMessage(error.response?.data?.message || "An error occurred during login")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleForgotPassword = async () => {
//     if (!email) {
//       setMessage("Please enter your email first")
//       return
//     }

//     setIsLoading(true)
//     try {
//       const response = await axios.post("https://resortease-2.onrender.com/api/forgot-password", {
//         email,
//       })

//       setMessage(response.data.message)
//       setStep(2) // Move to PIN verification step
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Error sending reset PIN")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const verifyPin = async () => {
//     if (!pin) {
//       setMessage("Please enter the PIN")
//       return
//     }

//     setIsLoading(true)
//     try {
//       const response = await axios.post("https://resortease-2.onrender.com/api/verify-reset-pin", {
//         email,
//         pin,
//       })

//       setMessage(response.data.message)
//       setTempToken(response.data.tempToken)
//       setStep(3) // Move to password reset step
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Error verifying PIN")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const resetPassword = async () => {
//     if (!newPassword || !confirmPassword) {
//       setMessage("Please enter and confirm your new password")
//       return
//     }

//     if (newPassword !== confirmPassword) {
//       setMessage("Passwords do not match")
//       return
//     }

//     setIsLoading(true)
//     try {
//       const response = await axios.post("https://resortease-2.onrender.com/api/reset-password", {
//         tempToken,
//         newPassword,
//       })

//       setMessage(response.data.message)
//       if (response.data.success) {
//         // Reset the flow and go back to login
//         setStep(1)
//         setShowForgotPassword(false)
//         setPin("")
//         setNewPassword("")
//         setConfirmPassword("")
//         setTempToken("")
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Error resetting password")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         {!showForgotPassword ? (
//           <>
//             <div className="login-header">
//               <h2>Welcome Back</h2>
//               <p className="login-subtitle">Please enter your credentials to continue</p>
//             </div>

//             {message && (
//               <div className={`message ${message.includes("successful") ? "success" : "error"}`}>{message}</div>
//             )}

//             <form onSubmit={handleLogin} className="login-form">
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <div className="input-container">
//                   <input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                     placeholder="Enter your email"
//                   />
//                   <span className="input-icon">✉️</span>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <div className="input-container">
//                   <input
//                     id="password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     placeholder="Enter your password"
//                   />
//                   <span className="input-icon">🔒</span>
//                 </div>
//               </div>

//               <div className="forgot-password">
//                 <button type="button" onClick={() => setShowForgotPassword(true)} className="forgot-password-btn">
//                   Forgot password?
//                 </button>
//               </div>

//               <button type="submit" className={`login-button ${isLoading ? "loading" : ""}`} disabled={isLoading}>
//                 {isLoading ? <span className="loading-spinner"></span> : "Sign In"}
//               </button>
//             </form>

//             <div className="login-footer">
//               <p>
//                 Don't have an account?{" "}
//                 <Link to="/register" className="register-link">
//                   Create Account
//                 </Link>
//               </p>
//             </div>
//           </>
//         ) : (
//           <div className="reset-password-wrapper">
//             <div className="reset-password-header">
//               <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="reset-logo"
//               >
//                 <div className="reset-logo-icon">
//                   <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                     <path
//                       d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </div>
//                 <h2>Reset Password</h2>
//               </motion.div>

//               <motion.div
//                 className="progress-tracker"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               >
//                 <div className={`progress-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
//                   <div className="step-circle">
//                     {step > 1 ? (
//                       <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                           d="M20 6L9 17L4 12"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     ) : (
//                       <span>1</span>
//                     )}
//                   </div>
//                   <span className="step-label">Email</span>
//                 </div>
//                 <div className={`progress-line ${step > 1 ? "completed" : ""}`}></div>
//                 <div className={`progress-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
//                   <div className="step-circle">
//                     {step > 2 ? (
//                       <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                           d="M20 6L9 17L4 12"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     ) : (
//                       <span>2</span>
//                     )}
//                   </div>
//                   <span className="step-label">Verify</span>
//                 </div>
//                 <div className={`progress-line ${step > 2 ? "completed" : ""}`}></div>
//                 <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
//                   <div className="step-circle">
//                     <span>3</span>
//                   </div>
//                   <span className="step-label">Reset</span>
//                 </div>
//               </motion.div>
//             </div>

//             {message && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className={`reset-message ${message.includes("success") ? "success" : "error"}`}
//               >
//                 <div className="message-icon">
//                   {message.includes("success") ? (
//                     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path
//                         d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M22 4L12 14.01L9 11.01"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   ) : (
//                     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path
//                         d="M12 9V13M12 17H12.01M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   )}
//                 </div>
//                 <p>{message}</p>
//               </motion.div>
//             )}

//             <AnimatePresence mode="wait">
//               {step === 1 && (
//                 <motion.div
//                   key="step1"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.4 }}
//                   className="reset-form-container"
//                 >
//                   <div className="reset-form-content">
//                     <div className="reset-form-icon">
//                       <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                           d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M22 6L12 13L2 6"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </div>
//                     <h3>Verify Your Email</h3>
//                     <p>Enter your email address and we'll send you a verification code to reset your password.</p>

//                     <div className="reset-form-group">
//                       <label htmlFor="reset-email">Email Address</label>
//                       <div className="reset-input-container">
//                         <input
//                           id="reset-email"
//                           type="email"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           placeholder="Enter your email"
//                           className="reset-input"
//                         />
//                         <div className="input-icon">
//                           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path
//                               d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                             <path
//                               d="M22 6L12 13L2 6"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="reset-form-actions">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleForgotPassword}
//                       className={`reset-primary-button ${isLoading ? "loading" : ""}`}
//                       disabled={isLoading || !email}
//                     >
//                       {isLoading ? (
//                         <>
//                           <span className="loading-spinner"></span>
//                           <span>Sending...</span>
//                         </>
//                       ) : (
//                         <>
//                           <span>Send Verification Code</span>
//                           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path
//                               d="M5 12H19M19 12L12 5M19 12L12 19"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                         </>
//                       )}
//                     </motion.button>

//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setShowForgotPassword(false)
//                         setStep(1)
//                         setMessage("")
//                       }}
//                       className="reset-secondary-button"
//                     >
//                       <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                           d="M19 12H5M5 12L12 19M5 12L12 5"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <span>Back to Login</span>
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               )}

//               {step === 2 && (
//                 <motion.div
//                   key="step2"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.4 }}
//                   className="reset-form-container"
//                 >
//                   <div className="reset-form-content">
//                     <div className="reset-form-icon">
//                       <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                           d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M9 11C9 11 9.5 10 11.5 10C13.5 10 15 11 15 11"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M15 7C16.1046 7 17 6.10457 17 5C17 3.89543 16.1046 3 15 3C13.8954 3 13 3.89543 13 5C13 6.10457 13.8954 7 15 7Z"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M9 15H15"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </div>
//                     <h3>Enter Verification Code</h3>
//                     <p>
//                       We've sent a 6-digit verification code to <strong>{email}</strong>. Enter the code below to
//                       continue.
//                     </p>

//                     <div className="reset-form-group">
//                       <label htmlFor="verification-code">6-Digit Verification Code</label>
//                       <div className="verification-code-container">
//                         {[0, 1, 2, 3, 4, 5].map((index) => (
//                           <motion.div
//                             key={index}
//                             className={`code-input ${index < pin.length ? "filled" : ""}`}
//                             initial={{ scale: 0.9, opacity: 0 }}
//                             animate={{ scale: 1, opacity: 1 }}
//                             transition={{ duration: 0.3, delay: index * 0.05 }}
//                           >
//                             {pin[index] || ""}
//                           </motion.div>
//                         ))}
//                         <input
//                           id="verification-code"
//                           type="text"
//                           value={pin}
//                           onChange={(e) => {
//                             const value = e.target.value.replace(/[^0-9]/g, "")
//                             if (value.length <= 6) setPin(value)
//                           }}
//                           maxLength={6}
//                           className="verification-code-input"
//                           placeholder="Enter code"
//                           autoComplete="one-time-code"
//                         />
//                       </div>
//                     </div>

//                     <div className="resend-code">
//                       <p>Didn't receive the code?</p>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={handleForgotPassword}
//                         className="resend-button"
//                         disabled={isLoading}
//                       >
//                         Resend Code
//                       </motion.button>
//                     </div>
//                   </div>

//                   <div className="reset-form-actions">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={verifyPin}
//                       className={`reset-primary-button ${isLoading ? "loading" : ""}`}
//                       disabled={isLoading || pin.length !== 6}
//                     >
//                       {isLoading ? (
//                         <>
//                           <span className="loading-spinner"></span>
//                           <span>Verifying...</span>
//                         </>
//                       ) : (
//                         <>
//                           <span>Verify Code</span>
//                           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path
//                               d="M5 12H19M19 12L12 5M19 12L12 19"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                         </>
//                       )}
//                     </motion.button>

//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setStep(1)
//                         setPin("")
//                       }}
//                       className="reset-secondary-button"
//                     >
//                       <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                           d="M19 12H5M5 12L12 19M5 12L12 5"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <span>Back</span>
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               )}

//               {step === 3 && (
//                 <motion.div
//                   key="step3"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.4 }}
//                   className="reset-form-container"
//                 >
//                   <div className="reset-form-content">
//                     <div className="reset-form-icon">
//                       <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                           d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </div>
//                     <h3>Create New Password</h3>
//                     <p>Your identity has been verified. Set a new password for your account.</p>

//                     <div className="reset-form-group">
//                       <label htmlFor="new-password">New Password</label>
//                       <div className="reset-input-container">
//                         <input
//                           id="new-password"
//                           type="password"
//                           value={newPassword}
//                           onChange={(e) => setNewPassword(e.target.value)}
//                           placeholder="Enter new password"
//                           className="reset-input"
//                         />
//                         <div className="input-icon">
//                           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path
//                               d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                         </div>
//                       </div>

//                       <div className="password-strength-meter">
//                         <div className="strength-label">
//                           <span>Password Strength:</span>
//                           <span
//                             className={`strength-text ${
//                               newPassword.length === 0
//                                 ? ""
//                                 : newPassword.length < 6
//                                   ? "weak"
//                                   : newPassword.length < 8
//                                     ? "medium"
//                                     : /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)
//                                       ? "strong"
//                                       : "medium"
//                             }`}
//                           >
//                             {newPassword.length === 0
//                               ? "None"
//                               : newPassword.length < 6
//                                 ? "Weak"
//                                 : newPassword.length < 8
//                                   ? "Medium"
//                                   : /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)
//                                     ? "Strong"
//                                     : "Medium"}
//                           </span>
//                         </div>
//                         <div className="strength-bars">
//                           <motion.div
//                             className={`strength-bar ${newPassword.length > 0 ? "weak" : ""}`}
//                             initial={{ width: 0 }}
//                             animate={{ width: newPassword.length > 0 ? "100%" : 0 }}
//                             transition={{ duration: 0.3 }}
//                           ></motion.div>
//                           <motion.div
//                             className={`strength-bar ${newPassword.length >= 6 ? "medium" : ""}`}
//                             initial={{ width: 0 }}
//                             animate={{ width: newPassword.length >= 6 ? "100%" : 0 }}
//                             transition={{ duration: 0.3, delay: 0.1 }}
//                           ></motion.div>
//                           <motion.div
//                             className={`strength-bar ${newPassword.length >= 8 && /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) ? "strong" : ""}`}
//                             initial={{ width: 0 }}
//                             animate={{
//                               width:
//                                 newPassword.length >= 8 && /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)
//                                   ? "100%"
//                                   : 0,
//                             }}
//                             transition={{ duration: 0.3, delay: 0.2 }}
//                           ></motion.div>
//                         </div>
//                       </div>

//                       <div className="password-requirements">
//                         <div className={`requirement ${newPassword.length >= 8 ? "met" : ""}`}>
//                           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path
//                               d="M5 13L9 17L19 7"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                           <span>At least 8 characters</span>
//                         </div>
//                         <div className={`requirement ${/[A-Z]/.test(newPassword) ? "met" : ""}`}>
//                           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path
//                               d="M5 13L9 17L19 7"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                           <span>At least one uppercase letter</span>
//                         </div>
//                         <div className={`requirement ${/[0-9]/.test(newPassword) ? "met" : ""}`}>
//                           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path
//                               d="M5 13L9 17L19 7"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                           <span>At least one number</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="reset-form-group">
//                       <label htmlFor="confirm-password">Confirm Password</label>
//                       <div className="reset-input-container">
//                         <input
//                           id="confirm-password"
//                           type="password"
//                           value={confirmPassword}
//                           onChange={(e) => setConfirmPassword(e.target.value)}
//                           placeholder="Confirm new password"
//                           className="reset-input"
//                         />
//                         <div className="input-icon">
//                           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path
//                               d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                       {confirmPassword && newPassword !== confirmPassword && (
//                         <motion.p
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           className="password-mismatch"
//                         >
//                           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path
//                               d="M12 9V13M12 17H12.01M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                           Passwords do not match
//                         </motion.p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="reset-form-actions">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={resetPassword}
//                       className={`reset-primary-button ${isLoading ? "loading" : ""}`}
//                       disabled={
//                         isLoading ||
//                         !newPassword ||
//                         !confirmPassword ||
//                         newPassword !== confirmPassword ||
//                         newPassword.length < 8 ||
//                         !/[A-Z]/.test(newPassword) ||
//                         !/[0-9]/.test(newPassword)
//                       }
//                     >
//                       {isLoading ? (
//                         <>
//                           <span className="loading-spinner"></span>
//                           <span>Resetting...</span>
//                         </>
//                       ) : (
//                         <>
//                           <span>Reset Password</span>
//                           <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path
//                               d="M5 13L9 17L19 7"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             />
//                           </svg>
//                         </>
//                       )}
//                     </motion.button>

//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setStep(2)
//                         setNewPassword("")
//                         setConfirmPassword("")
//                       }}
//                       className="reset-secondary-button"
//                     >
//                       <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                           d="M19 12H5M5 12L12 19M5 12L12 5"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <span>Back</span>
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Login


















"use client"

import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [pin, setPin] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [tempToken, setTempToken] = useState("")
  const [step, setStep] = useState(1) // 1: email, 2: pin, 3: new password
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [isValidGmail, setIsValidGmail] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address")
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post("https://resortease-2.onrender.com/api/login", {
        email,
        password,
      })

      const token = response.data.token
      localStorage.setItem("token", token)
      setMessage("Login successful")

      // Redirect to home page after successful login
      navigate("/")
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("Please enter your email first")
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post("https://resortease-2.onrender.com/api/forgot-password", {
        email,
      })

      setMessage(response.data.message)
      setStep(2) // Move to PIN verification step
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending reset PIN")
    } finally {
      setIsLoading(false)
    }
  }

  const verifyPin = async () => {
    if (!pin) {
      setMessage("Please enter the PIN")
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post("https://resortease-2.onrender.com/api/verify-reset-pin", {
        email,
        pin,
      })

      setMessage(response.data.message)
      setTempToken(response.data.tempToken)
      setStep(3) // Move to password reset step
    } catch (error) {
      setMessage(error.response?.data?.message || "Error verifying PIN")
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage("Please enter and confirm your new password")
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match")
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post("https://resortease-2.onrender.com/api/reset-password", {
        tempToken,
        newPassword,
      })

      setMessage(response.data.message)
      if (response.data.success) {
        // Reset the flow and go back to login
        setStep(1)
        setShowForgotPassword(false)
        setPin("")
        setNewPassword("")
        setConfirmPassword("")
        setTempToken("")
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {!showForgotPassword ? (
          <>
            <div className="login-header">
              <h2>Welcome Back</h2>
              <p className="login-subtitle">Please enter your credentials to continue</p>
            </div>

            {message && (
              <div className={`message ${message.includes("successful") ? "success" : "error"}`}>{message}</div>
            )}

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-container">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      const newEmail = e.target.value
                      setEmail(newEmail)
                      // Check if it's a valid Gmail address
                      // const isGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(newEmail)
                      const isGmail = /^[a-zA-Z0-9._%+-]+@(gmail\.com|kongu\.edu)$/.test(newEmail);

                      setIsValidGmail(isGmail)
                    }}
                    required
                    placeholder="Enter your email"
                  />
                  <span className="input-icon">✉️</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-container">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    disabled={!isValidGmail}
                  />
                  <span
                    className="input-icon"
                    style={{ cursor: isValidGmail ? "pointer" : "not-allowed" }}
                    onClick={() => isValidGmail && setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "🔒"}
                  </span>
                </div>
                {!isValidGmail && email && (
                  <div className="email-validation-message">
                    Please enter a valid Gmail address to continue
                  </div>
                )}
              </div>

              <div className="forgot-password">
                <button type="button" onClick={() => setShowForgotPassword(true)} className="forgot-password-btn">
                  Forgot password?
                </button>
              </div>

              <button type="submit" className={`login-button ${isLoading ? "loading" : ""}`} disabled={isLoading}>
                {isLoading ? <span className="loading-spinner"></span> : "Sign In"}
              </button>
            </form>

            <div className="login-footer">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="register-link">
                  Create Account
                </Link>
              </p>
            </div>
          </>
        ) : (
          <div className="reset-password-wrapper">
            <div className="reset-password-header">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="reset-logo"
              >
                <div className="reset-logo-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2>Reset Password</h2>
              </motion.div>

              <motion.div
                className="progress-tracker"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className={`progress-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}>
                  <div className="step-circle">
                    {step > 1 ? (
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <span>1</span>
                    )}
                  </div>
                  <span className="step-label">Email</span>
                </div>
                <div className={`progress-line ${step > 1 ? "completed" : ""}`}></div>
                <div className={`progress-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}>
                  <div className="step-circle">
                    {step > 2 ? (
                      <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <span>2</span>
                    )}
                  </div>
                  <span className="step-label">Verify</span>
                </div>
                <div className={`progress-line ${step > 2 ? "completed" : ""}`}></div>
                <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
                  <div className="step-circle">
                    <span>3</span>
                  </div>
                  <span className="step-label">Reset</span>
                </div>
              </motion.div>
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`reset-message ${message.includes("success") ? "success" : "error"}`}
              >
                <div className="message-icon">
                  {message.includes("success") ? (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 4L12 14.01L9 11.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 9V13M12 17H12.01M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <p>{message}</p>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="reset-form-container"
                >
                  <div className="reset-form-content">
                    <div className="reset-form-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 6L12 13L2 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3>Verify Your Email</h3>
                    <p>Enter your email address and we'll send you a verification code to reset your password.</p>

                    <div className="reset-form-group">
                      <label htmlFor="reset-email">Email Address</label>
                      <div className="reset-input-container">
                        <input
                          id="reset-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="reset-input"
                        />
                        <div className="input-icon">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 6L12 13L2 6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="reset-form-actions">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleForgotPassword}
                      className={`reset-primary-button ${isLoading ? "loading" : ""}`}
                      disabled={isLoading || !email}
                    >
                      {isLoading ? (
                        <>
                          <span className="loading-spinner"></span>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Verification Code</span>
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowForgotPassword(false)
                        setStep(1)
                        setMessage("")
                      }}
                      className="reset-secondary-button"
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19 12H5M5 12L12 19M5 12L12 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Back to Login</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="reset-form-container"
                >
                  <div className="reset-form-content">
                    <div className="reset-form-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 11C9 11 9.5 10 11.5 10C13.5 10 15 11 15 11"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 7C16.1046 7 17 6.10457 17 5C17 3.89543 16.1046 3 15 3C13.8954 3 13 3.89543 13 5C13 6.10457 13.8954 7 15 7Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 15H15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3>Enter Verification Code</h3>
                    <p>
                      We've sent a 6-digit verification code to <strong>{email}</strong>. Enter the code below to
                      continue.
                    </p>

                    <div className="reset-form-group">
                      <label htmlFor="verification-code">6-Digit Verification Code</label>
                      <div className="verification-code-container">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <motion.div
                            key={index}
                            className={`code-input ${index < pin.length ? "filled" : ""}`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            {pin[index] || ""}
                          </motion.div>
                        ))}
                        <input
                          id="verification-code"
                          type="text"
                          value={pin}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, "")
                            if (value.length <= 6) setPin(value)
                          }}
                          maxLength={6}
                          className="verification-code-input"
                          placeholder="Enter code"
                          autoComplete="one-time-code"
                        />
                      </div>
                    </div>

                    <div className="resend-code">
                      <p>Didn't receive the code?</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleForgotPassword}
                        className="resend-button"
                        disabled={isLoading}
                      >
                        Resend Code
                      </motion.button>
                    </div>
                  </div>

                  <div className="reset-form-actions">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={verifyPin}
                      className={`reset-primary-button ${isLoading ? "loading" : ""}`}
                      disabled={isLoading || pin.length !== 6}
                    >
                      {isLoading ? (
                        <>
                          <span className="loading-spinner"></span>
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify Code</span>
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setStep(1)
                        setPin("")
                      }}
                      className="reset-secondary-button"
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19 12H5M5 12L12 19M5 12L12 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Back</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="reset-form-container"
                >
                  <div className="reset-form-content">
                    <div className="reset-form-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3>Create New Password</h3>
                    <p>Your identity has been verified. Set a new password for your account.</p>

                    <div className="reset-form-group">
                      <label htmlFor="new-password">New Password</label>
                      <div className="reset-input-container">
                        <input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="reset-input"
                        />
                        <div className="input-icon">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="password-strength-meter">
                        <div className="strength-label">
                          <span>Password Strength:</span>
                          <span
                            className={`strength-text ${
                              newPassword.length === 0
                                ? ""
                                : newPassword.length < 6
                                  ? "weak"
                                  : newPassword.length < 8
                                    ? "medium"
                                    : /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)
                                      ? "strong"
                                      : "medium"
                            }`}
                          >
                            {newPassword.length === 0
                              ? "None"
                              : newPassword.length < 6
                                ? "Weak"
                                : newPassword.length < 8
                                  ? "Medium"
                                  : /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)
                                    ? "Strong"
                                    : "Medium"}
                          </span>
                        </div>
                        <div className="strength-bars">
                          <motion.div
                            className={`strength-bar ${newPassword.length > 0 ? "weak" : ""}`}
                            initial={{ width: 0 }}
                            animate={{ width: newPassword.length > 0 ? "100%" : 0 }}
                            transition={{ duration: 0.3 }}
                          ></motion.div>
                          <motion.div
                            className={`strength-bar ${newPassword.length >= 6 ? "medium" : ""}`}
                            initial={{ width: 0 }}
                            animate={{ width: newPassword.length >= 6 ? "100%" : 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          ></motion.div>
                          <motion.div
                            className={`strength-bar ${newPassword.length >= 8 && /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword) ? "strong" : ""}`}
                            initial={{ width: 0 }}
                            animate={{
                              width:
                                newPassword.length >= 8 && /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)
                                  ? "100%"
                                  : 0,
                            }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          ></motion.div>
                        </div>
                      </div>

                      <div className="password-requirements">
                        <div className={`requirement ${newPassword.length >= 8 ? "met" : ""}`}>
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M5 13L9 17L19 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>At least 8 characters</span>
                        </div>
                        <div className={`requirement ${/[A-Z]/.test(newPassword) ? "met" : ""}`}>
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M5 13L9 17L19 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>At least one uppercase letter</span>
                        </div>
                        <div className={`requirement ${/[0-9]/.test(newPassword) ? "met" : ""}`}>
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M5 13L9 17L19 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>At least one number</span>
                        </div>
                      </div>
                    </div>

                    <div className="reset-form-group">
                      <label htmlFor="confirm-password">Confirm Password</label>
                      <div className="reset-input-container">
                        <input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="reset-input"
                        />
                        <div className="input-icon">
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      {confirmPassword && newPassword !== confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="password-mismatch"
                        >
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 9V13M12 17H12.01M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Passwords do not match
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="reset-form-actions">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={resetPassword}
                      className={`reset-primary-button ${isLoading ? "loading" : ""}`}
                      disabled={
                        isLoading ||
                        !newPassword ||
                        !confirmPassword ||
                        newPassword !== confirmPassword ||
                        newPassword.length < 8 ||
                        !/[A-Z]/.test(newPassword) ||
                        !/[0-9]/.test(newPassword)
                      }
                    >
                      {isLoading ? (
                        <>
                          <span className="loading-spinner"></span>
                          <span>Resetting...</span>
                        </>
                      ) : (
                        <>
                          <span>Reset Password</span>
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M5 13L9 17L19 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setStep(2)
                        setNewPassword("")
                        setConfirmPassword("")
                      }}
                      className="reset-secondary-button"
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19 12H5M5 12L12 19M5 12L12 5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Back</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
