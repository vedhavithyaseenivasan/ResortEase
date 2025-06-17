"use client"

import { useState, useEffect } from "react"
import "./guide-tour.css"

export default function GuideTour({ onClose, isOpen }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetElement, setTargetElement] = useState(null)
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(0) // Store current scroll position

  const steps = [
    {
      target: ".hero-section",
      title: "Welcome to Royal Castle",
      content:
        "Explore our beautiful resort through this interactive carousel. Use the arrows to navigate through images.",
      position: "bottom",
      icon: "✨",
    },
    {
      target: ".welcome-section",
      title: "About Our Resort",
      content: "Learn about what makes Royal Castle Farm Stay a perfect destination for your next vacation.",
      position: "top",
      icon: "🏰",
    },
    {
      target: ".features-section",
      title: "Resort Highlights",
      content: "Discover our premium amenities and features that will make your stay memorable.",
      position: "top",
      icon: "🌟",
    },
    {
      target: ".activities-section",
      title: "Experiences & Activities",
      content: "Explore the various activities and experiences we offer to our guests.",
      position: "top",
      icon: "🚵",
    },
    {
      target: ".location-section",
      title: "Find Us",
      content: "Get directions and contact information to plan your visit.",
      position: "top",
      icon: "📍",
    },
    {
      target: ".cta-section",
      title: "Book Your Stay",
      content: "Ready to experience luxury? Book your stay now!",
      position: "top",
      icon: "📅",
    },
  ]

  // Check if it's the user's first visit to show the welcome dialog
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore")

    if (!hasVisitedBefore && !isOpen) {
      // Show the welcome dialog after a short delay
      const timer = setTimeout(() => {
        setShowWelcomeDialog(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && steps[currentStep]) {
      // Store current scroll position before scrolling
      setCurrentPosition(window.pageYOffset)

      const element = document.querySelector(steps[currentStep].target)
      if (element) {
        setTargetElement(element)

        // Smooth scroll to the element
        const yOffset = -80 // Header offset
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: "smooth" })

        // Add highlight effect to the target element
        element.classList.add("guide-highlight")
      }
    }

    return () => {
      // Clean up highlight when component unmounts or step changes
      const highlightedElement = document.querySelector(".guide-highlight")
      if (highlightedElement) {
        highlightedElement.classList.remove("guide-highlight")
      }
    }
  }, [currentStep, isOpen, steps])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    // Restore the original scroll position when closing the tour
    window.scrollTo({ top: currentPosition, behavior: "smooth" })

    onClose(false)
    setCurrentStep(0)
  }

  const startTour = () => {
    // Mark that the user has visited before
    localStorage.setItem("hasVisitedBefore", "true")
    setShowWelcomeDialog(false)
    onClose(true) // Start the tour
  }

  const skipTour = () => {
    // Mark that the user has visited before
    localStorage.setItem("hasVisitedBefore", "true")
    setShowWelcomeDialog(false)
  }

  // Render welcome dialog
  if (showWelcomeDialog) {
    return (
      <div className="guide-welcome-container">
        <div className="guide-welcome-dialog">
          <div className="guide-welcome-header">
            <div className="guide-welcome-icon">🏰</div>
            <h2>Welcome to Royal Castle</h2>
            <button onClick={skipTour} className="guide-close-button" aria-label="Close welcome dialog">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="guide-welcome-content">
            <p>Would you like to take a quick tour of our website?</p>
            <div className="guide-welcome-buttons">
              <button onClick={startTour} className="guide-start-button">
                Start Tour
              </button>
              <button onClick={skipTour} className="guide-skip-button">
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isOpen || !targetElement)
    return (
      <button onClick={() => onClose(true)} className="guide-help-button" aria-label="Start guided tour">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <span>Tour Guide</span>
      </button>
    )

  const isLastStep = currentStep === steps.length - 1

  return (
    <div className="guide-tour-container">
      {/* Tour tooltip - positioned at bottom left */}
      <div className="guide-tooltip">
        {/* Progress bar */}
        <div className="guide-progress-bar">
          <div
            className="guide-progress-indicator"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        <div className="guide-tooltip-header">
          <div className="guide-tooltip-icon">{steps[currentStep].icon}</div>
          <div className="guide-tooltip-title">{steps[currentStep].title}</div>
          <button onClick={handleClose} className="guide-close-button" aria-label="Close guide">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="guide-tooltip-step">
          Step {currentStep + 1} of {steps.length}
        </div>

        <div className="guide-tooltip-content">
          <p>{steps[currentStep].content}</p>
        </div>

        <div className="guide-tooltip-footer">
          {currentStep > 0 && (
            <button onClick={handlePrev} className="guide-prev-button">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back
            </button>
          )}
          <button onClick={handleNext} className="guide-next-button">
            {isLastStep ? "Finish" : "Next"}
            {!isLastStep && (
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
