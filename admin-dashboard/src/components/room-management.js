"use client"

import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import { CalendarIcon, ArrowLeft, RefreshCw, FileSpreadsheet, FileIcon as FilePdf, ChevronLeft, ChevronRight, Info, Users } from 'lucide-react'
import * as XLSX from "xlsx"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import { motion, AnimatePresence } from "framer-motion"
import { format, parseISO, eachDayOfInterval, addMonths, subMonths } from "date-fns"
import "./room-management.css"

const RoomManagement = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("list")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedBooking, setSelectedBooking] = useState(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:5000/api/admin/bookings")

      // Filter only active bookings
      const activeBookings = response.data.bookings.filter((booking) => booking.status === "active")

      // Sort bookings by start date (newest first)
      activeBookings.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))

      setBookings(activeBookings)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching bookings:", error)
      setError("Failed to load booking data. Please check your connection.")
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return format(date, "MMM d, yyyy")
  }

  const exportToExcel = () => {
    // Prepare data for Excel export
    const excelData = bookings.map((booking) => ({
      "Room ID": booking.roomId,
      "Guest Name": booking.user.username,
      "Guest Email": booking.user.email,
      "Check-in Date": formatDate(booking.startDate),
      "Check-out Date": formatDate(booking.endDate),
      Adults: booking.adults,
      Children: booking.children,
      "Total Amount": `₹${booking.totalAmount.toFixed(2)}`,
    }))

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Create workbook
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Room Bookings")

    // Generate Excel file
    const today = new Date().toISOString().slice(0, 10)
    XLSX.writeFile(workbook, `Room_Bookings_Report_${today}.xlsx`)
  }

  const exportToPDF = () => {
    const doc = new jsPDF()

    // Add title
    doc.setFontSize(18)
    doc.text("Room Bookings Report", 14, 22)

    // Add date
    doc.setFontSize(11)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30)

    // Prepare table data
    const tableColumn = [
      "Room ID",
      "Guest Name",
      "Check-in Date",
      "Check-out Date",
      "Adults",
      "Children",
      "Total Amount",
    ]
    const tableRows = bookings.map((booking) => [
      booking.roomId,
      booking.user.username,
      formatDate(booking.startDate),
      formatDate(booking.endDate),
      booking.adults,
      booking.children,
      `₹${booking.totalAmount.toFixed(2)}`,
    ])

    // Add table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [66, 66, 66] },
    })

    // Save PDF
    const today = new Date().toISOString().slice(0, 10)
    doc.save(`Room_Bookings_Report_${today}.pdf`)
  }

  // Calendar data preparation
  const calendarBookings = useMemo(() => {
    const bookingsByDate = {}

    bookings.forEach((booking) => {
      const startDate = parseISO(booking.startDate)
      const endDate = parseISO(booking.endDate)

      // Get all days between start and end date
      const days = eachDayOfInterval({ start: startDate, end: endDate })

      days.forEach((day) => {
        const dateStr = format(day, "yyyy-MM-dd")
        if (!bookingsByDate[dateStr]) {
          bookingsByDate[dateStr] = []
        }
        bookingsByDate[dateStr].push(booking)
      })
    })

    return bookingsByDate
  }, [bookings])

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1))
  }

  const handleDayClick = (day) => {
    const dateStr = format(day, "yyyy-MM-dd")
    const dayBookings = calendarBookings[dateStr] || []

    if (dayBookings.length > 0) {
      setSelectedBooking(dayBookings[0])
    } else {
      setSelectedBooking(null)
    }
  }

  // Custom day rendering for the calendar
  const renderDay = (day) => {
    const dateStr = format(day, "yyyy-MM-dd")
    const dayBookings = calendarBookings[dateStr] || []

    return (
      <div className="admin-calendar-day-content">
        <div>{format(day, "d")}</div>
        {dayBookings.length > 0 && (
          <div className="admin-calendar-day-badge">
            <span className="admin-badge">{dayBookings.length}</span>
          </div>
        )}
      </div>
    )
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="admin-room-management">
      <div className="admin-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="admin-page-header"
        >
          <div className="admin-page-title">
            <button className="admin-back-button" onClick={() => window.history.back()}>
              <ArrowLeft className="admin-icon" />
            </button>
            <h1>Room Management</h1>
          </div>
          <div className="admin-page-actions">
            <button className="admin-action-button admin-refresh-button" onClick={fetchBookings} title="Refresh booking data">
              <RefreshCw className="admin-icon" />
              <span className="admin-button-text">Refresh</span>
            </button>
            <button className="admin-action-button admin-excel-button" onClick={exportToExcel} title="Export to Excel">
              <FileSpreadsheet className="admin-icon" />
              <span className="admin-button-text">Excel</span>
            </button>
            <button className="admin-action-button admin-pdf-button" onClick={exportToPDF} title="Export to PDF">
              <FilePdf className="admin-icon" />
              <span className="admin-button-text">PDF</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="admin-stats-cards">
            <div className="admin-stat-card admin-teal">
              <div className="admin-stat-content">
                <div>
                  <p className="admin-stat-label">Total Active Bookings</p>
                  <h3 className="admin-stat-value">{bookings.length}</h3>
                </div>
                <div className="admin-stat-icon-container">
                  <CalendarIcon className="admin-stat-icon" />
                </div>
              </div>
            </div>

            <div className="admin-stat-card admin-purple">
              <div className="admin-stat-content">
                <div>
                  <p className="admin-stat-label">Total Guests</p>
                  <h3 className="admin-stat-value">
                    {bookings.reduce((sum, booking) => sum + booking.adults + booking.children, 0)}
                  </h3>
                </div>
                <div className="admin-stat-icon-container">
                  <Users className="admin-stat-icon" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="admin-tabs-container"
        >
          <div className="admin-tabs-header">
            <button
              className={`admin-tab-button ${activeTab === "list" ? "admin-active" : ""}`}
              onClick={() => handleTabChange("list")}
            >
              List View
            </button>
            <button
              className={`admin-tab-button ${activeTab === "calendar" ? "admin-active" : ""}`}
              onClick={() => handleTabChange("calendar")}
            >
              Calendar View
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "list" && (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="admin-tab-content"
              >
                {error ? (
                  <div className="admin-error-message">
                    <div className="admin-error-content">
                      <Info className="admin-error-icon" />
                      <p>{error}</p>
                      <button className="admin-retry-button" onClick={fetchBookings}>
                        <RefreshCw className="admin-icon" />
                        Retry
                      </button>
                    </div>
                  </div>
                ) : loading ? (
                  <div className="admin-loading-container">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="admin-skeleton-card">
                        <div className="admin-skeleton-content">
                          <div className="admin-skeleton-row">
                            <div className="admin-skeleton admin-skeleton-title"></div>
                            <div className="admin-skeleton admin-skeleton-small"></div>
                          </div>
                          <div className="admin-skeleton-row">
                            <div className="admin-skeleton admin-skeleton-medium"></div>
                            <div className="admin-skeleton admin-skeleton-small"></div>
                          </div>
                          <div className="admin-skeleton-row">
                            <div className="admin-skeleton admin-skeleton-medium"></div>
                            <div className="admin-skeleton admin-skeleton-small"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="admin-bookings-list">
                    {bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <motion.div
                          key={booking.bookingId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ scale: 1.01 }}
                          className="admin-booking-card"
                        >
                          <div className="admin-booking-content">
                            <div className="admin-booking-header">
                              <div className="admin-booking-title">
                                <h3>Room {booking.roomId}</h3>
                                <span className="admin-status-badge">Active</span>
                              </div>
                              <div className="admin-booking-guest">
                                <p>{booking.user.username} • {booking.user.email}</p>
                              </div>
                            </div>
                            <div className="admin-booking-details">
                              <div className="admin-booking-amount">
                                <p className="admin-amount">₹{booking.totalAmount.toFixed(2)}</p>
                                <p className="admin-guests">
                                  {booking.adults} {booking.adults === 1 ? "Adult" : "Adults"}
                                  {booking.children > 0 &&
                                    ` • ${booking.children} ${booking.children === 1 ? "Child" : "Children"}`}
                                </p>
                              </div>
                            </div>
                            <div className="admin-booking-dates">
                              <div className="admin-date-item">
                                <CalendarIcon className="admin-date-icon" />
                                <span>
                                  Check-in: <span className="admin-date-value">{formatDate(booking.startDate)}</span>
                                </span>
                              </div>
                              <div className="admin-date-item">
                                <CalendarIcon className="admin-date-icon" />
                                <span>
                                  Check-out: <span className="admin-date-value">{formatDate(booking.endDate)}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="admin-empty-state">
                        <CalendarIcon className="admin-empty-icon" />
                        <h3>No active bookings</h3>
                        <p>There are currently no active room bookings.</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "calendar" && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="admin-tab-content"
              >
                <div className="admin-calendar-card">
                  <div className="admin-calendar-header">
                    <h2>Booking Calendar</h2>
                    <div className="admin-calendar-navigation">
                      <button className="admin-nav-button" onClick={handlePrevMonth}>
                        <ChevronLeft className="admin-icon" />
                      </button>
                      <div className="admin-current-month">{format(currentMonth, "MMMM yyyy")}</div>
                      <button className="admin-nav-button" onClick={handleNextMonth}>
                        <ChevronRight className="admin-icon" />
                      </button>
                    </div>
                    <p className="admin-calendar-description">
                      View all bookings in calendar format. Click on a day to see booking details.
                    </p>
                  </div>
                  <div className="admin-calendar-content">
                    <div className="admin-calendar-grid">
                      <div className="admin-calendar-container">
                        <div className="admin-calendar-weekdays">
                          <div>Sun</div>
                          <div>Mon</div>
                          <div>Tue</div>
                          <div>Wed</div>
                          <div>Thu</div>
                          <div>Fri</div>
                          <div>Sat</div>
                        </div>
                        <div className="admin-calendar-days">
                          {(() => {
                            const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
                            const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
                            const daysInMonth = lastDay.getDate()
                            const startOffset = firstDay.getDay()
                            
                            const days = []
                            
                            // Add empty cells for days before the first day of the month
                            for (let i = 0; i < startOffset; i++) {
                              days.push(<div key={`empty-${i}`} className="admin-calendar-day admin-empty"></div>)
                            }
                            
                            // Add days of the month
                            for (let day = 1; day <= daysInMonth; day++) {
                              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                              const dateStr = format(date, "yyyy-MM-dd")
                              const hasBookings = calendarBookings[dateStr] && calendarBookings[dateStr].length > 0
                              
                              days.push(
                                <div 
                                  key={day} 
                                  className={`admin-calendar-day ${hasBookings ? 'admin-has-bookings' : ''}`}
                                  onClick={() => handleDayClick(date)}
                                >
                                  {renderDay(date)}
                                </div>
                              )
                            }
                            
                            return days
                          })()}
                        </div>
                      </div>
                      <div className="admin-booking-details-panel">
                        <div className="admin-panel-header">
                          <h3>Booking Details</h3>
                        </div>
                        <div className="admin-panel-content">
                          {selectedBooking ? (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="admin-selected-booking"
                            >
                              <div className="admin-detail-item">
                                <p className="admin-detail-label">Room</p>
                                <p className="admin-detail-value">Room {selectedBooking.roomId}</p>
                              </div>
                              <div className="admin-detail-item">
                                <p className="admin-detail-label">Guest</p>
                                <p className="admin-detail-value">{selectedBooking.user.username}</p>
                                <p className="admin-detail-subvalue">{selectedBooking.user.email}</p>
                              </div>
                              <div className="admin-detail-item">
                                <p className="admin-detail-label">Stay Period</p>
                                <p className="admin-detail-value">
                                  {formatDate(selectedBooking.startDate)} - {formatDate(selectedBooking.endDate)}
                                </p>
                              </div>
                              <div className="admin-detail-item">
                                <p className="admin-detail-label">Guests</p>
                                <p className="admin-detail-value">
                                  {selectedBooking.adults} {selectedBooking.adults === 1 ? "Adult" : "Adults"}
                                  {selectedBooking.children > 0 &&
                                    ` • ${selectedBooking.children} ${selectedBooking.children === 1 ? "Child" : "Children"}`}
                                </p>
                              </div>
                              <div className="admin-detail-item">
                                <p className="admin-detail-label">Amount</p>
                                <p className="admin-detail-value admin-amount">₹{selectedBooking.totalAmount.toFixed(2)}</p>
                              </div>
                            </motion.div>
                          ) : (
                            <div className="admin-no-selection">
                              <Info className="admin-info-icon" />
                              <p>Select a day with bookings to view details</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default RoomManagement