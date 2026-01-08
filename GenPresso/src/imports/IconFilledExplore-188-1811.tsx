import svgPaths from "./svg-y186hdmfmx";

function IconFilledExplore({ className }: { className?: string }) {
  return (
    <div className={className} data-name="IconFilledExplore">
      <div className="absolute inset-[45.313%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
          <path d={svgPaths.p29bfc400} fill="var(--fill-0, #F5F5F5)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[9.375%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
          <path d={svgPaths.p288e1700} fill="var(--fill-0, #F5F5F5)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

export default function IconFilledExplore1() {
  return <IconFilledExplore className="relative size-full" />;
}