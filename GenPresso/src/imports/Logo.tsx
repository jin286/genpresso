import logoGray from 'figma:asset/508129f329087f3df2fe7cafc753ba09d7b05d15.png';
import logoPurple from 'figma:asset/e9393bf35397a1c9e1ef6443b990555915b29345.png';

export default function Logo() {
  return (
    <div className="relative size-full" data-name="logo">
      {/* 라이트 모드용 보라색 로고 */}
      <img 
        src={logoPurple}
        alt="GenPresso"
        className="block w-full h-full object-contain dark:hidden"
      />
      
      {/* 다크 모드용 회색 로고 */}
      <img 
        src={logoGray}
        alt="GenPresso"
        className="hidden w-full h-full object-contain dark:block my-[25px] mx-[0px]"
      />
    </div>
  );
}