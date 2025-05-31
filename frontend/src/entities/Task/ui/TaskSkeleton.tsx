import { Card, Skeleton, Stack } from '@mui/material'
import type { FC } from 'react'

const TaskSkeleton: FC = () => {
  return (
    <Card elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 3, width: '100%' }}>
      <Stack spacing={1.5}>
        <Skeleton variant="text" height={32} width="60%" />
        {' '}
        {/* Заголовок */}
        <Skeleton variant="text" height={24} width="100%" />
        <Skeleton variant="text" height={24} width="90%" />
        <Skeleton variant="text" height={24} width="95%" />
      </Stack>
    </Card>
  )
}

export default TaskSkeleton
