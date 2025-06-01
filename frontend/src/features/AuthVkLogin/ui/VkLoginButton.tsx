import VkIcon from '@/shared/assets/icons/VKButton.svg?react'
import { Button, useTheme } from '@mui/material'
import { useEffect } from 'react'
import { initVKAuth } from '../config/vkConfig'

interface VkLoginButtonProps {
  title: string
  handleVkLogin: () => void
  disabled: boolean
}

const VkLoginButton = ({ handleVkLogin, disabled, title }: VkLoginButtonProps) => {
  useEffect(() => {
    initVKAuth()
  }, [])

  const theme = useTheme()

  return (
    <Button
      onClick={handleVkLogin}
      variant="contained"
      color="secondary"
      startIcon={(
        <VkIcon
          width="24px"
          height="24px"
          style={{ color: theme.palette.mode === 'dark'
            ? theme.palette.invertedSecondary.dark
            : theme.palette.invertedSecondary.dark }}
        />
      )}
      disabled={disabled}
    >
      {title}
    </Button>
  )
}
export default VkLoginButton
