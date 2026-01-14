import svgPaths from "./svg-07u9bzf5td";
import imgImageWithFallback from "figma:asset/2322071ab5619fc203c716be3a8134950fce202b.png";

function Heading() {
  return (
    <div className="h-[23.991px] relative shrink-0 w-[72.931px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard:SemiBold',sans-serif] leading-[24px] left-0 not-italic text-[#f5f5f5] text-[16px] text-nowrap top-[-0.68px]">이미지 뷰어</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[13.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.996 13.996">
        <g clipPath="url(#clip0_1735_8163)" id="Icon">
          <path d={svgPaths.pfd2f300} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16633" />
          <path d="M6.99799 9.33066V6.99799" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16633" />
          <path d="M6.99799 4.66533H7.00382" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16633" />
        </g>
        <defs>
          <clipPath id="clip0_1735_8163">
            <rect fill="white" height="13.996" width="13.996" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#4fa8d8] relative rounded-[10px] shrink-0 size-[27.992px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[13.996px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.996 13.996">
        <g id="Icon">
          <path d="M6.99799 8.74749V1.7495" id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16633" />
          <path d={svgPaths.pb470780} id="Vector_2" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16633" />
          <path d={svgPaths.p2c948100} id="Vector_3" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16633" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[27.992px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[27.992px] relative shrink-0 w-[63.978px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.994px] items-center relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function NodeFooter() {
  return (
    <div className="absolute content-stretch flex h-[60.565px] items-center justify-between left-0 pb-[0.579px] pl-[24px] pr-[39.996px] pt-0 top-0 w-[1150.839px]" data-name="NodeFooter">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.579px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none" />
      <Heading />
      <Container />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="absolute h-[449.999px] left-[47.42px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[68.48px] w-[799.998px]" data-name="ImageWithFallback">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0" />
        <img alt="" className="absolute max-w-none object-50%-50% object-contain size-full" src={imgImageWithFallback} />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[19.989px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Pretendard:SemiBold',sans-serif] leading-[20px] left-0 not-italic text-[#f5f5f5] text-[14px] text-nowrap top-[-0.84px]">기본 정보</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[16.006px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#a1a1aa] text-[12px] text-nowrap top-[-0.42px]">파일명</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[19.989px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#f5f5f5] text-[14px] text-nowrap top-[-0.84px]">generated-image.png</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[3.992px] h-[39.987px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[16.006px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#a1a1aa] text-[12px] text-nowrap top-[-0.42px]">생성일시</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[19.989px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#f5f5f5] text-[14px] text-nowrap top-[-0.84px]">2025-11-10 14:30</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[3.992px] h-[39.987px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[16.006px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#a1a1aa] text-[12px] text-nowrap top-[-0.42px]">해상도</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[19.989px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#f5f5f5] text-[14px] text-nowrap top-[-0.84px]">1024 x 1024</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[3.992px] h-[39.987px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[15.997px] h-[151.955px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15.997px] h-[236.519px] items-start left-0 pb-[0.579px] pt-[24px] px-[24px] top-0 w-[255.993px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.579px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none" />
      <Heading1 />
      <Container4 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[39.65px] size-[19.998px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9981 19.9981">
        <g id="Icon">
          <path d="M9.99907 12.4988V2.49977" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
          <path d={svgPaths.p354aee50} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
          <path d={svgPaths.p1b66b0a0} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#333] h-[47.999px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#444] border-[0.579px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Icon2 />
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[24px] left-[118.14px] not-italic text-[16px] text-center text-nowrap text-white top-[11.32px] translate-x-[-50%]">이미지 다운로드</p>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[46.57px] size-[19.998px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9981 19.9981">
        <g id="Icon">
          <path d={svgPaths.p30ac5d70} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#254b5e] h-[47.999px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <Icon3 />
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[24px] left-[118.06px] not-italic text-[16px] text-center text-nowrap text-white top-[11.32px] translate-x-[-50%]">북마크에 추가</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[48.52px] size-[19.998px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9981 19.9981">
        <g id="Icon">
          <path d={svgPaths.p16600870} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
          <path d={svgPaths.p3418f580} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
          <path d={svgPaths.p387f900} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
          <path d={svgPaths.p5ba5380} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
          <path d={svgPaths.p36230d80} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66651" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#4fa8d8] h-[47.999px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <Icon4 />
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[24px] left-[118.01px] not-italic text-[16px] text-center text-nowrap text-white top-[11.32px] translate-x-[-50%]">세그멘테이션</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[11.995px] h-[167.988px] items-start relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col h-[251.973px] items-start left-0 pb-0 pt-[24px] px-[24px] top-[236.52px] w-[255.993px]" data-name="Container">
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[255.993px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container5 />
        <Container7 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-[rgba(20,20,21,0.5)] h-[586.962px] left-[894.85px] top-0 w-[255.993px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pl-[0.579px] pr-0 py-0 relative rounded-[inherit] size-full">
        <Container8 />
      </div>
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.579px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function NodeFooter1() {
  return (
    <div className="absolute bg-[rgba(82,82,91,0.3)] h-[586.962px] left-0 overflow-clip top-[60.57px] w-[1150.839px]" data-name="NodeFooter">
      <ImageWithFallback />
      <Container9 />
    </div>
  );
}

function Container10() {
  return <div className="absolute bg-[rgba(255,255,255,0)] border-[0.579px] border-[rgba(255,255,255,0.2)] border-solid left-0 rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-[15.997px] top-0" data-name="Container" />;
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[7.994px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.99383 7.99383">
        <g id="Icon">
          <path d={svgPaths.p29bbe100} id="Vector" stroke="var(--stroke-0, #F5F5F5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.959259" />
          <path d={svgPaths.p8eaf700} id="Vector_2" stroke="var(--stroke-0, #F5F5F5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.959259" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[15.997px] top-0" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[7.994px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.99383 7.99383">
        <g id="Icon">
          <path d={svgPaths.p29bbe100} id="Vector" stroke="var(--stroke-0, #4FA8D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.959259" />
          <path d={svgPaths.p8eaf700} id="Vector_2" stroke="var(--stroke-0, #4FA8D8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.959259" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 opacity-0 size-[15.997px] top-0" data-name="Container">
      <Icon6 />
    </div>
  );
}

function CloseButton() {
  return (
    <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.1)] left-[1124.85px] rounded-[16px] size-[15.997px] to-[rgba(255,255,255,0.05)] top-[11.38px]" data-name="CloseButton">
      <Container10 />
      <Container11 />
      <Container12 />
    </div>
  );
}

export default function PrimitiveDiv() {
  return (
    <div className="bg-[rgba(245,245,245,0.05)] border-[0.579px] border-[rgba(163,163,163,0.2)] border-solid overflow-clip relative rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-full" data-name="Primitive.div">
      <NodeFooter />
      <NodeFooter1 />
      <CloseButton />
    </div>
  );
}