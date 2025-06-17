// "use client"

// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// // import Link from "next/link"
// import { Eye } from 'lucide-react'
// import "./Gallery.css"

// export default function Gallery() {
//   const [galleryItems, setGalleryItems] = useState([])
//   const [filter, setFilter] = useState("all")
//   const [isLoading, setIsLoading] = useState(true)
//   const [selectedImage, setSelectedImage] = useState(null)

//   useEffect(() => {
//     // Simulate loading
//     setIsLoading(true)

//     // Updated gallery items with Royal Castle Farm Stay images
//     const items = [
//       {
//         id: 1,
//         image: "/images/1.jpg",
//         fullImage: "/images/1.0.jpg",
//         categories: ["all", "cat-3"],
//         title: "Executive Room",
//       },
//       {
//         id: 2,
//         image: "/images/2.jpg",
//         fullImage: "/images/2.0.jpeg",
//         categories: ["all", "cat-1"],
//         title: "Garden View",
//       },
//       {
//         id: 3,
//         image: "/images/3.jpg",
//         fullImage: "/images/3.0.jpg",
//         categories: ["all", "cat-5"],
//         title: "Swimming Pool",
//       },
//       {
//         id: 4,
//         image: "/images/4.jpg",
//         fullImage: "/images/4.0.jpg",
//         categories: ["all", "cat-3"],
//         title: "Royal Suite",
//       },
//       {
//         id: 5,
//         image: "/images/5.jpg",
//         fullImage: "/images/5.0.jpg",
//         categories: ["all", "cat-3"],
//         title: "Family Room",
//       },
//       {
//         id: 6,
//         image: "/images/6.jpg",
//         fullImage: "/images/6.0.jpg",
//         categories: ["all", "cat-3"],
//         title: "Executive Room",
//       },
//       {
//         id: 7,
//         image: "/images/7.jpg",
//         fullImage: "/images/7.0.jpeg",
//         categories: ["all", "cat-1"],
//         title: "Garden View",
//       },
//       {
//         id: 8,
//         image: "/images/9.jpg",
//         fullImage: "/images/9.0.jpg",
//         categories: ["all", "cat-5"],
//         title: "Swimming Pool",
//       },
//       {
//         id: 9,
//         image: "/images/10.jpg",
//         fullImage: "/images/10.0.jpg",
//         categories: ["all", "cat-3"],
//         title: "Royal Suite",
//       },
//       {
//         id: 10,
//         image: "/images/11.jpg",
//         fullImage: "/images/11.0.jpg",
//         categories: ["all", "cat-3"],
//         title: "Family Room",
//       },
//       {
//         id: 11,
//         image: "/images/12.jpg",
//         fullImage: "/images/12.0.jpg",
//         categories: ["all", "cat-3"],
//         title: "Twin Room",
//       },
//       {
//         id: 12,
//         image: "/images/13.jpg",
//         fullImage: "/images/13.0.jpg",
//         categories: ["all", "cat-3"],
//         title: "Honeymoon Suite",
//       },
//       {
//         id: 13,
//         image: "/images/14.jpg",
//         fullImage: "/images/14.0.jpg",
//         categories: ["all", "cat-3"],
//         title: "Presidential Suite",
//       },
//       {
//         id: 14,
//         image: "/images/15.jpg",
//         fullImage: "/images/15.0.jpg",
//         categories: ["all", "cat-3"],
//         title: "Standard Room",
//       },
//       {
//         id: 15,
//         image: "/images/16.jpg",
//         fullImage: "/images/16.0.jpg",
//         categories: ["all", "cat-1"],
//         title: "Mountain View",
//       },
//       {
//         id: 16,
//         image: "/images/17.jpg",
//         fullImage: "/images/17.0.jpg",
//         categories: ["all", "cat-3"],
//         title: "Penthouse Suite",
//       },
//     ]

//     setGalleryItems(items)

//     // Simulate loading delay
//     setTimeout(() => {
//       setIsLoading(false)
//     }, 800)
//   }, [])

//   const handleFilterClick = (category) => {
//     setIsLoading(true)
//     setFilter(category)

//     // Add a small delay to make the loading animation visible
//     setTimeout(() => {
//       setIsLoading(false)
//     }, 500)
//   }

//   const openLightbox = (item) => {
//     setSelectedImage(item)
//     document.body.style.overflow = "hidden"
//   }

//   const closeLightbox = () => {
//     setSelectedImage(null)
//     document.body.style.overflow = "auto"
//   }

//   const filteredImages = galleryItems.filter((item) => item.categories.includes(filter))

//   // Filter categories with labels
//   const filterCategories = [
//     { id: "all", label: "All" },
//     { id: "cat-3", label: "Accommodations" },
//     { id: "cat-4", label: "Dining" },
//     { id: "cat-5", label: "Amenities" },
//     { id: "cat-1", label: "Nature" },
//   ]

