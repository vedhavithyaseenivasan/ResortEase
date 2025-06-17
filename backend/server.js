// const express = require("express")
// const mongoose = require("mongoose")
// const bodyParser = require("body-parser")
// const cors = require("cors")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
// const multer = require("multer")
// const path = require("path")
// const fs = require("fs")

// const app = express()
// const PORT = 5000

// // Middleware
// app.use(cors())
// app.use(bodyParser.json())

// // Serve static files from the uploads directory
// app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// // MongoDB Connection
// mongoose.connect("mongodb://localhost:27017/resortBooking", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// // Check MongoDB connection
// const db = mongoose.connection
// db.on("error", console.error.bind(console, "MongoDB connection error:"))
// db.once("open", () => {
//   console.log("Connected to MongoDB")
// })

// // JWT Secret Key
// const JWT_SECRET = "your_jwt_secret_key"

// // User Schema (with role)
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: true, unique: true },
//   dob: { type: Date, required: true },
//   role: { type: String, enum: ["user", "admin"], default: "user" },
//   profileImage: { type: String, default: null }, // Added profile image field
//   isVerified: { type: Boolean, default: false }, // Added verification field
//   isLocked: { type: Boolean, default: false }, // Added account lock field
// })

// // Export the model
// const User = mongoose.model("User", userSchema)
// module.exports = User

// // Booking Schema (with status)
// const bookingSchema = new mongoose.Schema({
//   roomId: String,
//   startDate: Date,
//   endDate: Date,
//   adults: Number,
//   children: Number,
//   totalAmount: Number,
//   userId: String,
//   status: { type: String, enum: ["active", "canceled"], default: "active" },
// })

// const Booking = mongoose.model("Booking", bookingSchema)

// // Add this Message Schema after the existing schemas
// const messageSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String },
//   subject: { type: String },
//   message: { type: String, required: true },
//   replies: [
//     {
//       message: String,
//       timestamp: { type: Date, default: Date.now },
//     },
//   ],
//   isRead: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// })

// const Message = mongoose.model("Message", messageSchema)

// // Add this Notification Schema after the existing schemas
// const notificationSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   message: { type: String, required: true },
//   type: {
//     type: String,
//     enum: ["booking", "cancellation", "user", "system"],
//     default: "system",
//   },
//   read: { type: Boolean, default: false },
//   time: { type: Date, default: Date.now },
//   userId: { type: String, required: false }, // Optional, for user-specific notifications
// })

// const Notification = mongoose.model("Notification", notificationSchema)

// // Middleware to verify JWT token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"]
//   const token = authHeader && authHeader.split(" ")[1]

//   if (!token) {
//     return res.status(401).send("Access denied. No token provided.")
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).send("Invalid token.")
//     req.user = user
//     next()
//   })
// }

// // Admin Middleware
// const isAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).send("Access denied. Admin role required.")
//   }
//   next()
// }

// // Register Route
// app.post("/api/register", async (req, res) => {
//   const { username, email, password, phone, dob } = req.body

//   try {
//     const existingUser = await User.findOne({ email })
//     if (existingUser) return res.status(400).send("User already exists")

//     const hashedPassword = await bcrypt.hash(password, 10)
//     const newUser = new User({ username, email, password: hashedPassword, phone, dob })
//     await newUser.save()

//     // Create a notification for new user registration
//     const notification = new Notification({
//       title: "New User Registration",
//       message: `${username} has registered with email ${email}`,
//       type: "user",
//     })
//     await notification.save()

//     res.status(201).send("User registered successfully")
//   } catch (error) {
//     console.error("Error registering user:", error)
//     res.status(500).send("Error registering user")
//   }
// })

// // Login Route (includes role in token)
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body

//   try {
//     const user = await User.findOne({ email })
//     if (!user) return res.status(400).send("User not found")

//     // Check if account is locked
//     if (user.isLocked) {
//       return res.status(403).send("Account is locked. Please contact support.")
//     }

//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch) return res.status(400).send("Invalid credentials")

//     const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" })
//     res.status(200).json({ token, role: user.role })
//   } catch (error) {
//     console.error("Error logging in:", error)
//     res.status(500).send("Error logging in")
//   }
// })

// // User Dashboard Route
// app.get("/api/user", authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("-password")
//     if (!user) return res.status(404).send("User not found")

//     const bookings = await Booking.find({
//       userId: req.user.userId,
//       status: "active",
//     })

//     res.status(200).json({ user, bookings })
//   } catch (error) {
//     console.error("Error fetching user data:", error)
//     res.status(500).send("Error fetching user data")
//   }
// })

// // Admin Dashboard Route
// app.get("/api/admin/users", async (req, res) => {
//   try {
//     // Fetch users and select only 'username' and 'email'
//     const users = await User.find({}, "username email") // Select only 'username' and 'email'

//     // Respond with success and the list of users
//     res.status(200).json({ success: true, users })
//   } catch (error) {
//     // Log the error and respond with an error message
//     console.error("Error fetching users:", error)
//     res.status(500).json({ success: false, message: "Error fetching users" })
//   }
// })

// // Save Booking Route
// app.post("/api/book", authenticateToken, async (req, res) => {
//   const { roomId, startDate, endDate, adults, children, totalAmount } = req.body
//   const userId = req.user.userId

//   try {
//     const start = new Date(startDate)
//     const end = new Date(endDate)

//     // Check for overlapping active bookings
//     const overlappingBookings = await Booking.find({
//       roomId,
//       status: "active",
//       $or: [
//         { startDate: { $lt: end }, endDate: { $gt: start } },
//         { startDate: { $gte: start, $lt: end } },
//         { endDate: { $gt: start, $lte: end } },
//       ],
//     })

//     if (overlappingBookings.length > 0) {
//       return res.status(400).send("Room already booked for these dates")
//     }

//     const newBooking = new Booking({
//       roomId,
//       startDate: start,
//       endDate: end,
//       adults,
//       children,
//       totalAmount,
//       userId,
//     })

//     await newBooking.save()

//     // Get user details for the notification
//     const user = await User.findById(userId)

//     // Create a notification for new booking
//     const notification = new Notification({
//       title: "New Booking",
//       message: `${user.username} has booked room ${roomId} from ${start.toLocaleDateString()} to ${end.toLocaleDateString()}`,
//       type: "booking",
//       userId: userId,
//     })
//     await notification.save()

//     res.status(200).send("Booking saved successfully")
//   } catch (error) {
//     console.error("Error saving booking:", error)
//     res.status(500).send("Error saving booking")
//   }
// })

// // Cancel Booking Route
// app.delete("/api/bookings/:id", authenticateToken, async (req, res) => {
//   try {
//     const booking = await Booking.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         userId: req.user.userId,
//         status: "active",
//       },
//       { status: "canceled" },
//       { new: true },
//     )

//     if (!booking) return res.status(404).send("Booking not found")

//     // Get user details for the notification
//     const user = await User.findById(req.user.userId)

//     // Create a notification for booking cancellation
//     const notification = new Notification({
//       title: "Booking Canceled",
//       message: `${user.username} has canceled booking for room ${booking.roomId}`,
//       type: "cancellation",
//       userId: req.user.userId,
//     })
//     await notification.save()

//     res.status(200).send("Booking canceled successfully")
//   } catch (error) {
//     console.error("Error canceling booking:", error)
//     res.status(500).send("Error canceling booking")
//   }
// })

// // Fetch Active Bookings for Date Picker
// app.get("/api/bookings/:roomId", async (req, res) => {
//   try {
//     const bookings = await Booking.find(
//       {
//         roomId: req.params.roomId,
//         status: "active",
//       },
//       "startDate endDate -_id",
//     )

//     res.status(200).json(bookings)
//   } catch (error) {
//     console.error("Error fetching booked dates:", error)
//     res.status(500).send("Error fetching booked dates")
//   }
// })

// // Admin Login Route
// app.post("/api/admin/login", async (req, res) => {
//   const { email, password } = req.body

//   try {
//     const admin = await User.findOne({ email, role: "admin" })
//     if (!admin) {
//       return res.status(401).json({ success: false, message: "Admin not found" })
//     }

//     if (admin.password !== password) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" })
//     }

//     const token = jwt.sign({ id: admin._id, role: admin.role }, "secretKey", { expiresIn: "1h" })

//     res.json({ success: true, message: "Login successful", token })
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" })
//   }
// })

// // Admin Bookings Route
// app.get("/api/admin/bookings", async (req, res) => {
//   try {
//     // Fetch all bookings from the Booking collection
//     const bookings = await Booking.find({})

//     // Array to store combined booking and user details
//     const bookingsWithUserDetails = []

//     // Loop through each booking to fetch corresponding user details
//     for (const booking of bookings) {
//       // Find the user corresponding to the userId in the booking
//       const user = await User.findById(booking.userId, "username email")

