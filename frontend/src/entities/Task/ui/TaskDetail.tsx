import { TaskFilterField } from '@/shared/types/TaskFilterField'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded'
import { Box, Card, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router'
import type { Task } from '../model/Task'

interface TaskDetailProps {
  task: Task
}

const TaskDetail = ({ task }: TaskDetailProps) => {
  const theme = useTheme()
  const navigate = useNavigate()
  return (
    <Card sx={{ p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Stack spacing={2}>
        <Box>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowCircleLeftRoundedIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box display="flex">
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              backgroundColor: 'primary.light',
              width: 'auto',
            }}
          >
            {task.title}
          </Typography>
        </Box>
        <Typography>
          {task.description}
        </Typography>
        <Typography fontWeight={600}>
          Дата отправки задания:
          {' '}
          <Typography
            component="span"
            fontWeight={600}
            sx={{
              backgroundColor: 'primary.light',
            }}
          >
            {task.createdAt}
          </Typography>
        </Typography>
        <Box display="flex">
          {
            task.status === TaskFilterField.DONE && (
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
                <Typography variant="body1" color="success.dark">выполнено</Typography>
              </Box>
            )
          }

          {
            task.status === TaskFilterField.INWORK && (
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
                <Typography variant="body1" color="warning.main">в работе</Typography>
              </Box>
            )
          }

          {
            task.status === TaskFilterField.WAITING && (
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
                <Typography variant="body1" color="grey.600">ожидает</Typography>
              </Box>
            )
          }

          {
            task.status === TaskFilterField.DENIED && (
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
                <Typography variant="body1" color="error.main">отклонено</Typography>
              </Box>
            )
          }
        </Box>
      </Stack>
    </Card>
  )
}

export default TaskDetail
