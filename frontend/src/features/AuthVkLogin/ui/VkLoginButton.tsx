import VkIcon from '@/shared/assets/icons/VKButton.svg?react'
import { Button } from '@mui/material'
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

  return (
    <Button
      onClick={handleVkLogin}
      variant="contained"
      color="secondary"
      startIcon={<VkIcon width="24px" height="24px" style={{ color: 'white' }} />}
      disabled={disabled}
    >
      {title}
    </Button>
  )
}
export default VkLoginButton
