import { useGlobalLoader } from '@/shared/lib/hooks/useGlobalLoader'
import { useEffect } from 'react'

export const GlobalLoader = () => {
  const { showLoader, hideLoader } = useGlobalLoader()

  useEffect(() => {
    // console.log('🧩 GlobalLoader MOUNTED');
    showLoader()
    return () => {
      // console.log('🧩 GlobalLoader UNMOUNTED');
      hideLoader()
    }
  }, [hideLoader, showLoader])

  return null
}
