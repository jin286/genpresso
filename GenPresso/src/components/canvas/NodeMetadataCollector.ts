import type { NodeType } from "./NodeCard";

interface Node {
  id: string;
  type: NodeType;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  prompt?: string;
  metadata?: Record<string, any>;
}

interface Edge {
  id: string;
  sourceId: string;
  targetId: string;
  sourceSlot: number;
  targetSlot: number;
}

/**
 * 노드 메타데이터 수집 유틸리티
 * 
 * 생성 규칙:
 * 1. 텍스트 노드 → 이미지/비디오 생성
 *    - 텍스트 노드의 프롬프트를 수집
 * 
 * 2. 이미지 노드 + 텍스트 노드 → 이미지 생성
 *    - 이미지 URL + 텍스트 프롬프트 수집
 * 
 * 3. 비디오 노드 + 텍스트 노드 → 비디오 생성
 *    - StartFrame/EndFrame + 텍스트 프롬프트 수집
 * 
 * 메타데이터 수집 범위:
 * - 최근 왼쪽에 연결된 데이터만 수집 (직접 연결된 노드)
 */

/**
 * 특정 노드에 연결된 입력 노드들을 가져옴
 */
export function getConnectedInputNodes(
  targetNodeId: string,
  nodes: Node[],
  edges: Edge[]
): Node[] {
  const inputEdges = edges.filter(edge => edge.targetId === targetNodeId);
  const inputNodeIds = inputEdges.map(edge => edge.sourceId);
  return nodes.filter(node => inputNodeIds.includes(node.id));
}

/**
 * 노드 타입별 메타데이터 수집
 */
export function collectNodeMetadata(
  targetNode: Node,
  inputNodes: Node[]
): {
  prompts: string[];
  images: string[];
  videos: string[];
  context: Record<string, any>;
} {
  const result = {
    prompts: [] as string[],
    images: [] as string[],
    videos: [] as string[],
    context: {} as Record<string, any>,
  };

  // 입력 노드들에서 데이터 수집
  inputNodes.forEach(node => {
    // 텍스트 프롬프트 수집
    if (node.type === 'text' && node.prompt) {
      result.prompts.push(node.prompt);
    }

    // 이미지 URL 수집
    if (node.type === 'image' && node.imageUrl) {
      result.images.push(node.imageUrl);
    }

    // 비디오 URL 수집
    if (node.type === 'video' && node.videoUrl) {
      result.videos.push(node.videoUrl);
    }

    // 업로드 노드의 경우
    if (node.type === 'upload') {
      if (node.imageUrl) result.images.push(node.imageUrl);
      if (node.videoUrl) result.videos.push(node.videoUrl);
    }

    // 메타데이터 병합
    if (node.metadata) {
      result.context = {
        ...result.context,
        ...node.metadata,
      };
    }
  });

  return result;
}

/**
 * 생성 요청 데이터 구성
 */
export function buildGenerationRequest(
  targetNode: Node,
  inputNodes: Node[],
  model: string,
  ratio: string
): {
  model: string;
  ratio: string;
  prompt: string;
  referenceImages?: string[];
  referenceVideos?: string[];
  metadata: Record<string, any>;
} {
  const collected = collectNodeMetadata(targetNode, inputNodes);

  // 프롬프트 병합
  const combinedPrompt = [
    targetNode.prompt || '',
    ...collected.prompts,
  ]
    .filter(Boolean)
    .join(' / ');

  return {
    model,
    ratio,
    prompt: combinedPrompt,
    referenceImages: collected.images.length > 0 ? collected.images : undefined,
    referenceVideos: collected.videos.length > 0 ? collected.videos : undefined,
    metadata: {
      ...collected.context,
      inputNodeCount: inputNodes.length,
      generatedAt: new Date().toISOString(),
    },
  };
}

/**
 * 비디오 생성 특화 - StartFrame/EndFrame 지원
 */
export function buildVideoGenerationRequest(
  targetNode: Node,
  inputNodes: Node[],
  model: string,
  ratio: string
): {
  model: string;
  ratio: string;
  prompt: string;
  startFrame?: string;
  endFrame?: string;
  referenceImages?: string[];
  metadata: Record<string, any>;
} {
  const collected = collectNodeMetadata(targetNode, inputNodes);

  // 프롬프트 병합
  const combinedPrompt = [
    targetNode.prompt || '',
    ...collected.prompts,
  ]
    .filter(Boolean)
    .join(' / ');

  // 이미지를 StartFrame/EndFrame으로 할당
  const startFrame = collected.images[0];
  const endFrame = collected.images[1];

  return {
    model,
    ratio,
    prompt: combinedPrompt,
    startFrame,
    endFrame,
    referenceImages: collected.images.slice(2), // 나머지 이미지들
    metadata: {
      ...collected.context,
      inputNodeCount: inputNodes.length,
      generatedAt: new Date().toISOString(),
      hasStartFrame: !!startFrame,
      hasEndFrame: !!endFrame,
    },
  };
}
