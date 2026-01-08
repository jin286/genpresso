import { ScenarioTemplate, ScenarioId } from "../../types";
import { createLayeredNodes } from "./utils/node-layout";
import chandelierImage from "figma:asset/1d1efc18a9116bed6e4ea9ccfd76adb01854d2e1.png";
import chandelierRoomImage from "figma:asset/6177c6d59f3e1da86937d2c8d960da1187a0a3e0.png";
import bedroomImage from "figma:asset/8a5bb0d3cf26f9438b54e42bf9834e3eb1a067cd.png";
import livingRoomImage from "figma:asset/b48a9c7d2ac5f1affc1cf94715b1551bccb845e4.png";
import sofaImage from "figma:asset/99002f3908677cc4c0104990684e5853546562ea.png";
import chairImage from "figma:asset/0e85a11fcd2245aba658364054647dbdb6916d1a.png";
import greenChairImage from "figma:asset/2e108bcecab555e3654f266f2271a077f73ce7cb.png";
import greenChairRoomImage from "figma:asset/055a7d9fc896864a9e66b269f2143a5502c48a0b.png";
import greenChairRoom2Image from "figma:asset/d6d22f4e82d346eed9f9a61cb6d1e08098b58e4c.png";
import colorfulChairRoomImage from "figma:asset/c54c5444404ecb7f29d943b849a99d3a27464fba.png";
import wovenChairImage from "figma:asset/cee466549046168294ed2feb1ddebfefa5185c1f.png";
import colorfulWovenChairImage from "figma:asset/aa5a37b83f3e307e646df91fbce641d574c63163.png";
import modernArmchairImage from "figma:asset/0292f76f919a547e38236f616f50c0195a48689d.png";
import greenBackdropChairImage from "figma:asset/09af90d94c52c2c9a277e4f0df64e67b02058fdb.png";
import mixNodeMainImage from "figma:asset/6fee2fcf8beabe01c836b6ce069084e4fffa23d7.png";
import mixNodeSourceImage from "figma:asset/4f074689d10ed7a04f4a69f4b019567e1bab59d2.png";
import redChairImage from "figma:asset/1f1c791abafe8f4925c8a4fd1ff4639c74983bb2.png";
import greenChairImage from "figma:asset/18e195ed2f065d4dc2ae3dc0148d93c162f07cae.png";

/**
 * 노드 타입 정의:
 * 
 * 인풋 노드 (Input Nodes) - 생성용
 * - 인풋 텍스트: type='text', isOutput=false → 텍스트 area + 파일 첨부
 * - 인풋 이미지: type='image', imageUrl 없음 → 텍스트 area + 이미지 첨부 area + 파일 첨부
 * - 인풋 비디오: type='video', videoUrl 없음 → 텍스트 area + 비디오 첨부 area + 파일 첨부
 * 
 * 아웃풋 노드 (Output Nodes) - 결과물
 * - 아웃풋 텍스트: type='text', isOutput=true → 프롬프트 내역만 (파일 첨부 숨김)
 * - 아웃풋 이미지: type='image', imageUrl 있음 → 생성된 이미지 + 메타데이터
 * - 아웃풋 비디오: type='video', videoUrl 있음 → 생성된 비디오 + 메타데이터
 * 
 * 생성중 노드 (Process Nodes)
 * - 이미지 생성중: type='process', targetType='image' → "이미지 생성중"
 * - 비디오 생성중: type='process', targetType='video' → "비디오 생성중"
 */

const textToVideoScenario: ScenarioTemplate = {
  id: 'text-to-video',
  name: '애니메이션',
  description: '텍스트 프롬프트로 비디오를 생성하는 워크플로우',
  nodes: [
    {
      id: 'node-1',
      type: 'text',
      content: '고양이가 춤을 추는 영상',
      prompt: '고양이가 춤을 추는 영상',
      x: 50,
      y: 50,
      isOutput: false,
      metadata: { model: 'veo3' }
    },
    {
      id: 'node-2',
      type: 'process',
      x: 50,
      y: 350,
      metadata: { targetType: 'video', model: 'veo3', ratio: '16:9', status: 'processing' }
    },
    {
      id: 'node-3',
      type: 'video',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      prompt: '고양이가 춤을 추는 영상',
      x: 50,
      y: 650,
      metadata: {
        model: 'veo3',
        ratio: '16:9',
        duration: '8s',
        prompt: '고양이가 춤을 추는 영상',
      }
    }
  ],
  edges: [
    { id: 'edge-1', sourceId: 'node-1', targetId: 'node-2' },
    { id: 'edge-2', sourceId: 'node-2', targetId: 'node-3' }
  ]
};

