import { ScenarioTemplate } from "../../types";

/**
 * 화보 디자인 시나리오 - 노드 겹침 방지
 * 브랜드 화보 및 에디토리얼 패션 제작 과정
 */
export const editorialFashionScenario: ScenarioTemplate = {
  id: 'editorial-fashion',
  name: '화보 디자인',
  description: '브랜드 화보 및 에디토리얼 패션 제작 워크플로우',
  nodes: [
    // 왼쪽 상단 - 초기 텍스트 노드
    {
      id: 'node-1',
      type: 'text',
      content: '럭셔리 브랜드 화보 컨셉: 우아한 레드 드레스, 고급스러운 분위기',
      prompt: 'Luxury brand editorial photoshoot, elegant model in red dress, sophisticated atmosphere, professional fashion photography',
      x: 50,
      y: 50,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    
    // 레드 드레스 이미지 (왼쪽)
    {
      id: 'node-2',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1610048616223-4499c1afc20b?w=800',
      prompt: 'Luxury brand editorial photoshoot, elegant model in red dress',
      x: 300,
      y: 50,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 위쪽 라인 1 - 블루 의상 텍스트
    {
      id: 'node-3',
      type: 'text',
      content: '의상을 블루 컬러로 변경, 모던한 느낌',
      prompt: 'Same composition, modern blue outfit, fashion editorial style',
      x: 550,
      y: 50,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    
    // 위쪽 라인 1 - 블루 포스터
    {
      id: 'node-4',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1561656136-10fbd6393de5?w=800',
      prompt: 'Fashion model in modern blue outfit - poster',
      x: 800,
      y: 50,
      metadata: { model: 'flux-pro', ratio: '2:3' }
    },
    
    // 위쪽 라인 2 - 블루 의상 변형 1
    {
      id: 'node-5',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1561656136-10fbd6393de5?w=800',
      prompt: 'Fashion model in modern blue outfit - style variation',
      x: 550,
      y: 250,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 위쪽 라인 3 - 블루 의상 변형 2
    {
      id: 'node-6',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1561656136-10fbd6393de5?w=800',
      prompt: 'Fashion model in modern blue outfit - another angle',
      x: 550,
      y: 480,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 비디오 변환 텍스트
    {
      id: 'node-7',
      type: 'text',
      content: '비디오 변환 및 모션 추가',
      prompt: 'Convert to video with motion',
      x: 800,
      y: 480,
      isOutput: false,
      metadata: { model: 'gen-3-alpha' }
    },
    
    // 화이트 의상 텍스트
    {
      id: 'node-8',
      type: 'text',
      content: '화이트 의상 시리즈',
      prompt: 'White outfit series with elegant pose',
      x: 800,
      y: 250,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    
    // 비디오 노드
    {
      id: 'node-9',
      type: 'video',
      imageUrl: 'https://images.unsplash.com/photo-1561656136-10fbd6393de5?w=800',
      videoUrl: 'https://example.com/video.mp4',
      prompt: 'Blue outfit motion video',
      x: 1050,
      y: 480,
      metadata: { model: 'gen-3-alpha', ratio: '9:16' }
    },
    
    // 화이트 드레스 텍스트 1
    {
      id: 'node-10',
      type: 'text',
      content: '화이트 드레스 포즈 1',
      prompt: 'White dress elegant pose variation 1',
      x: 1050,
      y: 50,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    
    // 화이트 드레스 이미지 1
    {
      id: 'node-11',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
      prompt: 'White dress pose 1',
      x: 1300,
      y: 50,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 화이트 드레스 텍스트 2
    {
      id: 'node-12',
      type: 'text',
      content: '화이트 드레스 포즈 2',
      prompt: 'White dress elegant pose variation 2',
      x: 1050,
      y: 250,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    
    // 화이트 드레스 이미지 2
    {
      id: 'node-13',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
      prompt: 'White dress pose 2',
      x: 1300,
      y: 250,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 중간 라인 - 그린 의상 텍스트 (왼쪽)
    {
      id: 'node-14',
      type: 'text',
      content: '자연스러운 그린 재킷 스타일, 야외 배경',
      prompt: 'Fashion model in green jacket, natural outdoor setting, editorial photography',
      x: 50,
      y: 700,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    
    // 그린 의상 메인
    {
      id: 'node-15',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1742151103578-cdc6fde9246a?w=800',
      prompt: 'Green jacket outdoor - main shot',
      x: 300,
      y: 700,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 그린 의상 변형 1
    {
      id: 'node-16',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1742151103578-cdc6fde9246a?w=800',
      prompt: 'Green outfit variation 1',
      x: 550,
      y: 700,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 그린 의상 변형 2
    {
      id: 'node-17',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1742151103578-cdc6fde9246a?w=800',
      prompt: 'Green outfit variation 2',
      x: 800,
      y: 700,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 그린 의상 변형 3
    {
      id: 'node-18',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1742151103578-cdc6fde9246a?w=800',
      prompt: 'Green outfit variation 3',
      x: 1050,
      y: 700,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 그린 의상 변형 4
    {
      id: 'node-19',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1742151103578-cdc6fde9246a?w=800',
      prompt: 'Green outfit variation 4',
      x: 1300,
      y: 700,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 그린 의상 변형 5
    {
      id: 'node-20',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1742151103578-cdc6fde9246a?w=800',
      prompt: 'Green outfit variation 5',
      x: 1550,
      y: 700,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 그린 의상 변형 6
    {
      id: 'node-21',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1742151103578-cdc6fde9246a?w=800',
      prompt: 'Green outfit variation 6 - final',
      x: 1800,
      y: 700,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 그린 의상 아래 - 포즈 디렉션 텍스트 1
    {
      id: 'node-22',
      type: 'text',
      content: '포즈 디렉션 1: 자연스러운 워킹',
      prompt: 'Natural walking pose direction',
      x: 550,
      y: 930,
      isOutput: false,
      metadata: {}
    },
    
    // 포즈 디렉션 2
    {
      id: 'node-23',
      type: 'text',
      content: '포즈 디렉션 2: 우아한 스탠딩',
      prompt: 'Elegant standing pose direction',
      x: 800,
      y: 930,
      isOutput: false,
      metadata: {}
    },
    
    // 포즈 디렉션 3
    {
      id: 'node-24',
      type: 'text',
      content: '포즈 디렉션 3: 다이나믹 무브',
      prompt: 'Dynamic movement pose direction',
      x: 1050,
      y: 930,
      isOutput: false,
      metadata: {}
    },
    
    // 포즈 디렉션 4
    {
      id: 'node-25',
      type: 'text',
      content: '포즈 디렉션 4: 클로즈업 샷',
      prompt: 'Close-up shot direction',
      x: 1300,
      y: 930,
      isOutput: false,
      metadata: {}
    },
    
    // 포즈 디렉션 5
    {
      id: 'node-26',
      type: 'text',
      content: '포즈 디렉션 5: 프로필 뷰',
      prompt: 'Profile view direction',
      x: 1550,
      y: 930,
      isOutput: false,
      metadata: {}
    },
    
    // 노란 배경 텍스트
    {
      id: 'node-27',
      type: 'text',
      content: '노란 배경 스튜디오 컷',
      prompt: 'Yellow background studio shot',
      x: 2050,
      y: 480,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    
    // 노란 배경 이미지
    {
      id: 'node-28',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
      prompt: 'Yellow background fashion editorial',
      x: 2300,
      y: 480,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 그린 의상 최종 선택 텍스트
    {
      id: 'node-29',
      type: 'text',
      content: '그린 의상 최종 선택',
      prompt: 'Final green outfit selection',
      x: 2050,
      y: 700,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    
    // 그린 의상 최종 이미지
    {
      id: 'node-30',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1742151103578-cdc6fde9246a?w=800',
      prompt: 'Final green outfit selection',
      x: 2300,
      y: 700,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 갈색 배경 텍스트
    {
      id: 'node-31',
      type: 'text',
      content: '갈색 배경 우아한 컷',
      prompt: 'Brown background elegant shot',
      x: 2050,
      y: 900,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    
    // 갈색 배경 이미지
    {
      id: 'node-32',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
      prompt: 'Brown background elegant fashion',
      x: 2300,
      y: 900,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 최종 비디오 텍스트
    {
      id: 'node-33',
      type: 'text',
      content: '최종 화보 비디오 생성',
      prompt: 'Final editorial video generation',
      x: 2550,
      y: 480,
      isOutput: false,
      metadata: { model: 'gen-3-alpha' }
    },
    
    // 최종 비디오
    {
      id: 'node-34',
      type: 'video',
      imageUrl: 'https://images.unsplash.com/photo-1742151103578-cdc6fde9246a?w=800',
      videoUrl: 'https://example.com/final.mp4',
      prompt: 'Final editorial fashion video',
      x: 2800,
      y: 480,
      metadata: { model: 'gen-3-alpha', ratio: '9:16' }
    },
    
    // 악세서리 라인 - 블랙 햇 텍스트
    {
      id: 'node-35',
      type: 'text',
      content: '디테일 컷: 블랙 햇',
      prompt: 'Black hat accessory detail shot',
      x: 1800,
      y: 1100,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    
    // 블랙 햇 이미지
    {
      id: 'node-36',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800',
      prompt: 'Black hat detail',
      x: 2050,
      y: 1100,
      metadata: { model: 'flux-pro', ratio: '1:1' }
    },
    
    // 코트 텍스트
    {
      id: 'node-37',
      type: 'text',
      content: '디테일 컷: 코트',
      prompt: 'Coat detail shot',
      x: 1800,
      y: 1300,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    
    // 코트 이미지
    {
      id: 'node-38',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
      prompt: 'Green coat detail',
      x: 2050,
      y: 1300,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    },
    
    // 부츠 텍스트
    {
      id: 'node-39',
      type: 'text',
      content: '디테일 컷: 럭셔리 부츠',
      prompt: 'Luxury boots detail shot',
      x: 1800,
      y: 1500,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    
    // 부츠 이미지
    {
      id: 'node-40',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800',
      prompt: 'Black luxury boots',
      x: 2050,
      y: 1500,
      metadata: { model: 'flux-pro', ratio: '1:1' }
    },
    
    // 레드 백 이미지
    {
      id: 'node-41',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
      prompt: 'Red luxury bag',
      x: 2050,
      y: 1700,
      metadata: { model: 'flux-pro', ratio: '1:1' }
    },
    
    // 최종 풀바디 텍스트
    {
      id: 'node-42',
      type: 'text',
      content: '최종 풀 바디 샷',
      prompt: 'Final full body shot',
      x: 2300,
      y: 1300,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    
    // 최종 풀바디 이미지
    {
      id: 'node-43',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1742151103578-cdc6fde9246a?w=800',
      prompt: 'Final full body editorial',
      x: 2550,
      y: 1300,
      metadata: { model: 'flux-pro', ratio: '4:5' }
    }
  ],
  edges: [
    // 초기 -> 레드 드레스
    { id: 'e-1', sourceId: 'node-1', targetId: 'node-2' },
    
    // 레드 -> 블루 라인
    { id: 'e-2', sourceId: 'node-2', targetId: 'node-3' },
    { id: 'e-3', sourceId: 'node-3', targetId: 'node-4' },
    { id: 'e-4', sourceId: 'node-2', targetId: 'node-5' },
    { id: 'e-5', sourceId: 'node-2', targetId: 'node-6' },
    
    // 블루 -> 비디오
    { id: 'e-6', sourceId: 'node-6', targetId: 'node-7' },
    { id: 'e-7', sourceId: 'node-7', targetId: 'node-9' },
    { id: 'e-8', sourceId: 'node-5', targetId: 'node-8' },
    
    // 화이트 라인
    { id: 'e-9', sourceId: 'node-4', targetId: 'node-10' },
    { id: 'e-10', sourceId: 'node-10', targetId: 'node-11' },
    { id: 'e-11', sourceId: 'node-8', targetId: 'node-12' },
    { id: 'e-12', sourceId: 'node-12', targetId: 'node-13' },
    
    // 레드 -> 그린 라인
    { id: 'e-13', sourceId: 'node-2', targetId: 'node-14' },
    { id: 'e-14', sourceId: 'node-14', targetId: 'node-15' },
    { id: 'e-15', sourceId: 'node-15', targetId: 'node-16' },
    { id: 'e-16', sourceId: 'node-16', targetId: 'node-17' },
    { id: 'e-17', sourceId: 'node-17', targetId: 'node-18' },
    { id: 'e-18', sourceId: 'node-18', targetId: 'node-19' },
    { id: 'e-19', sourceId: 'node-19', targetId: 'node-20' },
    { id: 'e-20', sourceId: 'node-20', targetId: 'node-21' },
    
    // 그린 -> 텍스트 디렉션들
    { id: 'e-21', sourceId: 'node-16', targetId: 'node-22' },
    { id: 'e-22', sourceId: 'node-17', targetId: 'node-23' },
    { id: 'e-23', sourceId: 'node-18', targetId: 'node-24' },
    { id: 'e-24', sourceId: 'node-19', targetId: 'node-25' },
    { id: 'e-25', sourceId: 'node-20', targetId: 'node-26' },
    
    // 그린 -> 노란 배경
    { id: 'e-26', sourceId: 'node-21', targetId: 'node-27' },
    { id: 'e-27', sourceId: 'node-27', targetId: 'node-28' },
    { id: 'e-28', sourceId: 'node-21', targetId: 'node-29' },
    { id: 'e-29', sourceId: 'node-29', targetId: 'node-30' },
    
    // 그린 -> 갈색 배경
    { id: 'e-30', sourceId: 'node-21', targetId: 'node-31' },
    { id: 'e-31', sourceId: 'node-31', targetId: 'node-32' },
    
    // 노란 배경 -> 최종 비디오
    { id: 'e-32', sourceId: 'node-28', targetId: 'node-33' },
    { id: 'e-33', sourceId: 'node-33', targetId: 'node-34' },
    
    // 악세서리 라인
    { id: 'e-34', sourceId: 'node-21', targetId: 'node-35' },
    { id: 'e-35', sourceId: 'node-35', targetId: 'node-36' },
    { id: 'e-36', sourceId: 'node-36', targetId: 'node-37' },
    { id: 'e-37', sourceId: 'node-37', targetId: 'node-38' },
    { id: 'e-38', sourceId: 'node-38', targetId: 'node-39' },
    { id: 'e-39', sourceId: 'node-39', targetId: 'node-40' },
    { id: 'e-40', sourceId: 'node-40', targetId: 'node-41' },
    
    // 악세서리 -> 최종 컷
    { id: 'e-41', sourceId: 'node-38', targetId: 'node-42' },
    { id: 'e-42', sourceId: 'node-42', targetId: 'node-43' }
  ]
};
