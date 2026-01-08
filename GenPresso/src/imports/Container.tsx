function PrimitiveLabel() {
  return (
    <div className="content-stretch flex gap-[8px] h-[15.992px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-100 text-nowrap whitespace-pre">그룹 이름</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[rgba(82,82,91,0.5)] h-[35.997px] relative rounded-[10px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[35.997px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Pretendard:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-400 whitespace-pre">Interior Design</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0.567px] border-[rgba(163,163,163,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[5.998px] h-[58px] items-start relative shrink-0 w-[254px]" data-name="Container">
      <PrimitiveLabel />
      <Input />
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[15.992px] items-center relative shrink-0 w-full" data-name="Primitive.label">
      <p className="font-['Pretendard:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-neutral-100 text-nowrap whitespace-pre">그룹 색상</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-yellow-500 relative rounded-[1.90261e+07px] shrink-0 size-[15.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[15.992px]" />
    </div>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[15.992px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15.992px] relative w-full">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">Yellow</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.991px] h-[31.39px] items-center left-0 px-[13.697px] py-[1.701px] rounded-[10px] top-0 w-[86.657px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.701px] border-solid border-yellow-500 inset-0 pointer-events-none rounded-[10px]" />
      <Container1 />
      <Text />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-blue-500 relative rounded-[1.90261e+07px] shrink-0 size-[15.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[15.992px]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[15.992px] relative shrink-0 w-[23.815px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15.992px] relative w-[23.815px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">Blue</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.991px] h-[31.39px] items-center left-[94.65px] pl-[12.563px] pr-[0.567px] py-[0.567px] rounded-[10px] top-0 w-[72.924px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.567px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container2 />
      <Text1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-pink-500 relative rounded-[1.90261e+07px] shrink-0 size-[15.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[15.992px]" />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[15.992px] relative shrink-0 w-[23.31px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15.992px] relative w-[23.31px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">Pink</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.991px] h-[31.39px] items-center left-[175.56px] pl-[12.563px] pr-[0.567px] py-[0.567px] rounded-[10px] top-0 w-[72.419px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.567px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container3 />
      <Text2 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[31.39px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-green-500 relative rounded-[1.90261e+07px] shrink-0 size-[15.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[15.992px]" />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[15.992px] relative shrink-0 w-[33.056px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15.992px] relative w-[33.056px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">Green</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.991px] h-[31.39px] items-center left-[0.44px] pl-[12.563px] pr-[0.567px] py-[0.567px] rounded-[10px] top-[0.26px] w-[82.165px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.567px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container5 />
      <Text3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-purple-500 relative rounded-[1.90261e+07px] shrink-0 size-[15.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[15.992px]" />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[15.992px] relative shrink-0 w-[35.058px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15.992px] relative w-[35.058px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">Purple</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.991px] h-[31.39px] items-center left-[85.14px] pl-[12.563px] pr-[0.567px] py-[0.567px] rounded-[10px] top-[0.26px] w-[84.167px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.567px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container6 />
      <Text4 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-orange-500 relative rounded-[1.90261e+07px] shrink-0 size-[15.992px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[15.992px]" />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[15.992px] relative shrink-0 w-[40.267px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15.992px] relative w-[40.267px]">
        <p className="absolute font-['Pretendard:Medium',sans-serif] leading-[16px] left-0 not-italic text-[12px] text-neutral-100 text-nowrap top-[-0.43px] whitespace-pre">Orange</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7.991px] h-[31.39px] items-center left-[171.44px] pl-[12.563px] pr-[0.567px] py-[0.567px] rounded-[10px] top-[0.26px] w-[89.377px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.567px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container7 />
      <Text5 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[31.39px] relative shrink-0 w-full" data-name="Container">
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

export default function Container9() {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] relative rounded-[16px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.567px] border-[rgba(163,163,163,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[15.992px] items-start pb-[0.567px] pt-[16.559px] px-[16.559px] relative size-full">
          <Container />
          <PrimitiveLabel1 />
          <Container4 />
          <Container8 />
        </div>
      </div>
    </div>
  );
}