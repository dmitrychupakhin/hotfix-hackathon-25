import { useGetTask } from '@/entities/Task/api/taskApi'
import TaskDetail from '@/entities/Task/ui/TaskDetail'
import { useParams } from 'react-router'

const ProfileTaskDetail = () => {
  const { id } = useParams()
  const { data: task } = useGetTask({ id: Number(id) })

  return task ? <TaskDetail task={task} /> : null
}

export default ProfileTaskDetail
