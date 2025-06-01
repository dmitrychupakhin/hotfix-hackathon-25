import React, { Component, type ErrorInfo, useEffect, useState } from 'react'
// @ts-expect-error TooltipContentProps is not exported
import { Gantt, type Task, type TooltipContentProps } from 'gantt-task-react'
import 'gantt-task-react/dist/index.css'
import dayjs from 'dayjs'
// Подключаем русскую локаль
import 'dayjs/locale/ru'
dayjs.locale('ru')

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {
  Add as AddIcon,
  ArrowUpward,
  ArrowDownward,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useTranslation } from 'react-i18next'

// Описание формата входных/выходных данных
export interface GanttInputItem {
  name: string
  startDate: string // ожидаем формат 'YYYY-MM-DD' или ISO
  endDate: string // ожидаем формат 'YYYY-MM-DD' или ISO
  progress: number
}

// Кастомный Tooltip, который отображается снизу
const CustomTooltip: React.FC<TooltipContentProps> = ({ task }) => {
  const { t } = useTranslation()
  return (
    <Paper
      elevation={3}
      sx={{
        p: 1,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        position: 'absolute',
        top: 70,
        left: 0,
        zIndex: 1500,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <Typography variant="body2" fontWeight="bold">
        {task.name}
      </Typography>
      <Typography variant="body2">
        {t('С')}
        {' '}
        {dayjs(task.start).format('DD.MM.YYYY')}
        {' '}
        {t('до')}
        {' '}
        {dayjs(task.end).format('DD.MM.YYYY')}
      </Typography>
      <Typography variant="body2">
        {t('Прогресс:')}
        {' '}
        {task.progress}
        %
      </Typography>
    </Paper>
  )
}

// Преобразование входного массива GanttInputItem[] в Task[]
const convertToTasks = (data: GanttInputItem[] = []): Task[] => {
  // @ts-expect-error Task is not exported
  return data
    .map((item, index) => {
      const parsedStart = dayjs(item.startDate)
      const parsedEnd = dayjs(item.endDate)

      // Если хотя бы одна из дат невалидна, пропускаем эту запись
      if (!parsedStart.isValid() || !parsedEnd.isValid()) {
        console.warn(`Задача "${item.name}" имеет некорректную дату и будет пропущена.`)
        return null
      }

      // Если дата окончания раньше даты начала, пропускаем
      if (parsedEnd.isBefore(parsedStart)) {
        console.warn(
          `Для задачи "${item.name}" дата окончания (${parsedEnd.format('YYYY-MM-DD')}) раньше даты начала (${parsedStart.format('YYYY-MM-DD')}), задача будет пропущена.`,
        )
        return null
      }

      return {
        id: `Task-${index + 1}`,
        name: item.name,
        start: parsedStart.toDate(),
        end: parsedEnd.toDate(),
        type: 'task' as const,
        progress: item.progress,
        isDisabled: false,
      }
    })
    // @ts-expect-error Task is not exported
    .filter((t): t is Task => t !== null)
}

// Преобразование Task[] обратно в GanttInputItem[]
const convertToInputItems = (tasks: Task[]): GanttInputItem[] => {
  return tasks.map(task => ({
    name: task.name,
    startDate: dayjs(task.start).format('YYYY-MM-DD'),
    endDate: dayjs(task.end).format('YYYY-MM-DD'),
    progress: task.progress,
  }))
}

// ErrorBoundary, чтобы приложение не падало при ошибках Gantt
class GanttErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Ошибка в Gantt:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Typography color="error" sx={{ p: 2 }}>
          Произошла ошибка при отрисовке диаграммы Ганта.
        </Typography>
      )
    }
    return this.props.children
  }
}

interface GanttChartProps {
  data: GanttInputItem[] | undefined
  /**
   * Функция-колбек, которая будет вызвана при любом изменении задач.
   * Возвращает массив в формате GanttInputItem[].
   */
  onDataChange?: (updated: GanttInputItem[]) => void

  /**
   * Если true, разрешается редактировать только прогресс.
   * Даты и название задачи нельзя менять.
   */
  isEditProgressOnly?: boolean
}