//   return (
//     <div className="gallery-page">
//       {/* Hero Section with Parallax Effect */}
//       <section className="hero-section">
//         <div className="hero-background">
//           <div className="hero-overlay"></div>
//         </div>
//         <div className="hero-content">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1>Royal Castle Gallery</h1>
//             <div className="divider"></div>
//             <p>Explore the elegance and luxury of our royal retreat</p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Gallery Section */}
//       <section className="gallery-section">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="section-header"
//         >
//           <h2>Discover Our Royal Experience</h2>
//           <div className="divider"></div>
//           <p>
//             Immerse yourself in the timeless elegance and luxury of Royal Castle Farm Stay through our curated gallery
//             collection
//           </p>
//         </motion.div>

//         {/* Filter Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="filter-container"
//         >
//           <div className="filter-tabs">
//             {filterCategories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => handleFilterClick(category.id)}
//                 className={`filter-btn ${filter === category.id ? "active" : ""}`}
//               >
//                 {category.label}
//               </button>
//             ))}
//           </div>
//         </motion.div>

//         {/* Gallery Grid with Loading State */}
//         <div className="gallery-container">
//           {isLoading ? (
//             <div className="loading-container">
//               <div className="loading-spinner"></div>
//             </div>
//           ) : (
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={filter}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="gallery-grid"
//               >
//                 {filteredImages.map((item) => (
//                   <motion.div
//                     key={item.id}
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.4, delay: (item.id * 0.05) % 0.5 }}
//                     className="gallery-item"
//                   >
//                     <div className="gallery-card">
//                       <div className="card-overlay"></div>

//                       <div className="image-container">
//                         <img
//                           src={item.image || "/placeholder.svg?height=400&width=600"}
//                           alt={item.title || "Gallery image"}
//                         />
//                       </div>

//                       <div className="image-caption">
//                         <h3>{item.title || "Gallery Image"}</h3>
//                       </div>

//                       <div className="image-action">
//                         <button className="view-btn" onClick={() => openLightbox(item)} aria-label="View larger image">
//                           <Eye className="icon" />
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </AnimatePresence>
//           )}
//         </div>
//       </section>

//       {/* Lightbox */}
//       <AnimatePresence>
//         {selectedImage && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="lightbox-overlay"
//             onClick={closeLightbox}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="lightbox-container"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
//                 &times;
//               </button>
//               <div className="lightbox-content">
//                 <img
//                   src={selectedImage.fullImage || selectedImage.image}
//                   alt={selectedImage.title}
//                   className="lightbox-image"
//                 />
//                 <div className="lightbox-caption">
//                   <h3>{selectedImage.title}</h3>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* CTA Section */}
//       <section className="cta-section">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="cta-content"
//         >
//           <h2>Experience Royal Luxury Today</h2>
//           <p>Book your stay now and indulge in the royal treatment. Create memories that will last a lifetime.</p>
//           {/* <Link href="/rooms">
//             <button className="cta-btn">Book Your Royal Experience</button>
//           </Link> */}
//         </motion.div>
//       </section>
//     </div>
//   )
// }














