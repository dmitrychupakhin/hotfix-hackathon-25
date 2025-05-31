import { TaskFilterField } from '@/shared/types/TaskFilterField'
import { MenuItem, Select, type SelectProps, type SxProps } from '@mui/material'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface TaskFilterSelectorProps {
  sort: TaskFilterField
  setSort: (sort: TaskFilterField) => void
  sx?: SxProps
  selectProps?: SelectProps
}

const TaskFilterSelector: FC<TaskFilterSelectorProps> = ({ sort, setSort, sx, selectProps }) => {
  const sortFieldOptions = () => {
  const { t } = useTranslation()
    return [
      { value: TaskFilterField.ALL, label: t('Все') },
      { value: TaskFilterField.DONE, label: t('Выполнено') },
      { value: TaskFilterField.INWORK, label: t('В работе') },
      { value: TaskFilterField.WAITING, label: t('Ожидает') },
      { value: TaskFilterField.DENIED, label: t('Отклонено') },
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
