import { Box, Stack, Typography } from '@mui/material'

interface ProfileDataItemProps {
  Icon: React.ElementType
  label: string
  value: string
}

const ProfileDataItem = ({ label, value, Icon }: ProfileDataItemProps) => {
  return (
    <Stack
      sx={theme => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 3,
        p: 2,
        width: '100%',
      })}
      spacing={1}
    >
      <Box sx={theme => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: theme.palette.mode === 'dark' ? theme.palette.invertedSecondary.dark : theme.palette.secondary.dark,
        backgroundColor: theme.palette.primary.light,
        px: 1,
      })}
      >
        <Icon style={{ color: 'black' }} />
        <Typography variant="body1">{label}</Typography>
      </Box>
      <Typography variant="body1">{value}</Typography>
    </Stack>
  )
}

export default ProfileDataItem
