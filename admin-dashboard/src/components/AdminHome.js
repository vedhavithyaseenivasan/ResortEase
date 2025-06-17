// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import { motion } from "framer-motion"
// import "./AdminHome.css"
// import { Bell, BookOpen, Calendar, Check, HelpCircle, RefreshCw, User, Users, X, Clock, ArrowUp, ArrowDown, Settings, Search, MessageSquare, FileText, CreditCard, ShieldCheck, Send } from 'lucide-react'
// // import RoomManagement from "./room-management"

// // AdminHome Component
// const AdminHome = () => {
//   const [bookings, setBookings] = useState(null)
//   const [rooms, setRooms] = useState(null)
//   const [users, setUsers] = useState(null)
//   const [loginActivity, setLoginActivity] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [notifications, setNotifications] = useState([])
//   const [unreadNotifications, setUnreadNotifications] = useState(0)
//   const [showNotifications, setShowNotifications] = useState(false)
//   const [messages, setMessages] = useState([])
//   const [selectedMessage, setSelectedMessage] = useState(null)
//   const [replyText, setReplyText] = useState("")
//   const [showMessages, setShowMessages] = useState(false)
//   const [unreadMessages, setUnreadMessages] = useState(0)
//   const [messageLoading, setMessageLoading] = useState(false)
//   const [replySending, setReplySending] = useState(false)
//   // const [showRoomManagement, setShowRoomManagement] = useState(false)
//   const navigate = useNavigate()

//   const currentHour = new Date().getHours()
//   let greeting = "Good morning"
//   if (currentHour >= 12 && currentHour < 17) {
//     greeting = "Good afternoon"
//   } else if (currentHour >= 17) {
//     greeting = "Good evening"
//   }

//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/admin/notifications")
//       setNotifications(response.data.notifications)
//       setUnreadNotifications(response.data.notifications.filter((n) => !n.read).length)
//     } catch (error) {
//       console.error("Error fetching notifications:", error)
//     }
//   }

//   const fetchMessages = async () => {
//     try {
//       setMessageLoading(true)
//       const response = await axios.get("http://localhost:5000/api/admin/messages")
//       setMessages(response.data.messages)
//       setUnreadMessages(response.data.messages.filter((m) => !m.isRead).length)
//       setMessageLoading(false)
//     } catch (error) {
//       console.error("Error fetching messages:", error)
//       setMessageLoading(false)
//     }
//   }

//   const markNotificationAsRead = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/admin/notifications/${id}/read`)
//       setNotifications(notifications.map((n) => (n._id === id ? { ...n, read: true } : n)))
//       setUnreadNotifications((prev) => Math.max(0, prev - 1))
//     } catch (error) {
//       console.error("Error marking notification as read:", error)
//     }
//   }

//   const markAllNotificationsAsRead = async () => {
//     try {
//       await axios.put("http://localhost:5000/api/admin/notifications/read-all")
//       setNotifications(notifications.map((n) => ({ ...n, read: true })))
//       setUnreadNotifications(0)
//     } catch (error) {
//       console.error("Error marking all notifications as read:", error)
//     }
//   }

//   const markMessageAsRead = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/admin/messages/${id}/read`)
//       setMessages(messages.map((m) => (m._id === id ? { ...m, isRead: true } : m)))
//       setUnreadMessages((prev) => Math.max(0, prev - 1))
//     } catch (error) {
//       console.error("Error marking message as read:", error)
//     }
//   }

//   const handleSelectMessage = (message) => {
//     setSelectedMessage(message)
//     if (!message.isRead) {
//       markMessageAsRead(message._id)
//     }
//   }

//   const handleReplySubmit = async () => {
//     if (!replyText.trim() || !selectedMessage) return

//     try {
//       setReplySending(true)
//       await axios.post(`http://localhost:5000/api/admin/messages/${selectedMessage._id}/reply`, {
//         replyMessage: replyText,
//       })

//       // Update the message in the state with the new reply
//       const updatedMessages = messages.map((m) => {
//         if (m._id === selectedMessage._id) {
//           return {
//             ...m,
//             replies: [...m.replies, { message: replyText, timestamp: new Date() }],
//           }
//         }
//         return m
//       })

//       setMessages(updatedMessages)
//       setSelectedMessage({
//         ...selectedMessage,
//         replies: [...selectedMessage.replies, { message: replyText, timestamp: new Date() }],
//       })
//       setReplyText("")
//       setReplySending(false)
//     } catch (error) {
//       console.error("Error sending reply:", error)
//       setReplySending(false)
//     }
//   }

