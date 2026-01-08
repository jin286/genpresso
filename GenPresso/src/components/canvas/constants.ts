export const CANVAS_CONSTANTS = {
  NODE_WIDTH: 188,
  NODE_HEIGHT: 182,
  INITIAL_NODE_X: 400,
  INITIAL_NODE_Y: 200,
  HORIZONTAL_SPACING: 350,
  VERTICAL_SPACING: 320,
  MIX_NODE_VERTICAL_SPACING: 500, // 믹스 노드 전용 세로 간격 (더 큼)
  DUPLICATE_OFFSET: 30,
  PASTE_OFFSET: 40,
  MIN_ZOOM: 0.1,
  MAX_ZOOM: 2,
  ZOOM_STEP: 0.1,
  CANVAS_WIDTH: 15000,
  CANVAS_HEIGHT: 15000,
  CANVAS_PADDING: 1000,
} as const;

export const LAYOUT = {
  X_STEP: 480,
  Y_STEP: 450,
  START_X: 400,
  START_Y: 200,
  CENTER_OFFSET: (count: number) => -(count - 1) * 220,
} as const;

export const Z_INDEX = {
  GRID: 0,
  EDGES: 1,
  NODES: 2,
  SELECTION_BOX: 3,
  FLOATING_TOOLBAR: 10,
  COMMENTS: 15,
  CONTEXT_MENU: 20,
  PANELS: 30,
  TOOLBARS: 40,
  DIALOGS: 50,
} as const;

export const NODE_TYPE_LABELS = {
  text: '텍스트',
  image: '이미지',
  video: '비디오',
  process: '생성중',
  mix: '믹스',
  composition: '컴포지션',
} as const;

export const NODE_TYPE_COLORS = {
  text: '#ef4444',      // 빨강
  image: '#3b82f6',     // 파랑
  video: '#22c55e',     // 초록
  process: '#a855f7',   // 보라
  mix: '#f59e0b',       // 주황
  composition: '#ec4899', // 핑크
  upload: '#3b82f6',    // 업로드 (이미지와 동일)
  segment: '#06b6d4',   // 세그먼트 (청록)
} as const;

export const GROUP_COLORS = {
  yellow: { color: "#fbbf24", labelKey: "group.colors.yellow" },
  blue: { color: "#3b82f6", labelKey: "group.colors.blue" },
  pink: { color: "#ec4899", labelKey: "group.colors.pink" },
  green: { color: "#10b981", labelKey: "group.colors.green" },
  purple: { color: "#8b5cf6", labelKey: "group.colors.purple" },
  orange: { color: "#f97316", labelKey: "group.colors.orange" },
  cyan: { color: "#06b6d4", labelKey: "group.colors.cyan" },
  red: { color: "#ef4444", labelKey: "group.colors.red" },
} as const;

export const ID_INPUT_CONSTANTS = {
  MIN_WIDTH: 100,
  CHAR_WIDTH: 8,
} as const;

export const DRAG_THRESHOLD = 5;

export const REPEAT_COUNT_RANGE = {
  MIN: 1,
  MAX: 10,
} as const;

export const VIDEO_LENGTH_RANGE = {
  MIN: 5,
  MAX: 30,
  STEP: 1,
} as const;

export interface ModelInfo {
  id: string;
  label: string;
  type: 'image' | 'video';
  workflow: string;
  description: string;
  credits: number;
  resolution: string;
  supportedRatios: string[];
  supportedInputs: Array<'text' | 'image' | 'video'>;
  videoLength?: string;
  audioSupport?: boolean;
}

