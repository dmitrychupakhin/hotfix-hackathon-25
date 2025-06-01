// src/features/TaskDetail/TaskDetail.tsx
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded'
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import React, { type FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { getProfileDataIsStaff, getProfileDataIsTeam } from '@/entities/Profile/model/selectors/getProfileData'
import { TaskFilterField } from '@/shared/types/TaskFilterField'
import FormLoader from '@/shared/ui/FormLoader/FormLoader'
import GanttChart, { type GanttInputItem } from '@/shared/ui/GanttChartComponent/ui/GanttChart'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import { taskApi, useCancelTask, useDoneTask, useLazyGetPlanResult, useStartPlan, useUpdateTask } from '../api/taskApi'
import type { Task, UpdateTaskRequest } from '../model/Task'

// Используем ваш готовый хук дебаунса
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useTranslation } from 'react-i18next'
import { TaskTeamleadSelector } from '@/features/TaskTeamleadSelector'
import { ROUTES } from '@/shared/const/routes'

interface TaskDetailProps {
  task: Task
}

const TaskDetail: FC<TaskDetailProps> = ({ task }) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [cancelTask] = useCancelTask()

  const handleCancelTask = async () => {
    try {
      await cancelTask({ id: task.id }).unwrap()
      navigate(ROUTES.PROFILE_ACTIVE_TASKS())
    }
    catch (err) {
      console.error(t('Не удалось отклонить заявку:'), err)
    }
  }

  // Локальное состояние для контролируемых полей
  const [localTitle, setLocalTitle] = useState<string>(task.title)
  const [localDescription, setLocalDescription] = useState<string>(task.description)
  const [ganttData, setGanttData] = useState<GanttInputItem[]>(task.plan || [])

  // Локальное состояние для выбранного тимлида
  const [localTeamLeadId, setLocalTeamLeadId] = useState<string>(task.team?.id || '')

  const isStaff = useSelector(getProfileDataIsStaff)
  const isTeam = useSelector(getProfileDataIsTeam)

  const [updateTask, { isLoading: isUpdating }] = useUpdateTask()
  const [doneTask, { isLoading: isDoneLoading }] = useDoneTask()

  // Мемоизированный коллбэк для запуска мутации
  const handleUpdateTask = React.useCallback(
    async (data: UpdateTaskRequest) => {
      await updateTask({ id: task.id, data }).unwrap()
    },
    [task.id, updateTask],
  )

  const handleDoneTask = async () => {
    try {
      await doneTask({ id: task.id }).unwrap()
      navigate(ROUTES.PROFILE_ACTIVE_TASKS())
    }
    catch (err) {
      console.error(t('Не удалось завершить задачу:'), err)
    }
  }

  // Задебаунсенные значения
  const debouncedTitle = useDebounce(localTitle, 500)
  const debouncedDescription = useDebounce(localDescription, 500)
  const debouncedPlan = useDebounce(ganttData, 500)

  // Чтобы пропустить первоначальный монт
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    // При изменении title, description, плана или тимлида — отправляем обновлённые поля
    handleUpdateTask({
      title: debouncedTitle,
      description: debouncedDescription,
      plan: JSON.stringify(debouncedPlan),
      team: Number(localTeamLeadId),
    })
  }, [
    debouncedTitle,
    debouncedDescription,
    debouncedPlan,
    localTeamLeadId,
    handleUpdateTask,
  ])

  const [isUpdatingTask, setIsUpdatingTask] = useState(false)

  // 1) Хук для запуска мутации startPlan
  const [startPlan, { isLoading: isStarting }] = useStartPlan()

  // 2) Локальный флаг для polling
  const [shouldPoll] = useState(false)

  // 3) Используем useLazyGetPlanResult для опроса статуса
  const [
    triggerGetPlanResult,
    { data: planResultData, isFetching: isFetchingPlanResult },
  ] = useLazyGetPlanResult()

  const [pollIntervalId, setPollIntervalId] = useState<number | null>(null)

  const handleStartClick = async () => {
    try {
      setIsUpdatingTask(true)
      await startPlan({ id: task.id }).unwrap()

      // Если был старый интервал – очищаем
      if (pollIntervalId) {
        clearInterval(pollIntervalId)
      }
      // Запускаем новый интервал опроса
      const newInterval = window.setInterval(() => {
        triggerGetPlanResult({ id: task.id })
      }, 1000)
      setPollIntervalId(newInterval)
    }
    catch (err) {
      console.error(t('Не удалось запустить план:'), err)
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
      // Инвалидируем кэш задачи, чтобы подтянуть свежие поля
      dispatch(
        taskApi.util.invalidateTags([
          { type: 'Tasks', id: task.id },
        ]),
      )

      setIsUpdatingTask(false)
    }

    // @ts-expect-error TODO: fix this
    if (planResultData.status === 'error') {
      console.error(t('При формировании плана сервер вернул ошибку'))
      if (pollIntervalId) {
        clearInterval(pollIntervalId)
        setPollIntervalId(null)
      }

      setIsUpdatingTask(false)
    }
  }, [planResultData, dispatch, task.id, pollIntervalId])

  // Обработчики на изменение полей сразу обновляют локальный стейт.
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value)
  }

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalDescription(e.target.value)
  }

  // Обработчик выбора тимлида
  const onTeamLeadChange = (newId: string) => {
    setLocalTeamLeadId(newId)
    handleUpdateTask({
      plan: JSON.stringify(debouncedPlan),
      title: debouncedTitle,
      description: debouncedDescription,
      team: Number(newId),
    })
  }

  useEffect(() => {
    console.log(task)
  }, [task])

  return (
    <Card sx={{ p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>
      {/* Показываем загрузчик, если идёт отправка мутации или polling status */}
      {(isStarting || isFetchingPlanResult || isUpdating || isDoneLoading || isUpdatingTask) && <FormLoader />}

      <Stack spacing={2}>
        <Box>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowCircleLeftRoundedIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" gap={1}>
          {isStaff
            ? (
                <>
                  <TextField
                    label="Название"
                    value={localTitle}
                    onChange={onTitleChange}
                    fullWidth
                  />
                  <TextField
                    label="Описание"
                    value={localDescription}
                    multiline
                    rows={4}
                    onChange={onDescriptionChange}
                    fullWidth
                  />
                  <TaskTeamleadSelector
                    value={localTeamLeadId}
                    onChange={onTeamLeadChange}
                  />
                </>
              )
            : (
                <>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={theme => ({
                      backgroundColor: 'primary.light',
                      width: 'auto',
                      color: theme.palette.mode === 'dark'
                        ? theme.palette.invertedSecondary.dark
                        : theme.palette.secondary.dark,
                    })}
                  >
                    {task.title}
                  </Typography>
                  <Typography>{task.description}</Typography>
                </>
              )}
        </Box>

        <Typography fontWeight={600}>
          {t('Дата отправки задания:')}
          {' '}
          <Typography
            component="span"
            fontWeight={600}
            sx={theme => ({
              backgroundColor: 'primary.light',
              color: theme.palette.mode === 'dark'
                ? theme.palette.invertedSecondary.dark
                : theme.palette.secondary.dark,
            })}
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
                {t('выполнено')}
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
                {t('в работе')}
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
                {t('ожидает')}
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
                {t('отклонено')}
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>

      {(isStaff || isTeam) && (
        <Box sx={{ position: 'relative' }}>
          {task.plan && (
            <Box sx={{ mt: 2 }}>
              {
                task.plan.length > 0 && (
                  <GanttChart
                    data={task.plan}
                    isEditProgressOnly={isTeam}
                    onDataChange={setGanttData}
                  />
                )
              }
            </Box>
          )}

          <Box display="flex" gap={2} justifyContent="flex-end" sx={{ mt: 2 }}>
            {isStaff && (
              <Button
                variant="contained"
                color="secondary"
                disabled={task.plan === null}
                onClick={handleCancelTask}
              >
                {t('Отклонить заявку')}
              </Button>
            )}
            {isTeam && (
              <Button
                variant="contained"
                color="secondary"
                endIcon={<RocketLaunchRoundedIcon />}
                onClick={handleDoneTask}
              >
                {t('Завершить задачу')}
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              disabled={isStarting || shouldPoll}
              onClick={handleStartClick}

            >
              {isStarting || shouldPoll ? t('Формируется…') : t('Сформировать план')}
            </Button>
          </Box>
        </Box>
      )}
    </Card>
  )
}

export default TaskDetail