//   const handleRoomManagement = () => {
//     navigate("/admin/room-management")
//   }

//   useEffect(() => {
//     const ws = new WebSocket("ws://localhost:5000")

//     ws.onopen = () => {
//       console.log("WebSocket connected")
//     }

//     ws.onmessage = (event) => {
//       const notification = JSON.parse(event.data)
//       setNotifications((prev) => [notification, ...prev])
//       setUnreadNotifications((prev) => prev + 1)
//     }

//     ws.onclose = () => {
//       console.log("WebSocket disconnected")
//     }

//     return () => {
//       ws.close()
//     }
//   }, [])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)

//         const usersResponse = await axios.get("http://localhost:5000/api/admin/users")
//         const userData = usersResponse.data.users

//         const bookingsResponse = await axios.get("http://localhost:5000/api/admin/bookings")
//         const bookingData = bookingsResponse.data.bookings

//         const loginData = {
//           today: 15,
//           yesterday: 12,
//           trend: { percentage: 25, isUp: true },
//         }

//         const roomData = {
//           total: 24,
//           available: 8,
//           occupied: 16,
//           trend: { percentage: 8.3, isUp: true },
//         }

//         setUsers({
//           total: userData.length,
//           active: Math.floor(userData.length * 0.8),
//           inactive: Math.floor(userData.length * 0.2),
//           trend: { percentage: 15.7, isUp: true },
//         })

//         setBookings({
//           total: bookingData.length,
//           pending: bookingData.filter((b) => b.status === "pending").length || 3,
//           confirmed: bookingData.filter((b) => b.status === "active").length || bookingData.length - 3,
//           trend: { percentage: 12.5, isUp: true },
//         })

//         setRooms(roomData)
//         setLoginActivity(loginData)
//         setLoading(false)
//       } catch (err) {
//         console.error("Error fetching data:", err)
//         setError("Failed to load dashboard data. Please check your connection.")
//         setLoading(false)
//       }
//     }

//     fetchData()
//     fetchNotifications()
//     fetchMessages()
//   }, [])

//   // Set up a polling mechanism to check for new messages every 30 seconds
//   useEffect(() => {
//     const messageInterval = setInterval(() => {
//       fetchMessages()
//     }, 30000)

//     return () => clearInterval(messageInterval)
//   }, [])

//   const getTimeAgo = (date) => {
//     const now = new Date()
//     const diffInSeconds = Math.floor((now - new Date(date)) / 1000)

//     if (diffInSeconds < 60) {
//       return "Just now"
//     }

//     const diffInMinutes = Math.floor(diffInSeconds / 60)
//     if (diffInMinutes < 60) {
//       return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
//     }

//     const diffInHours = Math.floor(diffInMinutes / 60)
//     if (diffInHours < 24) {
//       return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
//     }

//     const diffInDays = Math.floor(diffInHours / 24)
//     return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
//   }

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications)
//     if (showMessages) setShowMessages(false)
//   }

//   const toggleMessages = () => {
//     setShowMessages(!showMessages)
//     if (showNotifications) setShowNotifications(false)
//   }

//   const NotificationCenter = () => {
//     if (!notifications || notifications.length === 0) {
//       return (
//         <div className="admin-notification-empty">
//           <Bell className="admin-notification-empty-icon" />
//           <p>No notifications</p>
//         </div>
//       )
//     }

//     const getIcon = (type) => {
//       switch (type) {
//         case "booking":
//           return <Check className="admin-notification-icon-svg" />
//         case "cancellation":
//           return <X className="admin-notification-icon-svg" />
//         case "user":
//           return <User className="admin-notification-icon-svg" />
//         case "system":
//           return <Bell className="admin-notification-icon-svg" />
//         default:
//           return <Bell className="admin-notification-icon-svg" />
//       }
//     }

//     const getColor = (type) => {
//       switch (type) {
//         case "booking":
//           return "admin-notification-success"
//         case "cancellation":
//           return "admin-notification-error"
//         case "user":
//           return "admin-notification-primary"
//         case "system":
//           return "admin-notification-warning"
//         default:
//           return "admin-notification-default"
//       }
//     }

