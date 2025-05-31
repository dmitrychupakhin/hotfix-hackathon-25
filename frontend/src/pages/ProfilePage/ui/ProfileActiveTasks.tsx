import { useGetTasks } from '@/entities/Task/api/taskApi'
import { TaskList } from '@/entities/Task'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useTasksFilter } from '@/shared/lib/hooks/useTasksFilter'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'
import { Box, Card, Divider, Pagination, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import ProfileActiveTasksFilter from './ProfileActiveTasksFilter'

const ProfileActiveTasks = () => {
  const [page, setPage] = useState(1)
  const pageSize = 6

  const { search, setSearch, sort, setSort, status, setStatus }
      = useTasksFilter()

  const debouncedSearch = useDebounce(search, 500)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, sort, status])

  const { data, isFetching } = useGetTasks({
    status,
    ordering: sort,
    page,
    pageSize,
    search: debouncedSearch,
  })

  const pagesCount = Math.ceil((data?.count ?? 0) / pageSize)

  return (
    <Card sx={{ p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <AssignmentRoundedIcon />
        Активные задачи
      </Typography>
      <Divider />
      <Stack spacing={1}>
        <ProfileActiveTasksFilter
          sort={sort}
          setSort={setSort}
          search={search}
          setSearch={setSearch}
          filter={status}
          setFilter={setStatus}
        />
        <TaskList tasks={data?.results ?? []} isLoading={isFetching} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={pagesCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Stack>
    </Card>
  )
}

export default ProfileActiveTasks
