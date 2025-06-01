import { Box, Button, Card, Stack, Typography, useTheme } from '@mui/material'
import type { FC } from 'react'
import type { Task } from '../model/Task'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import { TaskFilterField } from '@/shared/types/TaskFilterField'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded'
import { ROUTES } from '@/shared/const/routes'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getProfileDataIsTeam } from '@/entities/Profile/model/selectors/getProfileData'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'

interface TaskProps {
  data: Task
}

const TaskItem: FC<TaskProps> = ({ data }) => {
  const { t } = useTranslation()
  console.log(data)
  const navigate = useNavigate()

  const isTeamlead = useSelector(getProfileDataIsTeam)

  const theme = useTheme()
  return (
    <Card
      elevation={0}
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 3,
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >

      <Stack spacing={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography

            variant="h5"
            color="secondary"
            fontWeight="600"
            sx={theme => ({
              backgroundColor: 'primary.light',
              lineHeight: 2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: theme.palette.mode === 'dark' ? theme.palette.invertedSecondary.dark : theme.palette.secondary.dark,
            })}
          >
            {data.title}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {data.description}
        </Typography>
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
        <Box>
          {
            data.status === TaskFilterField.DONE && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                border: `1px solid ${theme.palette.success.dark}`,
                borderRadius: 50,
                py: 0.5,
                px: 1 }}
              >
                <CheckCircleOutlineRoundedIcon sx={{ color: 'success.dark' }} />
                <Typography variant="body1" color="success.dark">{t('выполнено')}</Typography>
              </Box>
            )
          }

          {
            data.status === TaskFilterField.INWORK && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                border: `1px solid ${theme.palette.warning.main}`,
                borderRadius: 50,
                py: 0.5,
                px: 1,
              }}
              >
                <AutorenewRoundedIcon sx={{ color: 'warning.main' }} />
                <Typography variant="body1" color="warning.main">{t('в работе')}</Typography>
              </Box>
            )
          }

          {
            data.status === TaskFilterField.WAITING && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                border: `1px solid ${theme.palette.grey[600]}`,
                borderRadius: 50,
                py: 0.5,
                px: 1,
              }}
              >
                <SwapVertRoundedIcon sx={{ color: 'grey.600' }} />
                <Typography variant="body1" color="grey.600">{t('ожидает')}</Typography>
              </Box>
            )
          }

          {
            data.status === TaskFilterField.DENIED && (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                border: `1px solid ${theme.palette.error.main}`,
                borderRadius: 50,
                py: 0.5,
                px: 1,
              }}
              >
                <CheckCircleOutlineRoundedIcon sx={{ color: 'error.main' }} />
                <Typography variant="body1" color="error.main">{t('отклонено')}</Typography>
              </Box>
            )
          }
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<SendRoundedIcon />}
            size="small"
            onClick={() => navigate(ROUTES.PROFILE_TASK(data.id.toString()))}
          >
            {t('Подробнее')}
          </Button>
          {
            isTeamlead && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                endIcon={<RocketLaunchRoundedIcon />}
                onClick={() => navigate(ROUTES.PROFILE_TASK(data.id.toString()))}
              >
                {t('Завершить задачу ')}
              </Button>
            )
          }
        </Box>

      </Box>

    </Card>
  )
}

export default TaskItem