//       if (user) {
//         // Combine booking details with user details
//         bookingsWithUserDetails.push({
//           bookingId: booking._id,
//           roomId: booking.roomId,
//           startDate: booking.startDate,
//           endDate: booking.endDate,
//           adults: booking.adults,
//           children: booking.children,
//           totalAmount: booking.totalAmount,
//           status: booking.status,
//           user: {
//             username: user.username,
//             email: user.email,
//           },
//         })
//       }
//     }

//     // Respond with success and the combined booking and user details
//     res.status(200).json({ success: true, bookings: bookingsWithUserDetails })
//   } catch (error) {
//     // Log the error and respond with an error message
//     console.error("Error fetching bookings:", error)
//     res.status(500).json({ success: false, message: "Error fetching bookings" })
//   }
// })

// // Update User Details Route
// app.put("/api/user/update", authenticateToken, async (req, res) => {
//   try {
//     const { username, phone, dob } = req.body

//     // Find the user by ID
//     const user = await User.findById(req.user.userId)
//     if (!user) {
//       return res.status(404).send("User not found")
//     }

//     // Update only the allowed fields
//     if (username) user.username = username
//     if (phone) user.phone = phone
//     if (dob) user.dob = new Date(dob)

//     // Save the updated user
//     await user.save()

//     // Return the updated user without password
//     const updatedUser = await User.findById(req.user.userId).select("-password")
//     res.status(200).json({ success: true, user: updatedUser })
//   } catch (error) {
//     console.error("Error updating user details:", error)
//     res.status(500).send("Error updating user details")
//   }
// })

// // Admin View User Details Route

// app.get("/api/admin/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: "Invalid user ID format" })
//     }

//     // Find the user by _id and exclude the password
//     const user = await User.findById(id).select("-password")

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     res.status(200).json({ success: true, user })
//   } catch (error) {
//     console.error("Error fetching user:", error)
//     res.status(500).json({ success: false, message: "Error fetching user" })
//   }
// })

// // Verify User Route for Admin
// app.put("/api/admin/verify-user/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, message: "Invalid user ID format" })
//     }

//     // Find the user and update verification status
//     const user = await User.findByIdAndUpdate(userId, { isVerified: true }, { new: true })

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     res.status(200).json({ success: true, message: "User verified successfully", user })
//   } catch (error) {
//     console.error("Error verifying user:", error)
//     res.status(500).json({ success: false, message: "Error verifying user" })
//   }
// })

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = "uploads/profile-images"
//     // Create directory if it doesn't exist
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true })
//     }
//     cb(null, uploadDir)
//   },
//   filename: (req, file, cb) => {
//     // Create unique filename with original extension
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
//     const ext = path.extname(file.originalname)
//     cb(null, "profile-" + uniqueSuffix + ext)
//   },
// })

// // File filter to only allow image files
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true)
//   } else {
//     cb(new Error("Only image files are allowed!"), false)
//   }
// }

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   },
// })

// // Upload Profile Image Route
// app.post("/api/user/upload-profile-image", authenticateToken, async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" })
//     }

//     // Find the user
//     const user = await User.findById(req.user.userId)
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     // Delete old profile image if exists
//     if (user.profileImage) {
//       const oldImagePath = path.join(__dirname, user.profileImage)
//       if (fs.existsSync(oldImagePath)) {
//         fs.unlinkSync(oldImagePath)
//       }
//     }

//     // Update user with new profile image path - store only the relative path
//     const imagePath = `/uploads/profile-images/${req.file.filename}`
//     user.profileImage = imagePath
//     await user.save()

//     res.status(200).json({
//       success: true,
//       message: "Profile image uploaded successfully",
//       profileImage: imagePath,
//     })
//   } catch (error) {
//     console.error("Error uploading profile image:", error)
//     res.status(500).json({ success: false, message: "Error uploading profile image" })
//   }
// })

// // Add this to your server.js file

// // User Activity Route for Admin
// app.get("/api/admin/user-activity/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, message: "Invalid user ID format" })
//     }

//     // Get all bookings for this user
//     const bookings = await Booking.find({ userId })

//     // Initialize activities array
//     const activities = []

//     // Add booking activities
//     bookings.forEach((booking) => {
//       // Add the booking creation activity
//       activities.push({
//         type: "booking",
//         date: booking.createdAt || booking._id.getTimestamp(),
//         details: {
//           roomId: booking.roomId,
//           startDate: booking.startDate,
//           endDate: booking.endDate,
//           adults: booking.adults,
//           children: booking.children,
//           totalAmount: booking.totalAmount,
//         },
//       })

//       // If booking was canceled, add cancellation activity
//       if (booking.status === "canceled") {
//         activities.push({
//           type: "cancellation",
//           date: booking.updatedAt || new Date(),
//           details: {
//             roomId: booking.roomId,
//             startDate: booking.startDate,
//             endDate: booking.endDate,
//           },
//         })
//       }
//     })

//     // Sort activities by date (newest first)
//     activities.sort((a, b) => new Date(b.date) - new Date(a.date))

//     res.status(200).json({ success: true, activities })
//   } catch (error) {
//     console.error("Error fetching user activity:", error)
//     res.status(500).json({ success: false, message: "Error fetching user activity" })
//   }
// })

// // To track user profile updates, modify your update user route:
// app.put("/api/user/update", authenticateToken, async (req, res) => {
//   try {
//     const { username, phone, dob } = req.body
//     const updatedFields = {}

//     // Find the user by ID
//     const user = await User.findById(req.user.userId)
//     if (!user) {
//       return res.status(404).send("User not found")
//     }

//     // Track which fields were updated
//     if (username && username !== user.username) {
//       updatedFields.username = username
//       user.username = username
//     }
//     if (phone && phone !== user.phone) {
//       updatedFields.phone = phone
//       user.phone = phone
//     }
//     if (dob && new Date(dob).toString() !== new Date(user.dob).toString()) {
//       updatedFields.dob = dob
//       user.dob = new Date(dob)
//     }

//     // Save the updated user
//     await user.save()

//     // If fields were updated, log the activity
//     if (Object.keys(updatedFields).length > 0) {
//       // In a real application, you would create an Activity model and store this
//       // This is a simplified example
//       console.log("User update activity:", {
//         userId: user._id,
//         type: "update",
//         date: new Date(),
//         details: updatedFields,
//       })
//     }

//     // Return the updated user without password
//     const updatedUser = await User.findById(req.user.userId).select("-password")
//     res.status(200).json({ success: true, user: updatedUser })
//   } catch (error) {
//     console.error("Error updating user details:", error)
//     res.status(500).send("Error updating user details")
//   }
// })

// // Change Password Route
// app.post("/api/user/change-password", authenticateToken, async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body

//     // Find the user
//     const user = await User.findById(req.user.userId)
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     // Verify current password
//     const isMatch = await bcrypt.compare(currentPassword, user.password)
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Current password is incorrect" })
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10)

//     // Update the password
//     user.password = hashedPassword
//     await user.save()

//     res.status(200).json({ success: true, message: "Password changed successfully" })
//   } catch (error) {
//     console.error("Error changing password:", error)
//     res.status(500).json({ success: false, message: "Error changing password" })
//   }
// })

// // Delete Account Route
// app.delete("/api/user/delete-account", authenticateToken, async (req, res) => {
//   try {
//     // Find the user
//     const user = await User.findById(req.user.userId)
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     // Delete user's profile image if exists
//     if (user.profileImage) {
//       const imagePath = path.join(__dirname, user.profileImage)
//       if (fs.existsSync(imagePath)) {
//         fs.unlinkSync(imagePath)
//       }
//     }

//     // Update bookings to canceled status
//     await Booking.updateMany({ userId: req.user.userId, status: "active" }, { status: "canceled" })

//     // Delete the user
//     await User.findByIdAndDelete(req.user.userId)

//     res.status(200).json({ success: true, message: "Account deleted successfully" })
//   } catch (error) {
//     console.error("Error deleting account:", error)
//     res.status(500).json({ success: false, message: "Error deleting account" })
//   }
// })

// // Admin Delete User Route
// app.delete("/api/admin/delete-user/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, message: "Invalid user ID format" })
//     }

//     // Find the user
//     const user = await User.findById(userId)
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     // Delete user's profile image if exists
//     if (user.profileImage) {
//       const imagePath = path.join(__dirname, user.profileImage)
//       if (fs.existsSync(imagePath)) {
//         fs.unlinkSync(imagePath)
//       }
//     }

//     // Update bookings to canceled status
//     await Booking.updateMany({ userId: userId, status: "active" }, { status: "canceled" })

//     // Delete the user
//     await User.findByIdAndDelete(userId)

//     res.status(200).json({ success: true, message: "User deleted successfully" })
//   } catch (error) {
//     console.error("Error deleting user:", error)
//     res.status(500).json({ success: false, message: "Error deleting user" })
//   }
// })

// // Lock User Account Route
// app.put("/api/admin/lock-user/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, message: "Invalid user ID format" })
//     }

