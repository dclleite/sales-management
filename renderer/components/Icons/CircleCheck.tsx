import React from "react";

function CircleCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={25} viewBox="0 0 24 25" fill="none" {...props}>
      <path
        d="M8 13.205l3 3 5-6"
        stroke="#6FCF8F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22.705c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10c0 5.522 4.477 10 10 10z"
        stroke="#6FCF8F"
        strokeWidth={2}
      />
    </svg>
  );
}

export default CircleCheck;
