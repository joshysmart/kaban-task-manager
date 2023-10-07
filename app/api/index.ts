const fetcher = async (
  path: string,
  method: string,
  data?: any,
  token?: string | null
) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_DB_HOST}`;

  const url = baseUrl + path;
  const res = await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to ${method} ${url}`);
  }
  return res.json();
};

async function getBoard(path: string) {
  return fetcher(path, "GET");
}

async function getBoardNames(path: string): Promise<
  | {
      data: {
        _id: string;
        slug: string;
      }[];
    }
  | { data: undefined }
> {
  return fetcher(path, "GET");
}

async function createBoard(
  data: {
    name: string;
    columns: {
      name: string;
    }[];
  },
  token: string | null
): Promise<{ data: Board }> {
  return fetcher("/user", "POST", data, token);
}

async function editBoard(
  token: string | null,
  data: {
    name: string;
    columns: {
      name: string;
    }[];
    userId?: string;
    id?: string;
  }
) {
  return fetcher("/user", "PUT", data, token);
}

async function createTask(
  token: string | null,
  data: {
    title: string;
    description: string;
    status: string;
    taskId: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
  }
) {
  return fetcher("/user/task", "POST", data, token);
}

async function editTask(
  token: string | null,
  data: {
    title: string;
    description: string;
    status: string;
    oldStatus: string;
    taskId: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
  }
) {
  return fetcher("/user/task", "PUT", data, token);
}

async function deleteTask(
  token: string | null,
  data: {
    status: string;
    taskId: string;
  }
) {
  return fetcher("/user/task", "DELETE", data, token);
}

export {
  getBoard,
  getBoardNames,
  createBoard,
  createTask,
  editBoard,
  editTask,
  deleteTask,
};
