// "use client"

// import { useState, useEffect, useMemo } from "react"
// import { Link } from "react-router-dom"
// import "./Home.css"
// import ResortAssistant from "./resort-assistant"

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0)

//   // Carousel images
//   const carouselImages = useMemo(() => [
//     {
//       title: "Royal Castle",
//       subtitle: "A memorable experience",
//       type: "video",
//     },
//     {
//       image: "./images/page-title.jpg",
//       title: "Royal Castle Farm Stay",
//       subtitle: "Experience luxury in the heart of nature",
//       type: "image",
//     },
//     {
//       url: "https://r1imghtlak.mmtcdn.com/1281c246dff811eda0030a58a9feac02.jpg",
//       title: "Royal Castle Farm Stay",
//       subtitle: "Experience luxury in the heart of nature",
//       type: "image",
//     },
//     {
//       url: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-15182-f2e76d04dff311ed8a570a58a9feac02.jpg",
//       title: "Luxurious Accommodations",
//       subtitle: "Comfort meets elegance in every room",
//       type: "image",
//     },
//     {
//       url: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981440-f095a7fae03411edbaad0a58a9feac02.jpg",
//       title: "Premium Amenities",
//       subtitle: "Every detail crafted for your perfect stay",
//       type: "image",
//     },
//     {
//       url: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-3712-7c6d8866e03911ed95310a58a9feac02.jpg",
//       title: "Serene Surroundings",
//       subtitle: "Escape to tranquility and natural beauty",
//       type: "image",
//     },
//   ], [])

//   // Resort features
//   const resortFeatures = [
//     {
//       icon: "🍽️",
//       title: "Gourmet Dining",
//       description: "Experience exquisite cuisine prepared by our master chefs using locally sourced ingredients.",
//     },
//     {
//       icon: "🏊",
//       title: "Infinity Pool",
//       description: "Relax in our stunning infinity pool with panoramic views of the surrounding landscape.",
//     },
//     {
//       icon: "🧖",
//       title: "Luxury Spa",
//       description: "Rejuvenate your body and mind with our premium spa treatments and wellness programs.",
//     },
//     {
//       icon: "🚶",
//       title: "Nature Trails",
//       description: "Explore the beautiful surroundings with our guided nature walks and hiking trails.",
//     },
//     {
//       icon: "🏇",
//       title: "Horse Riding",
//       description: "Enjoy scenic horse riding experiences through our expansive estate and countryside.",
//     },
//     {
//       icon: "🌿",
//       title: "Organic Farm",
//       description: "Visit our organic farm where we grow fresh produce used in our farm-to-table restaurant.",
//     },
//     {
//       icon: "🏕️",
//       title: "Nature Retreat",
//       description: "Escape to our serene nature retreat, surrounded by lush greenery and tranquil landscapes.",
//     },
//     {
//       icon: "🌊",
//       title: "Lakeview",
//       description: "Unwind by the peaceful lakeside, where you can enjoy breathtaking views and soothing breezes.",
//     },
//   ]

//   // Testimonials
//   const testimonials = [
//     {
//       text: "Our stay at Royal Castle was absolutely magical. The staff went above and beyond to make our anniversary special.",
//       author: "Guru Prasaath",
//       location: "Anthiyur",
//     },
//     {
//       text: "The perfect blend of luxury and nature. We loved every moment of our stay and can't wait to return!",
//       author: "Bharath",
//       location: "Bhavani",
//     },
//     {
//       text: "Impeccable service, stunning views, and the most comfortable beds I've ever slept in. Highly recommended!",
//       author: "Rathy",
//       location: "Gobi",
//     },
//   ]

//   // Resort activities
//   const activities = [
//     {
//       title: "Farm Tours",
//       description: "Explore our working organic farm and learn about sustainable farming practices.",
//       image:
//         "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-13432-81a16730e32711eda8160a58a9feac02.jpg",
//     },
//     {
//       title: "Cooking Classes",
//       description: "Learn to prepare traditional dishes with our expert chefs using fresh farm ingredients.",
//       image:
//         "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981484-024d20a4e32811eda8160a58a9feac02.jpg",
//     },
//     {
//       title: "Yoga & Meditation",
//       description: "Find inner peace with daily yoga and meditation sessions in our serene garden pavilion.",
//       image:
//         "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-15182-f2e76d04dff311ed8a570a58a9feac02.jpg",
//     },
//   ]

//   // Auto-advance carousel
//   useEffect(() => {
//     let interval

//     // Function to handle automatic slide advancement
//     const startAutoSlide = () => {
//       // Clear any existing interval
//       if (interval) clearInterval(interval)

//       // Set a new interval
//       interval = setInterval(() => {
//         setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length)
//       }, 5000) // 5 seconds for image slides
//     }

//     // If current slide is video (first slide), don't start auto-advance
//     // Otherwise start the auto-advance for images
//     if (currentSlide === 0 && carouselImages[0].type === "video") {
//       // Don't start auto-advance for video slide
//       if (interval) clearInterval(interval)
//     } else {
//       // Start auto-advance for image slides
//       startAutoSlide()
//     }

//     return () => {
//       if (interval) clearInterval(interval)
//     }
//   }, 
//   [currentSlide, carouselImages])

//   // Add a function to handle video end
//   const handleVideoEnded = () => {
//     // Move to the next slide when video ends
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length)
//   }

//   // Handle carousel navigation
//   const goToSlide = (index) => {
//     setCurrentSlide(index)
//   }

//   const nextSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselImages.length) % carouselImages.length)
//   }

//   return (
//     <div className="home-page">
//       {/* Hero Section with Carousel */}
//       <section className="hero-section">
//         <div className="carousel-container">
//           {carouselImages.map((item, index) => (
//             <div
//               key={index}
//               className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
//               style={item.type === "image" ? { backgroundImage: `url(${item.url})` } : {}}
//             >
//               {item.type === "video" && (
//                 <div className="video-container">
//                   <video autoPlay muted playsInline src="/videos/royal.mp4" onEnded={handleVideoEnded}>
//                     Your browser does not support the video tag.
//                   </video>
//                 </div>
//               )}
//               <div className="carousel-content">
//                 <h1 className="slide-title">{item.title}</h1>
//                 <p className="slide-subtitle">{item.subtitle}</p>
//                 <Link to="/rooms">
//                   <button className="explore-btn">Explore Our Rooms</button>
//                 </Link>
//               </div>
//             </div>
//           ))}