//     // Find the user and update lock status
//     const user = await User.findByIdAndUpdate(userId, { isLocked: true }, { new: true })

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     res.status(200).json({ success: true, message: "User account locked successfully", user })
//   } catch (error) {
//     console.error("Error locking user account:", error)
//     res.status(500).json({ success: false, message: "Error locking user account" })
//   }
// })

// // Unlock User Account Route
// app.put("/api/admin/unlock-user/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, message: "Invalid user ID format" })
//     }

//     // Find the user and update lock status
//     const user = await User.findByIdAndUpdate(userId, { isLocked: false }, { new: true })

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     res.status(200).json({ success: true, message: "User account unlocked successfully", user })
//   } catch (error) {
//     console.error("Error unlocking user account:", error)
//     res.status(500).json({ success: false, message: "Error unlocking user account" })
//   }
// })

// // Add these API endpoints for messages

// // Send message from user
// app.post("/api/messages", async (req, res) => {
//   try {
//     const { name, email, phone, subject, message } = req.body

//     // Validate required fields
//     if (!name || !email || !message) {
//       return res.status(400).json({ success: false, message: "Name, email and message are required" })
//     }

//     const newMessage = new Message({
//       name,
//       email,
//       phone,
//       subject,
//       message,
//       replies: [],
//     })

//     await newMessage.save()

//     res.status(201).json({ success: true, message: "Message sent successfully" })
//   } catch (error) {
//     console.error("Error sending message:", error)
//     res.status(500).json({ success: false, message: "Error sending message" })
//   }
// })

// // Get all messages for admin
// app.get("/api/admin/messages", async (req, res) => {
//   try {
//     const messages = await Message.find().sort({ createdAt: -1 })
//     res.status(200).json({ success: true, messages })
//   } catch (error) {
//     console.error("Error fetching messages:", error)
//     res.status(500).json({ success: false, message: "Error fetching messages" })
//   }
// })

// // Mark message as read
// app.put("/api/admin/messages/:id/read", async (req, res) => {
//   try {
//     const message = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true })

//     if (!message) {
//       return res.status(404).json({ success: false, message: "Message not found" })
//     }

//     res.status(200).json({ success: true, message: "Message marked as read" })
//   } catch (error) {
//     console.error("Error marking message as read:", error)
//     res.status(500).json({ success: false, message: "Error marking message as read" })
//   }
// })

// // Reply to a message
// app.post("/api/admin/messages/:id/reply", async (req, res) => {
//   try {
//     const { replyMessage } = req.body

//     if (!replyMessage) {
//       return res.status(400).json({ success: false, message: "Reply message is required" })
//     }

//     const message = await Message.findById(req.params.id)

//     if (!message) {
//       return res.status(404).json({ success: false, message: "Message not found" })
//     }

//     message.replies.push({
//       message: replyMessage,
//       timestamp: new Date(),
//     })

//     await message.save()

//     res.status(200).json({ success: true, message: "Reply sent successfully" })
//   } catch (error) {
//     console.error("Error sending reply:", error)
//     res.status(500).json({ success: false, message: "Error sending reply" })
//   }
// })

// // Add this API endpoint to your server.js file

// // Get active room bookings for report
// app.get("/api/admin/room-bookings-report", async (req, res) => {
//   try {
//     // Fetch only active bookings
//     const bookings = await Booking.find({ status: "active" })

//     // Array to store combined booking and user details
//     const bookingsWithUserDetails = []

//     // Loop through each booking to fetch corresponding user details
//     for (const booking of bookings) {
//       // Find the user corresponding to the userId in the booking
//       const user = await User.findById(booking.userId, "username email")

//       if (user) {
//         // Combine booking details with user details
//         bookingsWithUserDetails.push({
//           bookingId: booking._id,
//           roomId: booking.roomId,
//           startDate: booking.startDate,
//           endDate: booking.endDate,
//           adults: booking.adults,
//           children: booking.children,
//           totalAmount: booking.totalAmount,
//           user: {
//             username: user.username,
//             email: user.email,
//           },
//         })
//       }
//     }

//     // Sort bookings by start date
//     bookingsWithUserDetails.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

//     // Respond with success and the combined booking and user details
//     res.status(200).json({ success: true, bookings: bookingsWithUserDetails })
//   } catch (error) {
//     // Log the error and respond with an error message
//     console.error("Error fetching room bookings report:", error)
//     res.status(500).json({ success: false, message: "Error fetching room bookings report" })
//   }
// })

// // Add these notification endpoints
// app.get("/api/admin/notifications", async (req, res) => {
//   try {
//     const notifications = await Notification.find().sort({ time: -1 }).limit(50)
//     res.status(200).json({ success: true, notifications })
//   } catch (error) {
//     console.error("Error fetching notifications:", error)
//     res.status(500).json({ success: false, message: "Error fetching notifications" })
//   }
// })

// app.put("/api/admin/notifications/:id/read", async (req, res) => {
//   try {
//     const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true })

//     if (!notification) {
//       return res.status(404).json({ success: false, message: "Notification not found" })
//     }

//     res.status(200).json({ success: true, message: "Notification marked as read" })
//   } catch (error) {
//     console.error("Error marking notification as read:", error)
//     res.status(500).json({ success: false, message: "Error marking notification as read" })
//   }
// })

// app.put("/api/admin/notifications/read-all", async (req, res) => {
//   try {
//     await Notification.updateMany({}, { read: true })
//     res.status(200).json({ success: true, message: "All notifications marked as read" })
//   } catch (error) {
//     console.error("Error marking all notifications as read:", error)
//     res.status(500).json({ success: false, message: "Error marking all notifications as read" })
//   }
// })

// // Add WebSocket support for real-time notifications
// const http = require("http")
// const WebSocket = require("ws")

// // Create HTTP server
// const server = http.createServer(app)

// // Create WebSocket server
// const wss = new WebSocket.Server({ server })

// // WebSocket connection handler
// wss.on("connection", (ws) => {
//   console.log("Client connected")

//   // Handle client disconnection
//   ws.on("close", () => {
//     console.log("Client disconnected")
//   })
// })

// // Function to broadcast notifications to all connected clients
// const broadcastNotification = (notification) => {
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(notification))
//     }
//   })
// }