//     return (
//       <div className="admin-notification-center">
//         <div className="admin-notification-header">
//           <h3>Notifications</h3>
//           <button className="admin-notification-action" onClick={markAllNotificationsAsRead}>
//             Mark all as read
//           </button>
//         </div>
//         <div className="admin-notification-list">
//           {notifications.map((notification) => (
//             <div
//               key={notification._id}
//               className={`admin-notification-item ${notification.read ? "" : "admin-notification-unread"}`}
//               onClick={() => !notification.read && markNotificationAsRead(notification._id)}
//             >
//               <div className={`admin-notification-icon ${getColor(notification.type)}`}>
//                 {getIcon(notification.type)}
//               </div>
//               <div className="admin-notification-content">
//                 <div className="admin-notification-title-row">
//                   <h4 className="admin-notification-title">{notification.title}</h4>
//                   {!notification.read && <span className="admin-notification-badge"></span>}
//                 </div>
//                 <p className="admin-notification-message">{notification.message}</p>
//                 <p className="admin-notification-time">{new Date(notification.time).toLocaleString()}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   const MessageCenter = () => {
//     if (messageLoading) {
//       return (
//         <div className="admin-message-loading">
//           <RefreshCw className="admin-loading-icon" />
//           <p>Loading messages...</p>
//         </div>
//       )
//     }

//     if (!messages || messages.length === 0) {
//       return (
//         <div className="admin-message-empty">
//           <MessageSquare className="admin-message-empty-icon" />
//           <p>No messages</p>
//         </div>
//       )
//     }

//     return (
//       <div className="admin-message-center">
//         <div className="admin-message-header">
//           <h3>Customer Messages</h3>
//         </div>
//         <div className="admin-message-container">
//           <div className="admin-message-list">
//             {messages.map((message) => (
//               <div
//                 key={message._id}
//                 className={`admin-message-item ${message.isRead ? "" : "admin-message-unread"} ${selectedMessage && selectedMessage._id === message._id ? "admin-message-selected" : ""}`}
//                 onClick={() => handleSelectMessage(message)}
//               >
//                 <div className="admin-message-item-header">
//                   <h4 className="admin-message-sender">{message.name}</h4>
//                   {!message.isRead && <span className="admin-message-badge"></span>}
//                 </div>
//                 <p className="admin-message-subject">{message.subject || "No Subject"}</p>
//                 <p className="admin-message-preview">{message.message.substring(0, 60)}...</p>
//                 <p className="admin-message-time">{getTimeAgo(message.createdAt)}</p>
//               </div>
//             ))}
//           </div>

//           <div className="admin-message-detail">
//             {selectedMessage ? (
//               <>
//                 <div className="admin-message-detail-header">
//                   <h3>{selectedMessage.subject || "No Subject"}</h3>
//                   <p className="admin-message-detail-meta">
//                     From: <strong>{selectedMessage.name}</strong> ({selectedMessage.email})
//                     {selectedMessage.phone && <span> • Phone: {selectedMessage.phone}</span>}
//                   </p>
//                   <p className="admin-message-detail-time">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
//                 </div>
//                 <div className="admin-message-detail-content">
//                   <p>{selectedMessage.message}</p>
//                 </div>

//                 {selectedMessage.replies && selectedMessage.replies.length > 0 && (
//                   <div className="admin-message-replies">
//                     <h4>Replies</h4>
//                     {selectedMessage.replies.map((reply, index) => (
//                       <div key={index} className="admin-message-reply">
//                         <p className="admin-reply-content">{reply.message}</p>
//                         <p className="admin-reply-time">{new Date(reply.timestamp).toLocaleString()}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <div className="admin-message-reply-form">
//                   <textarea
//                     placeholder="Type your reply here..."
//                     value={replyText}
//                     onChange={(e) => setReplyText(e.target.value)}
//                     disabled={replySending}
//                   ></textarea>
//                   <button
//                     className="admin-reply-button"
//                     onClick={handleReplySubmit}
//                     disabled={!replyText.trim() || replySending}
//                   >
//                     {replySending ? "Sending..." : "Send Reply"}
//                     <Send className="admin-reply-icon" size={16} />
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="admin-no-message-selected">
//                 <MessageSquare className="admin-no-message-icon" />
//                 <p>Select a message to view details</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const StatCard = ({ icon: Icon, title, value, subtitle, trend, color }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className={`admin-stat-card admin-stat-${color}`}
//     >
//       <div className="admin-stat-card-header">
//         <div className={`admin-stat-icon admin-icon-${color}`}>
//           <Icon className="admin-stat-icon-svg" />
//         </div>
//         {trend && (
//           <div className={`admin-trend ${trend.isUp ? "admin-trend-up" : "admin-trend-down"}`}>
//             {trend.isUp ? <ArrowUp className="admin-trend-icon" /> : <ArrowDown className="admin-trend-icon" />}
//             {Math.abs(trend.percentage).toFixed(1)}%
//           </div>
//         )}
//       </div>
//       <div className="admin-stat-card-content">
//         <div className="admin-stat-value">{value || "-"}</div>
//         <div className="admin-stat-title">{title}</div>
//       </div>
//       {subtitle && (
//         <div className="admin-stat-card-footer">
//           <p className="admin-stat-subtitle">{subtitle}</p>
//         </div>
//       )}
//     </motion.div>
//   )