//           <button className="carousel-arrow prev" onClick={prevSlide}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="15 18 9 12 15 6"></polyline>
//             </svg>
//           </button>
//           <button className="carousel-arrow next" onClick={nextSlide}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="9 18 15 12 9 6"></polyline>
//             </svg>
//           </button>

//           <div className="carousel-indicators">
//             {carouselImages.map((_, index) => (
//               <button
//                 key={index}
//                 className={`indicator ${index === currentSlide ? "active" : ""}`}
//                 onClick={() => goToSlide(index)}
//               ></button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Welcome Section */}
//       <section className="welcome-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>Welcome to Royal Castle Farm Stay</h2>
//             <div className="divider"></div>
//             <p>Experience the perfect blend of luxury, comfort, and natural beauty</p>
//           </div>

//           <div className="welcome-content">
//             <div className="welcome-text">
//               <p>
//                 Nestled in the serene countryside, Royal Castle Farm Stay offers an exclusive retreat where luxury meets
//                 nature. Our resort combines elegant accommodations with breathtaking views and world-class amenities to
//                 create an unforgettable experience for our guests.
//               </p>
//               <p>
//                 Whether you're seeking a romantic getaway, a family vacation, or a peaceful retreat, our dedicated staff
//                 is committed to making your stay exceptional in every way.
//               </p>
//               <Link to="/rooms">
//                 <button className="secondary-btn">Discover Our Accommodations</button>
//               </Link>
//             </div>
//             <div className="welcome-image">
//               <img
//                 src="https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-13432-81a16730e32711eda8160a58a9feac02.jpg"
//                 alt="Resort Welcome"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>Resort Highlights</h2>
//             <div className="divider"></div>
//             <p>Discover what makes our resort a truly special destination</p>
//           </div>

//           <div className="features-grid">
//             {resortFeatures.map((feature, index) => (
//               <div key={index} className="feature-card">
//                 <div className="feature-icon">{feature.icon}</div>
//                 <h3>{feature.title}</h3>
//                 <p>{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Activities Section */}
//       <section className="activities-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>Experiences & Activities</h2>
//             <div className="divider"></div>
//             <p>Immerse yourself in unique experiences during your stay</p>
//           </div>

//           <div className="activities-grid">
//             {activities.map((activity, index) => (
//               <div key={index} className="activity-card">
//                 <div className="activity-image">
//                   <img src={activity.image || "/placeholder.svg"} alt={activity.title} />
//                   <div className="activity-overlay"></div>
//                 </div>
//                 <div className="activity-content">
//                   <h3>{activity.title}</h3>
//                   <p>{activity.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="activities-cta">
//             <Link to="/activities">
//               <button className="explore-btn">View All Activities</button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="testimonials-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>Guest Experiences</h2>
//             <div className="divider"></div>
//             <p>What our guests have to say about their stay</p>
//           </div>

//           <div className="testimonials-grid">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="testimonial-card">
//                 <div className="testimonial-quote">"</div>
//                 <p className="testimonial-text">{testimonial.text}</p>
//                 <div className="testimonial-author">
//                   <p className="author-name">{testimonial.author}</p>
//                   <p className="author-location">{testimonial.location}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Location Section */}
//       <section className="location-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>Our Location</h2>
//             <div className="divider"></div>
//             <p>Find us in a picturesque setting with easy access to local attractions</p>
//           </div>

//           <div className="location-content">
//             <div className="location-info">
//               <div className="address-block">
//                 <h3>Address</h3>
//                 <div className="info-with-icon">
//                   <div className="icon">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//                       <circle cx="12" cy="10" r="3"></circle>
//                     </svg>
//                   </div>
//                   <div className="info-text">
//                     <p>Royal Castle Farm Stay</p>
//                     <p>SF.No.328/4, Andipalayam Road, EnneiKadai Karar, Odathurai</p>
//                     <p>Erode, Tamil Nadu, 638455</p>
//                     <p>India</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="contact-block">
//                 <h3>Contact</h3>
//                 <div className="info-with-icon">
//                   <div className="icon">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//                     </svg>
//                   </div>
//                   <div className="info-text">
//                     <p>
//                       <strong>Phone:</strong> +91 98765 43210
//                     </p>
//                   </div>
//                 </div>
//                 <div className="info-with-icon">
//                   <div className="icon">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//                       <polyline points="22,6 12,13 2,6"></polyline>
//                     </svg>
//                   </div>
//                   <div className="info-text">
//                     <p>
//                       <strong>Email:</strong> info@royalcastlefarmstay.com
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="directions-block">
//                 <h3>Getting Here</h3>
//                 <div className="info-with-icon">
//                   <div className="icon">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <circle cx="12" cy="12" r="10"></circle>
//                       <polyline points="12 6 12 12 16 14"></polyline>
//                     </svg>
//                   </div>
//                   <div className="info-text">
//                     <p>
//                       <strong>From Airport:</strong> 1 hour 45 minutes drive (83 km)
//                     </p>
//                     <p>
//                       <strong>From Railway Station:</strong> 45 minutes drive (35 km)
//                     </p>
//                     <p>
//                       <strong>From City Center:</strong> 15 minutes drive (8 km)
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="map-container">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.2713499147926!2d77.51667267452558!3d11.460329546207937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba93fb37c1c7097%3A0x7acf44fa3ecbe7ec!2sRoyal%20Castle%20Farm%20Stay%20Resort!5e0!3m2!1sen!2sth!4v1744955515641!5m2!1sen!2sth"
//                 width="100%"
//                 height="450"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Royal Castle Farm Stay Location Map"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Sustainability Section */}
//       <section className="sustainability-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>Our Commitment to Sustainability</h2>
//             <div className="divider"></div>
//             <p>Discover how we're working to protect our environment and support our local community</p>
//           </div>

//           <div className="sustainability-content">
//             <div className="sustainability-images">
//               <div className="image-grid">
//                 <img
//                   src="https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981440-f095a7fae03411edbaad0a58a9feac02.jpg"
//                   alt="Organic Garden"
//                 />
//                 <img
//                   src="https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-3712-7c6d8866e03911ed95310a58a9feac02.jpg"
//                   alt="Water Conservation"
//                 />
//                 <img src="https://r1imghtlak.mmtcdn.com/1281c246dff811eda0030a58a9feac02.jpg" alt="Local Artisans" />
//               </div>
//             </div>

