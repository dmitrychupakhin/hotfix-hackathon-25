import { Link as RouterLink } from 'react-router'
import { Link, Stack, Typography, type SxProps, type Theme } from '@mui/material'
import Logo from '@/shared/assets/icons/Logo.svg?react'
import { ROUTES } from '@/shared/const/routes'

interface LogoLinkProps {
  sx?: SxProps<Theme>
}

export const LogoLink = ({ sx }: LogoLinkProps) => {
  return (
    <Link color="secondary" component={RouterLink} to={ROUTES.HOME()} sx={sx}>
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
        <Logo width="42px" height="42px" />
        <Typography variant="h4" sx={{ fontWeight: '600' }}>
          SlobodaSoft
        </Typography>
      </Stack>
    </Link>
  )
}
