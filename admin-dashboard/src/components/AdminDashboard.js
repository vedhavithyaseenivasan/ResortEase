"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import "./AdminDashboard.css"

// Icons as SVG components
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="search-icon"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const RoomIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const ChartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
)

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
)

const CancelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
)

const DollarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon"
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
)

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="action-icon"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
)

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="amenity-icon"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="close-icon"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("bookings") // "bookings" or "rooms"
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [roomBookings, setRoomBookings] = useState([])
  const [roomBookingSearch, setRoomBookingSearch] = useState("") // New state for room booking search
  const [roomBookingStatusFilter, setRoomBookingStatusFilter] = useState("all") // New state for room booking status filter
  const [selectedBooking, setSelectedBooking] = useState(null)
  const navigate = useNavigate()

  // Room data
  const rooms = [
    {
      id: 1,
      name: "Couple Room AC",
      price: "₹ 2,594",
      description: "(110 sq.ft (10 sq.mt) | Double Bed)",
      image:
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-13432-81a16730e32711eda8160a58a9feac02.jpg?downsize=*:500&crop=990:500",
      details:
        "This deluxe room offers a stunning sea view, king-sized bed, and a private balcony. Perfect for couples or solo travelers looking for luxury.",
      amenities: ["Air Conditioning", "Free Wi-Fi", "TV", "Private Bathroom", "Sea View"],
    },
    {
      id: 2,
      name: "4 Member Room AC",
      price: "₹ 3,890",
      description: "(160 sq.ft (15 sq.mt) | Double Bed)",
      image:
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981494-900f2aa4e0bc11ed99480a58a9feac02.jpg?downsize=*:500&crop=990:500",
      details:
        "This standard room comes with a queen-sized bed, garden view, and basic amenities. Ideal for budget travelers.",
      amenities: ["Air Conditioning", "Free Wi-Fi", "TV", "Private Bathroom", "Garden View"],
    },
    {
      id: 3,
      name: "6 Members Room AC",
      price: "₹ 6,508",
      description: "(220 sq.ft (20 sq.mt) | King Bed)",
      image:
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981484-024d20a4e32811eda8160a58a9feac02.jpg?downsize=*:500&crop=990:500",
      details:
        "This family suite includes two bedrooms, a living area, and a kitchenette. Perfect for families or groups of friends.",
      amenities: ["Air Conditioning", "Free Wi-Fi", "TV", "Private Bathroom", "Kitchenette", "Living Area"],
    },
    {
      id: 4,
      name: "Hut NON AC",
      price: "₹ 17,862",
      description: "(680 sq.ft (63 sq.mt) | Queen Bed)",
      image:
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-3712-7c6d8866e03911ed95310a58a9feac02.jpg?downsize=*:500&crop=990:500",
      details:
        "The executive suite features a large bedroom, private balcony, and premium amenities. Ideal for business travelers or those seeking luxury.",
      amenities: ["Natural Ventilation", "Free Wi-Fi", "Private Bathroom", "Private Balcony", "Premium Amenities"],
    },
    {
      id: 5,
      name: "Private Villa",
      price: "₹ 24,184",
      description: "(2600 sq.ft (242 sq.mt) | Futon)",
      image:
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-15182-f2e76d04dff311ed8a570a58a9feac02.jpg?downsize=*:500&crop=990:500",
      details:
        "This private villa is perfect for those who seek comfort, space, and luxury. Comes with a pool and a private garden.",
      amenities: ["Air Conditioning", "Free Wi-Fi", "Private Pool", "Private Garden", "Luxury Amenities", "Kitchen"],
    },
    {
      id: 6,
      name: "Indoor Theatre Hall AC",
      price: "₹ 26,893",
      description: "(900 sq.ft (84 sq.mt) | King Bed)",
      image:
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981440-f095a7fae03411edbaad0a58a9feac02.jpg?downsize=*:500&crop=990:500",
      details: "A luxurious indoor theatre hall with a massive screen, premium sound system, and elegant seating.",
      amenities: ["Air Conditioning", "Premium Sound System", "Massive Screen", "Elegant Seating", "Luxury Amenities"],
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)",
      transition: { duration: 0.2 },
    },
  }

  const tableVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3, ease: "easeOut" },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("adminToken")
        if (!token) {
          navigate("/admin/login")
          return
        }

        const response = await axios.get("http://localhost:5000/api/admin/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        })

        setBookings(response.data.bookings || [])
      } catch (err) {
        setError("Failed to fetch bookings. Please try again.")
        console.error("Error fetching bookings:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [navigate])

  // Filter bookings based on search query and status filter
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      String(booking.bookingId).toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(booking.roomId).toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(booking.status).toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Filter room bookings based on search and status
  const filteredRoomBookings = roomBookings.filter((booking) => {
    const matchesSearch =
      String(booking.bookingId).toLowerCase().includes(roomBookingSearch.toLowerCase()) ||
      booking.user.username.toLowerCase().includes(roomBookingSearch.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(roomBookingSearch.toLowerCase()) ||
      String(booking.status).toLowerCase().includes(roomBookingSearch.toLowerCase())

    const matchesStatus =
      roomBookingStatusFilter === "all" || booking.status.toLowerCase() === roomBookingStatusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Calculate stats for the dashboard
  const totalBookings = bookings.length
  const activeBookings = bookings.filter((b) => b.status.toLowerCase() === "active").length
  const canceledBookings = bookings.filter((b) => b.status.toLowerCase() === "canceled").length
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0)

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    const statusLower = status.toLowerCase()
    if (statusLower === "active") return "status-badge status-active"
    if (statusLower === "canceled") return "status-badge status-canceled"
    return "status-badge status-pending"
  }

  // Handle room selection
  const handleRoomSelect = (room) => {
    setSelectedRoom(room)

    // Filter bookings for this room
    const roomSpecificBookings = bookings.filter((booking) => String(booking.roomId) === String(room.id))

    setRoomBookings(roomSpecificBookings)
    // Reset room booking filters when selecting a new room
    setRoomBookingSearch("")
    setRoomBookingStatusFilter("all")
  }

  // Close room details modal
  const closeRoomDetails = () => {
    setSelectedRoom(null)
    setRoomBookings([])
    setRoomBookingSearch("")
    setRoomBookingStatusFilter("all")
  }

  const handleViewBookingDetails = (booking) => {
    setSelectedBooking(booking)
  }

  const closeBookingDetails = () => {
    setSelectedBooking(null)
  }

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-skeleton skeleton-header"></div>
          <div className="loading-stats">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="loading-skeleton skeleton-card"></div>
            ))}
          </div>
          <div className="loading-skeleton skeleton-controls"></div>
          <div className="loading-skeleton skeleton-table"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <CancelIcon />
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div className="admin-dashboard" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className="dashboard-header" variants={itemVariants}>
        <h1>Admin Dashboard</h1>
      </motion.div>

      {/* Stats Cards */}
      <motion.div className="dashboard-stats" variants={itemVariants}>
        <motion.div className="stat-card stat-card-blue" variants={cardVariants} whileHover="hover">
          <div className="stat-card-header">
            <ChartIcon />
            <h3>Total Bookings</h3>
          </div>
          <p className="stat-value">{totalBookings}</p>
        </motion.div>

        <motion.div className="stat-card stat-card-green" variants={cardVariants} whileHover="hover">
          <div className="stat-card-header">
            <UsersIcon />
            <h3>Active Bookings</h3>
          </div>
          <p className="stat-value">{activeBookings}</p>
        </motion.div>

        <motion.div className="stat-card stat-card-red" variants={cardVariants} whileHover="hover">
          <div className="stat-card-header">
            <CancelIcon />
            <h3>Canceled Bookings</h3>
          </div>
          <p className="stat-value">{canceledBookings}</p>
        </motion.div>

        <motion.div className="stat-card stat-card-purple" variants={cardVariants} whileHover="hover">
          <div className="stat-card-header">
            <DollarIcon />
            <h3>Total Revenue</h3>
          </div>
          <p className="stat-value">{formatCurrency(totalRevenue)}</p>
        </motion.div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div className="tab-navigation" variants={itemVariants}>
        <button
          className={`tab-button ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          <CalendarIcon />
          Bookings
        </button>
        <button className={`tab-button ${activeTab === "rooms" ? "active" : ""}`} onClick={() => setActiveTab("rooms")}>
          <RoomIcon />
          Rooms
        </button>
      </motion.div>

      {/* Bookings Tab Content */}
      {activeTab === "bookings" && (
        <>
          {/* Controls */}
          <motion.div className="controls" variants={itemVariants}>
            <div className="search-bar">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="status-filter">
              <button
                className={`filter-button ${statusFilter === "all" ? "active" : ""}`}
                onClick={() => setStatusFilter("all")}
              >
                All
              </button>
              <button
                className={`filter-button ${statusFilter === "active" ? "active" : ""}`}
                onClick={() => setStatusFilter("active")}
              >
                Active
              </button>
              <button
                className={`filter-button ${statusFilter === "canceled" ? "active" : ""}`}
                onClick={() => setStatusFilter("canceled")}
              >
                Canceled
              </button>
            </div>
          </motion.div>

          {/* Bookings Table */}
          <AnimatePresence mode="wait">
            {filteredBookings.length > 0 ? (
              <motion.div
                key="table"
                className="table-container"
                variants={tableVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <table>
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Room</th>
                      <th>Dates</th>
                      <th>Guests</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Customer</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredBookings.map((booking, index) => (
                        <motion.tr
                          key={booking.bookingId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="table-row"
                        >
                          <td className="booking-id">#{booking.bookingId}</td>
                          <td>
                            <div className="cell-with-icon">
                              <RoomIcon />
                              <span>Room #{booking.roomId}</span>
                            </div>
                          </td>
                          <td>
                            <div className="cell-with-icon">
                              <CalendarIcon />
                              <div className="date-range">
                                <div>{new Date(booking.startDate).toLocaleDateString()}</div>
                                <div>{new Date(booking.endDate).toLocaleDateString()}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {booking.adults} Adults
                            {booking.children > 0 && `, ${booking.children} Children`}
                          </td>
                          <td className="amount">{formatCurrency(booking.totalAmount)}</td>
                          <td>
                            <span className={getStatusBadgeClass(booking.status)}>{booking.status}</span>
                          </td>
                          <td>
                            <div className="cell-with-icon">
                              <UserIcon />
                              <div className="user-info">
                                <div className="username">{booking.user.username}</div>
                                <div className="email">{booking.user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-button view-more-button"
                                title="View Details"
                                onClick={() => handleViewBookingDetails(booking)}
                              >
                                <EyeIcon />
                                <span className="view-more-text">View Details</span>
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="empty-state"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
              >
                <RoomIcon />
                <h3>No bookings found</h3>
                <p>No bookings match your current search criteria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Rooms Tab Content */}
      {activeTab === "rooms" && (
        <motion.div className="rooms-container" variants={itemVariants} initial="hidden" animate="visible">
          <div className="rooms-grid">
            {rooms.map((room) => (
              <motion.div
                key={room.id}
                className="room-card"
                variants={cardVariants}
                whileHover="hover"
                onClick={() => handleRoomSelect(room)}
              >
                <div className="room-image-container">
                  <img src={room.image || "/placeholder.svg"} alt={room.name} className="room-image" />
                  <div className="room-price">
                    {room.price}
                    <span className="per-night">per night</span>
                  </div>
                </div>
                <div className="room-content">
                  <h3 className="room-name">{room.name}</h3>
                  <p className="room-description">{room.description}</p>
                  <div className="room-amenities-preview">
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="amenity-badge">
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="amenity-badge amenity-more">+{room.amenities.length - 3} more</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Room Details Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="room-details-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button className="close-modal-button" onClick={closeRoomDetails}>
                <CloseIcon />
              </button>

              <div className="room-details-header">
                <div className="room-details-image-container">
                  <img
                    src={selectedRoom.image || "/placeholder.svg"}
                    alt={selectedRoom.name}
                    className="room-details-image"
                  />
                </div>
                <div className="room-details-info">
                  <h2 className="room-details-name">{selectedRoom.name}</h2>
                  <p className="room-details-description">{selectedRoom.description}</p>
                  <div className="room-details-price">
                    {selectedRoom.price}
                    <span className="per-night"> per night</span>
                  </div>
                </div>
              </div>

              <div className="room-details-content">
                <div className="room-details-section">
                  <h3 className="section-title">Room Details</h3>
                  <p className="room-details-text">{selectedRoom.details}</p>
                </div>

                <div className="room-details-section">
                  <h3 className="section-title">Amenities</h3>
                  <div className="amenities-grid">
                    {selectedRoom.amenities.map((amenity, index) => (
                      <div key={index} className="amenity-item">
                        <CheckIcon />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="room-details-section">
                  <h3 className="section-title">Bookings for this Room</h3>

                  {/* Room Booking Search and Filter Controls */}
                  <div className="room-booking-controls">
                    <div className="room-booking-search">
                      <SearchIcon />
                      <input
                        type="text"
                        placeholder="Search bookings for this room..."
                        value={roomBookingSearch}
                        onChange={(e) => setRoomBookingSearch(e.target.value)}
                      />
                    </div>
                    <div className="room-booking-status-filter">
                      <button
                        className={`filter-button ${roomBookingStatusFilter === "all" ? "active" : ""}`}
                        onClick={() => setRoomBookingStatusFilter("all")}
                      >
                        All
                      </button>
                      <button
                        className={`filter-button ${roomBookingStatusFilter === "active" ? "active" : ""}`}
                        onClick={() => setRoomBookingStatusFilter("active")}
                      >
                        Active
                      </button>
                      <button
                        className={`filter-button ${roomBookingStatusFilter === "canceled" ? "active" : ""}`}
                        onClick={() => setRoomBookingStatusFilter("canceled")}
                      >
                        Canceled
                      </button>
                    </div>
                  </div>

                  {filteredRoomBookings.length > 0 ? (
                    <div className="room-bookings-table-container">
                      <table className="room-bookings-table">
                        <thead>
                          <tr>
                            <th>Booking ID</th>
                            <th>Dates</th>
                            <th>Guests</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Customer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRoomBookings.map((booking) => (
                            <tr key={booking.bookingId} className="table-row">
                              <td className="booking-id">#{booking.bookingId}</td>
                              <td>
                                <div className="date-range">
                                  <div>{new Date(booking.startDate).toLocaleDateString()}</div>
                                  <div>{new Date(booking.endDate).toLocaleDateString()}</div>
                                </div>
                              </td>
                              <td>
                                {booking.adults} Adults
                                {booking.children > 0 && `, ${booking.children} Children`}
                              </td>
                              <td className="amount">{formatCurrency(booking.totalAmount)}</td>
                              <td>
                                <span className={getStatusBadgeClass(booking.status)}>{booking.status}</span>
                              </td>
                              <td>
                                <div className="user-info">
                                  <div className="username">{booking.user.username}</div>
                                  <div className="email">{booking.user.email}</div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="empty-bookings-message">
                      <p>
                        No bookings found for this room
                        {roomBookingSearch || roomBookingStatusFilter !== "all" ? " matching your search criteria" : ""}
                        .
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="booking-details-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button className="close-modal-button" onClick={closeBookingDetails}>
                <CloseIcon />
              </button>

              <div className="booking-details-header">
                <h2 className="booking-details-title">Booking Details</h2>
                <span className={getStatusBadgeClass(selectedBooking.status)}>{selectedBooking.status}</span>
              </div>

              <div className="booking-details-content">
                <div className="booking-details-section">
                  <h3 className="section-title">Booking Information</h3>
                  <div className="booking-info-grid">
                    <div className="booking-info-item">
                      <span className="info-label">Booking ID</span>
                      <span className="info-value">#{selectedBooking.bookingId}</span>
                    </div>
                    <div className="booking-info-item">
                      <span className="info-label">Room</span>
                      <span className="info-value">Room #{selectedBooking.roomId}</span>
                    </div>
                    <div className="booking-info-item">
                      <span className="info-label">Check-in</span>
                      <span className="info-value">{new Date(selectedBooking.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="booking-info-item">
                      <span className="info-label">Check-out</span>
                      <span className="info-value">{new Date(selectedBooking.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="booking-info-item">
                      <span className="info-label">Duration</span>
                      <span className="info-value">
                        {Math.ceil(
                          (new Date(selectedBooking.endDate) - new Date(selectedBooking.startDate)) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days
                      </span>
                    </div>
                    <div className="booking-info-item">
                      <span className="info-label">Total Amount</span>
                      <span className="info-value amount">{formatCurrency(selectedBooking.totalAmount)}</span>
                    </div>
                  </div>
                </div>

                <div className="booking-details-section">
                  <h3 className="section-title">Guest Information</h3>
                  <div className="booking-info-grid">
                    <div className="booking-info-item">
                      <span className="info-label">Guest Name</span>
                      <span className="info-value">{selectedBooking.user.username}</span>
                    </div>
                    <div className="booking-info-item">
                      <span className="info-label">Email</span>
                      <span className="info-value">{selectedBooking.user.email}</span>
                    </div>
                    <div className="booking-info-item">
                      <span className="info-label">Adults</span>
                      <span className="info-value">{selectedBooking.adults}</span>
                    </div>
                    <div className="booking-info-item">
                      <span className="info-label">Children</span>
                      <span className="info-value">{selectedBooking.children || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="booking-details-section">
                  <h3 className="section-title">Room Details</h3>
                  {rooms.find((room) => String(room.id) === String(selectedBooking.roomId)) ? (
                    <div className="room-details-preview">
                      {(() => {
                        const room = rooms.find((room) => String(room.id) === String(selectedBooking.roomId))
                        return (
                          <>
                            <div className="room-preview-image-container">
                              <img
                                src={room.image || "/placeholder.svg"}
                                alt={room.name}
                                className="room-preview-image"
                              />
                            </div>
                            <div className="room-preview-info">
                              <h4 className="room-preview-name">{room.name}</h4>
                              <p className="room-preview-description">{room.description}</p>
                              <p className="room-preview-price">
                                {room.price}
                                <span className="per-night"> per night</span>
                              </p>
                              <div className="room-preview-amenities">
                                {room.amenities.map((amenity, index) => (
                                  <span key={index} className="amenity-badge">
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  ) : (
                    <p className="no-room-details">Room details not available</p>
                  )}
                </div>

                <div className="booking-details-actions">
                  <button className="booking-action-button primary-action" onClick={closeBookingDetails}>
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default AdminDashboard