//             <div className="sustainability-initiatives">
//               <div className="initiative-card">
//                 <h3>Organic Farming</h3>
//                 <p>
//                   Our on-site organic farm produces fresh vegetables, fruits, and herbs used in our restaurant, reducing
//                   food miles and ensuring the highest quality ingredients.
//                 </p>
//               </div>

//               <div className="initiative-card">
//                 <h3>Renewable Energy</h3>
//                 <p>
//                   We've installed solar panels that generate up to 70% of our resort's electricity needs, significantly
//                   reducing our carbon footprint.
//                 </p>
//               </div>

//               <div className="initiative-card">
//                 <h3>Water Conservation</h3>
//                 <p>
//                   Our rainwater harvesting system and water recycling plant help us conserve this precious resource
//                   while maintaining our lush gardens.
//                 </p>
//               </div>

//               <div className="initiative-card">
//                 <h3>Community Support</h3>
//                 <p>
//                   We partner with local artisans and businesses, showcasing their products in our resort and providing
//                   employment opportunities for the local community.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="cta-section">
//         <div className="container">
//           <div className="cta-content">
//             <h2>Ready for an Unforgettable Experience?</h2>
//             <p>Book your stay now and create memories that will last a lifetime</p>
//             <Link to="/rooms">
//               <button className="cta-btn">Book Your Stay</button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <div className="container">
//           <div className="footer-content">
//             <div className="footer-about">
//               <h3>Royal Castle Farm Stay</h3>
//               <p>
//                 Experience luxury in harmony with nature at our exclusive farm stay resort in the beautiful countryside
//                 of Tamil Nadu.
//               </p>
//               <div className="social-icons">
//                 <a
//                   href="https://www.facebook.com/people/Royal-Castle-Farm-Stay-Resort/61567773867854/#"
//                   className="social-icon"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
//                   </svg>
//                 </a>
//                 <a href="https://www.instagram.com/royalcastlefarm/?hl=en" className="social-icon">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
//                     <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
//                     <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
//                   </svg>
//                 </a>
//                 <a href="https://x.com/royalcastlefarm" className="social-icon">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
//                   </svg>
//                 </a>
//                 <a href="https://youtu.be/q7JYJGYZf5Q?si=wykUX7m81JTiGNJO" className="social-icon">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
//                     <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
//                   </svg>
//                 </a>
//               </div>
//             </div>

//             <div className="footer-links">
//               <h3>Quick Links</h3>
//               <ul>
//                 <li>
//                   <Link to="/rooms">Accommodations</Link>
//                 </li>
//                 <li>
//                   <Link to="/activities">Activities</Link>
//                 </li>
//                 <li>
//                   <Link to="/dining">Dining</Link>
//                 </li>
//                 <li>
//                   <Link to="/spa">Spa & Wellness</Link>
//                 </li>
//                 <li>
//                   <Link to="/Gallery">Gallery</Link>
//                 </li>
//               </ul>
//             </div>

//             <div className="footer-contact">
//               <h3>Contact Us</h3>
//               <div className="contact-item">
//                 <div className="contact-icon">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//                     <circle cx="12" cy="10" r="3"></circle>
//                   </svg>
//                 </div>
//                 <p>SF.No.328/4, Andipalayam Road, EnneiKadai Karar, Odathurai, Erode, Tamil Nadu, 638455</p>
//               </div>
//               <div className="contact-item">
//                 <div className="contact-icon">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//                   </svg>
//                 </div>
//                 <p>+91 98765 43210</p>
//               </div>
//               <div className="contact-item">
//                 <div className="contact-icon">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//                     <polyline points="22,6 12,13 2,6"></polyline>
//                   </svg>
//                 </div>
//                 <p>info@royalcastlefarmstay.com</p>
//               </div>
//             </div>

//             <div className="footer-newsletter">
//               <h3>Newsletter</h3>
//               <p>Subscribe to receive updates on special offers and events.</p>
//               <form className="newsletter-form">
//                 <input type="email" placeholder="Your email address" required />
//                 <button type="submit">Subscribe</button>
//               </form>
//             </div>
//           </div>

//           <div className="footer-bottom">
//             <p>&copy; {new Date().getFullYear()} Royal Castle Farm Stay. All rights reserved.</p>
//             <div className="footer-legal">
//               <Link to="/privacy-policy">Privacy Policy</Link>
//               <span className="separator">|</span>
//               <Link to="/terms">Terms & Conditions</Link>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Chatbot */}
//       <ResortAssistant />
//     </div>
//   )
// }

// export default Home


















// "use client"

// import { useState, useEffect, useMemo } from "react"
// import { Link } from "react-router-dom"
// import "./Home.css"
// import ResortAssistant from "./resort-assistant"
// import GuideTour from "./guide-tour"
// import CookieConsent from "./cookie-consent"
// import CookieManager from "./cookie-manager"

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [showGuide, setShowGuide] = useState(false)
//   const [cookiePreferencesSet, setCookiePreferencesSet] = useState(false)

//   // Carousel images
//   const carouselImages = useMemo(
//     () => [
//       {
//         title: "Royal Castle",
//         subtitle: "A memorable experience",
//         type: "video",
//       },
//       {
//         image: "./images/page-title.jpg",
//         title: "Royal Castle Farm Stay",
//         subtitle: "Experience luxury in the heart of nature",
//         type: "image",
//       },
//       {
//         url: "https://r1imghtlak.mmtcdn.com/1281c246dff811eda0030a58a9feac02.jpg",
//         title: "Royal Castle Farm Stay",
//         subtitle: "Experience luxury in the heart of nature",
//         type: "image",
//       },
//       {
//         url: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-15182-f2e76d04dff311ed8a570a58a9feac02.jpg",
//         title: "Luxurious Accommodations",
//         subtitle: "Comfort meets elegance in every room",
//         type: "image",
//       },
//       {
//         url: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981440-f095a7fae03411edbaad0a58a9feac02.jpg",
//         title: "Premium Amenities",
//         subtitle: "Every detail crafted for your perfect stay",
//         type: "image",
//       },
//       {
//         url: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-3712-7c6d8866e03911ed95310a58a9feac02.jpg",
//         title: "Serene Surroundings",
//         subtitle: "Escape to tranquility and natural beauty",
//         type: "image",
//       },
//     ],
//     [],
//   )

