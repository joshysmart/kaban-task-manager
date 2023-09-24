import * as React from "react";

function IconAddTaskMobile(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={12} height={12} {...props}>
      <path
        fill="#FFF"
        d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
      />
    </svg>
  );
}

const MemoIconAddTaskMobile = React.memo(IconAddTaskMobile);
export default MemoIconAddTaskMobile;
