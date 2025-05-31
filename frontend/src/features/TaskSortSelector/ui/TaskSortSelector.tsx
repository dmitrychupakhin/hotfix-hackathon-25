import { TaskSortField } from '@/shared/types/TaskSortField'
import { MenuItem, Select, type SelectProps, type SxProps } from '@mui/material'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface TaskSortSelectorProps {
  sort: TaskSortField
  setSort: (sort: TaskSortField) => void
  sx?: SxProps
  selectProps?: SelectProps
}

const TaskSortSelector: FC<TaskSortSelectorProps> = ({ sort, setSort, sx, selectProps }) => {
  const { t } = useTranslation()
  const sortFieldOptions = () => {
    return [
      { value: TaskSortField.CREATED_ASC, label: t('По дате добавления ↑') },
      { value: TaskSortField.CREATED_DESC, label: t('По дате добавления ↓') },
      { value: TaskSortField.WORK_START_ASC, label: t('Начало работы ↑') },
      { value: TaskSortField.WORK_END_DESC, label: t('Начало работы ↓') },
      { value: TaskSortField.WORK_END_ASC, label: t('Окончание работы ↑') },
      { value: TaskSortField.WORK_END_DESC, label: t('Окончание работы ↓') },
    ]
  }

  const handleChange: SelectProps['onChange'] = (event) => {
    const { value } = event.target
    setSort(value as TaskSortField)
  }

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={sort}
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

export default TaskSortSelector
