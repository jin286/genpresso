import svgPaths from "./svg-pml0v3x7y0";

function FloatingToolbar2() {
  return (
    <div className="h-[23.998px] relative shrink-0 w-[59.097px]" data-name="FloatingToolbar2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.998px] relative w-[59.097px]">
        <p className="absolute font-['Pretendard:SemiBold',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-neutral-100 text-nowrap top-[-1.28px] whitespace-pre">모델 선택</p>
      </div>
    </div>
  );
}

function FloatingToolbar3() {
  return (
    <div className="h-[23.998px] relative shrink-0 w-[53.435px]" data-name="FloatingToolbar2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[23.998px] relative w-[53.435px]">
        <p className="absolute font-['Pretendard:SemiBold',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-zinc-400 top-[-1.28px] whitespace-pre">(이미지)</p>
      </div>
    </div>
  );
}

function PrimitiveH2() {
  return (
    <div className="h-[23.998px] relative shrink-0 w-[718.852px]" data-name="Primitive.h2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[7.996px] h-[23.998px] items-center relative w-[718.852px]">
        <FloatingToolbar2 />
        <FloatingToolbar3 />
      </div>
    </div>
  );
}

function PrimitiveP() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[718.852px]" data-name="Primitive.p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[718.852px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">이미지를 편집하거나 비디오로 변환할 수 있는 모델입니다</p>
      </div>
    </div>
  );
}

