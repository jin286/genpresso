import imgGenPressoMain1 from "figma:asset/4d003ffd4dae0bab198fb16c3b1d994e651dbd70.png";

function Container() {
  return <div className="h-0 shrink-0 w-full" data-name="Container" />;
}

function Container1() {
  return <div className="absolute h-[720px] left-0 opacity-30 top-0 w-[1280px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 1280 720\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -73.43 -73.43 0 640 360)\\\'><stop stop-color=\\\'rgba(163,163,163,0.2)\\\' offset=\\\'0.00078125\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.00078125\\\'/></radialGradient></defs></svg>')" }} />;
}

function CanvasWorkspace() {
  return (
    <div className="h-[720px] overflow-clip relative shrink-0 w-full" data-name="CanvasWorkspace">
      <div className="absolute h-[640px] left-[62px] top-0 w-[805px]" data-name="GenPresso_Main 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgGenPressoMain1} />
      </div>
      <Container1 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="content-stretch flex flex-col h-[720px] items-start overflow-clip relative shrink-0 w-full" data-name="Main Content">
      <CanvasWorkspace />
    </div>
  );
}

export default function GenPressoLayout() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="GenPressoLayout" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1280 720\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -117.49 -117.49 0 256 144)\\'><stop stop-color=\\'rgba(53,169,221,0.15)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(27,85,111,0.075)\\' offset=\\'0.25\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1280 720\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -117.49 -117.49 0 1024 576)\\'><stop stop-color=\\'rgba(37,71,88,0.15)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1280 720\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -88.116 -88.116 0 512 288)\\'><stop stop-color=\\'rgba(63,63,70,0.1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(20, 20, 21) 0%, rgb(20, 20, 21) 100%)" }}>
      {[...Array(3).keys()].map((_, i) => (
        <Container key={i} />
      ))}
      <MainContent />
    </div>
  );
}