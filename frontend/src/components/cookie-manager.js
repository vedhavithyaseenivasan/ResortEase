"use client"

import { useState, useEffect } from "react"

// This is a utility component to manage cookies throughout the application
export default function CookieManager() {
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  })

  useEffect(() => {
    // Load cookie preferences on mount
    const savedPreferences = getCookiePreferences()
    if (savedPreferences) {
      setCookiePreferences(savedPreferences)
      applyPreferences(savedPreferences)
    }
  }, [])

  // Apply cookie preferences to the site
  const applyPreferences = (preferences) => {
    // Always allow necessary cookies

    // Handle analytics cookies
    if (preferences.analytics) {
      enableAnalytics()
    } else {
      disableAnalytics()
    }

    // Handle marketing cookies
    if (preferences.marketing) {
      enableMarketing()
    } else {
      disableMarketing()
    }

    // Handle preference cookies
    if (preferences.preferences) {
      enablePreferenceCookies()
    } else {
      disablePreferenceCookies()
    }
  }

  // Example functions to enable/disable different cookie types
  const enableAnalytics = () => {
    // This would be where you initialize analytics tools like Google Analytics
    console.log("Analytics cookies enabled")
  }

  const disableAnalytics = () => {
    // This would be where you disable analytics tracking
    console.log("Analytics cookies disabled")
  }

  const enableMarketing = () => {
    // This would be where you initialize marketing/advertising cookies
    console.log("Marketing cookies enabled")
  }

  const disableMarketing = () => {
    // This would be where you disable marketing cookies
    console.log("Marketing cookies disabled")
  }

  const enablePreferenceCookies = () => {
    // This would be where you enable preference cookies
    console.log("Preference cookies enabled")
  }

  const disablePreferenceCookies = () => {
    // This would be where you disable preference cookies
    console.log("Preference cookies disabled")
  }

  return null // This component doesn't render anything
}

// Helper function to get cookie preferences from cookies
function getCookiePreferences() {
  const cookiePreferencesStr = getCookie("cookie_preferences")
  if (cookiePreferencesStr) {
    try {
      return JSON.parse(cookiePreferencesStr)
    } catch (e) {
      console.error("Error parsing cookie preferences", e)
    }
  }
  return null
}

// Cookie utility function
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
