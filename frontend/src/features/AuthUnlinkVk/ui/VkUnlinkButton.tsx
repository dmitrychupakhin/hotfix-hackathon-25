import VkIcon from '@/shared/assets/icons/VKButton.svg?react'
import { Button } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

interface VkUnlinkButtonProps {
  handleUnlinkVk: () => void
  title: string
  disabled: boolean
}

const VkUnlinkButton = ({ handleUnlinkVk, title, disabled }: VkUnlinkButtonProps) => {
  return (
    <Button
      variant="contained"
      color="error"
      onClick={handleUnlinkVk}
      startIcon={<VkIcon width="24px" height="24px" style={{ color: 'black' }} />}
      endIcon={<CloseRoundedIcon />}
      disabled={disabled}
    >
      {title}
    </Button>
  )
}

export default VkUnlinkButton
