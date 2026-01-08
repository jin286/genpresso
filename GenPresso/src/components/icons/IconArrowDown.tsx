import svgPaths from "../../imports/svg-rv2vy2exbh";
import { BaseIconProps } from "./index";

export function IconArrowDown({ size = 16, color = "#F5F5F5", className = "" }: BaseIconProps) {
  return (
    <div 
      className={`relative size-full transition-all duration-200 ${className}`} 
      style={size !== 16 ? { width: size, height: size } : {}}
      data-name="arrow-down-icon"
    >
      <div className="absolute inset-[29.38%_18%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 10">
          <path d={svgPaths.p10329800} fill={color} />
        </svg>
      </div>
    </div>
  );
}