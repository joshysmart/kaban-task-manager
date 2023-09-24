type Board = {
  id: string
  name: string
  slug: string
  columns: {
      name: string
      tasks: {
        title: string
        description: string
        status: string
        subtasks: {
          title: string
          isCompleted: boolean
        }[]
      }[]
    }[]
  user: string
}