//   // Resort features
//   const resortFeatures = [
//     {
//       icon: "🍽️",
//       title: "Gourmet Dining",
//       description: "Experience exquisite cuisine prepared by our master chefs using locally sourced ingredients.",
//     },
//     {
//       icon: "🏊",
//       title: "Infinity Pool",
//       description: "Relax in our stunning infinity pool with panoramic views of the surrounding landscape.",
//     },
//     {
//       icon: "🧖",
//       title: "Luxury Spa",
//       description: "Rejuvenate your body and mind with our premium spa treatments and wellness programs.",
//     },
//     {
//       icon: "🚶",
//       title: "Nature Trails",
//       description: "Explore the beautiful surroundings with our guided nature walks and hiking trails.",
//     },
//     {
//       icon: "🏇",
//       title: "Horse Riding",
//       description: "Enjoy scenic horse riding experiences through our expansive estate and countryside.",
//     },
//     {
//       icon: "🌿",
//       title: "Organic Farm",
//       description: "Visit our organic farm where we grow fresh produce used in our farm-to-table restaurant.",
//     },
//     {
//       icon: "🏕️",
//       title: "Nature Retreat",
//       description: "Escape to our serene nature retreat, surrounded by lush greenery and tranquil landscapes.",
//     },
//     {
//       icon: "🌊",
//       title: "Lakeview",
//       description: "Unwind by the peaceful lakeside, where you can enjoy breathtaking views and soothing breezes.",
//     },
//   ]

//   // Testimonials
//   const testimonials = [
//     {
//       text: "Our stay at Royal Castle was absolutely magical. The staff went above and beyond to make our anniversary special.",
//       author: "Guru Prasaath",
//       location: "Anthiyur",
//     },
//     {
//       text: "The perfect blend of luxury and nature. We loved every moment of our stay and can't wait to return!",
//       author: "Bharath",
//       location: "Bhavani",
//     },
//     {
//       text: "Impeccable service, stunning views, and the most comfortable beds I've ever slept in. Highly recommended!",
//       author: "Rathy",
//       location: "Gobi",
//     },
//   ]

//   // Resort activities
//   const activities = [
//     {
//       title: "Farm Tours",
//       description: "Explore our working organic farm and learn about sustainable farming practices.",
//       image:
//         "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-13432-81a16730e32711eda8160a58a9feac02.jpg",
//     },
//     {
//       title: "Cooking Classes",
//       description: "Learn to prepare traditional dishes with our expert chefs using fresh farm ingredients.",
//       image:
//         "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981484-024d20a4e32811eda8160a58a9feac02.jpg",
//     },
//     {
//       title: "Yoga & Meditation",
//       description: "Find inner peace with daily yoga and meditation sessions in our serene garden pavilion.",
//       image:
//         "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-15182-f2e76d04dff311ed8a570a58a9feac02.jpg",
//     },
//   ]

//   // Auto-advance carousel
//   useEffect(() => {
//     let interval

//     // Function to handle automatic slide advancement
//     const startAutoSlide = () => {
//       // Clear any existing interval
//       if (interval) clearInterval(interval)

//       // Set a new interval
//       interval = setInterval(() => {
//         setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length)
//       }, 5000) // 5 seconds for image slides
//     }

//     // If current slide is video (first slide), don't start auto-advance
//     // Otherwise start the auto-advance for images
//     if (currentSlide === 0 && carouselImages[0].type === "video") {
//       // Don't start auto-advance for video slide
//       if (interval) clearInterval(interval)
//     } else {
//       // Start auto-advance for image slides
//       startAutoSlide()
//     }

//     return () => {
//       if (interval) clearInterval(interval)
//     }
//   }, [currentSlide, carouselImages])

//   // Check if it's the user's first visit to show the guide
//   useEffect(() => {
//     const hasVisitedBefore = localStorage.getItem("hasVisitedBefore")

//     if (!hasVisitedBefore) {
//       // Set a timeout to show the guide after the page has loaded
//       const timer = setTimeout(() => {
//         setShowGuide(true)
//         localStorage.setItem("hasVisitedBefore", "true")
//       }, 2000)

//       return () => clearTimeout(timer)
//     }
//   }, [])

//   // Add a function to handle video end
//   const handleVideoEnded = () => {
//     // Move to the next slide when video ends
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length)
//   }

//   // Handle carousel navigation
//   const goToSlide = (index) => {
//     setCurrentSlide(index)
//   }

//   const nextSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselImages.length) % carouselImages.length)
//   }

//   // Handle cookie consent
//   const handleCookieAccept = (preferences) => {
//     console.log("Cookie preferences accepted:", preferences)
//     setCookiePreferencesSet(true)
//   }

//   const handleCookieDecline = () => {
//     console.log("Cookies declined (only necessary cookies enabled)")
//     setCookiePreferencesSet(true)
//   }

//   return (
//     <div className="home-page">
//       {/* Hero Section with Carousel */}
//       <section className="hero-section">
//         <div className="carousel-container">
//           {carouselImages.map((item, index) => (
//             <div
//               key={index}
//               className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
//               style={item.type === "image" ? { backgroundImage: `url(${item.url})` } : {}}
//             >
//               {item.type === "video" && (
//                 <div className="video-container">
//                   <video autoPlay muted playsInline src="/videos/royal.mp4" onEnded={handleVideoEnded}>
//                     Your browser does not support the video tag.
//                   </video>
//                 </div>
//               )}
//               <div className="carousel-content">
//                 <h1 className="slide-title">{item.title}</h1>
//                 <p className="slide-subtitle">{item.subtitle}</p>
//                 <Link to="/rooms">
//                   <button className="explore-btn">Explore Our Rooms</button>
//                 </Link>
//               </div>
//             </div>
//           ))}

//           <button className="carousel-arrow prev" onClick={prevSlide}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="15 18 9 12 15 6"></polyline>
//             </svg>
//           </button>
//           <button className="carousel-arrow next" onClick={nextSlide}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="9 18 15 12 9 6"></polyline>
//             </svg>
//           </button>

