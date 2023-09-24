import * as React from "react";

function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="10" height="8" {...props}>
      <path
        stroke="#FFF"
        strokeWidth={2}
        fill="none"
        d="M1.276 3.066l2.756 2.756 5-5"
      />
    </svg>
  );
}

const MemoIconCheck = React.memo(IconCheck);
export default MemoIconCheck;
