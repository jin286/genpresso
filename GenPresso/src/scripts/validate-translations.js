// 번역 파일 검증 스크립트
const koTranslations = require('../locales/ko.ts');
const enTranslations = require('../locales/en.ts');
const jaTranslations = require('../locales/ja.ts');

function validateTranslations() {
  console.log('🔍 번역 파일 검증 시작...\n');
  
  // 1. canvas.nodeTypes 확인
  console.log('1. canvas.nodeTypes 검증:');
  console.log('  - ko.canvas.nodeTypes:', koTranslations.default?.canvas?.nodeTypes);
  console.log('  - en.canvas.nodeTypes:', enTranslations.default?.canvas?.nodeTypes);
  console.log('  - ja.canvas.nodeTypes:', jaTranslations.default?.canvas?.nodeTypes);
  console.log('');
  
  // 2. canvas.aiTools 확인
  console.log('2. canvas.aiTools 검증:');
  console.log('  - ko.canvas.aiTools:', koTranslations.default?.canvas?.aiTools);
  console.log('  - en.canvas.aiTools:', enTranslations.default?.canvas?.aiTools);
  console.log('  - ja.canvas.aiTools:', jaTranslations.default?.canvas?.aiTools);
  console.log('');
  
  // 3. canvas.shortcutGuide 확인
  console.log('3. canvas.shortcutGuide 검증:');
  console.log('  - ko.canvas.shortcutGuide:', koTranslations.default?.canvas?.shortcutGuide);
  console.log('  - en.canvas.shortcutGuide:', enTranslations.default?.canvas?.shortcutGuide);
  console.log('  - ja.canvas.shortcutGuide:', jaTranslations.default?.canvas?.shortcutGuide);
  console.log('');
  
  // 4. 전체 canvas 객체 확인
  console.log('4. 전체 canvas 객체 키 목록:');
  if (koTranslations.default?.canvas) {
    console.log('  - ko.canvas keys:', Object.keys(koTranslations.default.canvas));
  } else {
    console.log('  - ❌ ko.canvas가 undefined입니다!');
  }
  
  if (enTranslations.default?.canvas) {
    console.log('  - en.canvas keys:', Object.keys(enTranslations.default.canvas));
  } else {
    console.log('  - ❌ en.canvas가 undefined입니다!');
  }
  
  if (jaTranslations.default?.canvas) {
    console.log('  - ja.canvas keys:', Object.keys(jaTranslations.default.canvas));
  } else {
    console.log('  - ❌ ja.canvas가 undefined입니다!');
  }
  
  console.log('\n✅ 검증 완료');
}

validateTranslations();
