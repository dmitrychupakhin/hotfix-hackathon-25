import { type FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router'
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Link as MuiLink,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { getProfileData } from '@/entities/Profile'
import { LogoLink } from '@/shared/ui/LogoLink/LogoLink'
import { ColorModeIconDropdown } from '@/widgets/ThemeSwitcher'
import { LangSwitcher } from '@/widgets/LangSwitcher'
import AuthSection from './AuthSection'
import UserMenu from './UserMenu'
import { useHeaderLinks } from '../lib/hooks/useHeaderLinks'

const Header: FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md')) // md === 960px
  const location = useLocation()
  const profileData = useSelector(getProfileData)
  const { data: user } = profileData

  const [isScrolled, setIsScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const headerLinks = useHeaderLinks()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderNavLinks = (direction: 'row' | 'column' = 'row') => (
    <Stack
      direction={direction}
      spacing={2}
      alignItems={direction === 'row' ? 'center' : 'flex-start'}
    >
      {headerLinks.map(link => (
        <MuiLink
          key={link.path}
          component={Link}
          to={link.path}
          variant="body2"
          fontWeight={600}
          onClick={() => setDrawerOpen(false)}
          sx={{
            'backgroundColor': link.path === location.pathname
              ? theme.palette.primary.light
              : 'transparent',
            'color': link.path === location.pathname
              ? theme.palette.mode === 'dark'
                ? theme.palette.invertedSecondary.main
                : theme.palette.secondary.main
              : theme.palette.secondary.main,
            '&:hover': {
              color: theme.palette.mode === 'dark'
                ? theme.palette.invertedSecondary.main
                : theme.palette.secondary.main,
            },
            'lineHeight': 2,
            'px': 1,
            'borderRadius': 1,
          }}
        >
          {link.title}
        </MuiLink>
      ))}
    </Stack>
  )

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1200,
        width: '100%',
        height: theme.mixins.toolbar.minHeight,
        px: 4,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: isScrolled
          ? theme.palette.background.default
          : 'transparent',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <LogoLink />
          {!isMobile && renderNavLinks('row')}
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          {!isMobile && (
            <>
              <ColorModeIconDropdown />
              <LangSwitcher />
              {user ? <UserMenu user={user} /> : <AuthSection />}
            </>
          )}
          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Stack>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 250,
            p: 2,
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Меню
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {renderNavLinks('column')}
        <Divider sx={{ my: 2 }} />
        {user ? <UserMenu user={user} /> : <AuthSection />}
        <Box mt={2}>
          <LangSwitcher />
          <ColorModeIconDropdown />
        </Box>
      </Drawer>
    </Box>
  )
}

export default Header
