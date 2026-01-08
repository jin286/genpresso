import React from "react";

// SVG Paths extracted from svg-z3hcoqrd24.ts
const paths = {
  p10a0f400: "M0.625 0C0.970178 0 1.25 0.279822 1.25 0.625V5.3125C1.25 5.47826 1.31585 5.63723 1.43306 5.75444C1.55027 5.87165 1.70924 5.9375 1.875 5.9375H6.5625C6.90768 5.9375 7.1875 6.21732 7.1875 6.5625C7.1875 6.90768 6.90768 7.1875 6.5625 7.1875H1.875C1.37772 7.1875 0.900805 6.98996 0.549175 6.63832C0.197545 6.28669 0 5.80978 0 5.3125V0.625C0 0.279822 0.279822 0 0.625 0Z",
  pd670d80: "M0 0.625C0 0.279822 0.279822 0 0.625 0H6.875C7.22018 0 7.5 0.279822 7.5 0.625C7.5 0.970178 7.22018 1.25 6.875 1.25H0.625C0.279822 1.25 0 0.970178 0 0.625Z",
  pf94a300: "M2.5 1.25C2.16848 1.25 1.85054 1.3817 1.61612 1.61612C1.3817 1.85054 1.25 2.16848 1.25 2.5V15C1.25 15.3315 1.3817 15.6495 1.61612 15.8839C1.85054 16.1183 2.16848 16.25 2.5 16.25H11.25C11.5815 16.25 11.8995 16.1183 12.1339 15.8839C12.3683 15.6495 12.5 15.3315 12.5 15V7.39267C12.5 7.39264 12.5 7.39261 12.5 7.39258C12.4999 7.22693 12.4341 7.06808 12.317 6.95093C12.317 6.95091 12.317 6.95089 12.317 6.95088L6.79912 1.43301C6.68196 1.31587 6.52309 1.25005 6.35742 1.25C6.35739 1.25 6.35736 1.25 6.35733 1.25H2.5ZM0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0H6.35752C6.85462 7.51019e-05 7.33136 0.197555 7.68291 0.549023L7.68296 0.549074L13.201 6.06709C13.5524 6.41864 13.7499 6.89538 13.75 7.39248V15C13.75 15.663 13.4866 16.2989 13.0178 16.7678C12.5489 17.2366 11.913 17.5 11.25 17.5H2.5C1.83696 17.5 1.20107 17.2366 0.732233 16.7678C0.263392 16.2989 0 15.663 0 15V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233Z"
};

interface IconProps {
  className?: string;
}

export function IconStrokeArchive({ className }: IconProps) {
  return (
    <div className={className} data-name="IconStrokeArchive">
      <div className="absolute inset-[6.25%_15.63%]" data-name="Vector (Stroke)">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
          <path clipRule="evenodd" d={paths.pf94a300} fill="var(--fill-0, currentColor)" fillRule="evenodd" />
        </svg>
      </div>
      <div className="absolute inset-[7.81%_17.19%_56.25%_46.88%]" data-name="Vector (Stroke)">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <path clipRule="evenodd" d={paths.p10a0f400} fill="var(--fill-0, currentColor)" fillRule="evenodd" />
        </svg>
      </div>
      <div className="absolute inset-[53.13%_31.25%_40.63%_31.25%]" data-name="Vector (Stroke)">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 2">
          <path clipRule="evenodd" d={paths.pd670d80} fill="var(--fill-0, currentColor)" fillRule="evenodd" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 left-[31.25%] right-[31.25%] top-[68.75%]" data-name="Vector (Stroke)">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 2">
          <path clipRule="evenodd" d={paths.pd670d80} fill="var(--fill-0, currentColor)" fillRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}
