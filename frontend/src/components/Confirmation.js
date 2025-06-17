"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { jsPDF } from "jspdf"
import { FileText, Home, Download, CheckCircle } from "lucide-react"
import "./Confirmation.css"

const Confirmation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  useEffect(() => {
    // Get booking data from location state
    if (location.state?.booking) {
      setBooking(location.state.booking)
    } else {
      // If no booking data, redirect to home
      navigate("/")
    }
  }, [location, navigate])

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Calculate nights between two dates
  const calculateNights = (startDate, endDate) => {
    return Math.round((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
  }

  const handleDownloadBookingDetails = () => {
    if (!booking) return

    setIsGeneratingPdf(true)

    setTimeout(() => {
      const doc = new jsPDF()

      // Document properties
      doc.setProperties({
        title: `Royal Castle Farm Stay - Booking Confirmation`,
        subject: "Booking Details",
        creator: "Royal Castle Farm Stay",
      })

      // Colors
      const primaryColor = "#4a6fa5" // Royal blue
      const secondaryColor = "#555555" // Dark gray
      const accentColor = "#d4af37" // Gold accent

      // Add watermark background
      doc.setFillColor(245, 245, 245)
      doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F")

      // Add decorative border
      doc.setDrawColor(212, 175, 55) // Gold
      doc.setLineWidth(0.5)
      doc.rect(10, 10, 190, 277) // Outer border

      // Header section with logo
      doc.setFillColor(255, 255, 255)
      doc.rect(15, 15, 180, 30, "F") // White header background

      // Resort name and address
      doc.setFont("helvetica", "bold")
      doc.setFontSize(16)
      doc.setTextColor(primaryColor)
      doc.text("ROYAL CASTLE FARM STAY", 105, 25, { align: "center" })

      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.setTextColor(secondaryColor)
      doc.text("SF.No.328/4, Andipalayam Road, EnneiKadai Karar, Odathurai, Erode, 638455", 105, 30, {
        align: "center",
      })
      doc.text("Phone: +91 98765 43210 | Email: info@royalcastlefarmstay.com", 105, 35, { align: "center" })

      // Booking confirmation title
      doc.setFontSize(20)
      doc.setTextColor(primaryColor)
      doc.text("BOOKING CONFIRMATION", 105, 55, { align: "center" })

      // Confirmation number
      doc.setFontSize(12)
      doc.setTextColor(accentColor)
      doc.text(`Confirmation #: ${booking._id.substring(0, 8).toUpperCase()}`, 105, 65, { align: "center" })

      // Date issued
      doc.setTextColor(secondaryColor)
      doc.text(`Date Issued: ${formatDate(booking.createdAt)}`, 105, 70, { align: "center" })

      // Horizontal divider
      doc.setDrawColor(212, 175, 55) // Gold
      doc.setLineWidth(0.3)
      doc.line(20, 80, 190, 80)

      doc.setFontSize(11)
      doc.setTextColor(secondaryColor)

      // Booking Details Section
      doc.setFontSize(14)
      doc.setTextColor(primaryColor)
      doc.text("BOOKING DETAILS", 15, 100)

      doc.setFontSize(11)
      doc.setTextColor(secondaryColor)

      const nights = calculateNights(booking.startDate, booking.endDate)
      const bookingDetails = [
        { label: "Room Type:", value: `Room ${booking.roomId}` },
        { label: "Check-in:", value: `${formatDate(booking.startDate)} at 2:00 PM` },
        { label: "Check-out:", value: `${formatDate(booking.endDate)} at 12:00 PM` },
        { label: "Duration:", value: `${nights} night${nights > 1 ? "s" : ""}` },
        {
          label: "Guests:",
          value: `${booking.adults} Adult${booking.adults > 1 ? "s" : ""}, ${booking.children} Child${booking.children !== 1 ? "ren" : ""}`,
        },
      ]

      // Booking details table
      let bookingY = 110
      bookingDetails.forEach((detail) => {
        doc.setFont("helvetica", "bold")
        doc.text(detail.label, 15, bookingY)
        doc.setFont("helvetica", "normal")
        doc.text(detail.value, 45, bookingY)
        bookingY += 7
      })

      // Payment Information Section
      doc.setFontSize(14)
      doc.setTextColor(primaryColor)
      doc.text("PAYMENT INFORMATION", 15, bookingY + 10)

      doc.setFontSize(11)

      // Payment table header
      doc.setFillColor(74, 111, 165) // Primary color
      doc.rect(15, bookingY + 15, 175, 8, "F")
      doc.setTextColor(255, 255, 255)
      doc.text("Description", 20, bookingY + 20)
      doc.text("Amount", 170, bookingY + 20, { align: "right" })

      // Payment rows
      doc.setFillColor(255, 255, 255)
      doc.setTextColor(secondaryColor)

      // Room charge
      doc.rect(15, bookingY + 23, 175, 8, "F")
      doc.text(`Room Charge (${nights} night${nights > 1 ? "s" : ""})`, 20, bookingY + 28)
      doc.text(`₹${booking.totalAmount}`, 170, bookingY + 28, { align: "right" })

      // Total row
      doc.setFillColor(245, 245, 245)
      doc.rect(15, bookingY + 31, 175, 10, "F")
      doc.setFont("helvetica", "bold")
      doc.text("Total Amount", 20, bookingY + 37)
      doc.text(`₹${booking.totalAmount}`, 170, bookingY + 37, { align: "right" })

      // Payment method
      doc.setFillColor(255, 255, 255)
      doc.rect(15, bookingY + 41, 175, 8, "F")
      doc.setFont("helvetica", "normal")
      doc.text("Payment Method", 20, bookingY + 46)
      doc.text(`${booking.paymentMethod === "upi" ? "UPI Payment" : "Credit/Debit Card"}`, 170, bookingY + 46, {
        align: "right",
      })

      // Hotel Policies Section
      doc.setFontSize(14)
      doc.setTextColor(primaryColor)
      doc.text("HOTEL POLICIES", 15, bookingY + 60)

      doc.setFontSize(10)
      doc.setTextColor(secondaryColor)

      const policies = [
        "• Check-in time: 2:00 PM | Check-out time: 12:00 PM",
        "• Early check-in/late check-out subject to availability",
        "• Cancellation: Free cancellation up to 24 hours before check-in",
        "• No-show policy: Full stay will be charged",
        "• Pets: Not allowed",
        "• Smoking: Non-smoking property",
        "• ID proof required at check-in",
      ]

      let policyY = bookingY + 70
      policies.forEach((policy) => {
        doc.text(policy, 20, policyY)
        policyY += 6
      })

      // Footer
      doc.setFontSize(10)
      doc.setTextColor(secondaryColor)
      doc.text("Thank you for choosing Royal Castle Farm Stay. We look forward to welcoming you!", 105, 270, {
        align: "center",
      })

      // Confidential notice
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text("This document is confidential and intended solely for the addressee", 105, 275, { align: "center" })
      doc.text("© " + new Date().getFullYear() + " Royal Castle Farm Stay. All rights reserved.", 105, 280, {
        align: "center",
      })

      // Save the PDF
      doc.save(`RoyalCastle_Booking_${booking._id.substring(0, 8)}.pdf`)

      setIsGeneratingPdf(false)
    }, 100)
  }

  if (!booking) {
    return <div className="loading-container">Loading...</div>
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <div className="success-icon">
            <CheckCircle size={40} />
          </div>
          <h1>Booking Confirmed!</h1>
          <p>Thank you for choosing Royal Castle Farm Stay. We look forward to welcoming you.</p>
        </div>

        <div className="booking-summary">
          <h2>Booking Summary</h2>

          <div className="summary-item">
            <span className="summary-label">Confirmation #:</span>
            <span className="summary-value">{booking._id.substring(0, 8).toUpperCase()}</span>
          </div>

          <div className="summary-item">
            <span className="summary-label">Room:</span>
            <span className="summary-value">Room {booking.roomId}</span>
          </div>

          <div className="summary-item">
            <span className="summary-label">Check-in:</span>
            <span className="summary-value">{formatDate(booking.startDate)}</span>
          </div>

          <div className="summary-item">
            <span className="summary-label">Check-out:</span>
            <span className="summary-value">{formatDate(booking.endDate)}</span>
          </div>

          <div className="summary-item">
            <span className="summary-label">Guests:</span>
            <span className="summary-value">
              {booking.adults} Adult{booking.adults > 1 ? "s" : ""}, {booking.children} Child
              {booking.children !== 1 ? "ren" : ""}
            </span>
          </div>

          <div className="summary-item">
            <span className="summary-label">Total Amount:</span>
            <span className="summary-value highlight">₹{booking.totalAmount}</span>
          </div>

          <div className="summary-item">
            <span className="summary-label">Payment Method:</span>
            <span className="summary-value">
              {booking.paymentMethod === "upi" ? "UPI Payment" : "Credit/Debit Card"}
            </span>
          </div>
        </div>

        <div className="confirmation-actions">
          <button className="download-btn" onClick={handleDownloadBookingDetails} disabled={isGeneratingPdf}>
            <Download size={18} />
            {isGeneratingPdf ? "Generating PDF..." : "Download Booking Details"}
          </button>

          <Link to="/">
            <button className="home-btn">
              <Home size={18} />
              Return to Home
            </button>
          </Link>
        </div>
      </div>

      {/* PDF Generation Loading Overlay */}
      {isGeneratingPdf && (
        <div className="pdf-overlay">
          <div className="pdf-container">
            <div className="pdf-icon">
              <FileText size={48} />
            </div>
            <h3>Generating Your Booking PDF</h3>
            <p>Royal Castle Farm Stay - Booking #{booking._id.substring(0, 8)}</p>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Confirmation
