# 🏨 ResortEase – Online Booking Management System

**ResortEase** is a full-stack web application developed as a **consultancy project** for **Royal Castle Farm Stay Resort**, located in **Odathurai, Erode**. 
The system streamlines the resort’s reservation process, improves administrative efficiency, and provides a seamless booking experience for guests using modern web technologies.

---

## 📌 Project Overview

Traditionally, resort bookings were handled manually through calls and registers. ResortEase modernizes this process by offering a centralized, digital platform with secure login, real-time room availability, and UPI-based GPay payment integration. The system supports both user-side operations and admin-side management.

---

## 🎯 Project Objectives

- Digitize the booking process for Royal Castle Farm Stay Resort
- Implement secure user and admin authentication
- Enable users to browse rooms, apply discount coupons, and book stays
- Integrate QR-based UPI payments for seamless transactions
- Provide an admin dashboard for booking reports, user management, and availability tracking

---

## 🧰 Tech Stack

| Layer         | Technologies Used                        |
|---------------|------------------------------------------|
| **Frontend**  | React.js, Tailwind CSS, React Router     |
| **Backend**   | Node.js, Express.js                      |
| **Database**  | MongoDB Atlas                            |
| **Security**  | JWT, BcryptJS                            |
| **Email/OTP** | Nodemailer                               |
| **Payments**  | GPay via QR Code (UPI Integration)       |
| **Tools**     | Visual Studio Code, Postman              |

---

## ✅ Key Features

### 👤 User Features
- Registration/Login with JWT authentication
- Password reset via OTP (Email-based using Nodemailer)
- View room listings with details and amenities
- Book rooms with date selection, guest count, and coupon application
- UPI payments via dynamically generated GPay QR Code
- View booking history and manage profile with image upload

### 🔐 Admin Features
- Admin-exclusive login with role-based access
- Add, update, or delete room details
- View all user profiles and bookings
- Export and analyze booking reports
- Track total revenue and room availability

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js
- MongoDB Atlas
- Gmail app password for Nodemailer

### Setup Instructions

- Clone the Repository
```bash
git clone https://github.com/vedhavithyaseenivasan/ResortEase.git
cd ResortEase


- Backend Setup
```bash
cd server
npm install


- Create a .env file with the following
```bash
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
EMAIL_USER=<your_email>
EMAIL_PASS=<your_app_password>


- Start the server
```bash
node server.js


- Frontend Setup
```bash
cd ../client
npm install
npm start


---

## 🌐 Live Demo

You can access the live version of ResortEase here:  
👉 [Visit ResortEase](https://lnkd.in/gKenKhvu)

---

##  🚀 Future Enhancements
- Real-time customer support chat

- Automated email confirmations post-booking

- Calendar-based room availability view

- Seasonal coupon management system

- Payment gateway integrations like Razorpay or Stripe

---

## 🔚 Conclusion

ResortEase successfully delivers a complete online booking solution tailored for the hospitality domain.Developed as a consultancy project for Royal Castle Farm Stay Resort in Odathurai, Erode, the application ensures smooth, transparent, and efficient resort operations. By combining secure authentication, intuitive design, and real-time data management, the platform enhances the experience for both guests and administrators. Its scalable architecture and modern tech stack make it adaptable for future enhancements and wider deployment in similar hospitality establishments.



