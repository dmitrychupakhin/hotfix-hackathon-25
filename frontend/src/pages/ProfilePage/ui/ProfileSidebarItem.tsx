import { Box, Stack } from '@mui/material'

interface ProfileSidebarItemProps {
  Icon: React.ElementType
  active?: boolean
  onClick: () => void
}

const ProfileSidebarItem = ({ Icon, active, onClick }: ProfileSidebarItemProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      onClick={onClick}
      sx={theme => ({
        'cursor': 'pointer',
        '&:hover .iconBox': {
          backgroundColor: 'primary.dark',
          color:
            theme.palette.mode === 'light'
              ? theme.palette.secondary.dark
              : theme.palette.invertedSecondary.dark,
        },
        '&:active .iconBox': {
          backgroundColor: 'primary.darker',
        },
        '&:hover .text': {
          color: 'primary.dark',
        },
        '&:active .text': {
          color: 'primary.darker',
        },
      })}
    >
      <Box
        className="iconBox"
        sx={theme => ({
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: active ? 'primary.main' : 'transparent',
          color:
            theme.palette.mode === 'light'
              ? theme.palette.secondary.main
              : active
                ? theme.palette.invertedSecondary.main
                : theme.palette.secondary.main,
          borderRadius: 50,
        })}
      >
        <Icon />
      </Box>
    </Stack>
  )
}

export default ProfileSidebarItem