//   const QuickAccessCard = ({ icon: Icon, title, description, color, onClick }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className={`admin-quick-access-card admin-quick-${color}`}
//       onClick={onClick}
//     >
//       <div className={`admin-quick-icon admin-icon-${color}`}>
//         <Icon className="admin-quick-icon-svg" />
//       </div>
//       <h3 className="admin-quick-title">{title}</h3>
//       <p className="admin-quick-description">{description}</p>
//     </motion.div>
//   )

//   return (
//     <div className="admin-container">
//       <header className="admin-header">
//         <div className="admin-header-left">
//           <h1 className="admin-greeting">{greeting}, Admin</h1>
//           <p className="admin-subtitle">Royal Castle Resort Dashboard</p>
//         </div>
//         <div className="admin-header-actions">
//           <div className="admin-search-box">
//             <Search className="admin-search-icon" />
//             <input type="text" placeholder="Search..." className="admin-search-input" />
//           </div>
//           <div className="admin-notification-dropdown">
//             <button className="admin-icon-button admin-notification-button" onClick={toggleNotifications}>
//               <Bell className="admin-icon-button-svg" />
//               {unreadNotifications > 0 && <span className="admin-notification-count">{unreadNotifications}</span>}
//             </button>
//             {showNotifications && (
//               <div className="admin-notification-dropdown-content">
//                 <NotificationCenter />
//               </div>
//             )}
//           </div>
//           <div className="admin-message-dropdown">
//             <button className="admin-icon-button admin-message-button" onClick={toggleMessages}>
//               <MessageSquare className="admin-icon-button-svg" />
//               {unreadMessages > 0 && <span className="admin-notification-count">{unreadMessages}</span>}
//             </button>
//             {showMessages && (
//               <div className="admin-message-dropdown-content">
//                 <MessageCenter />
//               </div>
//             )}
//           </div>
//           <button className="admin-icon-button">
//             <HelpCircle className="admin-icon-button-svg" />
//           </button>
//           <div className="admin-user-dropdown">
//             <button className="admin-avatar-button">
//               <div className="admin-avatar">
//                 <span>AD</span>
//               </div>
//             </button>
//           </div>
//         </div>
//       </header>

//       {error ? (
//         <div className="admin-error-card">
//           <div className="admin-error-content">
//             <p className="admin-error-text">{error}</p>
//             <button onClick={() => window.location.reload()} className="admin-retry-button">
//               <RefreshCw className="admin-retry-button-icon" />
//               Retry
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="admin-stats-grid">
//             <StatCard
//               icon={BookOpen}
//               title="Total Bookings"
//               value={loading ? "Loading..." : bookings?.total}
//               subtitle={loading ? "" : `${bookings?.confirmed} confirmed, ${bookings?.pending} pending`}
//               trend={loading ? null : bookings?.trend}
//               color="primary"
//             />
//             <StatCard
//               icon={Calendar}
//               title="Rooms Status"
//               value={loading ? "Loading..." : rooms?.total}
//               subtitle={loading ? "" : `${rooms?.occupied} occupied, ${rooms?.available} available`}
//               trend={loading ? null : rooms?.trend}
//               color="success"
//             />
//             <StatCard
//               icon={Users}
//               title="User Count"
//               value={loading ? "Loading..." : users?.total}
//               subtitle={loading ? "" : `${users?.active} active, ${users?.inactive} inactive`}
//               trend={loading ? null : users?.trend}
//               color="info"
//             />
//             <StatCard
//               icon={Clock}
//               title="Login Activity"
//               value={loading ? "Loading..." : loginActivity?.today}
//               subtitle={loading ? "" : `${loginActivity?.yesterday} yesterday`}
//               trend={loading ? null : loginActivity?.trend}
//               color="warning"
//             />
//           </div>

