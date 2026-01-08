import React, { memo, useState, useEffect } from "react";
import { motion } from "motion/react";
import { GenPressoSymbol } from "./GenPressoSymbol";
import newGenPressoLogo from 'figma:asset/57dbfaaf8cb79df7cadc3a21c7d511807c454d95.png';
import lightModeLogo from 'figma:asset/0e44259931959ea43332e73671c64d8dcee25b0e.png';

// GenPresso 로고 컴포넌트
export const GenPressoLogo = memo(function GenPressoLogo({ 
  size = "large",
  onClick 
}: { 
  size?: "small" | "large";
  onClick?: () => void;
}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 초기 테마 확인
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // 테마 변경 감지를 위한 MutationObserver
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  if (size === "small") {
    return (
      <motion.div 
        className="h-6 w-6 md:h-7 md:w-7 relative cursor-pointer"
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <GenPressoSymbol />
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="h-16 md:h-32 2xl:h-44 w-full max-w-lg md:max-w-4xl 2xl:max-w-6xl mx-auto relative m-0 cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <img 
        src={isDark ? newGenPressoLogo : lightModeLogo}
        alt="GenPresso"
        className="w-full h-full object-contain transition-opacity duration-300"
      />
    </motion.div>
  );
});