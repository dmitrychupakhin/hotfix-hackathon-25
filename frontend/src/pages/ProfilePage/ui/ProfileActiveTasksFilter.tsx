import { TaskFilterSelector } from '@/features/TaskFilterSelector'
import { TaskSortSelector } from '@/features/TaskSortSelector'
import type { TaskFilterField } from '@/shared/types/TaskFilterField'
import type { TaskSortField } from '@/shared/types/TaskSortField'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { Grid, InputAdornment, Stack, TextField } from '@mui/material'
import type { FC } from 'react'

interface MainEventsFiltersProps {
  sort: TaskSortField
  setSort: (sort: TaskSortField) => void
  search: string
  setSearch: (search: string) => void
  filter: TaskFilterField
  setFilter: (filter: TaskFilterField) => void
}

const MainEventsFilters: FC<MainEventsFiltersProps> = ({
  sort,
  setSort,
  search,
  setSearch,
  filter,
  setFilter,
}) => {
  return (
    <Grid container>
      <Grid size={8}>
        <Stack direction="row" spacing={2}>
          <TaskSortSelector
            sort={sort}
            setSort={setSort}
            selectProps={{ variant: 'outlined', size: 'medium' }}
          />
          <TaskFilterSelector
            sort={filter}
            setSort={setFilter}
            selectProps={{ variant: 'outlined', size: 'medium' }}
          />
        </Stack>
      </Grid>
      <Grid size={4}>
        <TextField
          fullWidth
          label="Поиск"
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="medium"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchRoundedIcon color="primary" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>
    </Grid>
  )
}

export default MainEventsFilters
