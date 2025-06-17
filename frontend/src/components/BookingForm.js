// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import axios from "axios"
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
// import "./BookingForm.css"

// const BookingForm = () => {
//   const { roomId } = useParams()
//   const [startDate, setStartDate] = useState(null)
//   const [endDate, setEndDate] = useState(null)
//   const [bookedIntervals, setBookedIntervals] = useState([])
//   const [totalAmount, setTotalAmount] = useState(0)
//   const [isPayEnabled, setIsPayEnabled] = useState(false)
//   const [errorMessage, setErrorMessage] = useState("")
//   const [isCalculating, setIsCalculating] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const navigate = useNavigate()

//   const [adults, setAdults] = useState(1)
//   const [children, setChildren] = useState(0)

//   // Fetch ACTIVE bookings for the room
//   useEffect(() => {
//     const fetchBookedDates = async () => {
//       try {
//         const response = await axios.get(`https://resortease-2.onrender.com/api/bookings/${roomId}`)
//         const intervals = response.data.map((booking) => ({
//           start: new Date(booking.startDate),
//           end: new Date(booking.endDate),
//         }))
//         setBookedIntervals(intervals)
//       } catch (error) {
//         console.error("Error fetching booked dates:", error)
//         setErrorMessage("Could not fetch availability data. Please try again.")
//       }
//     }
//     fetchBookedDates()
//   }, [roomId])

//   // Calculate total amount with accurate room prices
//   const calculateAmount = () => {
//     if (!startDate || !endDate) {
//       setErrorMessage("Please select valid dates.")
//       return
//     }

//     setIsCalculating(true)

//     setTimeout(() => {
//       const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
//       if (nights <= 0) {
//         setErrorMessage("End date must be after start date.")
//         setIsCalculating(false)
//         return
//       }

//       // Room prices exactly matching the Room component
//       const roomPrices = {
//         1: 2594,  // Couple Room AC
//         2: 3890,  // 4 Member Room AC
//         3: 6508,  // 6 Members Room AC
//         4: 17862, // Hut NON AC
//         5: 24184, // Private Villa
//         6: 26893  // Indoor Theatre Hall AC
//       }

//       const pricePerNight = roomPrices[roomId] || 2594 // Default fallback

//       setTotalAmount(nights * pricePerNight)
//       setIsPayEnabled(true)
//       setErrorMessage("")
//       setIsCalculating(false)
//     }, 800)
//   }

//   // Handle Razorpay payment
//   const handlePayment = () => {
//     if (!window.Razorpay) {
//       setErrorMessage("Payment gateway not loaded. Please try again later.")
//       return
//     }

//     const options = {
//       key: "rzp_test_d7Htck0TGu6Rde",
//       amount: totalAmount * 100, // Amount in paise
//       currency: "INR",
//       name: "Hotel Booking",
//       description: "Complete Your Booking",
//       image: "/logo.png",
//       handler: (response) => {
//         if (response.razorpay_payment_id) {
//           handlePayNow(response.razorpay_payment_id)
//         }
//       },
//       prefill: {
//         name: "Customer Name",
//         email: "customer@example.com",
//         contact: "9360793223",
//       },
//       theme: {
//         color: "#4a6fa5",
//       },
//       modal: {
//         ondismiss: () => {
//           console.log("Payment modal closed")
//         },
//       },
//     }

//     try {
//       const rzp1 = new window.Razorpay(options)
//       rzp1.open()
//     } catch (error) {
//       console.error("Razorpay error:", error)
//       setErrorMessage("Payment gateway error. Please try again later.")
//     }
//   }

//   // Submit booking
//   const handlePayNow = async (paymentId = null) => {
//     const token = localStorage.getItem("token")
//     if (!token) {
//       navigate("/login", { state: { from: `/book/${roomId}` } })
//       return
//     }

//     setIsSubmitting(true)

//     try {
//       await axios.post(
//         "https://resortease-2.onrender.com/api/book",
//         {
//           roomId,
//           startDate: startDate.toISOString().split("T")[0],
//           endDate: endDate.toISOString().split("T")[0],
//           adults,
//           children,
//           totalAmount,
//           paymentId,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       )
//       navigate("/confirmation", { state: { roomId, totalAmount } })
//     } catch (error) {
//       console.error("Booking error:", error)
//       setErrorMessage(error.response?.data?.message || "An error occurred during booking. Please try again.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   // Handle increment/decrement for guests
//   const incrementAdults = () => setAdults(prev => prev + 1)
//   const decrementAdults = () => adults > 1 && setAdults(prev => prev - 1)
//   const incrementChildren = () => setChildren(prev => prev + 1)
//   const decrementChildren = () => children > 0 && setChildren(prev => prev - 1)

