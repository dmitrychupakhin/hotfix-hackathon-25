// src/features/TaskDetail/TaskDetail.tsx
import React, { type FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
  Button,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
  Box,
  useTheme,
} from '@mui/material'
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded'

import { getProfileDataIsStaff, getProfileDataIsTeam } from '@/entities/Profile/model/selectors/getProfileData'
import { TaskFilterField } from '@/shared/types/TaskFilterField'
import FormLoader from '@/shared/ui/FormLoader/FormLoader'
import GanttChart from '@/shared/ui/GanttChartComponent/ui/GanttChart'

import { taskApi, useStartPlan, useLazyGetPlanResult } from '../api/taskApi'
import type { Task } from '../model/Task'

interface TaskDetailProps {
  task: Task
}

const TaskDetail: FC<TaskDetailProps> = ({ task }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isStaff = useSelector(getProfileDataIsStaff)
  const isTeam = useSelector(getProfileDataIsTeam)

  // 1) Хук для запуска мутации startPlan
  const [startPlan, { isLoading: isStarting }] = useStartPlan()

  // 2) Локальный флаг, отвечающий за включённый polling
  const [shouldPoll] = useState(false)

  // 3) Используем useGetPlanResultQuery с pollingInterval и skip
  const [
    triggerGetPlanResult,
    { data: planResultData, isFetching: isFetchingPlanResult },
  ] = useLazyGetPlanResult()

  const [pollIntervalId, setPollIntervalId] = useState<number | null>(null)

  const handleStartClick = async () => {
    try {
      await startPlan({ id: task.id }).unwrap()

      // Если до этого был старый setInterval — очищаем
      if (pollIntervalId) {
        clearInterval(pollIntervalId)
      }
      // Запускаем периодический опрос
      const newInterval = window.setInterval(() => {
        triggerGetPlanResult({ id: task.id })
      }, 1000)
      setPollIntervalId(newInterval)
    }
    catch (err) {
      console.error('Не удалось запустить план:', err)
    }
  }

  useEffect(() => {
    if (!planResultData) return

    // @ts-expect-error TODO: fix this
    if (planResultData.status === 'success') {
      // Останавливаем polling
      if (pollIntervalId) {
        clearInterval(pollIntervalId)
        setPollIntervalId(null)
      }

      // Инвалидируем данные таска
      dispatch(
        taskApi.util.invalidateTags([
          { type: 'Tasks', id: task.id },
        ]),
      )
    }

    // @ts-expect-error TODO: fix this
    if (planResultData.status === 'error') {
      console.error('При формировании плана сервер вернул ошибку')
      if (pollIntervalId) {
        clearInterval(pollIntervalId)
        setPollIntervalId(null)
      }
    }
  }, [planResultData, dispatch, task.id, pollIntervalId])

  return (
    <Card sx={{ p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>
      {/* Показываем загрузчик, если идёт отправка мутации или polling status */}
      {(isStarting || isFetchingPlanResult) && <FormLoader />}

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
        <Typography>{task.description}</Typography>
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
          {task.status === TaskFilterField.DONE && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                border: `1px solid ${theme.palette.success.dark}`,
                borderRadius: 50,
                py: 0.5,
                px: 1,
              }}
            >
              <CheckCircleOutlineRoundedIcon sx={{ color: 'success.dark' }} />
              <Typography variant="body1" color="success.dark">
                выполнено
              </Typography>
            </Box>
          )}
          {task.status === TaskFilterField.INWORK && (
            <Box
              sx={{
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
              <Typography variant="body1" color="warning.main">
                в работе
              </Typography>
            </Box>
          )}
          {task.status === TaskFilterField.WAITING && (
            <Box
              sx={{
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
              <Typography variant="body1" color="grey.600">
                ожидает
              </Typography>
            </Box>
          )}
          {task.status === TaskFilterField.DENIED && (
            <Box
              sx={{
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
              <Typography variant="body1" color="error.main">
                отклонено
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>

      {(isStaff || isTeam) && (
        <>
          {/* Если план уже есть — рисуем диаграмму */}
          {task.plan && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">План (Ганта):</Typography>
              <GanttChart data={task.plan} isEditProgressOnly={isTeam} />
            </Box>
          )}

          <Box display="flex" gap={2} justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              disabled={task.plan === null}
              onClick={() => {
                /* ваша логика «Отправить на разработку» */
              }}
            >
              Отправить на разработку
            </Button>

            <Button
              variant="contained"
              color="primary"
              disabled={isStarting || shouldPoll}
              onClick={handleStartClick}
            >
              {isStarting || shouldPoll ? 'Формируется…' : 'Сформировать план'}
            </Button>
          </Box>
        </>
      )}
    </Card>
  )
}

export default TaskDetail
