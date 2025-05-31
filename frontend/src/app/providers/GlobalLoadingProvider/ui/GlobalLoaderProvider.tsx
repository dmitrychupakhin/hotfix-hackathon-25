import { usePreloadState } from '@/app/providers/GlobalLoadingProvider/lib/hooks/usePreloadState'
import { getIsLoading } from '@/features/GlobalLoader/model/selectors/getIsLoading'
import { PageLoader } from '@/widgets/PageLoader'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

interface GlobalLoaderProviderProps {
  children: React.ReactNode
}

const GlobalLoaderProvider = ({ children }: GlobalLoaderProviderProps) => {
  const isLoading = useSelector(getIsLoading)

  const { isFetching } = usePreloadState()

  useEffect(() => {
    // console.log('Loader count changed:', isLoading);
  }, [isLoading])

  return (
    <Box>
      {(isLoading > 0 || isFetching) && <PageLoader />}
      {children}
    </Box>
  )
}

export default GlobalLoaderProvider
