function TextContainer() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-0 relative shrink-0" data-name="Text Container">
      <p className="font-['Pretendard:SemiBold',sans-serif] h-[45px] leading-none not-italic relative shrink-0 text-[31px] text-neutral-100 tracking-[-0.5px] w-[84px]">Log in</p>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[61px] relative rounded-[19px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex h-[61px] items-center justify-center px-[12px] py-[16px] relative w-full">
          <TextContainer />
        </div>
      </div>
    </div>
  );
}

function TextContainer1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-0 relative shrink-0 w-[419px]" data-name="Text Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#b2b2b2] text-[21px] tracking-[-0.5px] w-[388px]">Email</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#e9e9e9] h-[61px] relative rounded-[15px] shrink-0 w-full" data-name="button">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-[-1px] pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex h-[61px] items-center justify-center px-[12px] py-[16px] relative w-full">
          <TextContainer1 />
        </div>
      </div>
    </div>
  );
}

function TextContainer2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-0 relative shrink-0 w-[419px]" data-name="Text Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[#b2b2b2] text-[21px] tracking-[-0.5px] w-[388px]">Password</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#e9e9e9] h-[61px] relative rounded-[15px] shrink-0 w-full" data-name="button">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-[-1px] pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex h-[61px] items-center justify-center px-[12px] py-[16px] relative w-full">
          <TextContainer2 />
        </div>
      </div>
    </div>
  );
}

function TextContainer3() {
  return (
    <div className="content-stretch flex items-center justify-center px-[16px] py-0 relative shrink-0" data-name="Text Container">
      <p className="font-['Pretendard:Regular',sans-serif] leading-none not-italic relative shrink-0 text-[21px] text-neutral-100 text-nowrap tracking-[-0.5px] whitespace-pre">Log in</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#292929] h-[61px] relative rounded-[15px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex h-[61px] items-center justify-center px-[12px] py-[16px] relative w-full">
          <TextContainer3 />
        </div>
      </div>
    </div>
  );
}

function TextContainer4() {
  return (
    <div className="content-stretch flex font-['Pretendard:Regular',sans-serif] gap-[58px] items-center justify-center leading-none not-italic px-[16px] py-0 relative shrink-0 text-[#d2d2d2] text-[16px] text-nowrap tracking-[-0.5px] whitespace-pre" data-name="Text Container">
      <p className="relative shrink-0">Sign Up</p>
      <p className="relative shrink-0">Forgot Password</p>
      <p className="relative shrink-0">Contact Us</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[61px] relative rounded-[19px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex h-[61px] items-center justify-center px-[12px] py-[16px] relative w-full">
          <TextContainer4 />
        </div>
      </div>
    </div>
  );
}

export default function LogInFieldS() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative size-full" data-name="Log in Field(s)">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}