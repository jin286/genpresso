import svgPaths from "./svg-0cpmoo86wg";

function IconTablerIconsChartInfographic() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 25 25">
      <g clipPath="url(#clip0_1_371)">
        <path d={svgPaths.p18e83b00} fill="currentColor" />
        <path d={svgPaths.p3d29f6c0} fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_1_371">
          <rect fill="white" height="25" width="25" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function CreateBtn() {
  return (
    <button 
      className="border rounded-full h-11 px-4 flex items-center justify-center gap-2 transition-colors duration-200"
      data-name="Create Btn"
      style={{
        backgroundColor: 'var(--color-glass-bg)',
        borderColor: 'var(--color-glass-border)',
        color: 'var(--foreground)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-glass-hover-bg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-glass-bg)';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-glass-active-bg)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-glass-hover-bg)';
      }}
    >
      <span className="font-medium">생성하기</span>
      <IconTablerIconsChartInfographic />
    </button>
  );
}