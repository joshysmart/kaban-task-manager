import * as React from "react";

function LogoMobile(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={25} {...props}>
      <g fill="#635FC7" fillRule="evenodd">
        <rect width={6} height={25} rx={2} />
        <rect opacity={0.75} x={9} width={6} height={25} rx={2} />
        <rect opacity={0.5} x={18} width={6} height={25} rx={2} />
      </g>
    </svg>
  );
}

const MemoLogoMobile = React.memo(LogoMobile);
export default MemoLogoMobile;
