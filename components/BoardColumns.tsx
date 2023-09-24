import React from "react";
import Col from "./Col";
import NewColumn from "./NewColumn";

type Props = {
  board?: Board;
};

export default function BoardColumns({ board }: Props) {
  const columns = board?.columns?.map((col, i) => (
    <Col col={col} index={i} key={col.name} />
  ));

  return (
    <div className="flex gap-6 p-4 py-6 overflow-x-scroll md:p-6">
      {columns}
      <NewColumn />
    </div>
  );
}
