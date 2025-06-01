import { useGetTask } from '@/entities/Task/api/taskApi'
import TaskDetail from '@/entities/Task/ui/TaskDetail'
import { useEffect } from 'react'
import { useParams } from 'react-router'

const ProfileTaskDetail = () => {
  const { id } = useParams()
  const { data: task } = useGetTask({ id: Number(id) })

  useEffect(() => {
    if (task) {
      console.log(task)
    }
  }, [task])

  return task && <TaskDetail task={task} />
}

export default ProfileTaskDetail