const GanttChart: React.FC<GanttChartProps> = ({
  data,
  onDataChange,
  isEditProgressOnly = false,
}) => {
  const { t } = useTranslation()
  // Инициализируем задачи из входных данных (гарантируем, что data — массив)
  const initialTasks = convertToTasks(Array.isArray(data) ? data : [])
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [editTask, setEditTask] = useState<Task | null>(null)

  // Каждый раз, когда tasks меняются, вызываем callback onDataChange
  useEffect(() => {
    if (typeof onDataChange === 'function') {
      const converted = convertToInputItems(tasks)
      onDataChange(converted)
    }
  }, [tasks, onDataChange])

  // Обработчик изменений задачи (дата или прогресс)
  const handleTaskChange = (task: Task) => {
    setTasks(prev =>
      prev.map(t => (t.id === task.id ? { ...task } : t)),
    )
  }

  // Когда пользователь сохраняет редактирование через диалог
  const handleDialogSave = () => {
    if (editTask) {
      handleTaskChange(editTask)
      setEditTask(null)
    }
  }

  // Добавляем новую задачу
  const handleAddTask = () => {
    const newIndex = tasks.length
    const today = new Date()

    const newTask: Task = {
      id: `Task-${newIndex + 1}`,
      name: `${t('Новая задача')} ${newIndex + 1}`,
      start: today,
      end: dayjs(today).add(3, 'day').toDate(),
      type: 'task',
      progress: 0,
      isDisabled: false,
    }

    setTasks(prev => [...prev, newTask])
  }

  // Перемещаем задачу вверх/вниз
  const moveTask = (id: string, direction: 'up' | 'down') => {
    setTasks((prev) => {
      const index = prev.findIndex(t => t.id === id)
      if (index === -1) return prev

      const newIndex = direction === 'up' ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= prev.length) return prev

      const updated = [...prev]
      const temp = updated[index]
      updated[index] = updated[newIndex]
      updated[newIndex] = temp

      return updated.map((task, i) => ({
        ...task,
        id: `Task-${i + 1}`,
      }))
    })
  }

  // Удаляем задачу
  const deleteTask = (id: string) => {
    setTasks((prev) => {
      const filtered = prev.filter(t => t.id !== id)
      return filtered.map((task, i) => ({
        ...task,
        id: `Task-${i + 1}`,
      }))
    })
  }

  return (
    // Указываем локаль "ru", чтобы DatePicker показывал даты в формате дд.мм.гггг
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <Box p={2}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <Typography variant="h5">{t('Диаграмма Ганта')}</Typography>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleAddTask}
            disabled={isEditProgressOnly}
          >
            {t('Добавить этап')}
          </Button>
        </Stack>

        <Box
          sx={theme => ({
            height: '600px',
            overflowX: 'auto',
            overflowY: 'hidden',
            position: 'relative',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
          })}
        >
          <GanttErrorBoundary>
            <Gantt
              tasks={tasks}
              // Если разрешено редактировать только прогресс, отключаем изменение дат
              onDateChange={isEditProgressOnly ? undefined : handleTaskChange}
              onProgressChange={handleTaskChange}
              onDoubleClick={task => setEditTask(task)}
              onSelect={(task, isSelected) =>
                console.log(task.name + ' selected:', isSelected)}
              TooltipContent={CustomTooltip}
              listCellWidth="330px"
              columnWidth={60}
              ganttHeight={600}
              TaskListHeader={() => (
                <Box
                  sx={theme => ({
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2,
                    py: 1,
                    bgcolor: theme.palette.background.paper,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  })}
                >
                  <Typography variant="body2" fontWeight="bold">
                    {t('Название')}
                  </Typography>
                </Box>
              )}
              TaskListTable={({ rowHeight, tasks: tableTasks }) => (
                <>
                  {tableTasks.map((task, index) => (
                    <Box
                      key={task.id}
                      sx={theme => ({
                        display: 'flex',
                        alignItems: 'center',
                        px: 2,
                        height: rowHeight,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                      })}
                    >
                      <Typography
                        sx={{
                          flexGrow: 1,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {task.name}
                      </Typography>
                      <IconButton
                        onClick={() => moveTask(task.id, 'up')}
                        disabled={index === 0 || isEditProgressOnly}
                        size="small"
                        title={t('Вверх')}
                      >
                        <ArrowUpward fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => moveTask(task.id, 'down')}
                        disabled={index === tableTasks.length - 1 || isEditProgressOnly}
                        size="small"
                        title={t('Вниз')}
                      >
                        <ArrowDownward fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => setEditTask(task)}
                        size="small"
                        title={t('Редактировать')}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteTask(task.id)}
                        size="small"
                        title={t('Удалить')}
                        sx={{ color: 'error.main' }}
                        disabled={isEditProgressOnly}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </>
              )}
            />
          </GanttErrorBoundary>
        </Box>

        <Dialog
          open={!!editTask}
          onClose={() => setEditTask(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{t('Редактировать задачу')}</DialogTitle>
          {editTask && (
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Если isEditProgressOnly=false, показываем поле Названия и Даты */}
              {!isEditProgressOnly && (
                <>
                  <TextField
                    label={t('Название')}
                    value={editTask.name}
                    onChange={e =>
                      setEditTask({ ...editTask, name: e.target.value })}
                    fullWidth
                  />
                  <DatePicker
                    label={t('Дата начала')}
                    value={dayjs(editTask.start)}
                    maxDate={dayjs(editTask.end)}
                    onChange={(date) => {
                      if (date && date.isValid()) {
                        const newStart = date.toDate()
                        if (dayjs(newStart).isAfter(dayjs(editTask.end))) {
                          return
                        }
                        setEditTask({ ...editTask, start: newStart })
                      }
                    }}
                    // опционально можно явно задать формат, но при adapterLocale="ru" MUI сам поставит «дд.мм.гггг»
                    // format="DD.MM.YYYY"
                  />
                  <DatePicker
                    label={t('Дата окончания')}
                    value={dayjs(editTask.end)}
                    minDate={dayjs(editTask.start)}
                    onChange={(date) => {
                      if (date && date.isValid()) {
                        const newEnd = date.toDate()
                        if (dayjs(newEnd).isBefore(dayjs(editTask.start))) {
                          return
                        }
                        setEditTask({ ...editTask, end: newEnd })
                      }
                    }}
                    // format="DD.MM.YYYY"
                  />
                </>
              )}
              {/* Всегда показываем слайдер прогресса */}
              <Box>
                <Typography variant="body2">
                  {t('Прогресс:')}
                  {' '}
                  {editTask.progress}
                  %
                </Typography>
                <Slider
                  value={editTask.progress}
                  onChange={(_, value) =>
                    setEditTask({ ...editTask, progress: value as number })}
                  min={0}
                  max={100}
                />
              </Box>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={() => setEditTask(null)}>{t('Отмена')}</Button>
            <Button onClick={handleDialogSave} variant="contained">
              {t('Сохранить')}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  )
}

export default GanttChart
