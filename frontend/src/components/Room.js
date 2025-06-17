"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion"
import { Wifi, Tv, Droplets, Eye, Sun, PocketIcon, Check, X, ShowerHead, Wind,  Heart,  ArrowRight, Star, Coffee, Utensils, Maximize } from 'lucide-react'
import "./Room.css"

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
    amenities: ["Air Conditioning", "Free Wi-Fi", "TV", "Private Bathroom"],
    rating: 4.8,
    reviews: 124,
    maxOccupancy: 2,
    bedType: "Double Bed",
    featured: true
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
    rating: 4.5,
    reviews: 86,
    maxOccupancy: 4,
    bedType: "Double Bed",
    featured: false
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
    amenities: ["Air Conditioning", "Free Wi-Fi", "TV", "Private Bathroom", "Living Area"],
    rating: 4.7,
    reviews: 102,
    maxOccupancy: 6,
    bedType: "King Bed",
    featured: true
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
    rating: 4.9,
    reviews: 78,
    maxOccupancy: 2,
    bedType: "Queen Bed",
    featured: false
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
    amenities: ["Air Conditioning", "Free Wi-Fi", "Private Pool", "Private Garden", "Luxury Amenities"],
    rating: 5.0,
    reviews: 56,
    maxOccupancy: 8,
    bedType: "Futon",
    featured: true
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
    rating: 4.9,
    reviews: 42,
    maxOccupancy: 12,
    bedType: "King Bed",
    featured: false
  },
]

// Helper function to get amenity icon
const getAmenityIcon = (amenity) => {
  switch (amenity.toLowerCase()) {
    case "air conditioning":
      return <Droplets className="amenity-icon" />
    case "free wi-fi":
      return <Wifi className="amenity-icon" />
    case "tv":
      return <Tv className="amenity-icon" />
    case "private bathroom":
      return <ShowerHead className="amenity-icon" />
    case "sea view":
    case "garden view":
      return <Eye className="amenity-icon" />
    case "private pool":
      return <PocketIcon className="amenity-icon" />
    case "natural ventilation":
      return <Wind className="amenity-icon" />
    case "private garden":
      return <Sun className="amenity-icon" />
    case "kitchen":
    case "kitchenette":
      return <Utensils className="amenity-icon" />
    case "premium sound system":
      return <Coffee className="amenity-icon" />
    case "massive screen":
      return <Maximize className="amenity-icon" />
    default:
      return <Check className="amenity-icon" />
  }
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      delayChildren: 0.2,
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
}

