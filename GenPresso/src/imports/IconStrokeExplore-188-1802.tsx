import svgPaths from "./svg-867ot5rtzb";

function IconStrokeExplore({ className }: { className?: string }) {
  return (
    <div className={className} data-name="IconStrokeExplore">
      <div className="absolute inset-[9.375%]" data-name="Vector (Stroke)">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
          <path clipRule="evenodd" d={svgPaths.p18464380} fill="var(--fill-0, #F5F5F5)" fillRule="evenodd" id="Vector (Stroke)" />
        </svg>
      </div>
      <div className="absolute inset-[29.367%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
          <path d={svgPaths.p10b6a100} fill="var(--fill-0, #F5F5F5)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

export default function IconStrokeExplore1() {
  return <IconStrokeExplore className="relative size-full" />;
}