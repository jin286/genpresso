import svgPaths from "./svg-o8jczvwm7s";
import clsx from "clsx";
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div className={additionalClassNames}>
      <div className="absolute inset-[-50%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <path d={svgPaths.p1ccb0100} id="Vector" stroke="var(--stroke-0, #A1A1AA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66634" />
        </svg>
      </div>
    </div>
  );
}
type Icon4VectorProps = {
  additionalClassNames?: string;
};

function Icon4Vector({ additionalClassNames = "" }: Icon4VectorProps) {
  return <Helper additionalClassNames={clsx("absolute bottom-[45.83%] top-[45.83%]", additionalClassNames)} />;
}

export default function GenerationInput() {
  return (
    <div className="relative size-full" data-name="GenerationInput">
      <div className="absolute bg-[rgba(245,245,245,0.05)] border-[0.726px] border-[rgba(163,163,163,0.2)] border-solid left-[15.99px] rounded-[2.43708e+07px] size-[43.998px] top-[3.44px]" data-name="Button">
        <div className="absolute left-[13.28px] size-[15.99px] top-[13.28px]" data-name="Icon">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <g id="Icon">
              <path d="M3.33127 7.99504H12.6588" id="Vector" stroke="var(--stroke-0, #F5F5F5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33251" />
              <path d="M7.99504 3.33127V12.6588" id="Vector_2" stroke="var(--stroke-0, #F5F5F5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33251" />
            </g>
          </svg>
        </div>
      </div>
      <div className="absolute bg-[rgba(245,245,245,0.05)] border-[0.726px] border-[rgba(163,163,163,0.2)] border-solid h-[53.429px] left-[67.98px] rounded-[2.43708e+07px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-0 w-[588.024px]" data-name="Container">
        <div className="absolute content-stretch flex h-[39.992px] items-start left-[20px] overflow-clip px-0 py-[8px] top-[5.99px] w-[510.604px]" data-name="Text Area">
          <p className="font-['Pretendard:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#a1a1aa] text-[16px] text-nowrap">에이전트와 함께 작업하세요.</p>
        </div>
        <div className="absolute bg-[#4fa8d8] left-[538.59px] rounded-[2.43708e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[39.992px] top-[5.99px]" data-name="Button">
          <div className="absolute left-[11px] size-[17.999px] top-[11px]" data-name="IconSparkles">
            <div className="absolute content-stretch flex flex-col items-start left-[0.56px] size-[13.505px] top-[4.49px]" data-name="Container">
              <div className="h-[13.505px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                <div className="absolute inset-[0_-0.01%_-0.01%_0]" data-name="Vector">
                  <div className="absolute inset-[-2.78%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                      <path d={svgPaths.p24452000} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="0.750264" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute content-stretch flex flex-col items-start left-0 size-[6.196px] top-0" data-name="Container">
              <div className="h-[6.196px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                <div className="absolute inset-[0_8.34%_8.33%_0]" data-name="Vector">
                  <div className="absolute inset-[-6.06%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
                      <path d={svgPaths.p36197f12} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="0.688477" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute content-stretch flex flex-col items-start left-[10.12px] size-[7.876px] top-[1.12px]" data-name="Container">
              <div className="h-[7.876px] overflow-clip relative shrink-0 w-full" data-name="Icon">
                <div className="absolute inset-[0_4.56%_4.54%_0]" data-name="Vector">
                  <div className="absolute inset-[-4.76%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                      <path d={svgPaths.p27521780} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="0.715989" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-[rgba(161,161,170,0.2)] content-stretch flex flex-col h-[23.991px] items-start left-[277.29px] opacity-0 pb-0 pt-[1.997px] px-[5.992px] rounded-[2.43708e+07px] top-[4px] w-[31.98px]" data-name="Container">
          <div className="h-[19.996px] overflow-clip relative shrink-0 w-full" data-name="Icon">
            <Helper additionalClassNames="absolute inset-[45.83%]" />
            <Icon4Vector additionalClassNames="left-3/4 right-[16.67%]" />
            <Icon4Vector additionalClassNames="left-[16.67%] right-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}