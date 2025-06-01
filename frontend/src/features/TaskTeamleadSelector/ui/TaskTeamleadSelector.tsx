import { useGetTeamLeaders } from '@/entities/Profile/api/ProfileApi'
import { MenuItem, Select } from '@mui/material'
import type { FC } from 'react'

interface TaskTeamleadSelectorProps {
  value: string
  onChange: (value: string) => void
}

const TaskTeamleadSelector: FC<TaskTeamleadSelectorProps> = ({ value, onChange }) => {
  const { data: teamLeaders } = useGetTeamLeaders()

  console.log(teamLeaders)

  return (
    <Select
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {teamLeaders?.map(leader => (
        <MenuItem key={leader.id} value={leader.id}>
          {leader.lastName}
          {' '}
          {leader.firstName}
          {' '}
          {leader.middleName}
        </MenuItem>
      ))}
    </Select>
  )
}

export default TaskTeamleadSelector
