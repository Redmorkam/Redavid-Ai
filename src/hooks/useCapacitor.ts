import { useEffect } from 'react'
import { App as CapacitorApp } from '@capacitor/app'

export function useCapacitor() {
  useEffect(() => {
    const handleBackButton = async () => {
      const currentPath = window.location.pathname
      if (currentPath === '/') {
        await CapacitorApp.exitApp()
      }
    }

    CapacitorApp.addListener('backButton', handleBackButton)

    return () => {
      CapacitorApp.removeAllListeners()
    }
  }, [])
}