//           <div className="carousel-indicators">
//             {carouselImages.map((_, index) => (
//               <button
//                 key={index}
//                 className={`indicator ${index === currentSlide ? "active" : ""}`}
//                 onClick={() => goToSlide(index)}
//               ></button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Welcome Section */}
//       <section className="welcome-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>Welcome to Royal Castle Farm Stay</h2>
//             <div className="divider"></div>
//             <p>Experience the perfect blend of luxury, comfort, and natural beauty</p>
//           </div>

//           <div className="welcome-content">
//             <div className="welcome-text">
//               <p>
//                 Nestled in the serene countryside, Royal Castle Farm Stay offers an exclusive retreat where luxury meets
//                 nature. Our resort combines elegant accommodations with breathtaking views and world-class amenities to
//                 create an unforgettable experience for our guests.
//               </p>
//               <p>
//                 Whether you're seeking a romantic getaway, a family vacation, or a peaceful retreat, our dedicated staff
//                 is committed to making your stay exceptional in every way.
//               </p>
//               <Link to="/rooms">
//                 <button className="secondary-btn">Discover Our Accommodations</button>
//               </Link>
//             </div>
//             <div className="welcome-image">
//               <img
//                 src="https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-13432-81a16730e32711eda8160a58a9feac02.jpg"
//                 alt="Resort Welcome"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>Resort Highlights</h2>
//             <div className="divider"></div>
//             <p>Discover what makes our resort a truly special destination</p>
//           </div>

//           <div className="features-grid">
//             {resortFeatures.map((feature, index) => (
//               <div key={index} className="feature-card">
//                 <div className="feature-icon">{feature.icon}</div>
//                 <h3>{feature.title}</h3>
//                 <p>{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Activities Section */}
//       <section className="activities-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>Experiences & Activities</h2>
//             <div className="divider"></div>
//             <p>Immerse yourself in unique experiences during your stay</p>
//           </div>

//           <div className="activities-grid">
//             {activities.map((activity, index) => (
//               <div key={index} className="activity-card">
//                 <div className="activity-image">
//                   <img src={activity.image || "/placeholder.svg"} alt={activity.title} />
//                   <div className="activity-overlay"></div>
//                 </div>
//                 <div className="activity-content">
//                   <h3>{activity.title}</h3>
//                   <p>{activity.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="activities-cta">
//             <Link to="/activities">
//               <button className="explore-btn">View All Activities</button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="testimonials-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>Guest Experiences</h2>
//             <div className="divider"></div>
//             <p>What our guests have to say about their stay</p>
//           </div>

//           <div className="testimonials-grid">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="testimonial-card">
//                 <div className="testimonial-quote">"</div>
//                 <p className="testimonial-text">{testimonial.text}</p>
//                 <div className="testimonial-author">
//                   <p className="author-name">{testimonial.author}</p>
//                   <p className="author-location">{testimonial.location}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Location Section */}
//       <section className="location-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>Our Location</h2>
//             <div className="divider"></div>
//             <p>Find us in a picturesque setting with easy access to local attractions</p>
//           </div>

//           <div className="location-content">
//             <div className="location-info">
//               <div className="address-block">
//                 <h3>Address</h3>
//                 <div className="info-with-icon">
//                   <div className="icon">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//                       <circle cx="12" cy="10" r="3"></circle>
//                     </svg>
//                   </div>
//                   <div className="info-text">
//                     <p>Royal Castle Farm Stay</p>
//                     <p>SF.No.328/4, Andipalayam Road, EnneiKadai Karar, Odathurai</p>
//                     <p>Erode, Tamil Nadu, 638455</p>
//                     <p>India</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="contact-block">
//                 <h3>Contact</h3>
//                 <div className="info-with-icon">
//                   <div className="icon">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//                     </svg>
//                   </div>
//                   <div className="info-text">
//                     <p>
//                       <strong>Phone:</strong> +91 98765 43210
//                     </p>
//                   </div>
//                 </div>
//                 <div className="info-with-icon">
//                   <div className="icon">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//                       <polyline points="22,6 12,13 2,6"></polyline>
//                     </svg>
//                   </div>
//                   <div className="info-text">
//                     <p>
//                       <strong>Email:</strong> info@royalcastlefarmstay.com
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="directions-block">
//                 <h3>Getting Here</h3>
//                 <div className="info-with-icon">
//                   <div className="icon">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="20"
//                       height="20"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <circle cx="12" cy="12" r="10"></circle>
//                       <polyline points="12 6 12 12 16 14"></polyline>
//                     </svg>
//                   </div>
//                   <div className="info-text">
//                     <p>
//                       <strong>From Airport:</strong> 1 hour 45 minutes drive (83 km)
//                     </p>
//                     <p>
//                       <strong>From Railway Station:</strong> 45 minutes drive (35 km)
//                     </p>
//                     <p>
//                       <strong>From City Center:</strong> 15 minutes drive (8 km)
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="map-container">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.2713499147926!2d77.51667267452558!3d11.460329546207937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba93fb37c1c7097%3A0x7acf44fa3ecbe7ec!2sRoyal%20Castle%20Farm%20Stay%20Resort!5e0!3m2!1sen!2sth!4v1744955515641!5m2!1sen!2sth"
//                 width="100%"
//                 height="450"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Royal Castle Farm Stay Location Map"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Sustainability Section */}
//       <section className="sustainability-section">
//         <div className="container">
//           <div className="section-header">
//             <h2>Our Commitment to Sustainability</h2>
//             <div className="divider"></div>
//             <p>Discover how we're working to protect our environment and support our local community</p>
//           </div>

//           <div className="sustainability-content">
//             <div className="sustainability-images">
//               <div className="image-grid">
//                 <img
//                   src="https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981440-f095a7fae03411edbaad0a58a9feac02.jpg"
//                   alt="Organic Garden"
//                 />
//                 <img
//                   src="https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-3712-7c6d8866e03911ed95310a58a9feac02.jpg"
//                   alt="Water Conservation"
//                 />
//                 <img src="https://r1imghtlak.mmtcdn.com/1281c246dff811eda0030a58a9feac02.jpg" alt="Local Artisans" />
//               </div>
//             </div>

//             <div className="sustainability-initiatives">
//               <div className="initiative-card">
//                 <h3>Organic Farming</h3>
//                 <p>
//                   Our on-site organic farm produces fresh vegetables, fruits, and herbs used in our restaurant, reducing
//                   food miles and ensuring the highest quality ingredients.
//                 </p>
//               </div>

