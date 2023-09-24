import TaskCard from "./TaskCard";

type Props = {
  col: Board["columns"][number];
  index: number;
};
export default function Col({ col, index }: Props) {
  const keyColors: {
    [key: number]: string;
  } = {
    0: "todo-blue",
    1: "doing-purple",
    2: "done-green",
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 w-[280px]">
        <div
          className={`w-[15px] h-[15px] rounded-full bg-${keyColors[index]}`}
        />
        <p className="text-xs font-bold uppercase tracking-[2.4px] text-medium-grey">
          {col.name} ({col.tasks.push.length})
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {col.tasks.map((task, i) => (
          <TaskCard task={task} key={`${task.description}${i}`} />
        ))}
      </div>
    </div>
  );
}
