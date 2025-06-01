import * as React from 'react'
import DarkModeIcon from '@mui/icons-material/DarkModeRounded'
import LightModeIcon from '@mui/icons-material/LightModeRounded'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import type { IconButtonOwnProps } from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useColorScheme } from '@mui/material/styles'
import { Typography } from '@mui/material'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'

const ColorModeIconDropdown = (props: IconButtonOwnProps) => {
  const { mode, systemMode, setMode } = useColorScheme()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleMode = (targetMode: 'system' | 'light' | 'dark') => () => {
    setMode(targetMode)
    handleClose()
  }
  if (!mode) {
    return (
      <Box
        data-screenshot="toggle-mode"
        sx={() => ({
          verticalAlign: 'bottom',
          display: 'inline-flex',
          width: '2.25rem',
          height: '2.25rem',
          border: '1px solid',
        })}
      />
    )
  }
  const resolvedMode = (systemMode || mode) as 'light' | 'dark'
  const icon = {
    light: <LightModeIcon style={{ color: '#0B1120' }} />,
    dark: <DarkModeIcon />,
  }[resolvedMode]
  return (
    <>
      <IconButton
        data-screenshot="toggle-mode"
        onClick={handleClick}
        disableRipple
        size="small"
        aria-controls={open ? 'color-scheme-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        {...props}
      >
        {icon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ gap: 1 }} selected={mode === 'system'} onClick={handleMode('system')}>
          <SettingsSuggestIcon />
          <Typography>Система</Typography>
        </MenuItem>
        <MenuItem sx={{ gap: 1 }} selected={mode === 'light'} onClick={handleMode('light')}>
          <LightModeIcon />
          <Typography>День</Typography>
        </MenuItem>
        <MenuItem sx={{ gap: 1 }} selected={mode === 'dark'} onClick={handleMode('dark')}>
          <DarkModeIcon />
          <Typography>Ночь</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default ColorModeIconDropdown