// // Modify the server.listen to use the HTTP server
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`)
// })

// // Add a post-save hook to the Notification model to broadcast new notifications
// notificationSchema.post("save", (doc) => {
//   broadcastNotification(doc)
// })





// const express = require("express")
// const mongoose = require("mongoose")
// const bodyParser = require("body-parser")
// const cors = require("cors")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
// const multer = require("multer")
// const path = require("path")
// const fs = require("fs")

// const app = express()
// const PORT = 5000

// // Middleware
// app.use(cors())
// app.use(bodyParser.json())

// // Serve static files from the uploads directory
// app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// // MongoDB Connection
// mongoose.connect("mongodb://localhost:27017/resortBooking", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// // Check MongoDB connection
// const db = mongoose.connection
// db.on("error", console.error.bind(console, "MongoDB connection error:"))
// db.once("open", () => {
//   console.log("Connected to MongoDB")
// })

// // JWT Secret Key
// const JWT_SECRET = "your_jwt_secret_key"

// // User Schema (with role)
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String, required: true, unique: true },
//   dob: { type: Date, required: true },
//   role: { type: String, enum: ["user", "admin"], default: "user" },
//   profileImage: { type: String, default: null }, // Added profile image field
//   isVerified: { type: Boolean, default: false }, // Added verification field
//   isLocked: { type: Boolean, default: false }, // Added account lock field
// })

// // Export the model
// const User = mongoose.model("User", userSchema)
// module.exports = User

// // Booking Schema (with status)
// const bookingSchema = new mongoose.Schema({
//   roomId: String,
//   startDate: Date,
//   endDate: Date,
//   adults: Number,
//   children: Number,
//   totalAmount: Number,
//   userId: String,
//   status: { type: String, enum: ["active", "canceled"], default: "active" },
// })

// const Booking = mongoose.model("Booking", bookingSchema)

// // Add this Message Schema after the existing schemas
// const messageSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String },
//   subject: { type: String },
//   message: { type: String, required: true },
//   replies: [
//     {
//       message: String,
//       timestamp: { type: Date, default: Date.now },
//     },
//   ],
//   isRead: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// })

// const Message = mongoose.model("Message", messageSchema)

// // Add this Notification Schema after the existing schemas
// const notificationSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   message: { type: String, required: true },
//   type: {
//     type: String,
//     enum: ["booking", "cancellation", "user", "system"],
//     default: "system",
//   },
//   read: { type: Boolean, default: false },
//   time: { type: Date, default: Date.now },
//   userId: { type: String, required: false }, // Optional, for user-specific notifications
// })

// const Notification = mongoose.model("Notification", notificationSchema)

// // Middleware to verify JWT token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"]
//   const token = authHeader && authHeader.split(" ")[1]

//   if (!token) {
//     return res.status(401).send("Access denied. No token provided.")
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).send("Invalid token.")
//     req.user = user
//     next()
//   })
// }

// // Admin Middleware
// const isAdmin = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).send("Access denied. Admin role required.")
//   }
//   next()
// }

// // Register Route
// app.post("/api/register", async (req, res) => {
//   const { username, email, password, phone, dob } = req.body

//   try {
//     const existingUser = await User.findOne({ email })
//     if (existingUser) return res.status(400).send("User already exists")

//     const hashedPassword = await bcrypt.hash(password, 10)
//     const newUser = new User({ username, email, password: hashedPassword, phone, dob })
//     await newUser.save()

//     // Create a notification for new user registration
//     const notification = new Notification({
//       title: "New User Registration",
//       message: `${username} has registered with email ${email}`,
//       type: "user",
//     })
//     await notification.save()

//     res.status(201).send("User registered successfully")
//   } catch (error) {
//     console.error("Error registering user:", error)
//     res.status(500).send("Error registering user")
//   }
// })

// // Login Route (includes role in token)
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body

//   try {
//     const user = await User.findOne({ email })
//     if (!user) return res.status(400).send("User not found")

//     // Check if account is locked
//     if (user.isLocked) {
//       return res.status(403).send("Account is locked. Please contact support.")
//     }

//     const isMatch = await bcrypt.compare(password, user.password)
//     if (!isMatch) return res.status(400).send("Invalid credentials")

//     const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" })
//     res.status(200).json({ token, role: user.role })
//   } catch (error) {
//     console.error("Error logging in:", error)
//     res.status(500).send("Error logging in")
//   }
// })

// // User Dashboard Route
// app.get("/api/user", authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("-password")
//     if (!user) return res.status(404).send("User not found")

//     const bookings = await Booking.find({
//       userId: req.user.userId,
//       status: "active",
//     })

//     res.status(200).json({ user, bookings })
//   } catch (error) {
//     console.error("Error fetching user data:", error)
//     res.status(500).send("Error fetching user data")
//   }
// })

// // Admin Dashboard Route
// app.get("/api/admin/users", async (req, res) => {
//   try {
//     // Fetch users and select only 'username' and 'email'
//     const users = await User.find({}, "username email") // Select only 'username' and 'email'

//     // Respond with success and the list of users
//     res.status(200).json({ success: true, users })
//   } catch (error) {
//     // Log the error and respond with an error message
//     console.error("Error fetching users:", error)
//     res.status(500).json({ success: false, message: "Error fetching users" })
//   }
// })

// // Save Booking Route
// app.post("/api/book", authenticateToken, async (req, res) => {
//   const { roomId, startDate, endDate, adults, children, totalAmount } = req.body
//   const userId = req.user.userId

//   try {
//     const start = new Date(startDate)
//     const end = new Date(endDate)

//     // Check for overlapping active bookings
//     const overlappingBookings = await Booking.find({
//       roomId,
//       status: "active",
//       $or: [
//         { startDate: { $lt: end }, endDate: { $gt: start } },
//         { startDate: { $gte: start, $lt: end } },
//         { endDate: { $gt: start, $lte: end } },
//       ],
//     })

//     if (overlappingBookings.length > 0) {
//       return res.status(400).send("Room already booked for these dates")
//     }

//     const newBooking = new Booking({
//       roomId,
//       startDate: start,
//       endDate: end,
//       adults,
//       children,
//       totalAmount,
//       userId,
//     })

//     await newBooking.save()

//     // Get user details for the notification
//     const user = await User.findById(userId)

//     // Create a notification for new booking
//     const notification = new Notification({
//       title: "New Booking",
//       message: `${user.username} has booked room ${roomId} from ${start.toLocaleDateString()} to ${end.toLocaleDateString()}`,
//       type: "booking",
//       userId: userId,
//     })
//     await notification.save()

//     res.status(200).send("Booking saved successfully")
//   } catch (error) {
//     console.error("Error saving booking:", error)
//     res.status(500).send("Error saving booking")
//   }
// })

// // Cancel Booking Route
// app.delete("/api/bookings/:id", authenticateToken, async (req, res) => {
//   try {
//     const booking = await Booking.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         userId: req.user.userId,
//         status: "active",
//       },
//       { status: "canceled" },
//       { new: true },
//     )

//     if (!booking) return res.status(404).send("Booking not found")

//     // Get user details for the notification
//     const user = await User.findById(req.user.userId)

//     // Create a notification for booking cancellation
//     const notification = new Notification({
//       title: "Booking Canceled",
//       message: `${user.username} has canceled booking for room ${booking.roomId}`,
//       type: "cancellation",
//       userId: req.user.userId,
//     })
//     await notification.save()

//     res.status(200).send("Booking canceled successfully")
//   } catch (error) {
//     console.error("Error canceling booking:", error)
//     res.status(500).send("Error canceling booking")
//   }
// })

// // Fetch Active Bookings for Date Picker
// app.get("/api/bookings/:roomId", async (req, res) => {
//   try {
//     const bookings = await Booking.find(
//       {
//         roomId: req.params.roomId,
//         status: "active",
//       },
//       "startDate endDate -_id",
//     )

//     res.status(200).json(bookings)
//   } catch (error) {
//     console.error("Error fetching booked dates:", error)
//     res.status(500).send("Error fetching booked dates")
//   }
// })

// // Admin Login Route
// app.post("/api/admin/login", async (req, res) => {
//   const { email, password } = req.body

//   try {
//     const admin = await User.findOne({ email, role: "admin" })
//     if (!admin) {
//       return res.status(401).json({ success: false, message: "Admin not found" })
//     }

//     if (admin.password !== password) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" })
//     }

//     const token = jwt.sign({ id: admin._id, role: admin.role }, "secretKey", { expiresIn: "1h" })

//     res.json({ success: true, message: "Login successful", token })
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" })
//   }
// })

// // Admin Bookings Route
// app.get("/api/admin/bookings", async (req, res) => {
//   try {
//     // Fetch all bookings from the Booking collection
//     const bookings = await Booking.find({})

//     // Array to store combined booking and user details
//     const bookingsWithUserDetails = []

//     // Loop through each booking to fetch corresponding user details
//     for (const booking of bookings) {
//       // Find the user corresponding to the userId in the booking
//       const user = await User.findById(booking.userId, "username email")

//       if (user) {
//         // Combine booking details with user details
//         bookingsWithUserDetails.push({
//           bookingId: booking._id,
//           roomId: booking.roomId,
//           startDate: booking.startDate,
//           endDate: booking.endDate,
//           adults: booking.adults,
//           children: booking.children,
//           totalAmount: booking.totalAmount,
//           status: booking.status,
//           user: {
//             username: user.username,
//             email: user.email,
//           },
//         })
//       }
//     }

//     // Respond with success and the combined booking and user details
//     res.status(200).json({ success: true, bookings: bookingsWithUserDetails })
//   } catch (error) {
//     // Log the error and respond with an error message
//     console.error("Error fetching bookings:", error)
//     res.status(500).json({ success: false, message: "Error fetching bookings" })
//   }
// })

// // Update User Details Route
// app.put("/api/user/update", authenticateToken, async (req, res) => {
//   try {
//     const { username, phone, dob } = req.body

//     // Find the user by ID
//     const user = await User.findById(req.user.userId)
//     if (!user) {
//       return res.status(404).send("User not found")
//     }

//     // Update only the allowed fields
//     if (username) user.username = username
//     if (phone) user.phone = phone
//     if (dob) user.dob = new Date(dob)

//     // Save the updated user
//     await user.save()

//     // Return the updated user without password
//     const updatedUser = await User.findById(req.user.userId).select("-password")
//     res.status(200).json({ success: true, user: updatedUser })
//   } catch (error) {
//     console.error("Error updating user details:", error)
//     res.status(500).send("Error updating user details")
//   }
// })

// // Admin View User Details Route

// app.get("/api/admin/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: "Invalid user ID format" })
//     }

//     // Find the user by _id and exclude the password
//     const user = await User.findById(id).select("-password")

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     res.status(200).json({ success: true, user })
//   } catch (error) {
//     console.error("Error fetching user:", error)
//     res.status(500).json({ success: false, message: "Error fetching user" })
//   }
// })

// // Verify User Route for Admin
// app.put("/api/admin/verify-user/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, message: "Invalid user ID format" })
//     }

//     // Find the user and update verification status
//     const user = await User.findByIdAndUpdate(userId, { isVerified: true }, { new: true })

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     res.status(200).json({ success: true, message: "User verified successfully", user })
//   } catch (error) {
//     console.error("Error verifying user:", error)
//     res.status(500).json({ success: false, message: "Error verifying user" })
//   }
// })

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = "uploads/profile-images"
//     // Create directory if it doesn't exist
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true })
//     }
//     cb(null, uploadDir)
//   },
//   filename: (req, file, cb) => {
//     // Create unique filename with original extension
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
//     const ext = path.extname(file.originalname)
//     cb(null, "profile-" + uniqueSuffix + ext)
//   },
// })

// // File filter to only allow image files
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true)
//   } else {
//     cb(new Error("Only image files are allowed!"), false)
//   }
// }

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   },
// })

// // Upload Profile Image Route
// app.post("/api/user/upload-profile-image", authenticateToken, upload.single("profileImage"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" })
//     }

//     // Find the user
//     const user = await User.findById(req.user.userId)
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     // Delete old profile image if exists
//     if (user.profileImage) {
//       const oldImagePath = path.join(__dirname, user.profileImage)
//       if (fs.existsSync(oldImagePath)) {
//         fs.unlinkSync(oldImagePath)
//       }
//     }

//     // Update user with new profile image path - store only the relative path
//     const imagePath = `/uploads/profile-images/${req.file.filename}`
//     user.profileImage = imagePath
//     await user.save()

//     res.status(200).json({
//       success: true,
//       message: "Profile image uploaded successfully",
//       profileImage: imagePath,
//     })
//   } catch (error) {
//     console.error("Error uploading profile image:", error)
//     res.status(500).json({ success: false, message: "Error uploading profile image" })
//   }
// })

// // Add this to your server.js file

// // User Activity Route for Admin
// app.get("/api/admin/user-activity/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, message: "Invalid user ID format" })
//     }

//     // Get all bookings for this user
//     const bookings = await Booking.find({ userId })

//     // Initialize activities array
//     const activities = []

//     // Add booking activities
//     bookings.forEach((booking) => {
//       // Add the booking creation activity
//       activities.push({
//         type: "booking",
//         date: booking.createdAt || booking._id.getTimestamp(),
//         details: {
//           roomId: booking.roomId,
//           startDate: booking.startDate,
//           endDate: booking.endDate,
//           adults: booking.adults,
//           children: booking.children,
//           totalAmount: booking.totalAmount,
//         },
//       })

//       // If booking was canceled, add cancellation activity
//       if (booking.status === "canceled") {
//         activities.push({
//           type: "cancellation",
//           date: booking.updatedAt || new Date(),
//           details: {
//             roomId: booking.roomId,
//             startDate: booking.startDate,
//             endDate: booking.endDate,
//           },
//         })
//       }
//     })

//     // Sort activities by date (newest first)
//     activities.sort((a, b) => new Date(b.date) - new Date(a.date))

//     res.status(200).json({ success: true, activities })
//   } catch (error) {
//     console.error("Error fetching user activity:", error)
//     res.status(500).json({ success: false, message: "Error fetching user activity" })
//   }
// })

// // To track user profile updates, modify your update user route:
// app.put("/api/user/update", authenticateToken, async (req, res) => {
//   try {
//     const { username, phone, dob } = req.body
//     const updatedFields = {}

//     // Find the user by ID
//     const user = await User.findById(req.user.userId)
//     if (!user) {
//       return res.status(404).send("User not found")
//     }

//     // Track which fields were updated
//     if (username && username !== user.username) {
//       updatedFields.username = username
//       user.username = username
//     }
//     if (phone && phone !== user.phone) {
//       updatedFields.phone = phone
//       user.phone = phone
//     }
//     if (dob && new Date(dob).toString() !== new Date(user.dob).toString()) {
//       updatedFields.dob = dob
//       user.dob = new Date(dob)
//     }

//     // Save the updated user
//     await user.save()

//     // If fields were updated, log the activity
//     if (Object.keys(updatedFields).length > 0) {
//       // In a real application, you would create an Activity model and store this
//       // This is a simplified example
//       console.log("User update activity:", {
//         userId: user._id,
//         type: "update",
//         date: new Date(),
//         details: updatedFields,
//       })
//     }

//     // Return the updated user without password
//     const updatedUser = await User.findById(req.user.userId).select("-password")
//     res.status(200).json({ success: true, user: updatedUser })
//   } catch (error) {
//     console.error("Error updating user details:", error)
//     res.status(500).send("Error updating user details")
//   }
// })

// // Change Password Route
// app.post("/api/user/change-password", authenticateToken, async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body

//     // Find the user
//     const user = await User.findById(req.user.userId)
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     // Verify current password
//     const isMatch = await bcrypt.compare(currentPassword, user.password)
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Current password is incorrect" })
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10)

//     // Update the password
//     user.password = hashedPassword
//     await user.save()

//     res.status(200).json({ success: true, message: "Password changed successfully" })
//   } catch (error) {
//     console.error("Error changing password:", error)
//     res.status(500).json({ success: false, message: "Error changing password" })
//   }
// })

// // Delete Account Route
// app.delete("/api/user/delete-account", authenticateToken, async (req, res) => {
//   try {
//     // Find the user
//     const user = await User.findById(req.user.userId)
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     // Delete user's profile image if exists
//     if (user.profileImage) {
//       const imagePath = path.join(__dirname, user.profileImage)
//       if (fs.existsSync(imagePath)) {
//         fs.unlinkSync(imagePath)
//       }
//     }

//     // Update bookings to canceled status
//     await Booking.updateMany({ userId: req.user.userId, status: "active" }, { status: "canceled" })

//     // Delete the user
//     await User.findByIdAndDelete(req.user.userId)

//     res.status(200).json({ success: true, message: "Account deleted successfully" })
//   } catch (error) {
//     console.error("Error deleting account:", error)
//     res.status(500).json({ success: false, message: "Error deleting account" })
//   }
// })

// // Admin Delete User Route
// app.delete("/api/admin/delete-user/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, message: "Invalid user ID format" })
//     }

//     // Find the user
//     const user = await User.findById(userId)
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     // Delete user's profile image if exists
//     if (user.profileImage) {
//       const imagePath = path.join(__dirname, user.profileImage)
//       if (fs.existsSync(imagePath)) {
//         fs.unlinkSync(imagePath)
//       }
//     }

//     // Update bookings to canceled status
//     await Booking.updateMany({ userId: userId, status: "active" }, { status: "canceled" })

//     // Delete the user
//     await User.findByIdAndDelete(userId)

//     res.status(200).json({ success: true, message: "User deleted successfully" })
//   } catch (error) {
//     console.error("Error deleting user:", error)
//     res.status(500).json({ success: false, message: "Error deleting user" })
//   }
// })

// // Lock User Account Route
// app.put("/api/admin/lock-user/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, message: "Invalid user ID format" })
//     }

//     // Find the user and update lock status
//     const user = await User.findByIdAndUpdate(userId, { isLocked: true }, { new: true })

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     res.status(200).json({ success: true, message: "User account locked successfully", user })
//   } catch (error) {
//     console.error("Error locking user account:", error)
//     res.status(500).json({ success: false, message: "Error locking user account" })
//   }
// })

// // Unlock User Account Route
// app.put("/api/admin/unlock-user/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params

//     // Validate if the provided ID is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ success: false, message: "Invalid user ID format" })
//     }

//     // Find the user and update lock status
//     const user = await User.findByIdAndUpdate(userId, { isLocked: false }, { new: true })

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" })
//     }

//     res.status(200).json({ success: true, message: "User account unlocked successfully", user })
//   } catch (error) {
//     console.error("Error unlocking user account:", error)
//     res.status(500).json({ success: false, message: "Error unlocking user account" })
//   }
// })

// // Add these API endpoints for messages

// // Send message from user
// app.post("/api/messages", async (req, res) => {
//   try {
//     const { name, email, phone, subject, message } = req.body

//     // Validate required fields
//     if (!name || !email || !message) {
//       return res.status(400).json({ success: false, message: "Name, email and message are required" })
//     }

//     const newMessage = new Message({
//       name,
//       email,
//       phone,
//       subject,
//       message,
//       replies: [],
//     })

//     await newMessage.save()

//     res.status(201).json({ success: true, message: "Message sent successfully" })
//   } catch (error) {
//     console.error("Error sending message:", error)
//     res.status(500).json({ success: false, message: "Error sending message" })
//   }
// })

// // Get all messages for admin
// app.get("/api/admin/messages", async (req, res) => {
//   try {
//     const messages = await Message.find().sort({ createdAt: -1 })
//     res.status(200).json({ success: true, messages })
//   } catch (error) {
//     console.error("Error fetching messages:", error)
//     res.status(500).json({ success: false, message: "Error fetching messages" })
//   }
// })

// // Mark message as read
// app.put("/api/admin/messages/:id/read", async (req, res) => {
//   try {
//     const message = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true })

//     if (!message) {
//       return res.status(404).json({ success: false, message: "Message not found" })
//     }

//     res.status(200).json({ success: true, message: "Message marked as read" })
//   } catch (error) {
//     console.error("Error marking message as read:", error)
//     res.status(500).json({ success: false, message: "Error marking message as read" })
//   }
// })

// // Reply to a message
// app.post("/api/admin/messages/:id/reply", async (req, res) => {
//   try {
//     const { replyMessage } = req.body

//     if (!replyMessage) {
//       return res.status(400).json({ success: false, message: "Reply message is required" })
//     }

//     const message = await Message.findById(req.params.id)

//     if (!message) {
//       return res.status(404).json({ success: false, message: "Message not found" })
//     }

//     message.replies.push({
//       message: replyMessage,
//       timestamp: new Date(),
//     })

//     await message.save()

//     res.status(200).json({ success: true, message: "Reply sent successfully" })
//   } catch (error) {
//     console.error("Error sending reply:", error)
//     res.status(500).json({ success: false, message: "Error sending reply" })
//   }
// })

// // Add this API endpoint to your server.js file

// // Get active room bookings for report
// app.get("/api/admin/room-bookings-report", async (req, res) => {
//   try {
//     // Fetch only active bookings
//     const bookings = await Booking.find({ status: "active" })

//     // Array to store combined booking and user details
//     const bookingsWithUserDetails = []

//     // Loop through each booking to fetch corresponding user details
//     for (const booking of bookings) {
//       // Find the user corresponding to the userId in the booking
//       const user = await User.findById(booking.userId, "username email")

//       if (user) {
//         // Combine booking details with user details
//         bookingsWithUserDetails.push({
//           bookingId: booking._id,
//           roomId: booking.roomId,
//           startDate: booking.startDate,
//           endDate: booking.endDate,
//           adults: booking.adults,
//           children: booking.children,
//           totalAmount: booking.totalAmount,
//           user: {
//             username: user.username,
//             email: user.email,
//           },
//         })
//       }
//     }

//     // Sort bookings by start date
//     bookingsWithUserDetails.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

//     // Respond with success and the combined booking and user details
//     res.status(200).json({ success: true, bookings: bookingsWithUserDetails })
//   } catch (error) {
//     // Log the error and respond with an error message
//     console.error("Error fetching room bookings report:", error)
//     res.status(500).json({ success: false, message: "Error fetching room bookings report" })
//   }
// })

// // Add these notification endpoints
// app.get("/api/admin/notifications", async (req, res) => {
//   try {
//     const notifications = await Notification.find().sort({ time: -1 }).limit(50)
//     res.status(200).json({ success: true, notifications })
//   } catch (error) {
//     console.error("Error fetching notifications:", error)
//     res.status(500).json({ success: false, message: "Error fetching notifications" })
//   }
// })

// app.put("/api/admin/notifications/:id/read", async (req, res) => {
//   try {
//     const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true })

//     if (!notification) {
//       return res.status(404).json({ success: false, message: "Notification not found" })
//     }

//     res.status(200).json({ success: true, message: "Notification marked as read" })
//   } catch (error) {
//     console.error("Error marking notification as read:", error)
//     res.status(500).json({ success: false, message: "Error marking notification as read" })
//   }
// })

// app.put("/api/admin/notifications/read-all", async (req, res) => {
//   try {
//     await Notification.updateMany({}, { read: true })
//     res.status(200).json({ success: true, message: "All notifications marked as read" })
//   } catch (error) {
//     console.error("Error marking all notifications as read:", error)
//     res.status(500).json({ success: false, message: "Error marking all notifications as read" })
//   }
// })

// // Add WebSocket support for real-time notifications
// const http = require("http")
// const WebSocket = require("ws")

// // Create HTTP server
// const server = http.createServer(app)

// // Create WebSocket server
// const wss = new WebSocket.Server({ server })

// // WebSocket connection handler
// wss.on("connection", (ws) => {
//   console.log("Client connected")

//   // Handle client disconnection
//   ws.on("close", () => {
//     console.log("Client disconnected")
//   })
// })

// // Function to broadcast notifications to all connected clients
// const broadcastNotification = (notification) => {
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(notification))
//     }
//   })
// }

// // Modify the server.listen to use the HTTP server
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`)
// })

