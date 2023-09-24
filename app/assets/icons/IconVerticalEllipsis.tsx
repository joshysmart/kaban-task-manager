import * as React from "react";

function IconVerticalEllipsis(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="5" height="20" viewBox="0 0 5 20" fill="none" {...props}>
      <circle cx={2.308} cy={2.308} r={2.308} fill="#828FA3" />
      <circle cx={2.308} cy={10} r={2.308} fill="#828FA3" />
      <circle cx={2.308} cy={17.692} r={2.308} fill="#828FA3" />
    </svg>
  );
}

const MemoIconVerticalEllipsis = React.memo(IconVerticalEllipsis);
export default MemoIconVerticalEllipsis;
