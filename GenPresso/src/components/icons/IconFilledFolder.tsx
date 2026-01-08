import React from "react";

// SVG Paths extracted from svg-x5ww4gedis.ts
const paths = {
  top: "M15.9267 10.625H2.82121C2.24723 10.6243 1.6965 10.3981 1.2878 9.99512C0.879093 9.59212 0.645159 9.04462 0.636447 8.4707L0.00597851 2.03555V2.02461C-0.0146675 1.76669 0.0182936 1.50728 0.102788 1.26272C0.187282 1.01816 0.32148 0.793727 0.496938 0.603556C0.672396 0.413385 0.885315 0.261587 1.1223 0.157715C1.35928 0.0538431 1.6152 0.0001453 1.87395 0H16.8779C17.1365 0.00025304 17.3924 0.0540303 17.6293 0.15795C17.8661 0.26187 18.079 0.413683 18.2543 0.603843C18.4297 0.794002 18.5638 1.01839 18.6483 1.2629C18.7327 1.50741 18.7657 1.76675 18.745 2.02461V2.03555L18.1114 8.4707C18.1027 9.04462 17.8688 9.59212 17.4601 9.99512C17.0514 10.3981 16.5007 10.6243 15.9267 10.625V10.625Z",
  bottom: "M14.0625 1.25H7.97305C7.78808 1.2506 7.60712 1.19621 7.45313 1.09375L6.36719 0.367582C6.00759 0.127119 5.58454 -0.000842404 5.15195 4.17362e-06H2.1875C1.60753 0.000624574 1.05149 0.231292 0.641389 0.641393C0.231288 1.05149 0.000620401 1.60753 0 2.1875V3.125H16.25C16.25 1.91875 15.2687 1.25 14.0625 1.25Z"
};

interface IconProps {
  className?: string;
  color?: string;
}

export function IconFilledFolder({ className, color = "currentColor" }: IconProps) {
  return (
    <div className={className || "relative size-full"} data-name="IconFilledFolder">
      <div className="absolute inset-[12.5%_9.38%_71.88%_9.38%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 4">
          <path d={paths.bottom} fill={color} />
        </svg>
      </div>
      <div className="absolute inset-[34.38%_3.12%_12.5%_3.13%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 11">
          <path d={paths.top} fill={color} />
        </svg>
      </div>
    </div>
  );
}