// // Add a post-save hook to the Notification model to broadcast new notifications
// notificationSchema.post("save", (doc) => {
//   broadcastNotification(doc)
// })

















const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

// Add this near the top with other requires
const nodemailer = require("nodemailer")

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// MongoDB Connection
mongoose.connect("mongodb+srv://varunesharasu:varunesh@cluster1.lvoka.mongodb.net/resortBooking", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Check MongoDB connection
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))
db.once("open", () => {
  console.log("Connected to MongoDB")
})

// JWT Secret Key
const JWT_SECRET = "your_jwt_secret_key"

// Add this after your JWT_SECRET
const EMAIL_USER = "tvarunesharasu@gmail.com"
const EMAIL_PASS = "xchi mcye epmk bmpd" // Your 16-character app password from Google

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS, // Replace this with your app password
  },
  secure: true,
  tls: {
    rejectUnauthorized: false,
  },
})

// User Schema (with role)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  profileImage: { type: String, default: null }, // Added profile image field
  isVerified: { type: Boolean, default: false }, // Added verification field
  isLocked: { type: Boolean, default: false }, // Added account lock field
})

// Export the model
const User = mongoose.model("User", userSchema)
module.exports = User

// Booking Schema (with status)
const bookingSchema = new mongoose.Schema({
  roomId: String,
  startDate: Date,
  endDate: Date,
  adults: Number,
  children: Number,
  totalAmount: Number,
  userId: String,
  status: { type: String, enum: ["active", "canceled"], default: "active" },
})

