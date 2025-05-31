// import { getProfileData } from '@/entities/Profile'
import { LogoLink } from '@/shared/ui/LogoLink/LogoLink'
import { ColorModeIconDropdown } from '@/widgets/ThemeSwitcher'
import { getProfileData } from '@/entities/Profile'
import { LangSwitcher } from '@/widgets/LangSwitcher'
import { Box, Link as MuiLink, Stack } from '@mui/material'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import AuthSection from './AuthSection'
import UserMenu from './UserMenu'
import { useHeaderLinks } from '../lib/hooks/useHeaderLinks'

const Header: FC = () => {
  const profileData = useSelector(getProfileData)

  const { data: user } = profileData

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      }
      else {
        setIsScrolled(false)
      }
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerLinks = useHeaderLinks()
  const location = useLocation()

  return (
    <Box
      sx={theme => ({
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2,
        width: '100%',
        height: theme.mixins.toolbar.minHeight,
        display: 'flex',
        alignItems: 'center',
        px: 4,
      })}
    >
      <Box
        sx={(theme) => {
          const showTransition
            = 'background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease'
          const hideTransition
            = 'background-color 0s ease, border-color 0s ease, backdrop-filter 0s ease'
          return {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            backgroundColor: isScrolled
              ? theme.palette.background.default
              : 'linear-gradient(180deg, #0d0f12 0, rgba(13, 15, 18, 0))',
            borderRadius: theme.shape.borderRadius * 50,
            boxShadow: isScrolled ? theme.shadows[1] : 'none',
            px: 2,
            // py: 1,
            position: 'relative',
            transition: isScrolled ? showTransition : hideTransition,
          }
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <LogoLink />
          {headerLinks.map(link => (
            <MuiLink
              key={link.path}
              variant="body2"
              fontWeight={600}
              sx={theme => ({
                'backgroundColor': link.path === location.pathname ? theme.palette.primary.light : 'transparent',
                '&:hover': {
                  color: theme.palette.secondary.main,
                },
                'lineHeight': 2,
              })}
              color="secondary"
            >
              {link.title}
            </MuiLink>
          ))}

        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <ColorModeIconDropdown />
          <LangSwitcher />
          {user ? <UserMenu user={user} /> : <AuthSection />}
        </Stack>
      </Box>
    </Box>
  )
}

export default Header
