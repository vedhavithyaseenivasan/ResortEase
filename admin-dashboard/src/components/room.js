import React, { useState, useEffect } from 'react';
import './room.css';

const rooms = [
  {
    id: 1,
    name: 'Couple Room AC',
    price: '₹ 2,594',
    description: '(110 sq.ft (10 sq.mt) | Double Bed)',
    image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-13432-81a16730e32711eda8160a58a9feac02.jpg?downsize=*:500&crop=990:500',
    details: 'This deluxe room offers a stunning sea view, king-sized bed, and a private balcony. Perfect for couples or solo travelers looking for luxury.',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'TV', 'Private Bathroom', 'Sea View']
  },
  {
    id: 2,
    name: '4 Member Room AC',
    price: '₹ 3,890',
    description: '(160 sq.ft (15 sq.mt) | Double Bed)',
    image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981494-900f2aa4e0bc11ed99480a58a9feac02.jpg?downsize=*:500&crop=990:500',
    details: 'This standard room comes with a queen-sized bed, garden view, and basic amenities. Ideal for budget travelers.',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'TV', 'Private Bathroom', 'Garden View']
  },
  {
    id: 3,
    name: '6 Members Room AC',
    price: '₹ 6,508',
    description: '(220 sq.ft (20 sq.mt) | King Bed)',
    image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981484-024d20a4e32811eda8160a58a9feac02.jpg?downsize=*:500&crop=990:500',
    details: 'This family suite includes two bedrooms, a living area, and a kitchenette. Perfect for families or groups of friends.',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'TV', 'Private Bathroom', 'Kitchenette', 'Living Area']
  },
  {
    id: 4,
    name: 'Hut NON AC',
    price: '₹ 17,862',
    description: '(680 sq.ft (63 sq.mt) | Queen Bed)',
    image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-3712-7c6d8866e03911ed95310a58a9feac02.jpg?downsize=*:500&crop=990:500',
    details: 'The executive suite features a large bedroom, private balcony, and premium amenities. Ideal for business travelers or those seeking luxury.',
    amenities: ['Natural Ventilation', 'Free Wi-Fi', 'Private Bathroom', 'Private Balcony', 'Premium Amenities']
  },
  {
    id: 5,
    name: 'Private Villa',
    price: '₹ 24,184',
    description: '(2600 sq.ft (242 sq.mt) | Futon)',
    image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-15182-f2e76d04dff311ed8a570a58a9feac02.jpg?downsize=*:500&crop=990:500',
    details: 'This private villa is perfect for those who seek comfort, space, and luxury. Comes with a pool and a private garden.',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'Private Pool', 'Private Garden', 'Luxury Amenities', 'Kitchen']
  },
  {
    id: 6,
    name: 'Indoor Theatre Hall AC',
    price: '₹ 26,893',
    description: '(900 sq.ft (84 sq.mt) | King Bed)',
    image: 'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/202304162346035007-6981440-f095a7fae03411edbaad0a58a9feac02.jpg?downsize=*:500&crop=990:500',
    details: 'A luxurious indoor theatre hall with a massive screen, premium sound system, and elegant seating.',
    amenities: ['Air Conditioning', 'Premium Sound System', 'Massive Screen', 'Elegant Seating', 'Luxury Amenities']
  },
];

const AdminRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animatedRooms, setAnimatedRooms] = useState([]);

  // Stagger the animation of room cards
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedRooms(rooms.map(room => room.id));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Re-enable body scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  // Icons for amenities
  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('air') || amenityLower.includes('ac')) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 16a5 5 0 0 1-1-9.9V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2.1A5 5 0 0 1 16 16"/><path d="M12 16v4"/><path d="M8 20h8"/></svg>;
    } else if (amenityLower.includes('wifi')) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" y1="20" x2="12" y2="20"/></svg>;
    } else if (amenityLower.includes('tv')) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>;
    } else if (amenityLower.includes('bathroom')) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="10" x2="8" y2="12"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="7" y1="19" x2="7" y2="21"/><line x1="17" y1="19" x2="17" y2="21"/></svg>;
    } else if (amenityLower.includes('view')) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
    } else if (amenityLower.includes('pool')) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M2 20h20"/><path d="M6 8v4"/><path d="M10 4v8"/><path d="M14 4v8"/><path d="M18 8v4"/><path d="m6 20 1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1"/></svg>;
    } else if (amenityLower.includes('garden')) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a9 9 0 0 0 9-9"/><path d="M3 13a9 9 0 0 1 9-9"/><path d="M14.6 4.6A6 6 0 0 0 12 4a6 6 0 0 0-6 6c0 2.1 1.1 4 2.8 5"/><path d="M15 12a3 3 0 0 1-3 3"/><path d="M12 17v5"/></svg>;
    } else if (amenityLower.includes('kitchen')) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 3v12h-5c-.023-3.681.184-7.406 5-12zm0 12v6h-1v-3M8 4v12"/><path d="M5 4v12"/><path d="M2 4v12"/><path d="M5 16v6h3v-6"/></svg>;
    } else {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
    }
  };

  return (
    <div className="admin-rooms-section">
      <div className="admin-section-header">
        <h2>Our Accommodations</h2>
        <p>Choose from our selection of premium rooms and suites</p>
      </div>
      
      <div className="admin-room-container">
        {rooms.map((room) => (
          <div 
            key={room.id} 
            className={`admin-room-card ${animatedRooms.includes(room.id) ? 'admin-animate' : ''}`}
            style={{ animationDelay: `${room.id * 0.1}s` }}
          >
            <div className="admin-room-image-container">
              <img src={room.image || "/placeholder.svg"} alt={room.name} className="admin-room-image" />
              <div className="admin-room-price">
                <span>{room.price}</span>
                <small>per night</small>
              </div>
            </div>
            
            <div className="admin-room-content">
              <h3 className="admin-room-name">{room.name}</h3>
              <p className="admin-room-description">{room.description}</p>
              
              <div className="admin-room-amenities">
                {room.amenities.slice(0, 3).map((amenity, index) => (
                  <div key={index} className="admin-amenity-tag">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
                {room.amenities.length > 3 && (
                  <div className="admin-amenity-tag admin-more">
                    +{room.amenities.length - 3} more
                  </div>
                )}
              </div>
              
              <button className="admin-view-details-btn" onClick={() => openModal(room)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedRoom && (
        <div className={`admin-modal-overlay ${isModalOpen ? 'admin-open' : ''}`} onClick={closeModal}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="admin-close-btn" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="admin-modal-image-container">
              <img src={selectedRoom.image || "/placeholder.svg"} alt={selectedRoom.name} className="admin-modal-image" />
              <div className="admin-modal-price">
                <span>{selectedRoom.price}</span>
                <small>per night</small>
              </div>
            </div>
            
            <div className="admin-modal-details">
              <h2 className="admin-modal-title">{selectedRoom.name}</h2>
              <p className="admin-modal-subtitle">{selectedRoom.description}</p>
              
              <div className="admin-modal-description">
                <h4>Room Description</h4>
                <p>{selectedRoom.details}</p>
              </div>
              
              <div className="admin-modal-amenities">
                <h4>Amenities</h4>
                <div className="admin-amenities-grid">
                  {selectedRoom.amenities.map((amenity, index) => (
                    <div key={index} className="admin-amenity-item">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="admin-modal-actions">
                {/* <button className="admin-book-now-btn">Book Now</button> */}
                {/* <button className="admin-add-to-wishlist-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                  Add to Wishlist
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRoom;