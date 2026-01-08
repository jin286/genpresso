import svgPaths from "./svg-lbfclmskmi";

function Frame() {
  return (
    <div className="absolute h-[69px] left-[16px] top-[28px] w-[93px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 93 69">
        <g id="Frame 1">
          <path d={svgPaths.p3c292c00} fill="url(#paint0_linear_1555_2028)" id="Vector" />
          <path d={svgPaths.p2bce8940} fill="url(#paint1_linear_1555_2028)" id="Vector_2" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1555_2028" x1="46.5045" x2="46.5045" y1="1.52623" y2="82.1958">
            <stop stopColor="white" />
            <stop offset="1" stopColor="#898989" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1555_2028" x1="46.5045" x2="46.5045" y1="1.52614" y2="82.1957">
            <stop stopColor="white" />
            <stop offset="1" stopColor="#898989" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="다크 심볼">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Vector"></g>
      </svg>
      <Frame />
    </div>
  );
}