import svgPaths from "./svg-k00kb8i11w";

function Icon() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path className="!stroke-[#4FA8D8]" style={{ stroke: '#4FA8D8' }} d={svgPaths.p3c3bf170} id="Vector" stroke="#4FA8D8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33327" />
          <path className="!stroke-[#4FA8D8]" style={{ stroke: '#4FA8D8' }} d={svgPaths.p2d371600} id="Vector_2" stroke="#4FA8D8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33327" />
        </g>
      </svg>
    </div>
  );
}

export default function UserProfileImage() {
  return (
    <div className="bg-[rgba(79,168,216,0.2)] relative rounded-full size-full" data-name="UserProfileImage">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center relative size-full">
          <Icon />
        </div>
      </div>
    </div>
  );
}