//               <div className="initiative-card">
//                 <h3>Renewable Energy</h3>
//                 <p>
//                   We've installed solar panels that generate up to 70% of our resort's electricity needs, significantly
//                   reducing our carbon footprint.
//                 </p>
//               </div>

//               <div className="initiative-card">
//                 <h3>Water Conservation</h3>
//                 <p>
//                   Our rainwater harvesting system and water recycling plant help us conserve this precious resource
//                   while maintaining our lush gardens.
//                 </p>
//               </div>

//               <div className="initiative-card">
//                 <h3>Community Support</h3>
//                 <p>
//                   We partner with local artisans and businesses, showcasing their products in our resort and providing
//                   employment opportunities for the local community.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="cta-section">
//         <div className="container">
//           <div className="cta-content">
//             <h2>Ready for an Unforgettable Experience?</h2>
//             <p>Book your stay now and create memories that will last a lifetime</p>
//             <Link to="/rooms">
//               <button className="cta-btn">Book Your Stay</button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <div className="container">
//           <div className="footer-content">
//             <div className="footer-about">
//               <h3>Royal Castle Farm Stay</h3>
//               <p>
//                 Experience luxury in harmony with nature at our exclusive farm stay resort in the beautiful countryside
//                 of Tamil Nadu.
//               </p>
//               <div className="social-icons">
//                 <a
//                   href="https://www.facebook.com/people/Royal-Castle-Farm-Stay-Resort/61567773867854/#"
//                   className="social-icon"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
//                   </svg>
//                 </a>
//                 <a href="https://www.instagram.com/royalcastlefarm/?hl=en" className="social-icon">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
//                     <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
//                     <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
//                   </svg>
//                 </a>
//                 <a href="https://x.com/royalcastlefarm" className="social-icon">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
//                   </svg>
//                 </a>
//                 <a href="https://youtu.be/q7JYJGYZf5Q?si=wykUX7m81JTiGNJO" className="social-icon">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
//                     <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
//                   </svg>
//                 </a>
//               </div>
//             </div>

//             <div className="footer-links">
//               <h3>Quick Links</h3>
//               <ul>
//                 <li>
//                   <Link to="/rooms">Accommodations</Link>
//                 </li>
//                 <li>
//                   <Link to="/activities">Activities</Link>
//                 </li>
//                 <li>
//                   <Link to="/dining">Dining</Link>
//                 </li>
//                 <li>
//                   <Link to="/spa">Spa & Wellness</Link>
//                 </li>
//                 <li>
//                   <Link to="/Gallery">Gallery</Link>
//                 </li>
//               </ul>
//             </div>

//             <div className="footer-contact">
//               <h3>Contact Us</h3>
//               <div className="contact-item">
//                 <div className="contact-icon">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//                     <circle cx="12" cy="10" r="3"></circle>
//                   </svg>
//                 </div>
//                 <p>SF.No.328/4, Andipalayam Road, EnneiKadai Karar, Odathurai, Erode, Tamil Nadu, 638455</p>
//               </div>
//               <div className="contact-item">
//                 <div className="contact-icon">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//                   </svg>
//                 </div>
//                 <p>+91 98765 43210</p>
//               </div>
//               <div className="contact-item">
//                 <div className="contact-icon">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//                     <polyline points="22,6 12,13 2,6"></polyline>
//                   </svg>
//                 </div>
//                 <p>info@royalcastlefarmstay.com</p>
//               </div>
//             </div>

//             <div className="footer-newsletter">
//               <h3>Newsletter</h3>
//               <p>Subscribe to receive updates on special offers and events.</p>
//               <form className="newsletter-form">
//                 <input type="email" placeholder="Your email address" required />
//                 <button type="submit">Subscribe</button>
//               </form>
//             </div>
//           </div>

//           <div className="footer-bottom">
//             <p>&copy; {new Date().getFullYear()} Royal Castle Farm Stay. All rights reserved.</p>
//             <div className="footer-legal">
//               <Link to="/privacy-policy">Privacy Policy</Link>
//               <span className="separator">|</span>
//               <Link to="/terms">Terms & Conditions</Link>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Guide Tour */}
//       <GuideTour isOpen={showGuide} onClose={() => setShowGuide(false)} />

//       {/* Cookie Consent */}
//       <CookieConsent onAccept={handleCookieAccept} onDecline={handleCookieDecline} />

//       {/* Cookie Manager - handles applying cookie preferences */}
//       <CookieManager />

//       {/* Start Guide Button */}
//       <button onClick={() => setShowGuide(true)} className="guide-help-button" aria-label="Start guided tour">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <circle cx="12" cy="12" r="10"></circle>
//           <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
//           <line x1="12" y1="17" x2="12.01" y2="17"></line>
//         </svg>
//       </button>

//       {/* Chatbot */}
//       <ResortAssistant />
//     </div>
//   )
// }

// export default Home













"use client"