const textToImageScenario: ScenarioTemplate = {
  id: 'text-to-image',
  name: '패션디자인',
  description: '텍스트 프롬프트로 이미지를 생성하는 워크플로우',
  nodes: [
    {
      id: 'node-1',
      type: 'text',
      content: '미래 도시의 야경',
      prompt: '미래 도시의 야경, 사이버펑크 스타일',
      x: 50,
      y: 50,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    {
      id: 'node-2',
      type: 'process',
      x: 50,
      y: 350,
      metadata: { targetType: 'image', model: 'flux-pro', ratio: '16:9', status: 'processing' }
    },
    {
      id: 'node-3',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
      prompt: '미래 도시의 야경, 사이버펑크 스타일',
      x: 50,
      y: 650,
      metadata: {
        model: 'flux-pro',
        ratio: '16:9',
        prompt: '미래 도시의 야경, 사이버펑크 스타일',
      }
    }
  ],
  edges: [
    { id: 'edge-1', sourceId: 'node-1', targetId: 'node-2' },
    { id: 'edge-2', sourceId: 'node-2', targetId: 'node-3' }
  ]
};

const imageTextToImageScenario: ScenarioTemplate = {
  id: 'image-text-to-image',
  name: '광고디자인',
  description: '이미지와 텍스트로 새로운 이미지 생성',
  nodes: [
    {
      id: 'node-1',
      type: 'image',
      prompt: '산 풍경',
      x: 50,
      y: 50,
      metadata: { model: 'controlnet' }
    },
    {
      id: 'node-2',
      type: 'text',
      content: '밤하늘에 별이 가득한',
      prompt: '밤하늘에 별이 가득한',
      x: 50,
      y: 400,
      isOutput: false,
      metadata: { model: 'controlnet' }
    },
    {
      id: 'node-3',
      type: 'process',
      x: 500,
      y: 200,
      metadata: { targetType: 'image', model: 'controlnet', ratio: '16:9', status: 'processing' }
    },
    {
      id: 'node-4',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800',
      prompt: '밤하늘에 별이 가득한',
      x: 950,
      y: 200,
      metadata: {
        model: 'controlnet',
        ratio: '16:9',
        prompt: '밤하늘에 별이 가득한',
      }
    }
  ],
  edges: [
    { id: 'edge-1', sourceId: 'node-1', targetId: 'node-3' },
    { id: 'edge-2', sourceId: 'node-2', targetId: 'node-3' },
    { id: 'edge-3', sourceId: 'node-3', targetId: 'node-4' }
  ]
};

const imageTextToVideoScenario: ScenarioTemplate = {
  id: 'image-text-to-video',
  name: '무빙포스터',
  description: '이미지와 텍스트로 비디오 생성',
  nodes: [
    {
      id: 'node-1',
      type: 'image',
      prompt: '바다 풍경',
      x: 50,
      y: 50,
      metadata: { model: 'stable-video' }
    },
    {
      id: 'node-2',
      type: 'text',
      content: '파도가 부드럽게 움직이는',
      prompt: '파도가 부드럽게 움직이는',
      x: 50,
      y: 400,
      isOutput: false,
      metadata: { model: 'stable-video' }
    },
    {
      id: 'node-3',
      type: 'process',
      x: 500,
      y: 200,
      metadata: { targetType: 'video', model: 'stable-video', ratio: '16:9', status: 'processing' }
    },
    {
      id: 'node-4',
      type: 'video',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      prompt: '파도가 부드럽게 움직이는',
      x: 950,
      y: 200,
      metadata: {
        model: 'stable-video',
        ratio: '16:9',
        duration: '5s',
        prompt: '파도가 부드럽게 움직이는',
      }
    }
  ],
  edges: [
    { id: 'edge-1', sourceId: 'node-1', targetId: 'node-3' },
    { id: 'edge-2', sourceId: 'node-2', targetId: 'node-3' },
    { id: 'edge-3', sourceId: 'node-3', targetId: 'node-4' }
  ]
};

const videoAudioGenerationScenario: ScenarioTemplate = {
  id: 'video-audio-generation',
  name: '모션그래픽',
  description: '비디오에 AI 생성 사운드 추가',
  nodes: [
    {
      id: 'node-1',
      type: 'video',
      prompt: '영화 장면',
      x: 50,
      y: 50,
      metadata: { model: 'runway-gen3' }
    },
    {
      id: 'node-2',
      type: 'text',
      content: '영화 같은 오케스트라 사운드',
      prompt: '영화 같은 오케스트라 사운드',
      x: 50,
      y: 400,
      isOutput: false,
      metadata: { model: 'runway-gen3' }
    },
    {
      id: 'node-3',
      type: 'process',
      x: 500,
      y: 200,
      metadata: { targetType: 'video', model: 'runway-gen3', ratio: '16:9', status: 'processing', audio: 'ai-generated' }
    },
    {
      id: 'node-4',
      type: 'video',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      prompt: '영화 같은 오케스트라 사운드',
      x: 950,
      y: 200,
      metadata: {
        model: 'runway-gen3',
        ratio: '16:9',
        duration: '10s',
        audio: 'ai-generated',
        prompt: '영화 같은 오케스트라 사운드',
      }
    }
  ],
  edges: [
    { id: 'edge-1', sourceId: 'node-1', targetId: 'node-3' },
    { id: 'edge-2', sourceId: 'node-2', targetId: 'node-3' },
    { id: 'edge-3', sourceId: 'node-3', targetId: 'node-4' }
  ]
};

const complexWorkflowScenario: ScenarioTemplate = {
  id: 'complex-workflow',
  name: '실사 영화 장면',
  description: '복잡한 멀티 노드 워크플로우',
  nodes: [
    // 첫 번째 텍스트 프롬프트
    {
      id: 'node-1',
      type: 'text',
      content: '우주 정거장',
      prompt: '우주 정거장, 공상과학',
      x: 50,
      y: 50,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    // 이미지 생성중
    {
      id: 'node-2',
      type: 'process',
      x: 500,
      y: 50,
      metadata: { targetType: 'image', model: 'flux-pro', ratio: '16:9', status: 'processing' }
    },
    // 두 번째 텍스트 프롬프트
    {
      id: 'node-3',
      type: 'text',
      content: '외계 행성',
      prompt: '외계 행성, 미지의 세계',
      x: 500,
      y: 350,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    // 생성된 이미지
    {
      id: 'node-4',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
      prompt: '우주 정거장, 공상과학',
      x: 950,
      y: 150,
      metadata: { model: 'flux-pro', ratio: '16:9', prompt: '우주 정거장, 공상과학' }
    },
    // 비디오 생성중
    {
      id: 'node-5',
      type: 'process',
      x: 1400,
      y: 150,
      metadata: { targetType: 'video', model: 'runway-gen3', ratio: '16:9', status: 'processing' }
    },
    // 세 번째 텍스트 프롬프트
    {
      id: 'node-6',
      type: 'text',
      content: '우주선이 떠다니는',
      prompt: '우주선이 떠다니는',
      x: 1400,
      y: 450,
      isOutput: false,
      metadata: { model: 'runway-gen3' }
    },
    // 생성된 비디오
    {
      id: 'node-7',
      type: 'video',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      prompt: '우주선이 떠다니는',
      x: 1850,
      y: 250,
      metadata: {
        model: 'runway-gen3',
        ratio: '16:9',
        duration: '10s',
        prompt: '우주선이 떠다니는',
      }
    }
  ],
  edges: [
    { id: 'edge-1', sourceId: 'node-1', targetId: 'node-2' },
    { id: 'edge-2', sourceId: 'node-2', targetId: 'node-4' },
    { id: 'edge-3', sourceId: 'node-3', targetId: 'node-4' },
    { id: 'edge-4', sourceId: 'node-4', targetId: 'node-5' },
    { id: 'edge-5', sourceId: 'node-6', targetId: 'node-5' },
    { id: 'edge-6', sourceId: 'node-5', targetId: 'node-7' },
  ]
};

const workflowChainScenario: ScenarioTemplate = {
  id: 'workflow-chain',
  name: '무용 영상 시안 제작',
  description: '연속적인 워크플로우 체인',
  nodes: [
    // 첫 번째 텍스트 프롬프트
    {
      id: 'node-1',
      type: 'text',
      content: '산속의 오두막',
      prompt: '산속의 오두막, 평화로운',
      x: 50,
      y: 50,
      isOutput: false,
      metadata: { model: 'midjourney-v6' }
    },
    // 첫 번째 이미지
    {
      id: 'node-2',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      prompt: '산속의 오두막, 평화로운',
      x: 500,
      y: 50,
      metadata: { model: 'midjourney-v6', ratio: '16:9', prompt: '산속의 오두막, 평화로운' }
    },
    // 두 번째 텍스트 프롬프트
    {
      id: 'node-3',
      type: 'text',
      content: '겨울 풍경으로 변환',
      prompt: '겨울 풍경으로 변환',
      x: 500,
      y: 400,
      isOutput: false,
      metadata: { model: 'instruct-pix2pix' }
    },
    // 두 번째 이미지
    {
      id: 'node-4',
      type: 'image',
      imageUrl: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=800',
      prompt: '겨울 풍경으로 변환',
      x: 950,
      y: 200,
      metadata: { model: 'instruct-pix2pix', ratio: '16:9', prompt: '겨울 풍경으로 변환' }
    },
    // 세 번째 텍스트 프롬프트
    {
      id: 'node-5',
      type: 'text',
      content: '눈이 내리는',
      prompt: '눈이 내리는',
      x: 1400,
      y: 50,
      isOutput: false,
      metadata: { model: 'stable-video' }
    },
    // 비디오 생성중
    {
      id: 'node-6',
      type: 'process',
      x: 1400,
      y: 350,
      metadata: { targetType: 'video', model: 'stable-video', ratio: '16:9', status: 'processing' }
    },
    // 생성된 비디오
    {
      id: 'node-7',
      type: 'video',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      prompt: '눈이 내리는',
      x: 1850,
      y: 200,
      metadata: {
        model: 'stable-video',
        ratio: '16:9',
        duration: '5s',
        prompt: '눈이 내리는',
      }
    }
  ],
  edges: [
    { id: 'edge-1', sourceId: 'node-1', targetId: 'node-2' },
    { id: 'edge-2', sourceId: 'node-2', targetId: 'node-4' },
    { id: 'edge-3', sourceId: 'node-3', targetId: 'node-4' },
    { id: 'edge-4', sourceId: 'node-4', targetId: 'node-6' },
    { id: 'edge-5', sourceId: 'node-5', targetId: 'node-6' },
    { id: 'edge-6', sourceId: 'node-6', targetId: 'node-7' },
  ]
};

const segmentationWorkflowScenario: ScenarioTemplate = {
  id: 'segmentation-workflow',
  name: '패키지디자인',
  description: '이미지 세그멘테이션 워크플로우 - 세그먼트 추출 완료',
  nodes: createLayeredNodes([
    [
      {
        id: 'node-1',
        type: 'text',
        content: '엔틱한 90년대 스타일의 거실 인테리어 이미지',
        prompt: '엔틱한 90년대 스타일의 거실 인테리어 이미지',
        isOutput: true,
        metadata: { model: 'nano-banana' }
      },
      {
        id: 'node-4',
        type: 'text',
        content: '현대적인 모던한 화이트톤의 침실 인테리어 이미지',
        prompt: '현대적인 모던한 화이트톤의 침실 인테리어 이미지',
        isOutput: true,
        metadata: { model: 'nano-banana' }
      }
    ],
    [
      {
        id: 'node-2',
        type: 'image',
        imageUrl: greenChairRoomImage,
        prompt: '엔틱한 90년대 스타일의 거실 인테리�� 이미지',
        segments: [
          {
            id: 'segment-1',
            name: '샹들리에',
            color: 'red',
            bounds: { x: 35, y: 12, width: 30, height: 25 }
          },
          {
            id: 'segment-2',
            name: '의자',
            color: 'orange',
            bounds: { x: 5, y: 55, width: 20, height: 30 }
          },
          {
            id: 'segment-3',
            name: '소파',
            color: 'blue',
            bounds: { x: 32, y: 52, width: 40, height: 28 }
          }
        ],
        metadata: { 
          model: 'nano-banana',
          ratio: '1:1',
          prompt: '엔틱한 90년대 스타일의 거실 인테리어 이미지',
          isSegmented: true
        }
      },
      {
        id: 'node-3',
        type: 'image',
        imageUrl: greenChairRoom2Image,
        prompt: '엔틱 인테리어 원본 이미지',
        segments: [
          {
            id: 'segment-7',
            name: '샹들리에',
            color: 'red',
            bounds: { x: 36, y: 8, width: 30, height: 28 }
          },
          {
            id: 'segment-8',
            name: '의자',
            color: 'orange',
            bounds: { x: 2, y: 58, width: 23, height: 36 }
          },
          {
            id: 'segment-9',
            name: '소파',
            color: 'blue',
            bounds: { x: 35, y: 53, width: 45, height: 26 }
          }
        ],
        metadata: { 
          model: 'nano-banana',
          ratio: '1:1',
          prompt: '엔틱 인테리어 원본 이미지',
          isSegmented: true
        }
      },
      {
        id: 'node-5',
        type: 'image',
        imageUrl: colorfulChairRoomImage,
        prompt: '현대적인 모던한 화이트톤의 침실 인테리어 이미지',
        segments: [
          {
            id: 'segment-4',
            name: '침대',
            color: 'red',
            bounds: { x: 30, y: 45, width: 40, height: 35 }
          },
          {
            id: 'segment-5',
            name: '옷장',
            color: 'orange',
            bounds: { x: 5, y: 25, width: 20, height: 50 }
          },
          {
            id: 'segment-6',
            name: '서랍장',
            color: 'blue',
            bounds: { x: 70, y: 50, width: 20, height: 30 }
          }
        ],
        metadata: { 
          model: 'nano-banana',
          ratio: '1:1',
          prompt: '현대적인 모던한 화이트톤의 침실 인테리어 이미지',
          isSegmented: true
        }
      }
    ],
    [
      {
        id: 'node-6',
        type: 'image',
        imageUrl: greenChairImage,
        prompt: '의자 세그먼트 추출됨',
        isOutput: true,
        metadata: { 
          model: 'nano-banana',
          ratio: '1:1',
          prompt: '의자 세그먼트 추출됨',
          extractedFrom: 'node-2',
          segmentId: 'segment-2',
          segmentName: '의자'
        }
      },
      {
        id: 'node-7',
        type: 'image',
        imageUrl: wovenChairImage,
        prompt: '침대 세그먼트 추출됨',
        isOutput: true,
        metadata: { 
          model: 'nano-banana',
          ratio: '1:1',
          prompt: '침대 세그먼트 추출됨',
          extractedFrom: 'node-5',
          segmentId: 'segment-4',
          segmentName: '침대'
        }
      }
    ],
    [
      {
        id: 'node-8',
        type: 'image',
        imageUrl: greenBackdropChairImage,
        prompt: '배경 변환됨',
        isOutput: true,
        metadata: { 
          model: 'nano-banana',
          ratio: '1:1',
          prompt: '배경 변환됨',
          extractedFrom: 'node-6',
          segmentId: 'segment-background',
          segmentName: '배경'
        }
      },
      {
        id: 'node-9',
        type: 'image',
        imageUrl: modernArmchairImage,
        prompt: '소파로 스타일 변환됨',
        isOutput: true,
        metadata: { 
          model: 'nano-banana',
          ratio: '1:1',
          prompt: '소파로 스타일 변환됨',
          extractedFrom: 'node-6',
          segmentId: 'segment-sofa',
          segmentName: '소파'
        }
      },
      {
        id: 'node-10',
        type: 'image',
        imageUrl: colorfulWovenChairImage,
        prompt: '의자 재질 변환됨',
        isOutput: true,
        metadata: { 
          model: 'nano-banana',
          ratio: '1:1',
          prompt: '의자 재질 변환됨',
          extractedFrom: 'node-7',
          segmentId: 'segment-chair',
          segmentName: '의자'
        }
      }
    ],
    [
      {
        id: 'node-11',
        type: 'mix',
        prompt: '소파 스타일 + 의자 재질 믹스',
        isOutput: true,
        metadata: {
          model: 'nano-banana',
          ratio: '1:1',
          prompt: '소파 스타일 + 의자 재질 믹스',
          mainStrength: 60,
          sourceStrength: 40,
          mainSourceId: 'node-9',
          sourceSourceId: 'node-10',
          segments: [
            {
              id: "main",
              name: "메인 이미지",
              type: "main",
              nodeName: "node-9",
              description: "mask 영역을 지움",
              thumbnailUrl: mixNodeMainImage,
              visible: true,
              weight: 1,
              order: 1,
              position: { x: 20, y: 20 },
              size: { width: 50, height: 50 },
              imageOffset: { x: 0, y: 0 },
              imageScale: 1.5,
            },
            {
              id: "source",
              name: "소스 이미지",
              type: "source",
              nodeName: "node-10",
              description: "mask 영역만 남김",
              thumbnailUrl: mixNodeSourceImage,
              visible: true,
              weight: 1,
              order: 2,
              position: { x: 80, y: 50 },
              size: { width: 40, height: 40 },
              imageOffset: { x: 0, y: 0 },
              imageScale: 1.2,
            },
          ]
        }
      }
    ]
  ]),
  edges: [
    { id: 'edge-1', sourceId: 'node-1', targetId: 'node-2' },
    { id: 'edge-2', sourceId: 'node-1', targetId: 'node-3' },
    { id: 'edge-3', sourceId: 'node-4', targetId: 'node-5' },
    { id: 'edge-4', sourceId: 'node-2', targetId: 'node-6' },
    { id: 'edge-5', sourceId: 'node-5', targetId: 'node-7' },
    { id: 'edge-6', sourceId: 'node-6', targetId: 'node-8' },
    { id: 'edge-7', sourceId: 'node-6', targetId: 'node-9' },
    { id: 'edge-8', sourceId: 'node-7', targetId: 'node-10' },
    { id: 'edge-9', sourceId: 'node-9', targetId: 'node-11' },
    { id: 'edge-10', sourceId: 'node-10', targetId: 'node-11' }
  ]
};

const segmentationTestScenario: ScenarioTemplate = {
  id: 'segmentation-test',
  name: '사진 편집',
  description: '세그먼트 추출 및 믹스 노드 테스트',
  nodes: [
    // === 상단 플로우 ===
    // 왼쪽 - 첫 번째 텍스트 프롬프트
    {
      id: 'node-1',
      type: 'text',
      content: '엔틱한 90년대 스타일의 거실 인테리어 이미지',
      prompt: '엔틱한 90년대 스타일의 거실 인테리어 이미지',
      x: 50,
      y: 100,
      isOutput: true,
      metadata: { model: 'nano-banana' }
    },
    // 중간 - 거실 이미지 (세그먼트 있음)
    {
      id: 'node-2',
      type: 'image',
      imageUrl: livingRoomImage,
      prompt: '엔틱한 90년대 스타일의 거실 인테리어 이미지',
      x: 500,
      y: 100,
      segments: [
        {
          id: 'segment-1',
          name: '샹들리에',
          color: 'red',
          bounds: { x: 35, y: 12, width: 30, height: 25 }
        },
        {
          id: 'segment-2',
          name: '의자',
          color: 'orange',
          bounds: { x: 5, y: 55, width: 20, height: 30 }
        },
        {
          id: 'segment-3',
          name: '소파',
          color: 'blue',
          bounds: { x: 32, y: 52, width: 40, height: 28 }
        }
      ],
      metadata: { 
        model: 'nano-banana',
        ratio: '1:1',
        prompt: '엔틱한 90년대 스타일의 거실 인테리어 이미지',
        isSegmented: true
      }
    },
    // 중간 하단 - 샹들리에 원본 이미지
    {
      id: 'node-3',
      type: 'image',
      imageUrl: chandelierRoomImage,
      prompt: '엔틱 인테리어 원본 이미지',
      x: 500,
      y: 600,
      metadata: { 
        model: 'nano-banana',
        ratio: '1:1',
        prompt: '엔틱 인테리어 원본 이미지'
      }
    },
    // 오른쪽 상단 - 샹들리에 세그먼트
    {
      id: 'node-6',
      type: 'image',
      imageUrl: chandelierImage,
      prompt: '샹들리에 세그먼트',
      x: 1000,
      y: 50,
      metadata: { 
        model: 'nano-banana',
        ratio: '1:1',
        prompt: '샹들리에 세그먼트',
        isSegmentExtracted: true,
        sourceSegmentId: 'segment-1'
      }
    },
    // 오른쪽 중간 - 의자 세그먼트
    {
      id: 'node-7',
      type: 'image',
      imageUrl: greenChairImage,
      prompt: '의자 세그먼트',
      x: 1000,
      y: 500,
      metadata: { 
        model: 'nano-banana',
        ratio: '1:1',
        prompt: '의자 세그먼트',
        isSegmentExtracted: true,
        sourceSegmentId: 'segment-2'
      }
    },
    // 오른쪽 하단 - 소파 세그먼트
    {
      id: 'node-8',
      type: 'image',
      imageUrl: sofaImage,
      prompt: '소파 세그먼트',
      x: 1000,
      y: 950,
      metadata: { 
        model: 'nano-banana',
        ratio: '1:1',
        prompt: '소파 세그먼트',
        isSegmentExtracted: true,
        sourceSegmentId: 'segment-3'
      }
    },
    // 믹스 노드 (의자 + 소파)
    {
      id: 'node-10',
      type: 'mix',
      prompt: '의자와 소파를 결합한 가구',
      x: 1450,
      y: 725,
      metadata: { 
        model: 'nano-banana',
        ratio: '1:1',
        prompt: '의자와 소파를 결합한 가구',
        sourceNodeIds: ['node-7', 'node-8'],
        segments: [
          {
            id: 'mix-main',
            name: '메인 이미지',
            type: 'main',
            nodeName: '메인 이미지',
            description: 'mask 영역을 지움',
            thumbnailUrl: chairImage,
            visible: true,
            weight: 1.0,
            order: 1,
            position: { x: 20, y: 20 },
            size: { width: 50, height: 50 },
            imageOffset: { x: 0, y: 0 },
            imageScale: 1.5,
          },
          {
            id: 'mix-source',
            name: '소스 이미지',
            type: 'source',
            nodeName: '소스 이미지',
            description: 'mask 영역만 남김',
            thumbnailUrl: sofaImage,
            visible: true,
            weight: 1.0,
            order: 2,
            position: { x: 80, y: 50 },
            size: { width: 40, height: 40 },
            imageOffset: { x: 0, y: 0 },
            imageScale: 1.2,
          },
        ]
      }
    },
    
    // === 하단 플로우 ===
    // 왼쪽 - 두 번째 텍스트 프롬프트
    {
      id: 'node-4',
      type: 'text',
      content: '현대적인 모던한 화이트톤의 침실 인테리어 이미지',
      prompt: '현대적인 모던한 화이트톤의 침실 인테리어 이미지',
      x: 50,
      y: 1200,
      isOutput: true,
      metadata: { model: 'nano-banana' }
    },
    // 중간 - 침실 이미지
    {
      id: 'node-5',
      type: 'image',
      imageUrl: bedroomImage,
      prompt: '현대적인 모던한 화이트톤의 침실 인테리어 이미지',
      x: 500,
      y: 1200,
      metadata: { 
        model: 'nano-banana',
        ratio: '1:1',
        prompt: '현대적인 모던한 화이트톤의 침실 인테리어 이미지'
      }
    },
    // 오른쪽 - 컴포지션 노드 (침실 + 샹들리에)
    {
      id: 'node-9',
      type: 'composition',
      prompt: '침실과 샹들리에를 결합한 새로운 인테리어',
      x: 1000,
      y: 1500,
      metadata: { 
        model: 'nano-banana',
        ratio: '1:1',
        prompt: '침실과 샹들리에를 결합한 새로운 인테리어',
        sourceNodeIds: ['node-5', 'node-3'],
        segments: [
          {
            id: 'mix-segment-1',
            name: '침실',
            nodeName: 'node-5',
            thumbnailUrl: bedroomImage,
            visible: true,
            opacity: 1,
            order: 1,
            position: { x: 80, y: 100 },
            size: { width: 160, height: 140 }
          },
          {
            id: 'mix-segment-2',
            name: '샹들리에',
            nodeName: 'node-3',
            thumbnailUrl: chandelierRoomImage,
            visible: true,
            opacity: 1,
            order: 2,
            position: { x: 140, y: 40 },
            size: { width: 100, height: 90 }
          }
        ]
      }
    }
  ],
  edges: [
    { id: 'edge-1', sourceId: 'node-1', targetId: 'node-2' },
    { id: 'edge-2', sourceId: 'node-1', targetId: 'node-3' },
    { id: 'edge-3', sourceId: 'node-2', targetId: 'node-6' },
    { id: 'edge-4', sourceId: 'node-2', targetId: 'node-7' },
    { id: 'edge-5', sourceId: 'node-2', targetId: 'node-8' },
    { id: 'edge-6', sourceId: 'node-4', targetId: 'node-5' },
    { id: 'edge-7', sourceId: 'node-5', targetId: 'node-9' },
    { id: 'edge-8', sourceId: 'node-3', targetId: 'node-9' },
    { id: 'edge-9', sourceId: 'node-7', targetId: 'node-10' },
    { id: 'edge-10', sourceId: 'node-8', targetId: 'node-10' }
  ]
};

const groupingTestScenario: ScenarioTemplate = {
  id: 'grouping-test',
  name: '건축디자인',
  description: 'Organic workflow layout with branched groups and clear visual hierarchy',
  nodes: [
    // ========================================================================
    // ROW 1: Nature Scenes (Pink Group) - Top Section
    // ========================================================================
    { id: 'node-11', type: 'text', content: '자연 풍경 시리즈', prompt: 'Nature landscape series', x: 50, y: 50, isOutput: false, metadata: { model: 'dall-e-3' } },
    { id: 'node-12', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', prompt: 'Mountain landscape', x: 400, y: -150, metadata: { model: 'dall-e-3', ratio: '16:9' } },
    { id: 'node-13', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800', prompt: 'Ocean waves', x: 400, y: 250, metadata: { model: 'dall-e-3', ratio: '16:9' } },
    { id: 'node-14', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800', prompt: 'Forest pathway', x: 750, y: 50, metadata: { model: 'dall-e-3', ratio: '16:9' } },

    // ========================================================================
    // ROW 2: Interior Design (Yellow Group) - Main Central Workflow
    // ========================================================================
    // Start Node
    { id: 'node-1', type: 'text', content: '현대적인 거실 디자인을 생성해주세요\n\n미니멀리즘 스타일\n따뜻한 조명\n자연 소재', prompt: 'Modern minimalist living room with warm lighting and natural materials', x: 50, y: 900, isOutput: false, metadata: { model: 'flux-pro' } },
    
    // Main Generated Image
    { id: 'node-2', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', prompt: 'Modern minimalist living room', x: 450, y: 900, metadata: { model: 'flux-pro', ratio: '16:9' } },
    
    // Branch 1: Lighting & Details (Top Branch)
    { id: 'node-3', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', prompt: 'Chandelier detail', x: 850, y: 500, metadata: { model: 'flux-pro', ratio: '1:1' } },
    { id: 'node-3a', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800', prompt: 'Pendant light variation', x: 1150, y: 500, metadata: { model: 'flux-pro', ratio: '1:1' } },
    
    // Branch 2: Furniture Focus (Middle Branch)
    { id: 'node-4', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800', prompt: 'Modern chair', x: 850, y: 900, metadata: { model: 'flux-pro', ratio: '1:1' } },
    { id: 'node-4a', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800', prompt: 'Armchair variation', x: 1150, y: 900, metadata: { model: 'flux-pro', ratio: '1:1' } },
    
    // Branch 3: Textures & Materials (Bottom Branch)
    { id: 'node-5', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', prompt: 'Sofa detail', x: 850, y: 1300, metadata: { model: 'flux-pro', ratio: '1:1' } },
    { id: 'node-5a', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800', prompt: 'Couch detail', x: 1150, y: 1300, metadata: { model: 'flux-pro', ratio: '1:1' } },
    
    // Composition & Final Results (Merging)
    { id: 'node-6', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800', prompt: 'Final composition', x: 1550, y: 700, metadata: { model: 'flux-pro', ratio: '16:9' } },
    { id: 'node-6a', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800', prompt: 'Mid composition', x: 1550, y: 1100, metadata: { model: 'flux-pro', ratio: '16:9' } },
    { id: 'node-6b', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=800', prompt: 'Alternative composition', x: 1900, y: 900, metadata: { model: 'flux-pro', ratio: '16:9' } },

    // ========================================================================
    // ROW 3: Product Design (Blue Group) - Bottom Left
    // ========================================================================
    { id: 'node-7', type: 'text', content: '제품 디자인\n\n현대적인 스마트폰', prompt: 'Modern smartphone product design', x: 50, y: 1800, isOutput: false, metadata: { model: 'midjourney-v6' } },
    { id: 'node-8', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800', prompt: 'Initial phone concept', x: 400, y: 1800, metadata: { model: 'midjourney-v6', ratio: '1:1' } },
    { id: 'node-9', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1592286927505-e7d50b3dc4f4?w=800', prompt: 'Refined design', x: 700, y: 1800, metadata: { model: 'midjourney-v6', ratio: '1:1' } },
    { id: 'node-10', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800', prompt: 'Final product shot', x: 1000, y: 1800, metadata: { model: 'midjourney-v6', ratio: '16:9' } },

    // ========================================================================
    // ADDITIONAL GROUPS (Right Side / Periphery)
    // ========================================================================
    
    // Architecture (Green) - Top Right
    { id: 'node-15', type: 'text', content: '건축 디자인', prompt: 'Modern architecture design', x: 1300, y: 50, isOutput: false, metadata: { model: 'stable-diffusion-xl' } },
    { id: 'node-16', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800', prompt: 'Base building', x: 1600, y: 50, metadata: { model: 'stable-diffusion-xl', ratio: '9:16' } },
    { id: 'node-17', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800', prompt: 'Night variation', x: 1900, y: -150, metadata: { model: 'stable-diffusion-xl', ratio: '16:9' } },
    { id: 'node-18', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1554793000-245d3a3c2a51?w=800', prompt: 'Bridge perspective', x: 1900, y: 250, metadata: { model: 'stable-diffusion-xl', ratio: '16:9' } },

    // Tech Workflow (Orange) - Bottom Right
    { id: 'node-24', type: 'text', content: 'AI 로봇', prompt: 'Futuristic AI robot', x: 1400, y: 1800, isOutput: false, metadata: { model: 'midjourney-v6' } },
    { id: 'node-25', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', prompt: 'Robot concept', x: 1700, y: 1800, metadata: { model: 'midjourney-v6', ratio: '1:1' } },
    { id: 'node-26', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', prompt: 'Hologram UI', x: 2000, y: 1600, metadata: { model: 'midjourney-v6', ratio: '16:9' } },
    { id: 'node-27', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800', prompt: 'Cyber environment', x: 2000, y: 2000, metadata: { model: 'midjourney-v6', ratio: '16:9' } },
    { id: 'node-28', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800', prompt: 'Final scene', x: 2300, y: 1800, metadata: { model: 'midjourney-v6', ratio: '16:9' } },

    // ========================================================================
    // UNGROUPED NODES (Scattered)
    // ========================================================================
    { id: 'node-ungrouped-1', type: 'text', content: '실험적인 아이디어\n(그룹 없음)', prompt: 'Experimental creative concept', x: 1350, y: 1200, isOutput: false, metadata: { model: 'claude-3-opus' } },
    { id: 'node-ungrouped-2', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1531297461136-82ce8ccb084b?w=800', prompt: 'Abstract inspiration', x: 1700, y: 1200, metadata: { model: 'midjourney-v6', ratio: '1:1' } },
    
    { id: 'node-ungrouped-3', type: 'text', content: '낙서장', prompt: 'Sketch notes', x: 2300, y: 900, isOutput: false, metadata: { model: 'gpt-4' } },
    { id: 'node-ungrouped-4', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800', prompt: 'Rough sketch', x: 2600, y: 900, metadata: { model: 'stable-diffusion-xl', ratio: '1:1' } },
  ],
  edges: [
    // Ungrouped Chain 1
    { id: 'edge-ungrouped-1', sourceId: 'node-ungrouped-1', targetId: 'node-ungrouped-2' },
    // Ungrouped Chain 2
    { id: 'edge-ungrouped-2', sourceId: 'node-ungrouped-3', targetId: 'node-ungrouped-4' },

    // GROUP 1 - Interior Design Branches
    { id: 'edge-1', sourceId: 'node-1', targetId: 'node-2' },
    // Branch 1 (Top)
    { id: 'edge-2', sourceId: 'node-2', targetId: 'node-3' },
    { id: 'edge-3', sourceId: 'node-3', targetId: 'node-3a' },
    { id: 'edge-4', sourceId: 'node-3a', targetId: 'node-6' },
    // Branch 2 (Mid)
    { id: 'edge-5', sourceId: 'node-2', targetId: 'node-4' },
    { id: 'edge-6', sourceId: 'node-4', targetId: 'node-4a' },
    { id: 'edge-7', sourceId: 'node-4a', targetId: 'node-6' },
    { id: 'edge-8', sourceId: 'node-4a', targetId: 'node-6a' },
    // Branch 3 (Bottom)
    { id: 'edge-9', sourceId: 'node-2', targetId: 'node-5' },
    { id: 'edge-10', sourceId: 'node-5', targetId: 'node-5a' },
    { id: 'edge-11', sourceId: 'node-5a', targetId: 'node-6a' },
    // Converge
    { id: 'edge-12', sourceId: 'node-6', targetId: 'node-6b' },
    { id: 'edge-13', sourceId: 'node-6a', targetId: 'node-6b' },

    // GROUP 2 - Product
    { id: 'edge-21', sourceId: 'node-7', targetId: 'node-8' },
    { id: 'edge-22', sourceId: 'node-8', targetId: 'node-9' },
    { id: 'edge-23', sourceId: 'node-9', targetId: 'node-10' },

    // GROUP 3 - Nature (Fan out)
    { id: 'edge-31', sourceId: 'node-11', targetId: 'node-12' },
    { id: 'edge-32', sourceId: 'node-11', targetId: 'node-13' },
    { id: 'edge-33', sourceId: 'node-11', targetId: 'node-14' },

    // GROUP 4 - Architecture
    { id: 'edge-41', sourceId: 'node-15', targetId: 'node-16' },
    { id: 'edge-42', sourceId: 'node-16', targetId: 'node-17' },
    { id: 'edge-43', sourceId: 'node-16', targetId: 'node-18' },

    // GROUP 6 - Tech
    { id: 'edge-61', sourceId: 'node-24', targetId: 'node-25' },
    { id: 'edge-62', sourceId: 'node-25', targetId: 'node-26' },
    { id: 'edge-63', sourceId: 'node-25', targetId: 'node-27' },
    { id: 'edge-64', sourceId: 'node-26', targetId: 'node-28' },
    { id: 'edge-65', sourceId: 'node-27', targetId: 'node-28' },
  ],
  groups: [
    { 
      id: 'group-1', 
      name: 'Interior Design', 
      nodeIds: ['node-1', 'node-2', 'node-3', 'node-3a', 'node-4', 'node-4a', 'node-5', 'node-5a', 'node-6', 'node-6a', 'node-6b'], 
      color: 'yellow',
      echo: 75,
      insight: 60,
      spark: 40,
      description: '모던하고 따뜻한 분위기의 거실 및 침실 인테리어 디자인 그룹',
      selectedImageNodeIds: ['node-2', 'node-3', 'node-6'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-2', 
      name: 'Product Photography', 
      nodeIds: ['node-7', 'node-8', 'node-9', 'node-10'], 
      color: 'blue',
      echo: 85,
      insight: 70,
      spark: 30,
      description: '제품의 디테일과 질감을 강조하는 제품 사진 그룹',
      selectedImageNodeIds: ['node-8', 'node-9', 'node-10'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-3', 
      name: 'Nature Scenes', 
      nodeIds: ['node-11', 'node-12', 'node-13', 'node-14'], 
      color: 'pink',
      echo: 50,
      insight: 55,
      spark: 90,
      description: '자연 풍경 시리즈',
      selectedImageNodeIds: ['node-12', 'node-13', 'node-14'],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-4', 
      name: 'Architecture', 
      nodeIds: ['node-15', 'node-16', 'node-17', 'node-18'], 
      color: 'green',
      echo: 70,
      insight: 80,
      spark: 45,
      description: '건축 디자인 바리에이션',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { 
      id: 'group-6', 
      name: 'Tech Concept', 
      nodeIds: ['node-24', 'node-25', 'node-26', 'node-27', 'node-28'], 
      color: 'orange',
      echo: 80,
      insight: 65,
      spark: 50,
      description: '미래 기술 컨셉 아트',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ]
};

const agentConversationScenario: ScenarioTemplate = {
  id: 'agent-conversation',
  name: '시나리오 제작',
  description: '에이전트와의 대화를 통한 의자 디자인 변경',
  nodes: [
    {
      id: 'node-1',
      type: 'text',
      content: '엔틱한 의자 디자인 이미지 생성해줘',
      prompt: '엔틱한 의자 디자인 이미지 생성해줘',
      x: 50,
      y: 50,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    {
      id: 'node-2',
      type: 'image',
      imageUrl: redChairImage,
      prompt: '엔틱한 의자 디자인 이미지 생성',
      x: 500,
      y: 50,
      metadata: { model: 'flux-pro', ratio: '1:1', prompt: '엔틱한 의자 디자인 이미지 생성' }
    },
    {
      id: 'node-3',
      type: 'text',
      content: '초록의자로 변경해줘. 좀 더 차분한 느낌으로.',
      prompt: '초록의자로 변경해줘. 좀 더 차분한 느낌으로.',
      x: 500,
      y: 350,
      isOutput: false,
      metadata: { model: 'flux-pro' }
    },
    {
      id: 'node-4',
      type: 'image',
      imageUrl: greenChairImage,
      prompt: '초록의자로 변경',
      x: 950,
      y: 200,
      metadata: { model: 'flux-pro', ratio: '1:1', prompt: '초록의자로 변경' }
    }
  ],
  edges: [
    { id: 'edge-1', sourceId: 'node-1', targetId: 'node-2' },
    { id: 'edge-2', sourceId: 'node-2', targetId: 'node-4' },
    { id: 'edge-3', sourceId: 'node-3', targetId: 'node-4' }
  ]
};

export const SCENARIO_TEMPLATES: Record<ScenarioId, ScenarioTemplate> = {
  'text-to-video': textToVideoScenario,
  'text-to-image': textToImageScenario,
  'image-text-to-image': imageTextToImageScenario,
  'image-text-to-video': imageTextToVideoScenario,
  'video-audio-generation': videoAudioGenerationScenario,
  'complex-workflow': complexWorkflowScenario,
  'workflow-chain': workflowChainScenario,
  'segmentation-workflow': segmentationWorkflowScenario,
  'segmentation-test': segmentationTestScenario,
  'grouping-test': groupingTestScenario,
  'agent-conversation': agentConversationScenario,
  'simple-group': {
    id: 'simple-group',
    name: '12. Simple Group Scenario',
    description: '단일 그룹에 텍스트 1개와 이미지 3개가 포함된 시나리오',
    nodes: [
      {
        id: 'node-1',
        type: 'text',
        content: '핑크빛 몽환적인 숲 속 풍경',
        prompt: 'Dreamy pink forest landscape with glowing mushrooms',
        x: 50,
        y: 50,
        isOutput: false,
        metadata: { model: 'midjourney-v6' }
      },
      {
        id: 'node-2',
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        prompt: 'Pink forest landscape',
        x: 50,
        y: 350,
        metadata: { model: 'midjourney-v6', ratio: '1:1' }
      },
      {
        id: 'node-3',
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800',
        prompt: 'Mystical forest path',
        x: 400,
        y: 350,
        metadata: { model: 'midjourney-v6', ratio: '1:1' }
      },
      {
        id: 'node-4',
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800',
        prompt: 'Magical trees',
        x: 750,
        y: 350,
        metadata: { model: 'midjourney-v6', ratio: '1:1' }
      }
    ],
    edges: [
      { id: 'edge-1', sourceId: 'node-1', targetId: 'node-2' },
      { id: 'edge-2', sourceId: 'node-1', targetId: 'node-3' },
      { id: 'edge-3', sourceId: 'node-1', targetId: 'node-4' }
    ],
    groups: [
      {
        id: 'group-1',
        name: 'Pink Forest Theme',
        nodeIds: ['node-1', 'node-2', 'node-3', 'node-4'],
        color: 'pink',
        echo: 80,
        insight: 60,
        spark: 70,
        description: '몽환적인 핑크빛 숲 테마 그룹',
        selectedImageNodeIds: ['node-2', 'node-3', 'node-4'],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
    ]
  },
  
  // 프로젝트 메뉴 ID 매핑
  '1': { ...groupingTestScenario, name: '건축디자인', description: '건축 및 인테리어 디자인 워크플로우' },
  '2': { ...textToImageScenario, name: '패션디자인', description: '패션 디자인 아이디어 생성' },
  '3': { ...segmentationWorkflowScenario, name: '패키지디자인', description: '패키지 디자인 및 시안 제작' },
  '4': { 
    ...groupingTestScenario, 
    id: 'product-design',
    name: '제품디자인', 
    description: '제품 디자인 및 컨셉 아트',
    nodes: groupingTestScenario.nodes.filter(n => ['node-7', 'node-8', 'node-9', 'node-10'].includes(n.id) || n.id.startsWith('node-2')),
    edges: groupingTestScenario.edges.filter(e => ['edge-21', 'edge-22', 'edge-23'].includes(e.id)),
    groups: groupingTestScenario.groups?.filter(g => g.id === 'group-2')
  },
  '5': { ...imageTextToImageScenario, name: '광고디자인', description: '광고 비주얼 및 카피 제작' },
  '6': { 
    id: 'typography-design',
    name: '타이포그래피 디자인', 
    description: '타이포그래피 및 레이아웃 디자인',
    nodes: [
      { id: 't-1', type: 'text', content: '모던한 타이포그래피', prompt: 'Modern typography design', x: 50, y: 50, isOutput: false, metadata: { model: 'dall-e-3' } },
      { id: 't-2', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800', prompt: 'Minimalist font layout', x: 450, y: 50, metadata: { model: 'dall-e-3', ratio: '1:1' } },
      { id: 't-3', type: 'image', imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800', prompt: 'Bold typography poster', x: 450, y: 400, metadata: { model: 'dall-e-3', ratio: '9:16' } }
    ],
    edges: [
      { id: 'te-1', sourceId: 't-1', targetId: 't-2' },
      { id: 'te-2', sourceId: 't-1', targetId: 't-3' }
    ]
  },
  '7': { ...complexWorkflowScenario, name: '실사 영화 장면', description: '영화 장면 컨셉 아트 및 스토리보드' },
  '8': { ...imageTextToVideoScenario, name: '무빙포스터', description: '움직이는 포스터 디자인' },
  '9': { ...videoAudioGenerationScenario, name: '모션그래픽', description: '모션그래픽 및 사운드 디자인' },
  '10': { ...textToVideoScenario, name: '애니메이션', description: '애니메이션 캐릭터 및 장면 생성' },
  '11': { ...segmentationTestScenario, name: '사진 편집', description: '사진 편집 및 합성 워크플로우' },
  '12': { ...agentConversationScenario, name: '시나리오 제작', description: 'AI 에이전트와 함께하는 시나리오 작성' },
  '13': { ...workflowChainScenario, name: '무용 영상 시안 제작', description: '무용 영상 컨셉 및 시안 제작' },
};

export function getScenarioTemplate(id: ScenarioId): ScenarioTemplate | null {
  return SCENARIO_TEMPLATES[id] || null;
}

export function getScenarioByCategory(category: string): ScenarioTemplate | null {
  const categoryMap: Record<string, ScenarioId> = {
    'text-to-video': 'text-to-video',
    'text-to-image': 'text-to-image',
    'image-to-image': 'image-text-to-image',
    'image-to-video': 'image-text-to-video',
    'video-editing': 'video-audio-generation',
  };
  
  const scenarioId = categoryMap[category];
  return scenarioId ? SCENARIO_TEMPLATES[scenarioId] : null;
}
