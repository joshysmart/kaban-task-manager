import * as React from "react";

function IconChevronUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="10" height="7" {...props}>
      <path stroke="#635FC7" strokeWidth={2} fill="none" d="M9 6L5 2 1 6" />
    </svg>
  );
}

const MemoIconChevronUp = React.memo(IconChevronUp);
export default MemoIconChevronUp;
