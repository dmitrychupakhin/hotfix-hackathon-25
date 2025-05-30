import { Link as RouterLink } from 'react-router'
import { Link, Stack, Typography } from '@mui/material'
import Logo from '@/shared/assets/icons/Logo.svg?react'
import { ROUTES } from '@/shared/const/routes'

export const LogoLink = () => {
  return (
    <Link color="secondary" component={RouterLink} to={ROUTES.HOME()}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <Logo width="42px" height="42px" />
        <Typography variant="h4" sx={{ fontWeight: '600' }}>
          SlobodaSoft
        </Typography>
      </Stack>
    </Link>
  )
}
