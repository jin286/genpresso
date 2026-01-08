function Heading() {
  return (
    <div className="h-[37.489px] relative shadow-[0px_1px_4px_0px_rgba(0,0,0,0.15)] shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Pretendard:Bold',sans-serif] leading-[37.5px] left-[120.5px] not-italic text-[#1a1a1a] text-[30px] text-center text-nowrap top-[0.55px] translate-x-[-50%]">경력을 선택해주세요</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[23.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[24px] left-[120.46px] not-italic text-[#5a5a5a] text-[16px] text-center text-nowrap top-[-0.8px] translate-x-[-50%]">해당하는 경력 기간을 선택해주세요.</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[89.482px] relative shrink-0 w-[240.255px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[11.995px] items-start pb-0 pt-[15.999px] px-0 relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[19.995px] left-[4px] top-0 w-[538.904px]" data-name="Paragraph">
      <p className="absolute font-['Pretendard:SemiBold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-[rgba(26,26,26,0.9)] text-nowrap top-[-0.35px]">경력</p>
    </div>
  );
}

function SelectionButton() {
  return (
    <div className="absolute bg-[rgba(240,240,240,0.5)] border-[0.55px] border-[rgba(0,0,0,0.07)] border-solid h-[41.081px] left-0 rounded-[1.84522e+07px] top-0 w-[74.729px]" data-name="SelectionButton">
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[20px] left-[36.99px] not-italic text-[#5a5a5a] text-[14px] text-center text-nowrap top-[9.64px] translate-x-[-50%]">0–1년</p>
    </div>
  );
}

function SelectionButton1() {
  return (
    <div className="absolute bg-[rgba(240,240,240,0.5)] border-[0.55px] border-[rgba(0,0,0,0.07)] border-solid h-[41.081px] left-[84.72px] rounded-[1.84522e+07px] top-0 w-[74.823px]" data-name="SelectionButton">
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[20px] left-[36.99px] not-italic text-[#5a5a5a] text-[14px] text-center text-nowrap top-[9.64px] translate-x-[-50%]">1–3년</p>
    </div>
  );
}

function SelectionButton2() {
  return (
    <div className="absolute bg-[rgba(240,240,240,0.5)] border-[0.55px] border-[rgba(0,0,0,0.07)] border-solid h-[41.081px] left-[169.54px] rounded-[1.84522e+07px] top-0 w-[76.379px]" data-name="SelectionButton">
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[20px] left-[37.99px] not-italic text-[#5a5a5a] text-[14px] text-center text-nowrap top-[9.64px] translate-x-[-50%]">3–7년</p>
    </div>
  );
}

function SelectionButton3() {
  return (
    <div className="absolute bg-[rgba(240,240,240,0.5)] border-[0.55px] border-[rgba(0,0,0,0.07)] border-solid h-[41.081px] left-[255.91px] rounded-[1.84522e+07px] top-0 w-[82.557px]" data-name="SelectionButton">
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[20px] left-[40.99px] not-italic text-[#5a5a5a] text-[14px] text-center text-nowrap top-[9.64px] translate-x-[-50%]">7–10년</p>
    </div>
  );
}

function SelectionButton4() {
  return (
    <div className="absolute bg-[rgba(240,240,240,0.5)] border-[0.55px] border-[rgba(0,0,0,0.07)] border-solid h-[41.081px] left-[348.46px] rounded-[1.84522e+07px] top-0 w-[95.712px]" data-name="SelectionButton">
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[20px] left-[47.49px] not-italic text-[#5a5a5a] text-[14px] text-center text-nowrap top-[9.64px] translate-x-[-50%]">10년 이상</p>
    </div>
  );
}

function SelectionButton5() {
  return (
    <div className="absolute bg-[rgba(240,240,240,0.5)] border-[0.55px] border-[rgba(0,0,0,0.07)] border-solid h-[41.081px] left-[454.16px] rounded-[1.84522e+07px] top-0 w-[65.286px]" data-name="SelectionButton">
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[20px] left-[32.49px] not-italic text-[#5a5a5a] text-[14px] text-center text-nowrap top-[9.64px] translate-x-[-50%]">학생</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[41.081px] left-0 top-[31.99px] w-[542.899px]" data-name="Container">
      <SelectionButton />
      <SelectionButton1 />
      <SelectionButton2 />
      <SelectionButton3 />
      <SelectionButton4 />
      <SelectionButton5 />
    </div>
  );
}

function Container2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[542.899px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph1 />
        <Container1 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[638.894px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[31.998px] items-center overflow-clip px-0 py-[47.998px] relative rounded-[inherit] size-full">
        <Container />
        <Container2 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[35.994px] relative rounded-[10px] shrink-0 w-[56.195px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[20px] left-[28.5px] not-italic text-[#5a5a5a] text-[14px] text-center text-nowrap top-[7.65px] translate-x-[-50%]">이전</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#4fa8d8] h-[43.994px] relative rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-[91.656px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[32px] py-[8px] relative size-full">
        <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white">완료</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[68.534px] relative shrink-0 w-[638.894px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.55px_0px_0px] border-[rgba(0,0,0,0.15)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-0 pt-[0.55px] px-[23.999px] relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function ProfileOnboardingDialog() {
  return (
    <div className="absolute content-stretch flex flex-col h-[467.156px] items-start left-0 top-0 w-[638.894px]" data-name="ProfileOnboardingDialog">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container5() {
  return <div className="absolute bg-[rgba(255,255,255,0)] border-[0.55px] border-[rgba(0,0,0,0.2)] border-solid left-0 rounded-[16px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)] size-[15.999px] top-0" data-name="Container" />;
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Icon">
          <path d="M6 2L2 6" id="Vector" stroke="var(--stroke-0, #333333)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.959953" />
          <path d="M2 2L6 6" id="Vector_2" stroke="var(--stroke-0, #333333)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.959953" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 pl-0 pr-[0.009px] py-0 size-[15.999px] top-0" data-name="Container">
      <Icon />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Icon">
          <path d="M6 2L2 6" id="Vector" stroke="var(--stroke-0, #4FA8D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.959953" />
          <path d="M2 2L6 6" id="Vector_2" stroke="var(--stroke-0, #4FA8D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.959953" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 opacity-0 pl-0 pr-[0.009px] py-0 size-[15.999px] top-0" data-name="Container">
      <Icon1 />
    </div>
  );
}

function CloseButton() {
  return (
    <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0.08)] left-[612.9px] rounded-[16px] size-[15.999px] to-[rgba(0,0,0,0.06)] top-[11.59px]" data-name="CloseButton">
      <Container5 />
      <Container6 />
      <Container7 />
    </div>
  );
}

export default function PrimitiveDiv() {
  return (
    <div className="backdrop-blur-[45px] backdrop-filter bg-[rgba(255,255,255,0.5)] border-[0.55px] border-[rgba(0,0,0,0.15)] border-solid overflow-clip relative rounded-[24px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.1)] size-full" data-name="Primitive.div">
      <ProfileOnboardingDialog />
      <CloseButton />
    </div>
  );
}