function DialogHeader() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.996px] h-[55.993px] items-start left-[24.57px] top-[24.57px] w-[718.852px]" data-name="DialogHeader">
      <PrimitiveH2 />
      <PrimitiveP />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p7ae9e00} id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
          <path d={svgPaths.p14b26b00} id="Vector_2" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
          <path d={svgPaths.pd099e00} id="Vector_3" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
        </g>
      </svg>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[19.991px] relative shrink-0 w-[85.573px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.991px] relative w-[85.573px]">
        <p className="absolute font-['Pretendard:SemiBold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-neutral-100 text-nowrap top-[-0.85px] whitespace-pre">Nano Banana</p>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[15px] relative shrink-0 w-[69.026px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[69.026px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#4fa8d8] text-[10px] text-nowrap top-[0.14px] whitespace-pre">Image → Image</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[7.996px] h-[19.991px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon />
      <Heading4 />
      <Paragraph />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[33.006px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="absolute font-['Pretendard:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[12px] text-zinc-400 top-[-1.43px] w-[171px]">
        <p className="mb-0">이미지 편집과 스타일 변환 경량모델.</p>
        <p>빠른 이미지 변환 작업에 최적화.</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">크기</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[62.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[62.344px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">1024×1024</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[31.118px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[31.118px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">크레딧</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[7.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[7.281px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">5</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[11.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_641_3447)" id="Icon">
          <path d={svgPaths.p4c18e00} fill="var(--fill-0, #4FA8D8)" id="Vector" stroke="var(--stroke-0, #4FA8D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99956" />
        </g>
        <defs>
          <clipPath id="clip0_641_3447">
            <rect fill="white" height="11.9947" width="11.9947" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[23.274px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.998px] h-[16.002px] items-center relative w-[23.274px]">
        <Text3 />
        <Icon1 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text2 />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">비율</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[106.244px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[106.244px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">1:1 · 4:3 · 16:9 · 9:16</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text4 />
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[3.998px] h-[62.568px] items-start pb-0 pt-[6.565px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.572px_0px_0px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none" />
      <Container1 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[5.993px] h-[127.55px] items-start relative shrink-0 w-full" data-name="Container">
      <Container />
      <Paragraph1 />
      <Container5 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[rgba(79,168,216,0.05)] box-border content-stretch flex flex-col h-[146.978px] items-start left-0 pb-[1.717px] pt-[9.714px] px-[9.714px] rounded-[16px] top-0 w-[231.621px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#4fa8d8] border-[1.717px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container6 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p7ae9e00} id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
          <path d={svgPaths.p14b26b00} id="Vector_2" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
          <path d={svgPaths.pd099e00} id="Vector_3" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
        </g>
      </svg>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[19.991px] relative shrink-0 w-[107.121px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.991px] relative w-[107.121px]">
        <p className="absolute font-['Pretendard:SemiBold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-neutral-100 text-nowrap top-[-0.85px] whitespace-pre">Gemini 2.5 Flash</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[15px] relative shrink-0 w-[69.026px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[69.026px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#4fa8d8] text-[10px] text-nowrap top-[0.14px] whitespace-pre">Image → Image</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[7.996px] h-[19.991px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon2 />
      <Heading5 />
      <Paragraph2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[33.006px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="absolute font-['Pretendard:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[12px] text-zinc-400 top-[-1.43px] w-[123px]">
        <p className="mb-0">Google 이미지 편집 모델.</p>
        <p>빠르고 정확한 편집.</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">크기</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[62.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[62.344px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">1024×1024</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text6 />
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[31.118px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[31.118px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">크레딧</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[7.478px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[7.478px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">6</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[11.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_641_3447)" id="Icon">
          <path d={svgPaths.p4c18e00} fill="var(--fill-0, #4FA8D8)" id="Vector" stroke="var(--stroke-0, #4FA8D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99956" />
        </g>
        <defs>
          <clipPath id="clip0_641_3447">
            <rect fill="white" height="11.9947" width="11.9947" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[23.471px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.998px] h-[16.002px] items-center relative w-[23.471px]">
        <Text9 />
        <Icon3 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[16.002px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text8 />
      <Container9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">비율</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[13.927px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[13.927px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">1:1</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text10 />
          <Text11 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[3.998px] h-[62.568px] items-start pb-0 pt-[6.565px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.572px_0px_0px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none" />
      <Container8 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[5.993px] h-[127.55px] items-start relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Paragraph3 />
      <Container12 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[146.978px] items-start left-[243.62px] pb-[1.717px] pt-[9.714px] px-[9.714px] rounded-[16px] top-0 w-[231.621px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.717px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container13 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p7ae9e00} id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
          <path d={svgPaths.p14b26b00} id="Vector_2" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
          <path d={svgPaths.pd099e00} id="Vector_3" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
        </g>
      </svg>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[19.991px] relative shrink-0 w-[91.53px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.991px] relative w-[91.53px]">
        <p className="absolute font-['Pretendard:SemiBold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-neutral-100 text-nowrap top-[-0.85px] whitespace-pre">SeeDream 4.0</p>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[15px] relative shrink-0 w-[69.026px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[69.026px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#4fa8d8] text-[10px] text-nowrap top-[0.14px] whitespace-pre">Image → Image</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[7.996px] h-[19.991px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon4 />
      <Heading6 />
      <Paragraph4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[33.006px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="absolute font-['Pretendard:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[12px] text-zinc-400 top-[-1.43px] w-[153px]">
        <p className="mb-0">고급 이미지 편집 및 스타일 전환.</p>
        <p>복잡한 변환과 세밀한 조정 가능.</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">크기</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[142.604px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[142.604px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">1024×1024 ~ 2048×2048</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text12 />
          <Text13 />
        </div>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[31.118px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[31.118px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">크레딧</p>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[7.424px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[7.424px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">8</p>
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[11.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_641_3447)" id="Icon">
          <path d={svgPaths.p4c18e00} fill="var(--fill-0, #4FA8D8)" id="Vector" stroke="var(--stroke-0, #4FA8D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99956" />
        </g>
        <defs>
          <clipPath id="clip0_641_3447">
            <rect fill="white" height="11.9947" width="11.9947" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[23.417px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.998px] h-[16.002px] items-center relative w-[23.417px]">
        <Text15 />
        <Icon5 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text14 />
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">비율</p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[73.73px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[73.73px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">1:1 · 4:3 · 16:9</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex h-[16.002px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text16 />
      <Text17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[3.998px] h-[62.568px] items-start pb-0 pt-[6.565px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.572px_0px_0px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none" />
      <Container15 />
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[5.993px] h-[127.55px] items-start relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Paragraph5 />
      <Container19 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[146.978px] items-start left-[487.23px] pb-[1.717px] pt-[9.714px] px-[9.714px] rounded-[16px] top-0 w-[231.621px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.717px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container20 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_641_3427)" id="Icon">
          <path d={svgPaths.p37a6b00} id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
          <path d={svgPaths.p35d70000} id="Vector_2" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
        </g>
        <defs>
          <clipPath id="clip0_641_3427">
            <rect fill="white" height="15.993" width="15.993" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[19.991px] relative shrink-0 w-[41.449px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.991px] relative w-[41.449px]">
        <p className="absolute font-['Pretendard:SemiBold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-neutral-100 text-nowrap top-[-0.85px] whitespace-pre">Sora 2</p>
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[15px] relative shrink-0 w-[67.317px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[67.317px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#4fa8d8] text-[10px] text-nowrap top-[0.14px] whitespace-pre">Image → Video</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[7.996px] h-[19.991px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon6 />
      <Heading7 />
      <Paragraph6 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[33.006px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="absolute font-['Pretendard:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[12px] text-zinc-400 top-[-1.43px] w-[161px]">
        <p className="mb-0">이미지로 생동감 있는 비디오 생성.</p>
        <p>OpenAI 최신 비디오 생성 기술.</p>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">크기</p>
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[122.461px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[122.461px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">720×1280 / 1280×720</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text18 />
          <Text19 />
        </div>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[31.118px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[31.118px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">크레딧</p>
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.197px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.197px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">100</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[11.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_641_3447)" id="Icon">
          <path d={svgPaths.p4c18e00} fill="var(--fill-0, #4FA8D8)" id="Vector" stroke="var(--stroke-0, #4FA8D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99956" />
        </g>
        <defs>
          <clipPath id="clip0_641_3447">
            <rect fill="white" height="11.9947" width="11.9947" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[36.19px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.998px] h-[16.002px] items-center relative w-[36.19px]">
        <Text21 />
        <Icon7 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex h-[16.002px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text20 />
      <Container23 />
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">비율</p>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[56.011px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[56.011px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">16:9 · 9:16</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex h-[16.002px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text22 />
      <Text23 />
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[44.499px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[44.499px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">최대 시간</p>
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[17.648px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[17.648px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">5초</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text24 />
          <Text25 />
        </div>
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[31.118px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[31.118px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">사운드</p>
      </div>
    </div>
  );
}

function Text27() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[31.118px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[31.118px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">미지원</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex h-[16.002px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text26 />
      <Text27 />
    </div>
  );
}

function Container28() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[3.998px] h-[102.568px] items-start pb-0 pt-[6.565px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.572px_0px_0px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none" />
      <Container22 />
      <Container24 />
      <Container25 />
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[5.993px] h-[167.55px] items-start relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Paragraph7 />
      <Container28 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[186.978px] items-start left-0 pb-[1.717px] pt-[9.714px] px-[9.714px] rounded-[16px] top-[158.97px] w-[231.621px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.717px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container29 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_641_3427)" id="Icon">
          <path d={svgPaths.p37a6b00} id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
          <path d={svgPaths.p35d70000} id="Vector_2" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
        </g>
        <defs>
          <clipPath id="clip0_641_3427">
            <rect fill="white" height="15.993" width="15.993" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[19.991px] relative shrink-0 w-[66.593px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.991px] relative w-[66.593px]">
        <p className="absolute font-['Pretendard:SemiBold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-neutral-100 text-nowrap top-[-0.85px] whitespace-pre">Sora 2 Pro</p>
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[15px] relative shrink-0 w-[67.317px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[67.317px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#4fa8d8] text-[10px] text-nowrap top-[0.14px] whitespace-pre">Image → Video</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex gap-[7.996px] h-[19.991px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon8 />
      <Heading8 />
      <Paragraph8 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[33.006px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="absolute font-['Pretendard:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[12px] text-zinc-400 top-[-1.43px] w-[130px]">
        <p className="mb-0">Sora 2 프로 버전 고해상도.</p>
        <p>최고 품질 비디오 생성.</p>
      </div>
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">크기</p>
      </div>
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[133.158px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[133.158px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">1024×1792 / 1792×1024</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text28 />
          <Text29 />
        </div>
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[31.118px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[31.118px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">크레딧</p>
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.063px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">150</p>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[11.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_641_3447)" id="Icon">
          <path d={svgPaths.p4c18e00} fill="var(--fill-0, #4FA8D8)" id="Vector" stroke="var(--stroke-0, #4FA8D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99956" />
        </g>
        <defs>
          <clipPath id="clip0_641_3447">
            <rect fill="white" height="11.9947" width="11.9947" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[36.056px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.998px] h-[16.002px] items-center relative w-[36.056px]">
        <Text31 />
        <Icon9 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text30 />
          <Container32 />
        </div>
      </div>
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">비율</p>
      </div>
    </div>
  );
}

function Text33() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[56.011px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[56.011px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">16:9 · 9:16</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text32 />
          <Text33 />
        </div>
      </div>
    </div>
  );
}

function Text34() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[44.499px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[44.499px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">최대 시간</p>
      </div>
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[17.648px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[17.648px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">5초</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text34 />
          <Text35 />
        </div>
      </div>
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[31.118px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[31.118px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">사운드</p>
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[31.118px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[31.118px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">미지원</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex h-[16.002px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text36 />
      <Text37 />
    </div>
  );
}

function Container37() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[3.998px] h-[102.568px] items-start pb-0 pt-[6.565px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.572px_0px_0px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none" />
      <Container31 />
      <Container33 />
      <Container34 />
      <Container35 />
      <Container36 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col gap-[5.993px] h-[167.55px] items-start relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Paragraph9 />
      <Container37 />
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[186.978px] items-start left-[243.62px] pb-[1.717px] pt-[9.714px] px-[9.714px] rounded-[16px] top-[158.97px] w-[231.621px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.717px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container38 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_641_3427)" id="Icon">
          <path d={svgPaths.p37a6b00} id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
          <path d={svgPaths.p35d70000} id="Vector_2" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
        </g>
        <defs>
          <clipPath id="clip0_641_3427">
            <rect fill="white" height="15.993" width="15.993" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[19.991px] relative shrink-0 w-[77.085px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.991px] relative w-[77.085px]">
        <p className="absolute font-['Pretendard:SemiBold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-neutral-100 text-nowrap top-[-0.85px] whitespace-pre">Veo 3.1 Fast</p>
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[15px] relative shrink-0 w-[67.317px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[67.317px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#4fa8d8] text-[10px] text-nowrap top-[0.14px] whitespace-pre">Image → Video</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[7.996px] h-[19.991px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon10 />
      <Heading9 />
      <Paragraph10 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[33.006px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="absolute font-['Pretendard:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[12px] text-zinc-400 top-[-1.43px] w-[143px]">
        <p className="mb-0">이미지를 비디오로 빠른 변환.</p>
        <p>짧은 시간 안에 결과 확인 가능.</p>
      </div>
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">크기</p>
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[60.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[60.609px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">max 1080p</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text38 />
          <Text39 />
        </div>
      </div>
    </div>
  );
}

function Text40() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[31.118px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[31.118px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">크레딧</p>
      </div>
    </div>
  );
}

function Text41() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[14.544px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[14.544px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">20</p>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[11.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_641_3447)" id="Icon">
          <path d={svgPaths.p4c18e00} fill="var(--fill-0, #4FA8D8)" id="Vector" stroke="var(--stroke-0, #4FA8D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99956" />
        </g>
        <defs>
          <clipPath id="clip0_641_3447">
            <rect fill="white" height="11.9947" width="11.9947" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[30.537px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.998px] h-[16.002px] items-center relative w-[30.537px]">
        <Text41 />
        <Icon11 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text40 />
          <Container41 />
        </div>
      </div>
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">비율</p>
      </div>
    </div>
  );
}

function Text43() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[78.954px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[78.954px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">1:1 · 16:9 · 9:16</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text42 />
          <Text43 />
        </div>
      </div>
    </div>
  );
}

function Text44() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[44.499px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[44.499px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">최대 시간</p>
      </div>
    </div>
  );
}

function Text45() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[17.648px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[17.648px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">5초</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text44 />
          <Text45 />
        </div>
      </div>
    </div>
  );
}

function Text46() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[31.118px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[31.118px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">사운드</p>
      </div>
    </div>
  );
}

function Text47() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">지원</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[16.002px] items-center justify-between relative w-full">
          <Text46 />
          <Text47 />
        </div>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[3.998px] h-[102.568px] items-start pb-0 pt-[6.565px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.572px_0px_0px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none" />
      <Container40 />
      <Container42 />
      <Container43 />
      <Container44 />
      <Container45 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col gap-[5.993px] h-[167.55px] items-start relative shrink-0 w-full" data-name="Container">
      <Container39 />
      <Paragraph11 />
      <Container46 />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[186.978px] items-start left-[487.23px] pb-[1.717px] pt-[9.714px] px-[9.714px] rounded-[16px] top-[158.97px] w-[231.621px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.717px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container47 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_641_3738)" id="Icon">
          <path d={svgPaths.p2ef06880} id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
          <path d={svgPaths.p35d70000} id="Vector_2" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33275" />
        </g>
        <defs>
          <clipPath id="clip0_641_3738">
            <rect fill="white" height="15.993" width="15.993" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[19.991px] relative shrink-0 w-[45.895px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[19.991px] relative w-[45.895px]">
        <p className="absolute font-['Pretendard:SemiBold',sans-serif] leading-[20px] left-0 not-italic text-[14px] text-neutral-100 text-nowrap top-[-0.85px] whitespace-pre">Veo 3.1</p>
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[15px] relative shrink-0 w-[67.317px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[67.317px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[15px] left-0 not-italic text-[#4fa8d8] text-[10px] text-nowrap top-[0.14px] whitespace-pre">Image → Video</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex gap-[7.996px] h-[19.991px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon12 />
      <Heading10 />
      <Paragraph12 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[33.006px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="absolute font-['Pretendard:Regular',sans-serif] leading-[16.5px] left-0 not-italic text-[12px] text-zinc-400 top-[-1.43px] w-[150px]">
        <p className="mb-0">이미지 기반 고품질 비디오 생성.</p>
        <p>자연스러운 애니메이션과 전환.</p>
      </div>
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">크기</p>
      </div>
    </div>
  );
}

function Text49() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[60.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[60.609px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">max 1080p</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex h-[16.002px] items-center justify-between left-0 top-[6.57px] w-[212.193px]" data-name="Container">
      <Text48 />
      <Text49 />
    </div>
  );
}

function Text50() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[31.118px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[31.118px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">크레딧</p>
      </div>
    </div>
  );
}

function Text51() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[14.768px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[14.768px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">35</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[11.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_641_3444)" id="Icon">
          <path d={svgPaths.pbe85580} fill="var(--fill-0, #4FA8D8)" id="Vector" stroke="var(--stroke-0, #4FA8D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.99956" />
        </g>
        <defs>
          <clipPath id="clip0_641_3444">
            <rect fill="white" height="11.9947" width="11.9947" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[30.761px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[3.998px] h-[16.002px] items-center relative w-[30.761px]">
        <Text51 />
        <Icon13 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex h-[16.002px] items-center justify-between left-0 top-[26.57px] w-[212.193px]" data-name="Container">
      <Text50 />
      <Container50 />
    </div>
  );
}

function Text52() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">비율</p>
      </div>
    </div>
  );
}

function Text53() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[78.954px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[78.954px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">1:1 · 16:9 · 9:16</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex h-[16.002px] items-center justify-between left-0 top-[46.57px] w-[212.193px]" data-name="Container">
      <Text52 />
      <Text53 />
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[44.499px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[44.499px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">최대 시간</p>
      </div>
    </div>
  );
}

function Text55() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[17.648px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[17.648px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">5초</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute content-stretch flex h-[16.002px] items-center justify-between left-0 top-[66.57px] w-[212.193px]" data-name="Container">
      <Text54 />
      <Text55 />
    </div>
  );
}

function Text56() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[31.118px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[31.118px]">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-nowrap text-zinc-400 top-[-0.43px] whitespace-pre">사운드</p>
      </div>
    </div>
  );
}

function Text57() {
  return (
    <div className="h-[16.002px] relative shrink-0 w-[20.743px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.002px] relative w-[20.743px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">지원</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute content-stretch flex h-[16.002px] items-center justify-between left-0 top-[86.57px] w-[212.193px]" data-name="Container">
      <Text56 />
      <Text57 />
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[102.568px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.572px_0px_0px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none" />
      <Container49 />
      <Container51 />
      <Container52 />
      <Container53 />
      <Container54 />
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col gap-[5.993px] h-[167.55px] items-start relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Paragraph13 />
      <Container55 />
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[186.978px] items-start left-0 pb-[1.717px] pt-[9.714px] px-[9.714px] rounded-[16px] top-[357.94px] w-[231.621px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.717px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container56 />
    </div>
  );
}

function FloatingToolbar4() {
  return (
    <div className="absolute h-[544.924px] left-[24.57px] top-[96.56px] w-[718.852px]" data-name="FloatingToolbar2">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] left-0 rounded-[16px] size-[15.993px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.572px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[7.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Icon">
          <path d={svgPaths.p279cf100} id="Vector" stroke="var(--stroke-0, #F5F5F5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.959578" />
          <path d={svgPaths.pc59d900} id="Vector_2" stroke="var(--stroke-0, #F5F5F5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.959578" />
        </g>
      </svg>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[15.993px] top-0" data-name="Container">
      <Icon14 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[7.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
        <g id="Icon">
          <path d={svgPaths.p279cf100} id="Vector" stroke="var(--stroke-0, #4FA8D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.959578" />
          <path d={svgPaths.pc59d900} id="Vector_2" stroke="var(--stroke-0, #4FA8D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.959578" />
        </g>
      </svg>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 opacity-0 size-[15.993px] top-0" data-name="Container">
      <Icon15 />
    </div>
  );
}

function CloseButton() {
  return (
    <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.1)] left-[741.44px] rounded-[16px] size-[15.993px] to-[rgba(255,255,255,0.05)] top-[11.74px]" data-name="CloseButton">
      <Container57 />
      <Container58 />
      <Container59 />
    </div>
  );
}

export default function PrimitiveDiv() {
  return (
    <div className="bg-[#141415] relative rounded-[10px] size-full" data-name="Primitive.div">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <DialogHeader />
        <FloatingToolbar4 />
        <CloseButton />
      </div>
      <div aria-hidden="true" className="absolute border-[0.572px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}