const Booking = mongoose.model("Booking", bookingSchema)

// Add this Message Schema after the existing schemas
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String },
  message: { type: String, required: true },
  replies: [
    {
      message: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

const Message = mongoose.model("Message", messageSchema)

// Add this Notification Schema after the existing schemas
const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["booking", "cancellation", "user", "system"],
    default: "system",
  },
  read: { type: Boolean, default: false },
  time: { type: Date, default: Date.now },
  userId: { type: String, required: false }, // Optional, for user-specific notifications
})

const Notification = mongoose.model("Notification", notificationSchema)

// Add this schema for password reset tokens after other schemas
const resetTokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true, default: Date.now, expires: 600 }, // 10 minutes
})

const ResetToken = mongoose.model("ResetToken", resetTokenSchema)

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).send("Access denied. No token provided.")
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token.")
    req.user = user
    next()
  })
}

// Admin Middleware
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied. Admin role required.")
  }
  next()
}

// Register Route
app.post("/api/register", async (req, res) => {
  const { username, email, password, phone, dob } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).send("User already exists")

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, email, password: hashedPassword, phone, dob })
    await newUser.save()

    // Create a notification for new user registration
    const notification = new Notification({
      title: "New User Registration",
      message: `${username} has registered with email ${email}`,
      type: "user",
    })
    await notification.save()

    res.status(201).send("User registered successfully")
  } catch (error) {
    console.error("Error registering user:", error)
    res.status(500).send("Error registering user")
  }
})

// Login Route (includes role in token)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).send("User not found")

    // Check if account is locked
    if (user.isLocked) {
      return res.status(403).send("Account is locked. Please contact support.")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).send("Invalid credentials")

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" })
    res.status(200).json({ token, role: user.role })
  } catch (error) {
    console.error("Error logging in:", error)
    res.status(500).send("Error logging in")
  }
})

// User Dashboard Route
app.get("/api/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password")
    if (!user) return res.status(404).send("User not found")

    const bookings = await Booking.find({
      userId: req.user.userId,
      status: "active",
    })

    res.status(200).json({ user, bookings })
  } catch (error) {
    console.error("Error fetching user data:", error)
    res.status(500).send("Error fetching user data")
  }
})

// Admin Dashboard Route
app.get("/api/admin/users", async (req, res) => {
  try {
    // Fetch users and select only 'username' and 'email'
    const users = await User.find({}, "username email") // Select only 'username' and 'email'

    // Respond with success and the list of users
    res.status(200).json({ success: true, users })
  } catch (error) {
    // Log the error and respond with an error message
    console.error("Error fetching users:", error)
    res.status(500).json({ success: false, message: "Error fetching users" })
  }
})

// Save Booking Route
app.post("/api/book", authenticateToken, async (req, res) => {
  const { roomId, startDate, endDate, adults, children, totalAmount } = req.body
  const userId = req.user.userId

  try {
    const start = new Date(startDate)
    const end = new Date(endDate)

    // Check for overlapping active bookings
    const overlappingBookings = await Booking.find({
      roomId,
      status: "active",
      $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } },
        { startDate: { $gte: start, $lt: end } },
        { endDate: { $gt: start, $lte: end } },
      ],
    })

    if (overlappingBookings.length > 0) {
      return res.status(400).send("Room already booked for these dates")
    }

    const newBooking = new Booking({
      roomId,
      startDate: start,
      endDate: end,
      adults,
      children,
      totalAmount,
      userId,
    })

    await newBooking.save()

    // Get user details for the notification
    const user = await User.findById(userId)

    // Create a notification for new booking
    const notification = new Notification({
      title: "New Booking",
      message: `${user.username} has booked room ${roomId} from ${start.toLocaleDateString()} to ${end.toLocaleDateString()}`,
      type: "booking",
      userId: userId,
    })
    await notification.save()

    res.status(200).send("Booking saved successfully")
  } catch (error) {
    console.error("Error saving booking:", error)
    res.status(500).send("Error saving booking")
  }
})

