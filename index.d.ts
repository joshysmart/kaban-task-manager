type Board = {
  _id: string;
  name: name;
  columns: {
    name: string;
    tasks: {
      title: string;
      description: string;
      status: string;
      _id: string;
      subtasks: {
        title: string;
        isCompleted: boolean;
      }[];
    }[];
  }[];
  slug: string;
};
