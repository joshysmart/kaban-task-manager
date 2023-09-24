import * as React from "react";

function IconCross(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" {...props}>
      <g fill="#828FA3" fillRule="evenodd">
        <path d="M12.728 0l2.122 2.122L2.122 14.85 0 12.728z" />
        <path d="M0 2.122L2.122 0 14.85 12.728l-2.122 2.122z" />
      </g>
    </svg>
  );
}

const MemoIconCross = React.memo(IconCross);
export default MemoIconCross;