//           <h2 className="admin-section-title">Quick Access</h2>
//           <div className="admin-quick-access-grid">
//             <QuickAccessCard
//               icon={BookOpen}
//               title="Manage Bookings"
//               description="View and manage all hotel bookings"
//               color="primary"
//             />
//             <QuickAccessCard
//               icon={Calendar}
//               title="Room Management"
//               description="Check room availability and status"
//               color="success"
//               onClick={handleRoomManagement}
//             />
//             <QuickAccessCard
//               icon={Users}
//               title="User Management"
//               description="Manage user accounts and permissions"
//               color="info"
//             />
//             <QuickAccessCard
//               icon={MessageSquare}
//               title="Messages"
//               description="View and respond to customer messages"
//               color="warning"
//               onClick={toggleMessages}
//             />
//             <QuickAccessCard
//               icon={FileText}
//               title="Reports"
//               description="Generate and view business reports"
//               color="primary"
//             />
//             <QuickAccessCard icon={Settings} title="Settings" description="Configure system settings" color="success" />
//             <QuickAccessCard
//               icon={CreditCard}
//               title="Payments"
//               description="Manage payments and invoices"
//               color="info"
//             />
//             <QuickAccessCard
//               icon={ShieldCheck}
//               title="Security"
//               description="Manage security and access control"
//               color="warning"
//             />
//           </div>
//         </>
//       )}

//       <div className="admin-footer">
//         <p>© 2024 Royal Castle Resort. All rights reserved.</p>
//       </div>
//     </div>
//   )
// }

// export default AdminHome











"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import "./AdminHome.css"
import {
  Bell,
  BookOpen,
  Calendar,
  Check,
  HelpCircle,
  RefreshCw,
  User,
  Users,
  X,
  Clock,
  ArrowUp,
  ArrowDown,
  Settings,
  Search,
  MessageSquare,
  FileText,
  CreditCard,
  ShieldCheck,
  Send,
} from "lucide-react"
// import RoomManagement from "./room-management"

