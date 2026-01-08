import { ScenarioId } from "../../types";

export interface AgentMessage {
  type: 'ai' | 'user';
  content: string;
  imageUrl?: string;
  images?: string[]; // 여러 이미지
  model?: string;
}

export interface AgentConversation {
  timestamp: string;
  messages: AgentMessage[];
}

/**
 * 시나리오별 Agent 대화 내용
 */
export const agentConversations: Record<ScenarioId | 'default', AgentConversation> = {
  // 01. 애니메이션
  'text-to-video': {
    timestamp: '2026-01-08 14:35:00',
    messages: [
      { type: 'ai', content: '안녕하세요! 애니메이션 제작을 도와드리겠습니다. 어떤 장면을 만들고 싶으신가요?' },
      { type: 'user', content: '귀여운 3D 캐릭터가 춤추는 애니메이션을 만들고 싶어요' },
      { type: 'ai', content: '좋은 아이디어네요! Pixar 스타일의 생동감 있는 3D 애니메이션을 생성했어요.', imageUrl: 'https://images.unsplash.com/photo-1646206346896-14367dee001b?w=800', model: 'Veo 3' },
      { type: 'user', content: '배경 색상을 더 화려하게 할 수 있을까요?' },
      { type: 'ai', content: '물론입니다! 화려한 스튜디오 배경으로 다시 생성했어요. 부드러운 움직임이 돋보입니다.', model: 'Veo 3' }
    ]
  },

  // 02. 패션디자인
  'text-to-image': {
    timestamp: '2026-01-08 12:20:00',
    messages: [
      { type: 'ai', content: '패션 디자인 작업을 시작해볼까요? 어떤 스타일을 원하시나요?' },
      { type: 'user', content: '미래적인 사이버펑크 스타일의 야경 이미지를 만들고 싶어요' },
      { type: 'ai', content: '멋진 선택이에요! 네온 빛이 빛나는 미래 도시 야경을 생성했습니다.', imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800', model: 'Flux Pro' },
      { type: 'user', content: '건물이 더 높고 웅장한 느낌으로 바꿔주세요' },
      { type: 'ai', content: '초고층 빌딩들이 하늘을 찌를 듯한 웅장한 도시로 업데이트했어요!', model: 'Flux Pro' }
    ]
  },

  // 03. 광고디자인
  'image-text-to-image': {
    timestamp: '2026-01-08 18:45:00',
    messages: [
      { type: 'ai', content: '광고 비주얼 제작을 도와드리겠습니다. 어떤 제품 광고인가요?' },
      { type: 'user', content: '고급 가구 브랜드 광고를 만들고 싶어요. 샹들리에와 우아한 분위기로요' },
      { type: 'ai', content: '럭셔리한 샹들리에 이미지를 생성했어요. 고급스러운 조명 효과가 인상적입니다.', imageUrl: 'https://images.unsplash.com/photo-1565538420870-da08ff96a207?w=800', model: 'Flux Pro' },
      { type: 'user', content: '실제 거실에 배치된 모습도 보고 싶어요' },
      { type: 'ai', content: '샹들리에가 설치된 고급 거실 장면을 만들었어요. 공간과 완벽하게 조화롭습니다!', imageUrl: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800', model: 'Flux Pro' }
    ]
  },

  // 04. 무빙포스터
  'image-text-to-video': {
    timestamp: '2026-01-08 16:10:00',
    messages: [
      { type: 'ai', content: '움직이는 포스터 제작을 시작해볼까요?' },
      { type: 'user', content: '제품 소개 영상 포스터를 만들고 싶어요. 스마트폰 광고용이에요' },
      { type: 'ai', content: '프리미엄 스마트폰 광고 영상을 생성했어요. 역동적인 카메라 워크가 돋보입니다.', imageUrl: 'https://images.unsplash.com/photo-1732549614149-d096b7a79594?w=800', model: 'Gen-3 Alpha Turbo' },
      { type: 'user', content: '제품이 회전하는 장면을 추가해주세요' },
      { type: 'ai', content: '360도 회전 장면을 추가했어요! 제품의 모든 각도가 잘 보입니다.', model: 'Gen-3 Alpha Turbo' }
    ]
  },

  // 05. 모션그래픽
  'video-audio-generation': {
    timestamp: '2026-01-08 14:22:00',
    messages: [
      { type: 'ai', content: '모션그래픽과 사운드 작업을 도와드릴게요!' },
      { type: 'user', content: '브랜드 로고 애니메이션에 어울리는 사운드를 만들어주세요' },
      { type: 'ai', content: '세련된 로고 애니메이션과 함께 프리미엄 사운드를 생성했어요.', model: 'Sora + ElevenLabs' },
      { type: 'user', content: '사운드를 더 역동적으로 만들어주세요' },
      { type: 'ai', content: '임팩트 있는 사운드 효과를 추가했어요! 브랜드의 역동성이 잘 표현됩니다.', model: 'Sora + ElevenLabs' }
    ]
  },

  // 06. 실사 영화 장면
  'complex-workflow': {
    timestamp: '2026-01-08 11:05:00',
    messages: [
      { type: 'ai', content: '영화 장면 컨셉 아트 작업을 시작해볼까요?' },
      { type: 'user', content: '침실과 거실이 연결된 영화 세트 장면을 만들고 싶어요' },
      { type: 'ai', content: '침실과 거실 장면을 각각 생성했어요. 조명과 구도가 영화 같은 느낌입니다.', images: [
        'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
      ], model: 'Flux Pro' },
      { type: 'user', content: '두 장면을 자연스럽게 연결해주세요' },
      { type: 'ai', content: '복도로 연결되는 매끄러운 전환 장면을 만들었어요!', model: 'Flux Pro' }
    ]
  },

  // 07. 무용 영상 시안
  'workflow-chain': {
    timestamp: '2026-01-08 09:30:00',
    messages: [
      { type: 'ai', content: '무용 영상 컨셉 작업을 도와드릴게요!' },
      { type: 'user', content: '현대 무용 공연 영상 시안을 만들고 싶어요' },
      { type: 'ai', content: '우아한 무용 동작과 무대 조명을 담은 장면들을 생성했어요.', model: 'Gen-3 Alpha' },
      { type: 'user', content: '무대 배경을 추상적으로 바꿔주세요' },
      { type: 'ai', content: '추상적인 조명과 그래픽 요소를 추가한 예술적인 배경으로 업데이트했어요!', model: 'Gen-3 Alpha' }
    ]
  },

  // 08. 패키지디자인
  'segmentation-workflow': {
    timestamp: '2026-01-08 15:45:00',
    messages: [
      { type: 'ai', content: '패키지 디자인 작업을 시작해볼까요?' },
      { type: 'user', content: '인테리어 소품 패키지 디자인을 만들고 싶어요' },
      { type: 'ai', content: '세그먼테이션으로 소파, 테이블, 벽면을 분리해서 각각 편집할 수 있게 했어요.', imageUrl: 'https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?w=800', model: 'Imagen 3' },
      { type: 'user', content: '소파 색상을 파란색으로 변경해주세요' },
      { type: 'ai', content: '소파만 파란색으로 교체했어요! 다른 요소들은 그대로 유지됩니다.', model: 'Imagen 3' }
    ]
  },

  // 09. 사진 편집
  'segmentation-test': {
    timestamp: '2026-01-08 10:20:00',
    messages: [
      { type: 'ai', content: '사진 편집 작업을 도와드릴게요!' },
      { type: 'user', content: '가구 사진에서 의자만 색상을 바꾸고 싶어요' },
      { type: 'ai', content: '의자를 세그먼테이션으로 분리했어요. 이제 원하는 색으로 바꿀 수 있습니다.', imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800', model: 'Imagen 3' },
      { type: 'user', content: '그린 컬러로 변경해주세요' },
      { type: 'ai', content: '의자를 생동감 있는 그린 컬러로 교체했어요!', imageUrl: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800', model: 'Imagen 3' }
    ]
  },

  // 10. 건축디자인
  'grouping-test': {
    timestamp: '2026-01-08 14:00:00',
    messages: [
      { type: 'ai', content: '건축 디자인 프로젝트를 시작해볼까요?' },
      { type: 'user', content: '인테리어 가구 배치 디자인을 만들고 싶어요' },
      { type: 'ai', content: '침실과 거실 가구 배치안을 여러 스타일로 생성했어요. 그룹핑으로 묶어서 관리할 수 있습니다.', images: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800'
      ], model: 'Flux Pro' },
      { type: 'user', content: '침실 가구 그룹에 AI 추천 색상을 적용해주세요' },
      { type: 'ai', content: 'Echo/Insight/Spark 가중치로 AI가 분석한 조화로운 색상 조합을 적용했어요!', model: 'Imagen 3' }
    ]
  },

  // 11. 시나리오 제작
  'agent-conversation': {
    timestamp: '2026-01-08 10:00:00',
    messages: [
      { type: 'ai', content: '시나리오 작성을 도와드릴게요! 어떤 장르를 생각하고 계신가요?' },
      { type: 'user', content: 'SF 단편 영화 시나리오를 써보고 싶어요' },
      { type: 'ai', content: '멋진 선택이에요! 미래 도시를 배경으로 한 이야기는 어떨까요? 주인공 설정부터 시작해볼까요?' },
      { type: 'user', content: '인공지능 탐정이 주인공이면 좋겠어요' },
      { type: 'ai', content: '흥미로운 캐릭터네요! AI 탐정이 사이버 범죄를 추적하는 줄거리를 작성했어요. 3막 구조로 나누어볼까요?' }
    ]
  },

  // 12. 자연 풍경 디자인
  'simple-group': {
    timestamp: '2026-01-08 11:00:00',
    messages: [
      { type: 'ai', content: '자연 풍경 디자인을 시작해볼까요?' },
      { type: 'user', content: '핑크빛 몽환적인 숲 풍경을 만들고 싶어요' },
      { type: 'ai', content: '마법 같은 핑크빛 숲 장면을 여러 구도로 생성했어요!', images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1511497584788-876760111969?w=800'
      ], model: 'Midjourney v6' },
      { type: 'user', content: '빛나는 버섯을 추가해주세요' },
      { type: 'ai', content: '발광하는 마법의 버섯들을 숲 곳곳에 배치했어요!', model: 'Midjourney v6' }
    ]
  },

  // 13. 화보 디자인
  'editorial-fashion': {
    timestamp: '2026-01-08 15:30:00',
    messages: [
      { type: 'ai', content: '안녕하세요! 럭셔리 브랜드 화보 제작을 도와드리겠습니다. 어떤 스타일을 원하시나요?' },
      { type: 'user', content: '우아한 레드 드레스로 고급스러운 화보를 만들고 싶어요' },
      { type: 'ai', content: '훌륭한 선택입니다! 레드 드레스로 럭셔리한 에디토리얼 스타일 화보를 생성했어요.', imageUrl: 'https://images.unsplash.com/photo-1610048616223-4499c1afc20b?w=800', model: 'Flux Pro' },
      { type: 'user', content: '다른 컬러도 시도해볼 수 있을까요? 블루나 그린으로요' },
      { type: 'ai', content: '물론이죠! 블루 의상으로 모던한 느낌을 주고, 그린 재킷으로 자연스러운 분위기를 연출했어요.', imageUrl: 'https://images.unsplash.com/photo-1742151103578-cdc6fde9246a?w=800', model: 'Flux Pro' },
      { type: 'user', content: '디테일 컷도 필요해요. 구두, 핸드백 같은 액세서리요' },
      { type: 'ai', content: '디테일 컷들을 생성했습니다! 럭셔리 슈즈와 핸드백 클로즈업 샷이에요.', images: [
        'https://images.unsplash.com/photo-1760616172899-0681b97a2de3?w=800',
        'https://images.unsplash.com/photo-1601924928357-22d3b3abfcfb?w=800'
      ], model: 'Flux Pro' }
    ]
  },

  // 기본 대화 (빈 캔버스 등)
  'default': {
    timestamp: '2026-01-08 15:00:00',
    messages: [
      { type: 'ai', content: '안녕하세요! GenPresso AI 에이전트입니다. 무엇을 도와드릴까요?' },
      { type: 'user', content: '이미지를 생성하고 싶어요' },
      { type: 'ai', content: '좋아요! 어떤 이미지를 만들고 싶으신가요? 자세히 설명해주시면 최적의 결과를 만들어드릴게요.' },
      { type: 'user', content: '붉은 의자 이미지를 만들어주세요' },
      { type: 'ai', content: '멋진 붉은 의자 이미지를 생성했어요!', imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800', model: 'Flux Pro' }
    ]
  },

  'blank': {
    timestamp: '2026-01-08 15:00:00',
    messages: [
      { type: 'ai', content: '안녕하세요! 새로운 프로젝트를 시작해볼까요?' },
      { type: 'user', content: '어떤 작업을 할 수 있나요?' },
      { type: 'ai', content: '이미지 생성, 비디오 제작, 세그먼테이션 편집 등 다양한 작업을 할 수 있어요. 원하시는 작업을 알려주세요!' }
    ]
  }
};
