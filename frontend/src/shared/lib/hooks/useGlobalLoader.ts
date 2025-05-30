import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import {
  showLoader as showLoaderAction,
  hideLoader as hideLoaderAction,
} from '@/features/GlobalLoader'
import { useCallback } from 'react'

interface UseGlobalLoaderResult {
  showLoader: () => void
  hideLoader: () => void
}

export function useGlobalLoader(): UseGlobalLoaderResult {
  const dispatch = useAppDispatch()

  const showLoader = useCallback(() => {
    dispatch(showLoaderAction())
  }, [dispatch])

  const hideLoader = useCallback(() => {
    dispatch(hideLoaderAction())
  }, [dispatch])

  return { showLoader, hideLoader }
}