export const MODEL_DATA: ModelInfo[] = [
  // Text → Image/Video 모델
  {
    id: 'nano-banana',
    label: 'Nano Banana',
    type: 'image',
    workflow: 'Text → Image',
    description: '텍스트 기반 빠른 이미지 생성 경량모델.\\n간단한 이미지 생성에 최적화.',
    credits: 5,
    resolution: '1024×1024',
    supportedRatios: ['1:1', '4:3', '16:9', '9:16'],
    supportedInputs: ['text'],
  },
  {
    id: 'gemini-2.5-flash',
    label: 'Gemini 2.5 Flash',
    type: 'image',
    workflow: 'Text → Image',
    description: 'Google 최신 이미지 생성 모델.\\n빠른 속도와 높은 품질.',
    credits: 6,
    resolution: '1024×1024',
    supportedRatios: ['1:1'],
    supportedInputs: ['text'],
  },
  {
    id: 'seedream-4.0',
    label: 'SeeDream 4.0',
    type: 'image',
    workflow: 'Text → Image',
    description: '고급 이미지 생성 및 스타일 전환.\\n복잡한 프롬프트 이해 가능.',
    credits: 8,
    resolution: '1024×1024~2048×2048',
    supportedRatios: ['1:1', '4:3', '16:9'],
    supportedInputs: ['text'],
  },
  {
    id: 'veo-3.1-fast',
    label: 'Veo 3.1 Fast',
    type: 'video',
    workflow: 'Text → Video',
    description: '빠른 비디오 생성.\\n속도와 품질 균형.',
    credits: 25,
    resolution: '최대 1080p',
    supportedRatios: ['1:1', '16:9', '9:16'],
    supportedInputs: ['text'],
    videoLength: '5초',
    audioSupport: true,
  },
  {
    id: 'veo-3.1',
    label: 'Veo 3.1',
    type: 'video',
    workflow: 'Text → Video',
    description: '고품질 비디오 생성.\\n정교한 디테일과 자연스러운 움직임.',
    credits: 35,
    resolution: '최대 1080p',
    supportedRatios: ['1:1', '16:9', '9:16'],
    supportedInputs: ['text'],
    videoLength: '10초',
    audioSupport: true,
  },
  {
    id: 'sora-2',
    label: 'Sora 2',
    type: 'video',
    workflow: 'Text → Video',
    description: 'OpenAI 최신 비디오 생성 기술.\\n최고 품질의 비디오 생성.',
    credits: 100,
    resolution: '720×1280 / 1280×720',
    supportedRatios: ['16:9', '9:16'],
    supportedInputs: ['text'],
    videoLength: '20초',
    audioSupport: true,
  },
  
  // Image → Image/Video 모델
  {
    id: 'nano-banana-img',
    label: 'Nano Banana',
    type: 'image',
    workflow: 'Image → Image',
    description: '이미지 편집·스타일 변환 경량모델.\\n빠른 이미지 변환 작업 최적화.',
    credits: 5,
    resolution: '1024×1024',
    supportedRatios: ['1:1', '4:3', '16:9', '9:16'],
    supportedInputs: ['image'],
  },
  {
    id: 'gemini-2.5-flash-img',
    label: 'Gemini 2.5 Flash',
    type: 'image',
    workflow: 'Image → Image',
    description: 'Google 최신 이미지 편집 모델.\\n빠른 정확한 변환.',
    credits: 6,
    resolution: '1024×1024',
    supportedRatios: ['1:1'],
    supportedInputs: ['image'],
  },
  {
    id: 'seedream-4.0-img',
    label: 'SeeDream 4.0',
    type: 'image',
    workflow: 'Image → Image',
    description: '고급 이미지 편집 및 스타일 전환.\\n복잡한 조정 가능.',
    credits: 8,
    resolution: '1024×1024~2048×2048',
    supportedRatios: ['1:1', '4:3', '16:9'],
    supportedInputs: ['image'],
  },
  {
    id: 'sora-2-img',
    label: 'Sora 2',
    type: 'video',
    workflow: 'Image → Video',
    description: '이미지 기반 비디오 생성.\\nOpenAI 최신 기술.',
    credits: 100,
    resolution: '720×1280 / 1280×720',
    supportedRatios: ['16:9', '9:16'],
    supportedInputs: ['image'],
    videoLength: '20초',
    audioSupport: true,
  },
  {
    id: 'sora-2-pro',
    label: 'Sora 2 Pro',
    type: 'video',
    workflow: 'Image → Video',
    description: 'Sora 2의 프로 버전.\\n최고 품질 비디오 생성.',
    credits: 150,
    resolution: '1024×1792 / 1792×1024',
    supportedRatios: ['16:9', '9:16'],
    supportedInputs: ['image'],
    videoLength: '30초',
    audioSupport: true,
  },
  {
    id: 'veo-3.1-fast-img',
    label: 'Veo 3.1 Fast',
    type: 'video',
    workflow: 'Image → Video',
    description: '이미지를 비디오로 빠르게 변환.\\n짧은 시간 내 결과 확인.',
    credits: 20,
    resolution: '최대 1080p',
    supportedRatios: ['1:1', '16:9', '9:16'],
    supportedInputs: ['image'],
    videoLength: '5초',
    audioSupport: true,
  },
  {
    id: 'veo-3.1-img',
    label: 'Veo 3.1',
    type: 'video',
    workflow: 'Image → Video',
    description: '고품질 비디오 생성.\\n자연스러운 애니메이션·색채 전환.',
    credits: 35,
    resolution: '최대 1080p',
    supportedRatios: ['1:1', '16:9', '9:16'],
    supportedInputs: ['image'],
    videoLength: '10초',
    audioSupport: true,
  },
  
  // Video → Video 모델
  {
    id: 'sora-2-video',
    label: 'Sora 2',
    type: 'video',
    workflow: 'Video → Video',
    description: '비디오 편집 및 스타일 변환.\\n고급 편집 및 향상 기능 제공.',
    credits: 100,
    resolution: '720×1280 / 1280×720',
    supportedRatios: ['16:9', '9:16'],
    supportedInputs: ['video'],
    videoLength: '20초',
    audioSupport: true,
  },
  {
    id: 'sora-2-pro-video',
    label: 'Sora 2 Pro',
    type: 'video',
    workflow: 'Video → Video',
    description: '고해상도 프로 버전.\\n최고 품질의 비디오 편집.',
    credits: 150,
    resolution: '1024×1792 / 1792×1024',
    supportedRatios: ['16:9', '9:16'],
    supportedInputs: ['video'],
    videoLength: '30초',
    audioSupport: true,
  },
];

export interface RatioOption {
  id: string;
  label: string;
}

export const RATIO_OPTIONS: RatioOption[] = [
  { id: '1:1', label: '1:1 (정사각형)' },
  { id: '4:3', label: '4:3 (가로)' },
  { id: '3:4', label: '3:4 (세로)' },
  { id: '16:9', label: '16:9 (가로)' },
  { id: '9:16', label: '9:16 (세로)' },
];

export interface SoundOption {
  id: string;
  label: string;
}

export const SOUND_OPTIONS: SoundOption[] = [
  { id: 'none', label: '사운드 없음' },
  { id: 'ai-generated', label: 'AI 생성 사운드' },
  { id: 'bgm', label: 'BGM 선택' },
  { id: 'upload', label: '직접 업로드' },
];
