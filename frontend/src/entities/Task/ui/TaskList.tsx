import { Grid, Typography, type SxProps } from '@mui/material'
import { type FC } from 'react'
import type { Task } from '../model/Task'
import TaskItem from './TaskItem'
import TaskSkeleton from './TaskSkeleton'
import { useTranslation } from 'react-i18next'

interface TaskListProps {
  tasks: Task[]
  isLoading?: boolean
  sx?: SxProps
}

const TaskList: FC<TaskListProps> = ({ tasks, isLoading, sx }) => {
  const { t } = useTranslation()
  return (
    <Grid container spacing={3} sx={sx}>
      {isLoading
        ? Array.from({ length: 6 }).map(() => (
            <Grid size={6} key={crypto.randomUUID()} sx={{ display: 'flex' }}>
              <TaskSkeleton />
            </Grid>
          ))
        : tasks.map(task => (
            <Grid size={6} key={task.id} sx={{ display: 'flex' }}>
              <TaskItem data={task} />
            </Grid>
          ))}
      {tasks.length === 0 && !isLoading && (
        <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Typography fontWeight={600} variant="h4">
            {t('Хм… похоже мероприятия не найдены')} =(
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default TaskList