const Room = () => {
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("all")
  const [wishlist, setWishlist] = useState([])
  const controls = useAnimation()
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const openModal = (room) => {
    setSelectedRoom(room)
    setTimeout(() => {
      setIsModalOpen(true)
    }, 50)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedRoom(null)
    }, 300)
  }

  const toggleWishlist = (roomId) => {
    if (wishlist.includes(roomId)) {
      setWishlist(wishlist.filter(id => id !== roomId))
    } else {
      setWishlist([...wishlist, roomId])
    }
  }

  const filteredRooms = activeFilter === "all" 
    ? rooms 
    : activeFilter === "featured" 
      ? rooms.filter(room => room.featured) 
      : rooms.filter(room => room.name.toLowerCase().includes(activeFilter.toLowerCase()))

  return (
    <div className="rooms-section">
      <div className="section-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2>Luxury Accommodations</h2>
          <p>Experience comfort and elegance in our carefully designed spaces</p>
          <div className="header-accent"></div>
        </motion.div>
        
        <motion.div 
          className="filter-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <button 
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Rooms
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'featured' ? 'active' : ''}`}
            onClick={() => setActiveFilter('featured')}
          >
            Featured
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'ac' ? 'active' : ''}`}
            onClick={() => setActiveFilter('ac')}
          >
            AC Rooms
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'non' ? 'active' : ''}`}
            onClick={() => setActiveFilter('non')}
          >
            Non-AC
          </button>
        </motion.div>
      </div>

      <motion.div 
        className="room-container"
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {filteredRooms.map((room) => (
          <motion.div
            key={room.id}
            className="room-card"
            variants={cardVariants}
            whileHover="hover"
            layout
          >
            <div className="room-image-container">
              <img src={room.image || "/placeholder.svg"} alt={room.name} className="room-image" />
              <div className="room-price">
                <span>{room.price}</span>
                <small>per night</small>
              </div>
              <div className="room-badge">
                {room.name.includes("AC") ? "AC" : "NON-AC"}
              </div>
              {room.featured && (
                <div className="featured-badge">
                  <Star size={12} />
                  <span>Featured</span>
                </div>
              )}
              <button 
                className={`wishlist-button ${wishlist.includes(room.id) ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(room.id);
                }}
                aria-label={wishlist.includes(room.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={18} fill={wishlist.includes(room.id) ? "var(--accent)" : "none"} />
              </button>
            </div>
            
            <div className="room-content">
              <div className="room-header">
                <h3 className="room-name">{room.name}</h3>
                <div className="room-rating">
                  <Star size={14} className="star-icon" />
                  <span>{room.rating}</span>
                  <small>({room.reviews})</small>
                </div>
              </div>
              
              <p className="room-description">{room.description}</p>
              
              <div className="room-features">
                <div className="feature-item">
                  <Maximize size={14} />
                  <span>{room.maxOccupancy} Guests</span>
                </div>
                <div className="feature-item">
                  <Coffee size={14} />
                  <span>{room.bedType}</span>
                </div>
              </div>

              <div className="room-amenities">
                {room.amenities.slice(0, 3).map((amenity, index) => (
                  <div key={index} className="amenity-tag">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
                {room.amenities.length > 3 && (
                  <div className="amenity-tag more" onClick={() => openModal(room)}>
                    +{room.amenities.length - 3} more
                  </div>
                )}
              </div>

              <div className="room-actions">
                <button className="view-details-btn" onClick={() => openModal(room)}>
                  View Details
                </button>
                <Link to={`/book/${room.id}`} className="book-now-btn">
                  <span>Book Now</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedRoom && isModalOpen && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button className="close-btn" onClick={closeModal}>
                <X size={20} />
              </button>

              <div className="modal-image-container">
                <motion.img 
                  src={selectedRoom.image || "/placeholder.svg"} 
                  alt={selectedRoom.name} 
                  className="modal-image"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="modal-price">
                  <span>{selectedRoom.price}</span>
                  <small>per night</small>
                </div>
                <div className="modal-rating">
                  <Star size={16} className="star-icon" />
                  <span>{selectedRoom.rating}</span>
                  <small>({selectedRoom.reviews} reviews)</small>
                </div>
              </div>

              <div className="modal-details">
                <motion.div variants={itemVariants} className="modal-header">
                  <h3 className="modal-title">{selectedRoom.name}</h3>
                  <div className="modal-features">
                    <div className="feature-item">
                      <Maximize size={16} />
                      <span>Max {selectedRoom.maxOccupancy} Guests</span>
                    </div>
                    <div className="feature-item">
                      <Coffee size={16} />
                      <span>{selectedRoom.bedType}</span>
                    </div>
                  </div>
                  <p className="modal-subtitle">{selectedRoom.description}</p>
                </motion.div>

                <motion.div variants={itemVariants} className="modal-description">
                  <h4>Description</h4>
                  <p>{selectedRoom.details}</p>
                </motion.div>

                <motion.div variants={itemVariants} className="modal-amenities">
                  <h4>Amenities</h4>
                  <div className="amenities-grid">
                    {selectedRoom.amenities.map((amenity, index) => (
                      <motion.div 
                        key={index} 
                        className="amenity-item"
                        variants={itemVariants}
                      >
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* <motion.div variants={itemVariants} className="modal-booking">
                  <h4>Book Your Stay</h4>
                  <div className="booking-dates">
                    <div className="date-picker">
                      <label>Check-in</label>
                      <div className="date-input">
                        <Calendar size={16} />
                        <span>Select date</span>
                      </div>
                    </div>
                    <div className="date-picker">
                      <label>Check-out</label>
                      <div className="date-input">
                        <Calendar size={16} />
                        <span>Select date</span>
                      </div>
                    </div>
                  </div>
                </motion.div> */}

                <motion.div variants={itemVariants} className="modal-actions">
                  <Link to={`/book/${selectedRoom.id}`} className="book-now-btn">
                    <span>Book Now</span>
                    <ArrowRight size={18} />
                  </Link>
                  <button 
                    className={`add-to-wishlist-btn ${wishlist.includes(selectedRoom.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(selectedRoom.id)}
                  >
                    <Heart size={18} fill={wishlist.includes(selectedRoom.id) ? "var(--accent)" : "none"} />
                    <span>{wishlist.includes(selectedRoom.id) ? 'Saved' : 'Save'}</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Room

