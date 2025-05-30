import { useState } from 'react'
import type { MouseEvent } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export function usePasswordToggle() {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setVisible(v => !v)
  }

  return {
    type: visible ? 'text' : 'password',
    icon: visible ? <Visibility /> : <VisibilityOff />,
    toggleVisibility,
  }
}