// AdminHome Component
const AdminHome = () => {
  const [bookings, setBookings] = useState(null)
  const [rooms, setRooms] = useState(null)
  const [users, setUsers] = useState(null)
  const [loginActivity, setLoginActivity] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [replyText, setReplyText] = useState("")
  const [showMessages, setShowMessages] = useState(false)
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [messageLoading, setMessageLoading] = useState(false)
  const [replySending, setReplySending] = useState(false)
  // const [showRoomManagement, setShowRoomManagement] = useState(false)
  const navigate = useNavigate()

  const currentHour = new Date().getHours()
  let greeting = "Good morning"
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon"
  } else if (currentHour >= 17) {
    greeting = "Good evening"
  }

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/notifications")
      if (response.data.success) {
        setNotifications(response.data.notifications)
        setUnreadNotifications(response.data.notifications.filter((n) => !n.read).length)
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
    }
  }

  const fetchMessages = async () => {
    try {
      setMessageLoading(true)
      const response = await axios.get("http://localhost:5000/api/admin/messages")
      setMessages(response.data.messages)
      setUnreadMessages(response.data.messages.filter((m) => !m.isRead).length)
      setMessageLoading(false)
    } catch (error) {
      console.error("Error fetching messages:", error)
      setMessageLoading(false)
    }
  }

  const markNotificationAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/notifications/${id}/read`)
      setNotifications(notifications.map((n) => (n._id === id ? { ...n, read: true } : n)))
      setUnreadNotifications((prev) => Math.max(0, prev - 1))
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const markAllNotificationsAsRead = async () => {
    try {
      await axios.put("http://localhost:5000/api/admin/notifications/read-all")
      setNotifications(notifications.map((n) => ({ ...n, read: true })))
      setUnreadNotifications(0)
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  const markMessageAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/messages/${id}/read`)
      setMessages(messages.map((m) => (m._id === id ? { ...m, isRead: true } : m)))
      setUnreadMessages((prev) => Math.max(0, prev - 1))
    } catch (error) {
      console.error("Error marking message as read:", error)
    }
  }

  const handleSelectMessage = (message) => {
    setSelectedMessage(message)
    if (!message.isRead) {
      markMessageAsRead(message._id)
    }
  }

  const handleReplySubmit = async () => {
    if (!replyText.trim() || !selectedMessage) return

    try {
      setReplySending(true)
      await axios.post(`http://localhost:5000/api/admin/messages/${selectedMessage._id}/reply`, {
        replyMessage: replyText,
      })

      // Update the message in the state with the new reply
      const updatedMessages = messages.map((m) => {
        if (m._id === selectedMessage._id) {
          return {
            ...m,
            replies: [...m.replies, { message: replyText, timestamp: new Date() }],
          }
        }
        return m
      })

      setMessages(updatedMessages)
      setSelectedMessage({
        ...selectedMessage,
        replies: [...selectedMessage.replies, { message: replyText, timestamp: new Date() }],
      })
      setReplyText("")
      setReplySending(false)
    } catch (error) {
      console.error("Error sending reply:", error)
      setReplySending(false)
    }
  }

  const handleRoomManagement = () => {
    navigate("/admin/room-management")
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000")

    ws.onopen = () => {
      console.log("WebSocket connected")
    }

    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data)
      setNotifications((prev) => [notification, ...prev])
      setUnreadNotifications((prev) => prev + 1)
    }

    ws.onclose = () => {
      console.log("WebSocket disconnected")
    }

    return () => {
      ws.close()
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const usersResponse = await axios.get("http://localhost:5000/api/admin/users")
        const userData = usersResponse.data.users

        const bookingsResponse = await axios.get("http://localhost:5000/api/admin/bookings")
        const bookingData = bookingsResponse.data.bookings

        const loginData = {
          today: 15,
          yesterday: 12,
          trend: { percentage: 25, isUp: true },
        }

        const roomData = {
          total: 24,
          available: 8,
          occupied: 16,
          trend: { percentage: 8.3, isUp: true },
        }

        setUsers({
          total: userData.length,
          active: Math.floor(userData.length * 0.8),
          inactive: Math.floor(userData.length * 0.2),
          trend: { percentage: 15.7, isUp: true },
        })

        setBookings({
          total: bookingData.length,
          pending: bookingData.filter((b) => b.status === "pending").length || 3,
          confirmed: bookingData.filter((b) => b.status === "active").length || bookingData.length - 3,
          trend: { percentage: 12.5, isUp: true },
        })

        setRooms(roomData)
        setLoginActivity(loginData)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load dashboard data. Please check your connection.")
        setLoading(false)
      }
    }

    fetchData()
    fetchNotifications()
    fetchMessages()
  }, [])

  // Set up a polling mechanism to check for new messages every 30 seconds
  useEffect(() => {
    const messageInterval = setInterval(() => {
      fetchMessages()
    }, 30000)

    return () => clearInterval(messageInterval)
  }, [])

  const getTimeAgo = (date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000)

    if (diffInSeconds < 60) {
      return "Just now"
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
    }

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    }

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    if (showMessages) setShowMessages(false)
  }

  const toggleMessages = () => {
    setShowMessages(!showMessages)
    if (showNotifications) setShowNotifications(false)
  }

  const NotificationCenter = () => {
    if (!notifications || notifications.length === 0) {
      return (
        <div className="admin-notification-empty">
          <Bell className="admin-notification-empty-icon" />
          <p>No notifications</p>
        </div>
      )
    }

    const getIcon = (type) => {
      switch (type) {
        case "booking":
          return <Check className="admin-notification-icon-svg" />
        case "cancellation":
          return <X className="admin-notification-icon-svg" />
        case "user":
          return <User className="admin-notification-icon-svg" />
        case "system":
          return <Bell className="admin-notification-icon-svg" />
        default:
          return <Bell className="admin-notification-icon-svg" />
      }
    }

    const getColor = (type) => {
      switch (type) {
        case "booking":
          return "admin-notification-success"
        case "cancellation":
          return "admin-notification-error"
        case "user":
          return "admin-notification-primary"
        case "system":
          return "admin-notification-warning"
        default:
          return "admin-notification-default"
      }
    }

    return (
      <div className="admin-notification-center">
        <div className="admin-notification-header">
          <h3>Notifications</h3>
          <button className="admin-notification-action" onClick={markAllNotificationsAsRead}>
            Mark all as read
          </button>
        </div>
        <div className="admin-notification-list">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`admin-notification-item ${notification.read ? "" : "admin-notification-unread"}`}
              onClick={() => !notification.read && markNotificationAsRead(notification._id)}
            >
              <div className={`admin-notification-icon ${getColor(notification.type)}`}>
                {getIcon(notification.type)}
              </div>
              <div className="admin-notification-content">
                <div className="admin-notification-title-row">
                  <h4 className="admin-notification-title">{notification.title}</h4>
                  {!notification.read && <span className="admin-notification-badge"></span>}
                </div>
                <p className="admin-notification-message">{notification.message}</p>
                <p className="admin-notification-time">{new Date(notification.time).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const MessageCenter = () => {
    if (messageLoading) {
      return (
        <div className="admin-message-loading">
          <RefreshCw className="admin-loading-icon" />
          <p>Loading messages...</p>
        </div>
      )
    }

    if (!messages || messages.length === 0) {
      return (
        <div className="admin-message-empty">
          <MessageSquare className="admin-message-empty-icon" />
          <p>No messages</p>
        </div>
      )
    }

    return (
      <div className="admin-message-center">
        <div className="admin-message-header">
          <h3>Customer Messages</h3>
        </div>
        <div className="admin-message-container">
          <div className="admin-message-list">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`admin-message-item ${message.isRead ? "" : "admin-message-unread"} ${selectedMessage && selectedMessage._id === message._id ? "admin-message-selected" : ""}`}
                onClick={() => handleSelectMessage(message)}
              >
                <div className="admin-message-item-header">
                  <h4 className="admin-message-sender">{message.name}</h4>
                  {!message.isRead && <span className="admin-message-badge"></span>}
                </div>
                <p className="admin-message-subject">{message.subject || "No Subject"}</p>
                <p className="admin-message-preview">{message.message.substring(0, 60)}...</p>
                <p className="admin-message-time">{getTimeAgo(message.createdAt)}</p>
              </div>
            ))}
          </div>

          <div className="admin-message-detail">
            {selectedMessage ? (
              <>
                <div className="admin-message-detail-header">
                  <h3>{selectedMessage.subject || "No Subject"}</h3>
                  <p className="admin-message-detail-meta">
                    From: <strong>{selectedMessage.name}</strong> ({selectedMessage.email})
                    {selectedMessage.phone && <span> • Phone: {selectedMessage.phone}</span>}
                  </p>
                  <p className="admin-message-detail-time">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                </div>
                <div className="admin-message-detail-content">
                  <p>{selectedMessage.message}</p>
                </div>

                {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                  <div className="admin-message-replies">
                    <h4>Replies</h4>
                    {selectedMessage.replies.map((reply, index) => (
                      <div key={index} className="admin-message-reply">
                        <p className="admin-reply-content">{reply.message}</p>
                        <p className="admin-reply-time">{new Date(reply.timestamp).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="admin-message-reply-form">
                  <textarea
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    disabled={replySending}
                  ></textarea>
                  <button
                    className="admin-reply-button"
                    onClick={handleReplySubmit}
                    disabled={!replyText.trim() || replySending}
                  >
                    {replySending ? "Sending..." : "Send Reply"}
                    <Send className="admin-reply-icon" size={16} />
                  </button>
                </div>
              </>
            ) : (
              <div className="admin-no-message-selected">
                <MessageSquare className="admin-no-message-icon" />
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`admin-stat-card admin-stat-${color}`}
    >
      <div className="admin-stat-card-header">
        <div className={`admin-stat-icon admin-icon-${color}`}>
          <Icon className="admin-stat-icon-svg" />
        </div>
        {trend && (
          <div className={`admin-trend ${trend.isUp ? "admin-trend-up" : "admin-trend-down"}`}>
            {trend.isUp ? <ArrowUp className="admin-trend-icon" /> : <ArrowDown className="admin-trend-icon" />}
            {Math.abs(trend.percentage).toFixed(1)}%
          </div>
        )}
      </div>
      <div className="admin-stat-card-content">
        <div className="admin-stat-value">{value || "-"}</div>
        <div className="admin-stat-title">{title}</div>
      </div>
      {subtitle && (
        <div className="admin-stat-card-footer">
          <p className="admin-stat-subtitle">{subtitle}</p>
        </div>
      )}
    </motion.div>
  )

  const QuickAccessCard = ({ icon: Icon, title, description, color, onClick }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`admin-quick-access-card admin-quick-${color}`}
      onClick={onClick}
    >
      <div className={`admin-quick-icon admin-icon-${color}`}>
        <Icon className="admin-quick-icon-svg" />
      </div>
      <h3 className="admin-quick-title">{title}</h3>
      <p className="admin-quick-description">{description}</p>
    </motion.div>
  )

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="admin-header-left">
          <h1 className="admin-greeting">{greeting}, Admin</h1>
          <p className="admin-subtitle">Royal Castle Resort Dashboard</p>
        </div>
        <div className="admin-header-actions">
          <div className="admin-search-box">
            <Search className="admin-search-icon" />
            <input type="text" placeholder="Search..." className="admin-search-input" />
          </div>
          <div className="admin-notification-dropdown">
            <button className="admin-icon-button admin-notification-button" onClick={toggleNotifications}>
              <Bell className="admin-icon-button-svg" />
              {unreadNotifications > 0 && <span className="admin-notification-count">{unreadNotifications}</span>}
            </button>
            {showNotifications && (
              <div className="admin-notification-dropdown-content">
                <NotificationCenter />
              </div>
            )}
          </div>
          <div className="admin-message-dropdown">
            <button className="admin-icon-button admin-message-button" onClick={toggleMessages}>
              <MessageSquare className="admin-icon-button-svg" />
              {unreadMessages > 0 && <span className="admin-notification-count">{unreadMessages}</span>}
            </button>
            {showMessages && (
              <div className="admin-message-dropdown-content">
                <MessageCenter />
              </div>
            )}
          </div>
          <button className="admin-icon-button">
            <HelpCircle className="admin-icon-button-svg" />
          </button>
          <div className="admin-user-dropdown">
            <button className="admin-avatar-button">
              <div className="admin-avatar">
                <span>AD</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {error ? (
        <div className="admin-error-card">
          <div className="admin-error-content">
            <p className="admin-error-text">{error}</p>
            <button onClick={() => window.location.reload()} className="admin-retry-button">
              <RefreshCw className="admin-retry-button-icon" />
              Retry
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="admin-stats-grid">
            <StatCard
              icon={BookOpen}
              title="Total Bookings"
              value={loading ? "Loading..." : bookings?.total}
              subtitle={loading ? "" : `${bookings?.confirmed} confirmed, ${bookings?.pending} pending`}
              trend={loading ? null : bookings?.trend}
              color="primary"
            />
            <StatCard
              icon={Calendar}
              title="Rooms Status"
              value={loading ? "Loading..." : rooms?.total}
              subtitle={loading ? "" : `${rooms?.occupied} occupied, ${rooms?.available} available`}
              trend={loading ? null : rooms?.trend}
              color="success"
            />
            <StatCard
              icon={Users}
              title="User Count"
              value={loading ? "Loading..." : users?.total}
              subtitle={loading ? "" : `${users?.active} active, ${users?.inactive} inactive`}
              trend={loading ? null : users?.trend}
              color="info"
            />
            <StatCard
              icon={Clock}
              title="Login Activity"
              value={loading ? "Loading..." : loginActivity?.today}
              subtitle={loading ? "" : `${loginActivity?.yesterday} yesterday`}
              trend={loading ? null : loginActivity?.trend}
              color="warning"
            />
          </div>

          <h2 className="admin-section-title">Quick Access</h2>
          <div className="admin-quick-access-grid">
            <QuickAccessCard
              icon={BookOpen}
              title="Manage Bookings"
              description="View and manage all hotel bookings"
              color="primary"
            />
            <QuickAccessCard
              icon={Calendar}
              title="Room Management"
              description="Check room availability and status"
              color="success"
              onClick={handleRoomManagement}
            />
            <QuickAccessCard
              icon={Users}
              title="User Management"
              description="Manage user accounts and permissions"
              color="info"
            />
            <QuickAccessCard
              icon={MessageSquare}
              title="Messages"
              description="View and respond to customer messages"
              color="warning"
              onClick={toggleMessages}
            />
            <QuickAccessCard
              icon={FileText}
              title="Reports"
              description="Generate and view business reports"
              color="primary"
            />
            <QuickAccessCard icon={Settings} title="Settings" description="Configure system settings" color="success" />
            <QuickAccessCard
              icon={CreditCard}
              title="Payments"
              description="Manage payments and invoices"
              color="info"
            />
            <QuickAccessCard
              icon={ShieldCheck}
              title="Security"
              description="Manage security and access control"
              color="warning"
            />
          </div>
        </>
      )}

      <div className="admin-footer">
        <p>© 2024 Royal Castle Resort. All rights reserved.</p>
      </div>
    </div>
  )
}

export default AdminHome