//   return (
//     <div className="booking-container">
//       <div className="booking-card">
//         <div className="booking-header">
//           <h2>Book Room {roomId}</h2>
//           <p className="booking-subtitle">Select your dates and details to book your stay</p>
//         </div>

//         {errorMessage && <div className="error-message">{errorMessage}</div>}

//         <div className="booking-content">
//           {/* Date Pickers */}
//           <div className="date-picker-container">
//             <div className="date-picker-group">
//               <label>Check-in Date:</label>
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 selectsStart
//                 startDate={startDate}
//                 endDate={endDate}
//                 excludeDateIntervals={bookedIntervals}
//                 minDate={new Date()}
//                 placeholderText="Select check-in date"
//                 className="date-input"
//                 required
//               />
//             </div>

//             <div className="date-picker-group">
//               <label>Check-out Date:</label>
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 selectsEnd
//                 startDate={startDate}
//                 endDate={endDate}
//                 minDate={startDate}
//                 excludeDateIntervals={bookedIntervals}
//                 placeholderText="Select check-out date"
//                 className="date-input"
//                 required
//                 disabled={!startDate}
//               />
//             </div>
//           </div>

//           {/* Guest Inputs */}
//           <div className="guest-inputs-container">
//             <div className="guest-input-group">
//               <label>Adults:</label>
//               <div className="number-input-container">
//                 <button
//                   type="button"
//                   className="number-btn"
//                   onClick={decrementAdults}
//                   disabled={adults <= 1}
//                   aria-label="Decrease adults"
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={adults}
//                   min="1"
//                   onChange={(e) => setAdults(Math.max(1, Number.parseInt(e.target.value) || 1))}
//                   className="number-input"
//                   required
//                   aria-label="Number of adults"
//                 />
//                 <button type="button" className="number-btn" onClick={incrementAdults} aria-label="Increase adults">
//                   +
//                 </button>
//               </div>
//             </div>

//             <div className="guest-input-group">
//               <label>Children:</label>
//               <div className="number-input-container">
//                 <button
//                   type="button"
//                   className="number-btn"
//                   onClick={decrementChildren}
//                   disabled={children <= 0}
//                   aria-label="Decrease children"
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={children}
//                   min="0"
//                   onChange={(e) => setChildren(Math.max(0, Number.parseInt(e.target.value) || 0))}
//                   className="number-input"
//                   required
//                   aria-label="Number of children"
//                 />
//                 <button type="button" className="number-btn" onClick={incrementChildren} aria-label="Increase children">
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Total Amount */}
//           <div className="total-amount-container">
//             <div className="total-amount-label">Total Amount:</div>
//             <div className="total-amount-value">₹{totalAmount.toLocaleString()}</div>
//           </div>
//         </div>

//         <div className="booking-footer">
//           <button
//             className={`calculate-btn ${isCalculating ? "loading" : ""}`}
//             onClick={calculateAmount}
//             disabled={!startDate || !endDate || isCalculating}
//           >
//             {isCalculating ? "Calculating..." : "Calculate Amount"}
//             {isCalculating && <span className="spinner"></span>}
//           </button>

//           <button
//             className={`pay-btn ${!isPayEnabled ? "disabled" : ""} ${isSubmitting ? "loading" : ""}`}
//             onClick={handlePayment}
//             disabled={!isPayEnabled || isSubmitting}
//           >
//             {isSubmitting ? "Processing..." : "Pay Now"}
//             {isSubmitting && <span className="spinner"></span>}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BookingForm


















"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./BookingForm.css"
import { QRCodeSVG } from "qrcode.react"

