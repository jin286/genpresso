export default function Button() {
  return (
    <div className="bg-[#254b5e] relative rounded-[14px] size-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[8px] relative size-full">
          <p className="font-['Pretendard:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-nowrap text-white whitespace-pre">선택 취소</p>
        </div>
      </div>
    </div>
  );
}