import { useState, useEffect, useMemo } from "react"
import { Link } from "react-router-dom"
import "./Home.css"
import ResortAssistant from "./resort-assistant"
import GuideTour from "./guide-tour"
import CookieConsent from "./cookie-consent"
import CookieManager from "./cookie-manager"

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showGuide, setShowGuide] = useState(false)
  const [cookiePreferencesSet, setCookiePreferencesSet] = useState(false)

  // Carousel images
  const carouselImages = useMemo(
    () => [
      {
        title: "Royal Castle",
        subtitle: "A memorable experience",
        type: "video",
      },
      {
        image: "./images/page-title.jpg",
        title: "Royal Castle Farm Stay",
        subtitle: "Experience luxury in the heart of nature",
        type: "image",
      },
      {
        url: "https://r1imghtlak.mmtcdn.com/1281c246dff811eda0030a58a9feac02.jpg",
        title: "Royal Castle Farm Stay",
        subtitle: "Experience luxury in the heart of nature",
        type: "image",
      },
      {
        url: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-15182-f2e76d04dff311ed8a570a58a9feac02.jpg",
        title: "Luxurious Accommodations",
        subtitle: "Comfort meets elegance in every room",
        type: "image",
      },
      {
        url: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981440-f095a7fae03411edbaad0a58a9feac02.jpg",
        title: "Premium Amenities",
        subtitle: "Every detail crafted for your perfect stay",
        type: "image",
      },
      {
        url: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-3712-7c6d8866e03911ed95310a58a9feac02.jpg",
        title: "Serene Surroundings",
        subtitle: "Escape to tranquility and natural beauty",
        type: "image",
      },
    ],
    [],
  )

  // Resort features
  const resortFeatures = [
    {
      icon: "🍽️",
      title: "Gourmet Dining",
      description: "Experience exquisite cuisine prepared by our master chefs using locally sourced ingredients.",
    },
    {
      icon: "🏊",
      title: "Infinity Pool",
      description: "Relax in our stunning infinity pool with panoramic views of the surrounding landscape.",
    },
    {
      icon: "🧖",
      title: "Luxury Spa",
      description: "Rejuvenate your body and mind with our premium spa treatments and wellness programs.",
    },
    {
      icon: "🚶",
      title: "Nature Trails",
      description: "Explore the beautiful surroundings with our guided nature walks and hiking trails.",
    },
    {
      icon: "🏇",
      title: "Horse Riding",
      description: "Enjoy scenic horse riding experiences through our expansive estate and countryside.",
    },
    {
      icon: "🌿",
      title: "Organic Farm",
      description: "Visit our organic farm where we grow fresh produce used in our farm-to-table restaurant.",
    },
    {
      icon: "🏕️",
      title: "Nature Retreat",
      description: "Escape to our serene nature retreat, surrounded by lush greenery and tranquil landscapes.",
    },
    {
      icon: "🌊",
      title: "Lakeview",
      description: "Unwind by the peaceful lakeside, where you can enjoy breathtaking views and soothing breezes.",
    },
  ]

  // Testimonials
  const testimonials = [
    {
      text: "Our stay at Royal Castle was absolutely magical. The staff went above and beyond to make our anniversary special.",
      author: "Guru Prasaath",
      location: "Anthiyur",
    },
    {
      text: "The perfect blend of luxury and nature. We loved every moment of our stay and can't wait to return!",
      author: "Bharath",
      location: "Bhavani",
    },
    {
      text: "Impeccable service, stunning views, and the most comfortable beds I've ever slept in. Highly recommended!",
      author: "Rathy",
      location: "Gobi",
    },
  ]

  // Resort activities
  const activities = [
    {
      title: "Farm Tours",
      description: "Explore our working organic farm and learn about sustainable farming practices.",
      image:
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-13432-81a16730e32711eda8160a58a9feac02.jpg",
    },
    {
      title: "Cooking Classes",
      description: "Learn to prepare traditional dishes with our expert chefs using fresh farm ingredients.",
      image:
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981484-024d20a4e32811eda8160a58a9feac02.jpg",
    },
    {
      title: "Yoga & Meditation",
      description: "Find inner peace with daily yoga and meditation sessions in our serene garden pavilion.",
      image:
        "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-15182-f2e76d04dff311ed8a570a58a9feac02.jpg",
    },
  ]

  // Auto-advance carousel
  useEffect(() => {
    let interval

    // Function to handle automatic slide advancement
    const startAutoSlide = () => {
      // Clear any existing interval
      if (interval) clearInterval(interval)

      // Set a new interval
      interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length)
      }, 5000) // 5 seconds for image slides
    }

    // If current slide is video (first slide), don't start auto-advance
    // Otherwise start the auto-advance for images
    if (currentSlide === 0 && carouselImages[0].type === "video") {
      // Don't start auto-advance for video slide
      if (interval) clearInterval(interval)
    } else {
      // Start auto-advance for image slides
      startAutoSlide()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentSlide, carouselImages])

  // Add a function to handle video end
  const handleVideoEnded = () => {
    // Move to the next slide when video ends
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length)
  }

  // Handle carousel navigation
  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselImages.length) % carouselImages.length)
  }

  // Handle cookie consent
  const handleCookieAccept = (preferences) => {
    console.log("Cookie preferences accepted:", preferences)
    setCookiePreferencesSet(true)
  }

  const handleCookieDecline = () => {
    console.log("Cookies declined (only necessary cookies enabled)")
    setCookiePreferencesSet(true)
  }

  return (
    <div className="home-page">
      {/* Hero Section with Carousel */}
      <section className="hero-section">
        <div className="carousel-container">
          {carouselImages.map((item, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
              style={item.type === "image" ? { backgroundImage: `url(${item.url})` } : {}}
            >
              {item.type === "video" && (
                <div className="video-container">
                  <video autoPlay muted playsInline src="/videos/royal.mp4" onEnded={handleVideoEnded}>
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              <div className="carousel-content">
                <h1 className="slide-title">{item.title}</h1>
                <p className="slide-subtitle">{item.subtitle}</p>
                <Link to="/rooms">
                  <button className="explore-btn">Explore Our Rooms</button>
                </Link>
              </div>
            </div>
          ))}

          <button className="carousel-arrow prev" onClick={prevSlide}>
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
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button className="carousel-arrow next" onClick={nextSlide}>
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
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div className="carousel-indicators">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="container">
          <div className="section-header">
            <h2>Welcome to Royal Castle Farm Stay</h2>
            <div className="divider"></div>
            <p>Experience the perfect blend of luxury, comfort, and natural beauty</p>
          </div>

          <div className="welcome-content">
            <div className="welcome-text">
              <p>
                Nestled in the serene countryside, Royal Castle Farm Stay offers an exclusive retreat where luxury meets
                nature. Our resort combines elegant accommodations with breathtaking views and world-class amenities to
                create an unforgettable experience for our guests.
              </p>
              <p>
                Whether you're seeking a romantic getaway, a family vacation, or a peaceful retreat, our dedicated staff
                is committed to making your stay exceptional in every way.
              </p>
              <Link to="/rooms">
                <button className="secondary-btn">Discover Our Accommodations</button>
              </Link>
            </div>
            <div className="welcome-image">
              <img
                src="https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-13432-81a16730e32711eda8160a58a9feac02.jpg"
                alt="Resort Welcome"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Resort Highlights</h2>
            <div className="divider"></div>
            <p>Discover what makes our resort a truly special destination</p>
          </div>

          <div className="features-grid">
            {resortFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="activities-section">
        <div className="container">
          <div className="section-header">
            <h2>Experiences & Activities</h2>
            <div className="divider"></div>
            <p>Immerse yourself in unique experiences during your stay</p>
          </div>

          <div className="activities-grid">
            {activities.map((activity, index) => (
              <div key={index} className="activity-card">
                <div className="activity-image">
                  <img src={activity.image || "/placeholder.svg"} alt={activity.title} />
                  <div className="activity-overlay"></div>
                </div>
                <div className="activity-content">
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="activities-cta">
            <Link to="/activities">
              <button className="explore-btn">View All Activities</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Guest Experiences</h2>
            <div className="divider"></div>
            <p>What our guests have to say about their stay</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <p className="author-name">{testimonial.author}</p>
                  <p className="author-location">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Location</h2>
            <div className="divider"></div>
            <p>Find us in a picturesque setting with easy access to local attractions</p>
          </div>

          <div className="location-content">
            <div className="location-info">
              <div className="address-block">
                <h3>Address</h3>
                <div className="info-with-icon">
                  <div className="icon">
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
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="info-text">
                    <p>Royal Castle Farm Stay</p>
                    <p>SF.No.328/4, Andipalayam Road, EnneiKadai Karar, Odathurai</p>
                    <p>Erode, Tamil Nadu, 638455</p>
                    <p>India</p>
                  </div>
                </div>
              </div>

              <div className="contact-block">
                <h3>Contact</h3>
                <div className="info-with-icon">
                  <div className="icon">
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
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className="info-text">
                    <p>
                      <strong>Phone:</strong> +91 98765 43210
                    </p>
                  </div>
                </div>
                <div className="info-with-icon">
                  <div className="icon">
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
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="info-text">
                    <p>
                      <strong>Email:</strong> info@royalcastlefarmstay.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="directions-block">
                <h3>Getting Here</h3>
                <div className="info-with-icon">
                  <div className="icon">
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
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="info-text">
                    <p>
                      <strong>From Airport:</strong> 1 hour 45 minutes drive (83 km)
                    </p>
                    <p>
                      <strong>From Railway Station:</strong> 45 minutes drive (35 km)
                    </p>
                    <p>
                      <strong>From City Center:</strong> 15 minutes drive (8 km)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.2713499147926!2d77.51667267452558!3d11.460329546207937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba93fb37c1c7097%3A0x7acf44fa3ecbe7ec!2sRoyal%20Castle%20Farm%20Stay%20Resort!5e0!3m2!1sen!2sth!4v1744955515641!5m2!1sen!2sth"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Royal Castle Farm Stay Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="sustainability-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Commitment to Sustainability</h2>
            <div className="divider"></div>
            <p>Discover how we're working to protect our environment and support our local community</p>
          </div>

          <div className="sustainability-content">
            <div className="sustainability-images">
              <div className="image-grid">
                <img
                  src="https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981440-f095a7fae03411edbaad0a58a9feac02.jpg"
                  alt="Organic Garden"
                />
                <img
                  src="https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-3712-7c6d8866e03911ed95310a58a9feac02.jpg"
                  alt="Water Conservation"
                />
                <img src="https://r1imghtlak.mmtcdn.com/1281c246dff811eda0030a58a9feac02.jpg" alt="Local Artisans" />
              </div>
            </div>

            <div className="sustainability-initiatives">
              <div className="initiative-card">
                <h3>Organic Farming</h3>
                <p>
                  Our on-site organic farm produces fresh vegetables, fruits, and herbs used in our restaurant, reducing
                  food miles and ensuring the highest quality ingredients.
                </p>
              </div>

              <div className="initiative-card">
                <h3>Renewable Energy</h3>
                <p>
                  We've installed solar panels that generate up to 70% of our resort's electricity needs, significantly
                  reducing our carbon footprint.
                </p>
              </div>

              <div className="initiative-card">
                <h3>Water Conservation</h3>
                <p>
                  Our rainwater harvesting system and water recycling plant help us conserve this precious resource
                  while maintaining our lush gardens.
                </p>
              </div>

              <div className="initiative-card">
                <h3>Community Support</h3>
                <p>
                  We partner with local artisans and businesses, showcasing their products in our resort and providing
                  employment opportunities for the local community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready for an Unforgettable Experience?</h2>
            <p>Book your stay now and create memories that will last a lifetime</p>
            <Link to="/rooms">
              <button className="cta-btn">Book Your Stay</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-about">
              <h3>Royal Castle Farm Stay</h3>
              <p>
                Experience luxury in harmony with nature at our exclusive farm stay resort in the beautiful countryside
                of Tamil Nadu.
              </p>
              <div className="social-icons">
                <a
                  href="https://www.facebook.com/people/Royal-Castle-Farm-Stay-Resort/61567773867854/#"
                  className="social-icon"
                >
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
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="https://www.instagram.com/royalcastlefarm/?hl=en" className="social-icon">
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
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="https://x.com/royalcastlefarm" className="social-icon">
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
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="https://youtu.be/q7JYJGYZf5Q?si=wykUX7m81JTiGNJO" className="social-icon">
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
                  >
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link to="/rooms">Accommodations</Link>
                </li>
                <li>
                  <Link to="/activities">Activities</Link>
                </li>
                <li>
                  <Link to="/dining">Dining</Link>
                </li>
                <li>
                  <Link to="/spa">Spa & Wellness</Link>
                </li>
                <li>
                  <Link to="/Gallery">Gallery</Link>
                </li>
              </ul>
            </div>

            <div className="footer-contact">
              <h3>Contact Us</h3>
              <div className="contact-item">
                <div className="contact-icon">
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
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <p>SF.No.328/4, Andipalayam Road, EnneiKadai Karar, Odathurai, Erode, Tamil Nadu, 638455</p>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
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
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <p>+91 98765 43210</p>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
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
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <p>info@royalcastlefarmstay.com</p>
              </div>
            </div>

            <div className="footer-newsletter">
              <h3>Newsletter</h3>
              <p>Subscribe to receive updates on special offers and events.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" required />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Royal Castle Farm Stay. All rights reserved.</p>
            <div className="footer-legal">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <span className="separator">|</span>
              <Link to="/terms">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Guide Tour */}
      <GuideTour isOpen={showGuide} onClose={setShowGuide} />

      {/* Cookie Consent */}
      <CookieConsent onAccept={handleCookieAccept} onDecline={handleCookieDecline} />

      {/* Cookie Manager - handles applying cookie preferences */}
      <CookieManager />

      {/* Chatbot */}
      <ResortAssistant />
    </div>
  )
}

export default Home
