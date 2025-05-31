import { TaskFilterField } from '@/shared/types/TaskFilterField'
import { MenuItem, Select, type SelectProps, type SxProps } from '@mui/material'
import type { FC } from 'react'

interface TaskFilterSelectorProps {
  sort: TaskFilterField
  setSort: (sort: TaskFilterField) => void
  sx?: SxProps
  selectProps?: SelectProps
}

const TaskFilterSelector: FC<TaskFilterSelectorProps> = ({ sort, setSort, sx, selectProps }) => {
  const sortFieldOptions = () => {
    return [
      { value: TaskFilterField.ALL, label: 'Все' },
      { value: TaskFilterField.DONE, label: 'Выполнено' },
      { value: TaskFilterField.INWORK, label: 'В работе' },
      { value: TaskFilterField.WAITING, label: 'Ожидает' },
      { value: TaskFilterField.DENIED, label: 'Отклонено' },
    ]
  }

  const handleChange: SelectProps['onChange'] = (event) => {
    const { value } = event.target
    setSort(value as TaskFilterField)
  }

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={sort}
      displayEmpty
      onChange={handleChange}
      sx={{ ...sx }}
      {...selectProps}
    >
      {sortFieldOptions().map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export default TaskFilterSelector
