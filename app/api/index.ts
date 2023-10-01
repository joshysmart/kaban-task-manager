async function getBoard(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getBoardNames(url: string): Promise<
  | {
      data: {
        _id: string;
        slug: string;
      }[];
    }
  | { data: undefined }
> {
  const res = await fetch(url);
  if (!res.ok) {
    return { data: undefined };
  }
  return res.json();
}

async function createBoard(
  url: string,
  data: {
    name: string;
    columns: {
      name: string;
    }[];
  }
): Promise<{ data: Board }> {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to create board");
  }
  return res.json();
}

async function createTask(
  url: string,
  data: {
    title: string;
    description: string;
    status: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
  }
) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to create task");
  }
  return res.json();
}

export { getBoard, getBoardNames, createBoard, createTask };
