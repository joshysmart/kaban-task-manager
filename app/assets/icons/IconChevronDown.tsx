import * as React from "react";

function IconChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="10" height="7" {...props}>
      <path stroke="#635FC7" strokeWidth={2} fill="none" d="M1 1l4 4 4-4" />
    </svg>
  );
}

const MemoIconChevronDown = React.memo(IconChevronDown);
export default MemoIconChevronDown;
