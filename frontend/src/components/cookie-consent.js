"use client"

import { useState, useEffect } from "react"
import "./cookie-consent.css"

export default function CookieConsent({ onAccept, onDecline }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: true,
    marketing: false,
    preferences: true,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = getCookie("cookie_consent")

    if (!cookieConsent) {
      // Show the banner after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    if (isAnimating) return

    setIsAnimating(true)

    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }

    setPreferences(allAccepted)

    setTimeout(() => {
      onAccept(allAccepted)
      setCookie("cookie_consent", "all", 365)
      setIsOpen(false)
      setIsAnimating(false)
    }, 300)
  }

  const handleSavePreferences = () => {
    if (isAnimating) return

    setIsAnimating(true)

    setTimeout(() => {
      onAccept(preferences)
      setCookie("cookie_consent", "custom", 365)
      setCookie("cookie_preferences", JSON.stringify(preferences), 365)
      setIsOpen(false)
      setIsAnimating(false)
    }, 300)
  }

  const handleDecline = () => {
    if (isAnimating) return

    setIsAnimating(true)

    const minimalPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }

    setTimeout(() => {
      onDecline()
      setCookie("cookie_consent", "minimal", 365)
      setCookie("cookie_preferences", JSON.stringify(minimalPreferences), 365)
      setIsOpen(false)
      setIsAnimating(false)
    }, 300)
  }

  const handlePreferenceChange = (key) => {
    if (key === "necessary") return // Cannot change necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const togglePreferences = () => {
    if (isAnimating) return

    setIsAnimating(true)

    setTimeout(() => {
      setShowPreferences(!showPreferences)
      setIsAnimating(false)
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div className={`cookie-consent ${isAnimating ? "cookie-animating" : ""}`}>
      <div className="cookie-container">
        {!showPreferences ? (
          <div className="cookie-simple-view">
            <div className="cookie-header">
              <div className="cookie-icon">🍪</div>
              <div className="cookie-title">
                <h3>Cookie Preferences</h3>
                <p>
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our
                  traffic. Please choose your preferences below.
                </p>
              </div>
            </div>

            <div className="cookie-actions">
              <button onClick={handleDecline} className="cookie-btn cookie-btn-text">
                Decline All
              </button>
              <button onClick={togglePreferences} className="cookie-btn cookie-btn-outline">
                Customize
              </button>
              <button onClick={handleAcceptAll} className="cookie-btn cookie-btn-primary">
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="cookie-preferences-view">
            <div className="cookie-preferences-header">
              <h3>Cookie Settings</h3>
              <p>Manage your cookie preferences. Necessary cookies are always enabled.</p>
            </div>

            <div className="cookie-types">
              <div className="cookie-type">
                <div className="cookie-type-info">
                  <div className="cookie-type-header">
                    <h4>Necessary Cookies</h4>
                    <span className="cookie-badge">Required</span>
                  </div>
                  <p>These cookies are essential for the website to function properly and cannot be disabled.</p>
                </div>
                <label className="cookie-switch">
                  <input type="checkbox" checked={preferences.necessary} disabled={true} />
                  <span className="cookie-slider"></span>
                </label>
              </div>

              <div className="cookie-type">
                <div className="cookie-type-info">
                  <div className="cookie-type-header">
                    <h4>Analytics Cookies</h4>
                  </div>
                  <p>
                    These cookies help us understand how visitors interact with our website, helping us improve our
                    services.
                  </p>
                </div>
                <label className="cookie-switch">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => handlePreferenceChange("analytics")}
                  />
                  <span className="cookie-slider"></span>
                </label>
              </div>

              <div className="cookie-type">
                <div className="cookie-type-info">
                  <div className="cookie-type-header">
                    <h4>Marketing Cookies</h4>
                  </div>
                  <p>These cookies are used to track visitors across websites to display relevant advertisements.</p>
                </div>
                <label className="cookie-switch">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => handlePreferenceChange("marketing")}
                  />
                  <span className="cookie-slider"></span>
                </label>
              </div>

              <div className="cookie-type">
                <div className="cookie-type-info">
                  <div className="cookie-type-header">
                    <h4>Preference Cookies</h4>
                  </div>
                  <p>
                    These cookies enable the website to remember your preferences and choices for a better experience.
                  </p>
                </div>
                <label className="cookie-switch">
                  <input
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={() => handlePreferenceChange("preferences")}
                  />
                  <span className="cookie-slider"></span>
                </label>
              </div>
            </div>

            <div className="cookie-preferences-footer">
              <button onClick={togglePreferences} className="cookie-btn cookie-btn-text">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back
              </button>
              <div className="cookie-preferences-actions">
                <button onClick={handleDecline} className="cookie-btn cookie-btn-outline">
                  Decline All
                </button>
                <button onClick={handleSavePreferences} className="cookie-btn cookie-btn-primary">
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Cookie utility functions
function setCookie(name, value, days) {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = "; expires=" + date.toUTCString()
  document.cookie = name + "=" + value + expires + "; path=/"
}

function getCookie(name) {
  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}
