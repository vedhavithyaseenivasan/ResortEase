import { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Animation for staggered entrance of elements
    const animatedElements = document.querySelectorAll('.animate-in');
    
    animatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('show');
      }, 150 * index);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit it
      setIsSubmitting(true);
      
      try {
        // Send message to server
        await axios.post("https://resortease-2.onrender.com/api/messages", formData);
        
        console.log("Message sent successfully:", formData);
        setFormSubmitted(true);
        setFormErrors({});
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: ""
          });
        }, 3000);
      } catch (error) {
        console.error("Error sending message:", error);
        setFormErrors({ submit: "Failed to send message. Please try again later." });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Form has errors
      setFormErrors(errors);
    }
  };

  // Reviews data
  const reviews = [
    {
      name: "Dhanya S",
      rating: 5,
      comment: "An absolute paradise! The staff was incredibly attentive and the amenities were top-notch. Will definitely return!"
    },
    {
      name: "Hari Haran",
      rating: 4,
      comment: "Beautiful property with excellent service. The farm experience was unique and refreshing."
    },
    {
      name: "Vignesh K",
      rating: 5,
      comment: "Perfect weekend getaway. The kids loved the animals and the swimming pool. Highly recommended for families!"
    }
  ];

  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header animate-in">
          <div className="logo-container">
            <img
              src="/images/resort-logo.png"
              alt="Royal Castle Farm Stay Resort Logo"
              className="resort-logo"
              onError={(e) => {
                e.target.src =
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_e1zaJyTgT-LyxMqP-kHWsd0ecoJeZJ8hPA&s"
              }}
            />
          </div>
          <h1>Welcome to Royal Castle Farm Stay</h1>
          <p className="tagline">Experience luxury amidst nature's embrace</p>
          <div className="decorative-line"></div>
        </div>

        <div className="about-content">
          <section aria-labelledby="about-section" className="content-section animate-in">
            <h2 id="about-section">
              <span className="section-icon">🏡</span> About Our Resort
            </h2>
            <p>
              Nestled in the heart of Tamil Nadu, <b>Royal Castle Farm Stay Resort</b> offers a serene escape from the
              hustle and bustle of city life. Located at{" "}
              <b>SF.No.328/4, Andipalayam Road, EnneiKadai Karar, Odathurai, Erode, Tamil Nadu, 638455</b>, our resort
              provides a perfect blend of comfort, luxury, and nature.
            </p>
          </section>

          <section aria-labelledby="our-story" className="content-section animate-in">
            <h2 id="our-story">
              <span className="section-icon">📖</span> Our Story
            </h2>
            <p>
              Founded in 2010 by the Raghavan family, Royal Castle Farm Stay began as a small family-owned farm with a vision to create a sustainable retreat that celebrates the rich agricultural heritage of Tamil Nadu. What started as a modest farmhouse has now evolved into a luxurious resort that maintains its roots in sustainable farming and eco-friendly practices.
            </p>
            <p>
              Over the years, we have grown to include modern amenities while preserving the authentic farm experience that our guests cherish. Our commitment to providing exceptional hospitality combined with a genuine connection to nature has made us one of the most sought-after destinations in the region.
            </p>
          </section>

          <section aria-labelledby="features-section" className="content-section animate-in">
            <h2 id="features-section">
              <span className="section-icon">✨</span> Why Choose Us?
            </h2>
            <ul className="features-list">
              <li className="feature-item">
                <span className="feature-icon">🌿</span>
                <span className="feature-text">Perfect for a family getaway and kids-friendly environment</span>
              </li>
              <li className="feature-item">
                <span className="feature-icon">♿</span>
                <span className="feature-text">Wheelchair accessible entrance and parking for easy mobility</span>
              </li>
              <li className="feature-item">
                <span className="feature-icon">🌈</span>
                <span className="feature-text">LGBTQ+ friendly resort, ensuring a welcoming atmosphere for all</span>
              </li>
              <li className="feature-item">
                <span className="feature-icon">💕</span>
                <span className="feature-text">Cozy and romantic ambiance, ideal for couples</span>
              </li>
              <li className="feature-item">
                <span className="feature-icon">🌱</span>
                <span className="feature-text">Eco-friendly practices with organic farm-to-table dining</span>
              </li>
              <li className="feature-item">
                <span className="feature-icon">🔒</span>
                <span className="feature-text">24/7 security and private parking for peace of mind</span>
              </li>
            </ul>
          </section>

          <section aria-labelledby="amenities-section" className="content-section animate-in">
            <h2 id="amenities-section">
              <span className="section-icon">🌟</span> Highlighted Amenities
            </h2>
            <div className="amenities">
              <span className="amenity-tag">🏊‍♂️ Swimming Pool</span>
              <span className="amenity-tag">💆‍♀️ Spa</span>
              <span className="amenity-tag">🍽️ Restaurant</span>
              <span className="amenity-tag">🎮 Indoor Games</span>
              <span className="amenity-tag">🛎️ 24-hour Room Service</span>
              <span className="amenity-tag">🧒 Kids Play Area</span>
              <span className="amenity-tag">🚜 Farm Tours</span>
              <span className="amenity-tag">🏞️ Nature Trails</span>
              <span className="amenity-tag">🧘‍♀️ Yoga Deck</span>
              <span className="amenity-tag">🔥 Bonfire Nights</span>
            </div>
          </section>

          <section aria-labelledby="attractions" className="content-section animate-in">
            <h2 id="attractions">
              <span className="section-icon">🗺️</span> Nearby Attractions
            </h2>
            <div className="attractions-grid">
              <div className="attraction-card">
                <div className="attraction-icon">🏞️</div>
                <h3>Kodiveri Dam</h3>
                <p>Just 15 km away, this picturesque dam offers boating and scenic views.</p>
              </div>
              <div className="attraction-card">
                <div className="attraction-icon">🛕</div>
                <h3>Bhavani Sangameshwarar Temple</h3>
                <p>Historic temple at the confluence of three rivers, 20 km from the resort.</p>
              </div>
              <div className="attraction-card">
                <div className="attraction-icon">🏞️</div>
                <h3>Sathyamangalam Wildlife Sanctuary</h3>
                <p>Explore the rich biodiversity of this sanctuary, 35 km away.</p>
              </div>
              <div className="attraction-card">
                <div className="attraction-icon">🛍️</div>
                <h3>Erode Textile Market</h3>
                <p>Famous for handloom products and textiles, 12 km from the resort.</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="reviews" className="content-section animate-in">
            <h2 id="reviews">
              <span className="section-icon">⭐</span> Guest Reviews
            </h2>
            <div className="reviews-container">
              {reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-name">{review.name}</div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "star filled" : "star"}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="review-comment">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="contact-section" className="content-section contact-section animate-in">
            <h2 id="contact-section">
              <span className="section-icon">📞</span> Contact Us
            </h2>
            <div className="contact-info">
              <p>
                <span className="contact-label">Phone:</span>
                <a href="tel:+917598063666" className="contact-link">
                  +91 7598063666
                </a>
              </p>
              <p>
                <span className="contact-label">Email:</span>
                <a href="mailto:contact@royalcastlefarmstayresort.com" className="contact-link">
                  contact@royalcastlefarmstayresort.com
                </a>
              </p>
              <p>
                <span className="contact-label">Address:</span>
                <span>SF.No.328/4, Andipalayam Road, EnneiKadai Karar, Odathurai, Erode, Tamil Nadu, 638455</span>
              </p>
            </div>
          </section>

          <section aria-labelledby="query-form" className="content-section query-section animate-in">
            <h2 id="query-form">
              <span className="section-icon">✉️</span> Have a Question?
            </h2>
            <p className="form-intro">Fill out the form below and our team will get back to you within 24 hours.</p>
            
            {formSubmitted ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form className="query-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name*</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className={formErrors.name ? "error" : ""}
                    />
                    {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address*</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? "error" : ""}
                    />
                    {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message*</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleInputChange}
                    className={formErrors.message ? "error" : ""}
                  ></textarea>
                  {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                </div>
                
                {formErrors.submit && <div className="error-message submit-error">{formErrors.submit}</div>}
                
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <span className="button-icon">→</span>
                </button>
              </form>
            )}
          </section>
        </div>
        
        <footer className="about-footer animate-in">
          <p>© {new Date().getFullYear()} Royal Castle Farm Stay Resort. All rights reserved.</p>
          <div className="social-links">
            <a href="https://www.facebook.com" className="social-link" aria-label="Facebook">
              <span className="social-icon">📘</span>
            </a>
            <a href="https://www.instagram.com" className="social-link" aria-label="Instagram">
              <span className="social-icon">📸</span>
            </a>
            <a href="https://twitter.com" className="social-link" aria-label="Twitter">
              <span className="social-icon">🐦</span>
            </a>
            <a href="https://www.tripadvisor.com" className="social-link" aria-label="TripAdvisor">
              <span className="social-icon">✈️</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default About;