"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Eye, ChevronLeft, ChevronRight, X } from "lucide-react"
import "./Gallery.css"

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([])
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    // Simulate loading
    setIsLoading(true)

    // Gallery items with Royal Castle Farm Stay images
    const items = [
      {
        id: 1,
        image: "/images/1.jpg",
        fullImage: "/images/1.0.jpg",
        categories: ["all", "cat-3"],
        title: "Executive Room",
      },
      {
        id: 2,
        image: "/images/2.jpg",
        fullImage: "/images/2.0.jpeg",
        categories: ["all", "cat-1"],
        title: "Garden View",
      },
      {
        id: 3,
        image: "/images/3.jpg",
        fullImage: "/images/3.0.jpg",
        categories: ["all", "cat-5"],
        title: "Swimming Pool",
      },
      {
        id: 4,
        image: "/images/4.jpg",
        fullImage: "/images/4.0.jpg",
        categories: ["all", "cat-3"],
        title: "Royal Suite",
      },
      {
        id: 5,
        image: "/images/5.jpg",
        fullImage: "/images/5.0.jpg",
        categories: ["all", "cat-3"],
        title: "Family Room",
      },
      {
        id: 6,
        image: "/images/6.jpg",
        fullImage: "/images/6.0.jpg",
        categories: ["all", "cat-3"],
        title: "Executive Room",
      },
      {
        id: 7,
        image: "/images/7.jpg",
        fullImage: "/images/7.0.jpeg",
        categories: ["all", "cat-1"],
        title: "Garden View",
      },
      {
        id: 8,
        image: "/images/9.jpg",
        fullImage: "/images/9.0.jpg",
        categories: ["all", "cat-5"],
        title: "Swimming Pool",
      },
      {
        id: 9,
        image: "/images/10.jpg",
        fullImage: "/images/10.0.jpg",
        categories: ["all", "cat-3"],
        title: "Royal Suite",
      },
      {
        id: 10,
        image: "/images/11.jpg",
        fullImage: "/images/11.0.jpg",
        categories: ["all", "cat-3"],
        title: "Family Room",
      },
      {
        id: 11,
        image: "/images/12.jpg",
        fullImage: "/images/12.0.jpg",
        categories: ["all", "cat-3"],
        title: "Twin Room",
      },
      {
        id: 12,
        image: "/images/13.jpg",
        fullImage: "/images/13.0.jpg",
        categories: ["all", "cat-3"],
        title: "Honeymoon Suite",
      },
      {
        id: 13,
        image: "/images/14.jpg",
        fullImage: "/images/14.0.jpg",
        categories: ["all", "cat-3"],
        title: "Presidential Suite",
      },
      {
        id: 14,
        image: "/images/15.jpg",
        fullImage: "/images/15.0.jpg",
        categories: ["all", "cat-3"],
        title: "Standard Room",
      },
      {
        id: 15,
        image: "/images/16.jpg",
        fullImage: "/images/16.0.jpg",
        categories: ["all", "cat-1"],
        title: "Mountain View",
      },
      {
        id: 16,
        image: "/images/17.jpg",
        fullImage: "/images/17.0.jpg",
        categories: ["all", "cat-3"],
        title: "Penthouse Suite",
      },
    ]

    setGalleryItems(items)

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }, [])

  const handleFilterClick = (category) => {
    setIsLoading(true)
    setFilter(category)

    // Add a small delay to make the loading animation visible
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  const openLightbox = (item, index) => {
    setSelectedImage(item)
    setLightboxIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const nextLightboxImage = (e) => {
    e.stopPropagation()
    const filteredImages = galleryItems.filter((item) => item.categories.includes(filter))
    const newIndex = (lightboxIndex + 1) % filteredImages.length
    setSelectedImage(filteredImages[newIndex])
    setLightboxIndex(newIndex)
  }

  const prevLightboxImage = (e) => {
    e.stopPropagation()
    const filteredImages = galleryItems.filter((item) => item.categories.includes(filter))
    const newIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
    setSelectedImage(filteredImages[newIndex])
    setLightboxIndex(newIndex)
  }

  const filteredImages = galleryItems.filter((item) => item.categories.includes(filter))

  // Filter categories with labels
  const filterCategories = [
    { id: "all", label: "All" },
    { id: "cat-3", label: "Accommodations" },
    { id: "cat-4", label: "Dining" },
    { id: "cat-5", label: "Amenities" },
    { id: "cat-1", label: "Nature" },
  ]

  return (
    <div className="gallery-page">
      {/* Hero Section with Parallax Effect */}
      <section className="gallery-hero">
        <div className="gallery-hero-bg">
          <div className="gallery-hero-overlay"></div>
        </div>
        <div className="gallery-hero-content">
          <div className="gallery-hero-text animate-fade-in">
            <h1>Royal Castle Gallery</h1>
            <div className="gallery-divider"></div>
            <p>Explore the elegance and luxury of our royal retreat</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-main">
        <div className="gallery-container animate-fade-in">
          <div className="gallery-header">
            <h2>Discover Our Royal Experience</h2>
            <div className="gallery-divider"></div>
            <p>
              Immerse yourself in the timeless elegance and luxury of Royal Castle Farm Stay through our curated gallery
              collection
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="gallery-filter animate-slide-up">
            <div className="filter-wrapper">
              {filterCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleFilterClick(category.id)}
                  className={`filter-button ${filter === category.id ? "active" : ""}`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid with Loading State */}
          <div className="gallery-grid-container">
            {isLoading ? (
              <div className="gallery-loader">
                <div className="loader-spinner">
                  <div className="spinner-inner"></div>
                </div>
                <p>Loading beautiful moments...</p>
              </div>
            ) : (
              <div className="gallery-grid animate-fade-in">
                {filteredImages.map((item, index) => (
                  <div
                    key={item.id}
                    className="gallery-item animate-scale-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="gallery-card">
                      <div className="gallery-image-wrapper">
                        <img
                          src={item.image || "/placeholder.svg?height=400&width=600"}
                          alt={item.title || "Gallery image"}
                          className="gallery-image"
                        />
                        <div className="gallery-overlay">
                          <button className="gallery-view-btn" onClick={() => openLightbox(item, index)}>
                            <Eye size={20} />
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                      <div className="gallery-caption">
                        <h3>{item.title || "Gallery Image"}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && filteredImages.length === 0 && (
              <div className="gallery-empty">
                <p>No images found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <X size={24} />
            </button>
            <button className="lightbox-nav lightbox-prev" onClick={prevLightboxImage}>
              <ChevronLeft size={30} />
            </button>
            <div className="lightbox-content">
              <img
                src={selectedImage.fullImage || selectedImage.image}
                alt={selectedImage.title}
                className="lightbox-image"
              />
            </div>
            <button className="lightbox-nav lightbox-next" onClick={nextLightboxImage}>
              <ChevronRight size={30} />
            </button>
            <div className="lightbox-caption">
              <h3>{selectedImage.title}</h3>
              <p className="lightbox-counter">
                {lightboxIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="gallery-cta">
        <div className="cta-container animate-fade-in">
          <h2>Experience Royal Luxury Today</h2>
          <p>Book your stay now and indulge in the royal treatment. Create memories that will last a lifetime.</p>
          <Link to="/rooms">
            <button className="cta-button">Book Your Royal Experience</button>
          </Link>
        </div>
      </section>
    </div>
  )
}