// Cancel Booking Route
app.delete("/api/bookings/:id", authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId,
        status: "active",
      },
      { status: "canceled" },
      { new: true },
    )

    if (!booking) return res.status(404).send("Booking not found")

    // Get user details for the notification
    const user = await User.findById(req.user.userId)

    // Create a notification for booking cancellation
    const notification = new Notification({
      title: "Booking Canceled",
      message: `${user.username} has canceled booking for room ${booking.roomId}`,
      type: "cancellation",
      userId: req.user.userId,
    })
    await notification.save()

    res.status(200).send("Booking canceled successfully")
  } catch (error) {
    console.error("Error canceling booking:", error)
    res.status(500).send("Error canceling booking")
  }
})

// Fetch Active Bookings for Date Picker
app.get("/api/bookings/:roomId", async (req, res) => {
  try {
    const bookings = await Booking.find(
      {
        roomId: req.params.roomId,
        status: "active",
      },
      "startDate endDate -_id",
    )

    res.status(200).json(bookings)
  } catch (error) {
    console.error("Error fetching booked dates:", error)
    res.status(500).send("Error fetching booked dates")
  }
})

// Admin Login Route
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const admin = await User.findOne({ email, role: "admin" })
    if (!admin) {
      return res.status(401).json({ success: false, message: "Admin not found" })
    }

    if (admin.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" })
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, "secretKey", { expiresIn: "1h" })

    res.json({ success: true, message: "Login successful", token })
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Admin Bookings Route
app.get("/api/admin/bookings", async (req, res) => {
  try {
    // Fetch all bookings from the Booking collection
    const bookings = await Booking.find({})

    // Array to store combined booking and user details
    const bookingsWithUserDetails = []

    // Loop through each booking to fetch corresponding user details
    for (const booking of bookings) {
      // Find the user corresponding to the userId in the booking
      const user = await User.findById(booking.userId, "username email")

      if (user) {
        // Combine booking details with user details
        bookingsWithUserDetails.push({
          bookingId: booking._id,
          roomId: booking.roomId,
          startDate: booking.startDate,
          endDate: booking.endDate,
          adults: booking.adults,
          children: booking.children,
          totalAmount: booking.totalAmount,
          status: booking.status,
          user: {
            username: user.username,
            email: user.email,
          },
        })
      }
    }

    // Respond with success and the combined booking and user details
    res.status(200).json({ success: true, bookings: bookingsWithUserDetails })
  } catch (error) {
    // Log the error and respond with an error message
    console.error("Error fetching bookings:", error)
    res.status(500).json({ success: false, message: "Error fetching bookings" })
  }
})

// Update User Details Route
app.put("/api/user/update", authenticateToken, async (req, res) => {
  try {
    const { username, phone, dob } = req.body

    // Find the user by ID
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).send("User not found")
    }

    // Update only the allowed fields
    if (username) user.username = username
    if (phone) user.phone = phone
    if (dob) user.dob = new Date(dob)

    // Save the updated user
    await user.save()

    // Return the updated user without password
    const updatedUser = await User.findById(req.user.userId).select("-password")
    res.status(200).json({ success: true, user: updatedUser })
  } catch (error) {
    console.error("Error updating user details:", error)
    res.status(500).send("Error updating user details")
  }
})

// Admin View User Details Route

app.get("/api/admin/users/:id", async (req, res) => {
  try {
    const { id } = req.params

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" })
    }

    // Find the user by _id and exclude the password
    const user = await User.findById(id).select("-password")

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    res.status(200).json({ success: true, user })
  } catch (error) {
    console.error("Error fetching user:", error)
    res.status(500).json({ success: false, message: "Error fetching user" })
  }
})

// Verify User Route for Admin
app.put("/api/admin/verify-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" })
    }

    // Find the user and update verification status
    const user = await User.findByIdAndUpdate(userId, { isVerified: true }, { new: true })

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    res.status(200).json({ success: true, message: "User verified successfully", user })
  } catch (error) {
    console.error("Error verifying user:", error)
    res.status(500).json({ success: false, message: "Error verifying user" })
  }
})

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/profile-images"
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, "profile-" + uniqueSuffix + ext)
  },
})

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    cb(new Error("Only image files are allowed!"), false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
})

// Upload Profile Image Route
app.post("/api/user/upload-profile-image", authenticateToken, upload.single("profileImage"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" })
    }

    // Find the user
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    // Delete old profile image if exists
    if (user.profileImage) {
      const oldImagePath = path.join(__dirname, user.profileImage)
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath)
      }
    }

    // Update user with new profile image path - store only the relative path
    const imagePath = `/uploads/profile-images/${req.file.filename}`
    user.profileImage = imagePath
    await user.save()

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      profileImage: imagePath,
    })
  } catch (error) {
    console.error("Error uploading profile image:", error)
    res.status(500).json({ success: false, message: "Error uploading profile image" })
  }
})

// Add this to your server.js file

// User Activity Route for Admin
app.get("/api/admin/user-activity/:userId", async (req, res) => {
  try {
    const { userId } = req.params

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" })
    }

    // Get all bookings for this user
    const bookings = await Booking.find({ userId })

    // Initialize activities array
    const activities = []

    // Add booking activities
    bookings.forEach((booking) => {
      // Add the booking creation activity
      activities.push({
        type: "booking",
        date: booking.createdAt || booking._id.getTimestamp(),
        details: {
          roomId: booking.roomId,
          startDate: booking.startDate,
          endDate: booking.endDate,
          adults: booking.adults,
          children: booking.children,
          totalAmount: booking.totalAmount,
        },
      })

      // If booking was canceled, add cancellation activity
      if (booking.status === "canceled") {
        activities.push({
          type: "cancellation",
          date: booking.updatedAt || new Date(),
          details: {
            roomId: booking.roomId,
            startDate: booking.startDate,
            endDate: booking.endDate,
          },
        })
      }
    })

    // Sort activities by date (newest first)
    activities.sort((a, b) => new Date(b.date) - new Date(a.date))

    res.status(200).json({ success: true, activities })
  } catch (error) {
    console.error("Error fetching user activity:", error)
    res.status(500).json({ success: false, message: "Error fetching user activity" })
  }
})

// To track user profile updates, modify your update user route:
app.put("/api/user/update", authenticateToken, async (req, res) => {
  try {
    const { username, phone, dob } = req.body
    const updatedFields = {}

    // Find the user by ID
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).send("User not found")
    }

    // Track which fields were updated
    if (username && username !== user.username) {
      updatedFields.username = username
      user.username = username
    }
    if (phone && phone !== user.phone) {
      updatedFields.phone = phone
      user.phone = phone
    }
    if (dob && new Date(dob).toString() !== new Date(user.dob).toString()) {
      updatedFields.dob = dob
      user.dob = new Date(dob)
    }

    // Save the updated user
    await user.save()

    // If fields were updated, log the activity
    if (Object.keys(updatedFields).length > 0) {
      // In a real application, you would create an Activity model and store this
      // This is a simplified example
      console.log("User update activity:", {
        userId: user._id,
        type: "update",
        date: new Date(),
        details: updatedFields,
      })
    }

    // Return the updated user without password
    const updatedUser = await User.findById(req.user.userId).select("-password")
    res.status(200).json({ success: true, user: updatedUser })
  } catch (error) {
    console.error("Error updating user details:", error)
    res.status(500).send("Error updating user details")
  }
})

// Change Password Route
app.post("/api/user/change-password", authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Find the user
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" })
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update the password
    user.password = hashedPassword
    await user.save()

    res.status(200).json({ success: true, message: "Password changed successfully" })
  } catch (error) {
    console.error("Error changing password:", error)
    res.status(500).json({ success: false, message: "Error changing password" })
  }
})

// Delete Account Route
app.delete("/api/user/delete-account", authenticateToken, async (req, res) => {
  try {
    // Find the user
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    // Delete user's profile image if exists
    if (user.profileImage) {
      const imagePath = path.join(__dirname, user.profileImage)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }

    // Update bookings to canceled status
    await Booking.updateMany({ userId: req.user.userId, status: "active" }, { status: "canceled" })

    // Delete the user
    await User.findByIdAndDelete(req.user.userId)

    res.status(200).json({ success: true, message: "Account deleted successfully" })
  } catch (error) {
    console.error("Error deleting account:", error)
    res.status(500).json({ success: false, message: "Error deleting account" })
  }
})

// Admin Delete User Route
app.delete("/api/admin/delete-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" })
    }

    // Find the user
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    // Delete user's profile image if exists
    if (user.profileImage) {
      const imagePath = path.join(__dirname, user.profileImage)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }

    // Update bookings to canceled status
    await Booking.updateMany({ userId: userId, status: "active" }, { status: "canceled" })

    // Delete the user
    await User.findByIdAndDelete(userId)

    res.status(200).json({ success: true, message: "User deleted successfully" })
  } catch (error) {
    console.error("Error deleting user:", error)
    res.status(500).json({ success: false, message: "Error deleting user" })
  }
})

// Lock User Account Route
app.put("/api/admin/lock-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" })
    }

    // Find the user and update lock status
    const user = await User.findByIdAndUpdate(userId, { isLocked: true }, { new: true })

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    res.status(200).json({ success: true, message: "User account locked successfully", user })
  } catch (error) {
    console.error("Error locking user account:", error)
    res.status(500).json({ success: false, message: "Error locking user account" })
  }
})

// Unlock User Account Route
app.put("/api/admin/unlock-user/:userId", async (req, res) => {
  try {
    const { userId } = req.params

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID format" })
    }

    // Find the user and update lock status
    const user = await User.findByIdAndUpdate(userId, { isLocked: false }, { new: true })

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    res.status(200).json({ success: true, message: "User account unlocked successfully", user })
  } catch (error) {
    console.error("Error unlocking user account:", error)
    res.status(500).json({ success: false, message: "Error unlocking user account" })
  }
})

// Add these API endpoints for messages

// Send message from user
app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email and message are required" })
    }

    const newMessage = new Message({
      name,
      email,
      phone,
      subject,
      message,
      replies: [],
    })

    await newMessage.save()

    res.status(201).json({ success: true, message: "Message sent successfully" })
  } catch (error) {
    console.error("Error sending message:", error)
    res.status(500).json({ success: false, message: "Error sending message" })
  }
})

// Get all messages for admin
app.get("/api/admin/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.status(200).json({ success: true, messages })
  } catch (error) {
    console.error("Error fetching messages:", error)
    res.status(500).json({ success: false, message: "Error fetching messages" })
  }
})

// Mark message as read
app.put("/api/admin/messages/:id/read", async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true })

    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" })
    }

    res.status(200).json({ success: true, message: "Message marked as read" })
  } catch (error) {
    console.error("Error marking message as read:", error)
    res.status(500).json({ success: false, message: "Error marking message as read" })
  }
})

// Reply to a message
app.post("/api/admin/messages/:id/reply", async (req, res) => {
  try {
    const { replyMessage } = req.body

    if (!replyMessage) {
      return res.status(400).json({ success: false, message: "Reply message is required" })
    }

    const message = await Message.findById(req.params.id)

    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" })
    }

    message.replies.push({
      message: replyMessage,
      timestamp: new Date(),
    })

    await message.save()

    res.status(200).json({ success: true, message: "Reply sent successfully" })
  } catch (error) {
    console.error("Error sending reply:", error)
    res.status(500).json({ success: false, message: "Error sending reply" })
  }
})

// Add this API endpoint to your server.js file

// Get active room bookings for report
app.get("/api/admin/room-bookings-report", async (req, res) => {
  try {
    // Fetch only active bookings
    const bookings = await Booking.find({ status: "active" })

    // Array to store combined booking and user details
    const bookingsWithUserDetails = []

    // Loop through each booking to fetch corresponding user details
    for (const booking of bookings) {
      // Find the user corresponding to the userId in the booking
      const user = await User.findById(booking.userId, "username email")

      if (user) {
        // Combine booking details with user details
        bookingsWithUserDetails.push({
          bookingId: booking._id,
          roomId: booking.roomId,
          startDate: booking.startDate,
          endDate: booking.endDate,
          adults: booking.adults,
          children: booking.children,
          totalAmount: booking.totalAmount,
          user: {
            username: user.username,
            email: user.email,
          },
        })
      }
    }

    // Sort bookings by start date
    bookingsWithUserDetails.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

    // Respond with success and the combined booking and user details
    res.status(200).json({ success: true, bookings: bookingsWithUserDetails })
  } catch (error) {
    // Log the error and respond with an error message
    console.error("Error fetching room bookings report:", error)
    res.status(500).json({ success: false, message: "Error fetching room bookings report" })
  }
})

// Add these notification endpoints
app.get("/api/admin/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ time: -1 }).limit(50)
    res.status(200).json({ success: true, notifications })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    res.status(500).json({ success: false, message: "Error fetching notifications" })
  }
})

app.put("/api/admin/notifications/:id/read", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true })

    if (!notification) {
      return res.status(404).json({ success: false, message: "Notification not found" })
    }

    res.status(200).json({ success: true, message: "Notification marked as read" })
  } catch (error) {
    console.error("Error marking notification as read:", error)
    res.status(500).json({ success: false, message: "Error marking notification as read" })
  }
})

app.put("/api/admin/notifications/read-all", async (req, res) => {
  try {
    await Notification.updateMany({}, { read: true })
    res.status(200).json({ success: true, message: "All notifications marked as read" })
  } catch (error) {
    console.error("Error marking all notifications as read:", error)
    res.status(500).json({ success: false, message: "Error marking all notifications as read" })
  }
})

// Add WebSocket support for real-time notifications
const http = require("http")
const WebSocket = require("ws")

// Create HTTP server
const server = http.createServer(app)

// Create WebSocket server
const wss = new WebSocket.Server({ server })

// WebSocket connection handler
wss.on("connection", (ws) => {
  console.log("Client connected")

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected")
  })
})

// Function to broadcast notifications to all connected clients
const broadcastNotification = (notification) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(notification))
    }
  })
}

// Modify the server.listen to use the HTTP server

// Add these routes before the server.listen line

// Forgot Password - Send Reset PIN
app.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body

  try {
    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    // Generate 6-digit PIN
    const pin = Math.floor(100000 + Math.random() * 900000).toString()

    // Delete any existing tokens for this email
    await ResetToken.deleteMany({ email })

    // Create new reset token
    const resetToken = new ResetToken({
      email,
      token: pin,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
    })
    await resetToken.save()

    // Send email with PIN
    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Password Reset PIN",
      text: `Your password reset PIN is: ${pin}\nThis PIN will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>We received a request to reset your password. Here's your verification PIN:</p>
          <div style="background: #f4f4f4; padding: 10px; border-radius: 5px; font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0;">
            ${pin}
          </div>
          <p>This PIN will expire in 10 minutes. If you didn't request this, please ignore this email.</p>
          <p style="margin-top: 30px; color: #666;">Best regards,<br/>The Resort Booking Team</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({
      success: true,
      message: "Password reset PIN sent to your email",
    })
  } catch (error) {
    console.error("Error in forgot password:", error)
    res.status(500).json({
      success: false,
      message: "Error processing forgot password request",
    })
  }
})

// Verify Reset PIN
app.post("/api/verify-reset-pin", async (req, res) => {
  const { email, pin } = req.body

  try {
    // Find the token
    const token = await ResetToken.findOne({ email, token: pin })

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired PIN",
      })
    }

    // Check if token is expired
    if (token.expiresAt < new Date()) {
      await ResetToken.deleteOne({ _id: token._id })
      return res.status(400).json({
        success: false,
        message: "PIN has expired",
      })
    }

    // If valid, create a temporary token for password reset
    const tempToken = jwt.sign(
      { email, purpose: "password_reset" },
      JWT_SECRET,
      { expiresIn: "10m" }, // 10 minutes
    )

    // Delete the PIN token as it's been used
    await ResetToken.deleteOne({ _id: token._id })

    res.status(200).json({
      success: true,
      message: "PIN verified",
      tempToken,
    })
  } catch (error) {
    console.error("Error verifying reset PIN:", error)
    res.status(500).json({
      success: false,
      message: "Error verifying reset PIN",
    })
  }
})

// Reset Password (after PIN verification)
app.post("/api/reset-password", async (req, res) => {
  const { tempToken, newPassword } = req.body

  try {
    // Verify the temporary token
    const decoded = jwt.verify(tempToken, JWT_SECRET)

    // Check if token is for password reset
    if (decoded.purpose !== "password_reset") {
      return res.status(400).json({
        success: false,
        message: "Invalid token purpose",
      })
    }

    // Find user by email
    const user = await User.findOne({ email: decoded.email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update user's password
    user.password = hashedPassword
    await user.save()

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    })
  } catch (error) {
    console.error("Error resetting password:", error)
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        success: false,
        message: "Reset token has expired",
      })
    }
    res.status(500).json({
      success: false,
      message: "Error resetting password",
    })
  }
})

// Modify the server.listen to use the HTTP server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// Add a post-save hook to the Notification model to broadcast new notifications
notificationSchema.post("save", (doc) => {
  broadcastNotification(doc)
})
