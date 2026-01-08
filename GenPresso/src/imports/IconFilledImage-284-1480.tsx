import svgPaths from "./svg-9b1kid5p5s";

function IconFilledImage({ className }: { className?: string }) {
  return (
    <div className={className} data-name="IconFilledImage">
      <div className="absolute inset-[12.5%_6.25%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 15">
          <path d={svgPaths.p3610ea80} fill="var(--fill-0, currentColor)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

export default function IconFilledImage1() {
  return <IconFilledImage className="relative size-full" />;
}