const BookingForm = () => {
  const { roomId } = useParams()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [bookedIntervals, setBookedIntervals] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [isPayEnabled, setIsPayEnabled] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isCalculating, setIsCalculating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showUpiModal, setShowUpiModal] = useState(false)
  const [upiPaymentConfirmed, setUpiPaymentConfirmed] = useState(false)

  // Fetch ACTIVE bookings for the room
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await axios.get(`https://resortease-2.onrender.com/api/bookings/${roomId}`)
        const intervals = response.data.map((booking) => ({
          start: new Date(booking.startDate),
          end: new Date(booking.endDate),
        }))
        setBookedIntervals(intervals)
      } catch (error) {
        console.error("Error fetching booked dates:", error)
        setErrorMessage("Could not fetch availability data. Please try again.")
      }
    }
    fetchBookedDates()
  }, [roomId])

  // Calculate total amount with accurate room prices
  const calculateAmount = () => {
    if (!startDate || !endDate) {
      setErrorMessage("Please select valid dates.")
      return
    }

    setIsCalculating(true)

    setTimeout(() => {
      const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      if (nights <= 0) {
        setErrorMessage("End date must be after start date.")
        setIsCalculating(false)
        return
      }

      // Room prices exactly matching the Room component
      const roomPrices = {
        1: 2594, // Couple Room AC
        2: 3890, // 4 Member Room AC
        3: 6508, // 6 Members Room AC
        4: 17862, // Hut NON AC
        5: 24184, // Private Villa
        6: 26893, // Indoor Theatre Hall AC
      }

      const pricePerNight = roomPrices[roomId] || 2594 // Default fallback

      setTotalAmount(nights * pricePerNight)
      setIsPayEnabled(true)
      setErrorMessage("")
      setIsCalculating(false)
    }, 800)
  }

  const handlePayment = () => {
    // Show payment options modal
    setShowPaymentModal(true)
  }

  // Add UPI payment handling
  const handleUpiPayment = () => {
    setShowUpiModal(true)
    setShowPaymentModal(false)
  }

  // Handle Razorpay payment
  const handleRazorpayPayment = () => {
    setShowPaymentModal(false)

    if (!window.Razorpay) {
      setErrorMessage("Payment gateway not loaded. Please try again later.")
      return
    }

    const options = {
      key: "rzp_test_d7Htck0TGu6Rde",
      amount: totalAmount * 100, // Amount in paise
      currency: "INR",
      name: "Hotel Booking",
      description: "Complete Your Booking",
      image: "/logo.png",
      handler: (response) => {
        if (response.razorpay_payment_id) {
          handlePayNow(response.razorpay_payment_id)
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9360793223",
      },
      theme: {
        color: "#4a6fa5",
      },
      modal: {
        ondismiss: () => {
          console.log("Payment modal closed")
        },
      },
    }

    try {
      const rzp1 = new window.Razorpay(options)
      rzp1.open()
    } catch (error) {
      console.error("Razorpay error:", error)
      setErrorMessage("Payment gateway error. Please try again later.")
    }
  }

  // Submit booking
  const handlePayNow = async (paymentId = null) => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login", { state: { from: `/book/${roomId}` } })
      return
    }

    setIsSubmitting(true)

    try {
      const bookingData = {
        roomId,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        adults,
        children,
        totalAmount,
        paymentId: paymentId || `upi_payment_${Date.now()}`,
        paymentMethod: paymentId ? "razorpay" : "upi",
        sendEmail: true, // Add this flag to indicate email should be sent
      }

      const response = await axios.post("https://resortease-2.onrender.com/api/book", bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // Pass booking details to confirmation page
      navigate("/confirmation", {
        state: {
          booking: {
            ...bookingData,
            _id: response.data.bookingId || Date.now().toString(),
            createdAt: new Date().toISOString(),
          },
        },
      })
    } catch (error) {
      console.error("Booking error:", error)
      setErrorMessage(error.response?.data?.message || "An error occurred during booking. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle increment/decrement for guests
  const incrementAdults = () => setAdults((prev) => prev + 1)
  const decrementAdults = () => adults > 1 && setAdults((prev) => prev - 1)
  const incrementChildren = () => setChildren((prev) => prev + 1)
  const decrementChildren = () => children > 0 && setChildren((prev) => prev - 1)

  return (
    <div className="booking-container">
      <div className="booking-card">
        <div className="booking-header">
          <h2>Book Room {roomId}</h2>
          <p className="booking-subtitle">Select your dates and details to book your stay</p>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="booking-content">
          {/* Date Pickers */}
          <div className="date-picker-container">
            <div className="date-picker-group">
              <label>Check-in Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                excludeDateIntervals={bookedIntervals}
                minDate={new Date()}
                placeholderText="Select check-in date"
                className="date-input"
                required
              />
            </div>

            <div className="date-picker-group">
              <label>Check-out Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                excludeDateIntervals={bookedIntervals}
                placeholderText="Select check-out date"
                className="date-input"
                required
                disabled={!startDate}
              />
            </div>
          </div>

          {/* Guest Inputs */}
          <div className="guest-inputs-container">
            <div className="guest-input-group">
              <label>Adults:</label>
              <div className="number-input-container">
                <button
                  type="button"
                  className="number-btn"
                  onClick={decrementAdults}
                  disabled={adults <= 1}
                  aria-label="Decrease adults"
                >
                  -
                </button>
                <input
                  type="number"
                  value={adults}
                  min="1"
                  onChange={(e) => setAdults(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="number-input"
                  required
                  aria-label="Number of adults"
                />
                <button type="button" className="number-btn" onClick={incrementAdults} aria-label="Increase adults">
                  +
                </button>
              </div>
            </div>

            <div className="guest-input-group">
              <label>Children:</label>
              <div className="number-input-container">
                <button
                  type="button"
                  className="number-btn"
                  onClick={decrementChildren}
                  disabled={children <= 0}
                  aria-label="Decrease children"
                >
                  -
                </button>
                <input
                  type="number"
                  value={children}
                  min="0"
                  onChange={(e) => setChildren(Math.max(0, Number.parseInt(e.target.value) || 0))}
                  className="number-input"
                  required
                  aria-label="Number of children"
                />
                <button type="button" className="number-btn" onClick={incrementChildren} aria-label="Increase children">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="total-amount-container">
            <div className="total-amount-label">Total Amount:</div>
            <div className="total-amount-value">₹{totalAmount.toLocaleString()}</div>
          </div>
        </div>

        <div className="booking-footer">
          <button
            className={`calculate-btn ${isCalculating ? "loading" : ""}`}
            onClick={calculateAmount}
            disabled={!startDate || !endDate || isCalculating}
          >
            {isCalculating ? "Calculating..." : "Calculate Amount"}
            {isCalculating && <span className="spinner"></span>}
          </button>

          <button
            className={`pay-btn ${!isPayEnabled ? "disabled" : ""} ${isSubmitting ? "loading" : ""}`}
            onClick={handlePayment}
            disabled={!isPayEnabled || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Pay Now"}
            {isSubmitting && <span className="spinner"></span>}
          </button>
        </div>
      </div>
      {/* Payment Method Modal */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <div className="modal-header">
              <h3>Select Payment Method</h3>
              <button className="close-button" onClick={() => setShowPaymentModal(false)}>
                ×
              </button>
            </div>
            <div className="payment-options">
              <button className="payment-option" onClick={handleRazorpayPayment}>
                <div className="payment-icon">💳</div>
                <div className="payment-details">
                  <h4>Credit/Debit Card</h4>
                  <p>Pay securely with Razorpay</p>
                </div>
              </button>
              <button className="payment-option" onClick={handleUpiPayment}>
                <div className="payment-icon">📱</div>
                <div className="payment-details">
                  <h4>UPI Payment</h4>
                  <p>Pay using any UPI app</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPI Payment Modal */}
      {showUpiModal && (
        <div className="modal-overlay">
          <div className="upi-modal">
            <div className="modal-header">
              <h3>UPI Payment</h3>
              <button className="close-button" onClick={() => setShowUpiModal(false)}>
                ×
              </button>
            </div>
            <div className="upi-content">
              <div className="qr-container">
                <div className="qr-code">
                  {/* Using QRCodeSVG component for better rendering */}
                  <QRCodeSVG
                    value={`upi://pay?pa=varunesht26@okicici&pn=Royal%20Castle%20Farm%20Stay&am=${totalAmount}&cu=INR`}
                    size={250}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={true}
                  />
                </div>
                <div className="upi-details">
                  <p>
                    <strong>UPI ID:</strong> varunesht26@okicici
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{totalAmount}
                  </p>
                  <p className="upi-instruction">Scan this QR code with any UPI app to pay</p>
                </div>
              </div>
              <div className="upi-actions">
                <button
                  className={`confirm-button ${upiPaymentConfirmed ? "confirmed" : ""}`}
                  onClick={() => setUpiPaymentConfirmed(!upiPaymentConfirmed)}
                >
                  {upiPaymentConfirmed ? "✓ Payment Confirmed" : "I have made the payment"}
                </button>
                <button
                  className="complete-button"
                  disabled={!upiPaymentConfirmed}
                  onClick={() => {
                    handlePayNow()
                    setShowUpiModal(false)
                  }}
                >
                  Complete Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingForm
