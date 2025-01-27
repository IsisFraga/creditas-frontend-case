import { useEffect } from 'react'

export const useRegisterSW = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          registration => {
            console.log('SW registered:', registration)
          },
          err => {
            console.log('SW registration failed:', err)
          }
        )
      })
    }
  }, [])
}