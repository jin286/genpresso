import svgPaths from "./svg-4rwka91sv3";
import imgImageWithFallback from "figma:asset/4dd944c8505800591fca62d75608584955bf15ba.png";

function Heading() {
  return (
    <div className="h-[23.991px] relative shrink-0 w-[114.856px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard:SemiBold',sans-serif] leading-[24px] left-0 not-italic text-[#f5f5f5] text-[16px] text-nowrap top-[-0.68px]">City Landscape</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[15.997px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9967 15.9967">
        <g id="Icon">
          <path d={svgPaths.p9341e00} id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33306" />
          <path d={svgPaths.pe228000} id="Vector_2" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33306" />
          <path d={svgPaths.p21068280} id="Vector_3" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33306" />
          <path d={svgPaths.p388aa124} id="Vector_4" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33306" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[27.992px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.009px] py-0 relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[15.997px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9967 15.9967">
        <g id="Icon">
          <path d="M7.99835 9.99794V1.99959" id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33306" />
          <path d={svgPaths.pd3f9880} id="Vector_2" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33306" />
          <path d={svgPaths.p2c64a600} id="Vector_3" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33306" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[27.992px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.009px] py-0 relative size-full">
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

function GalleryDetailDialog() {
  return (
    <div className="absolute content-stretch flex h-[60.565px] items-center justify-between left-0 pb-[0.579px] pl-[24px] pr-[39.996px] pt-0 top-0 w-[1150.839px]" data-name="GalleryDetailDialog">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.579px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none" />
      <Heading />
      <Container />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="absolute h-[264.982px] left-[247.43px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[160.99px] w-[399.981px]" data-name="ImageWithFallback">
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
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#a1a1aa] text-[12px] text-nowrap top-[-0.42px]">날짜</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[19.989px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#f5f5f5] text-[14px] text-nowrap top-[-0.84px]">2025-10-16 14:20</p>
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
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#a1a1aa] text-[12px] text-nowrap top-[-0.42px]">콘텐츠 타입</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[19.989px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#f5f5f5] text-[14px] text-nowrap top-[-0.84px]">세그먼트</p>
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
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#a1a1aa] text-[12px] text-nowrap top-[-0.42px]">생성모델</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[19.989px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#f5f5f5] text-[14px] text-nowrap top-[-0.84px]">flux-1.1</p>
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

function Paragraph6() {
  return (
    <div className="h-[16.006px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#a1a1aa] text-[12px] text-nowrap top-[-0.42px]">생성한 사람</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[19.989px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#f5f5f5] text-[14px] text-nowrap top-[-0.84px]">홍길동</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[3.992px] h-[39.987px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph6 />
      <Paragraph7 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[16.006px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#a1a1aa] text-[12px] text-nowrap top-[-0.42px]">좋아요</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[19.989px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#f5f5f5] text-[14px] text-nowrap top-[-0.84px]">18</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.992px] h-[39.987px] items-start left-0 top-0 w-[95.998px]" data-name="Container">
      <Paragraph8 />
      <Paragraph9 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[16.006px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[#a1a1aa] text-[12px] text-nowrap top-[-0.42px]">조회수</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[19.989px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#f5f5f5] text-[14px] text-nowrap top-[-0.84px]">102</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.992px] h-[39.987px] items-start left-[112px] top-0 w-[95.998px]" data-name="Container">
      <Paragraph10 />
      <Paragraph11 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[39.987px] relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[15.997px] h-[263.923px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
      <Container3 />
      <Container4 />
      <Container7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15.997px] h-[348.487px] items-start left-0 pb-[0.579px] pt-[24px] px-[24px] top-0 w-[255.993px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.579px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none" />
      <Heading1 />
      <Container8 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[62.35px] size-[19.998px] top-[14px]" data-name="Icon">
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
    <div className="bg-[#254758] h-[47.999px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.579px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Icon2 />
      <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[24px] left-[118.34px] not-italic text-[16px] text-center text-nowrap text-white top-[11.32px] translate-x-[-50%]">다운로드</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#4fa8d8] content-stretch flex h-[47.999px] items-center justify-center relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white">캔버스에 추가</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[11.995px] h-[107.994px] items-start left-[24px] top-[372.49px] w-[207.993px]" data-name="Container">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container11() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[255.993px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container9 />
        <Container10 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute bg-[rgba(20,20,21,0.5)] h-[586.962px] left-[894.85px] top-0 w-[255.993px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pl-[0.579px] pr-0 py-0 relative rounded-[inherit] size-full">
        <Container11 />
      </div>
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_0.579px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function GalleryDetailDialog1() {
  return (
    <div className="absolute bg-[rgba(82,82,91,0.3)] h-[586.962px] left-0 overflow-clip top-[60.57px] w-[1150.839px]" data-name="GalleryDetailDialog">
      <ImageWithFallback />
      <Container12 />
    </div>
  );
}

function Container13() {
  return <div className="absolute bg-[rgba(255,255,255,0)] border-[0.579px] border-[rgba(255,255,255,0.2)] border-solid left-0 rounded-[16px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-[15.997px] top-0" data-name="Container" />;
}

function Icon3() {
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

function Container14() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 size-[15.997px] top-0" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Icon4() {
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

function Container15() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 opacity-0 size-[15.997px] top-0" data-name="Container">
      <Icon4 />
    </div>
  );
}

function CloseButton() {
  return (
    <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.1)] left-[1124.85px] rounded-[16px] size-[15.997px] to-[rgba(255,255,255,0.05)] top-[11.38px]" data-name="CloseButton">
      <Container13 />
      <Container14 />
      <Container15 />
    </div>
  );
}

export default function PrimitiveDiv() {
  return (
    <div className="bg-[rgba(245,245,245,0.05)] border-[0.579px] border-[rgba(163,163,163,0.2)] border-solid overflow-clip relative rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] size-full" data-name="Primitive.div">
      <GalleryDetailDialog />
      <GalleryDetailDialog1 />
      <CloseButton />
    </div>
  );
}