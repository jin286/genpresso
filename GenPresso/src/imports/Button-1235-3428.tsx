import svgPaths from "./svg-2nakhnhl12";

function GoogleIcon() {
  return (
    <div className="relative shrink-0 size-[15.996px]" data-name="GoogleIcon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1235_3258)" id="GoogleIcon">
          <path d={svgPaths.p1a9efc30} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1235_3258">
            <rect fill="white" height="15.9963" width="15.9963" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SocialLoginButton() {
  return (
    <div className="h-[23.99px] relative shrink-0 w-[135.001px]" data-name="SocialLoginButton">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[23.99px] relative w-[135.001px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[24px] left-[68px] not-italic text-[16px] text-black text-center text-nowrap top-[-0.67px] translate-x-[-50%] whitespace-pre">Log in with Google</p>
      </div>
    </div>
  );
}

export default function Button() {
  return (
    <div className="bg-[rgba(82,82,91,0.24)] relative rounded-[1.9507e+07px] size-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.744px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[1.9507e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[7.994px] items-center justify-center p-[1.744px] relative size-full">
          <GoogleIcon />
          <SocialLoginButton />
        </div>
      </div>
    </div>
  );
}