import React, { useMemo } from "react";
import { getScenarioTemplate } from "./scenario-templates";
import { ScenarioId } from "../../types";
import { NodeEdgesContainer } from "./NodeEdge";
import { CANVAS_CONSTANTS } from "./constants";
import { useLanguage } from "../../contexts/LanguageContext";

interface CanvasThumbnailProps {
  scenarioId: ScenarioId;
}

interface MiniNodeCardProps {
  type: string;
  content?: string;
  typeLabel: string;
}

/**
 * 간소화된 미니 노드 카드 (썸네일 전용)
 * React.memo로 불필요한 리렌더링 방지
 */
const MiniNodeCard = React.memo<MiniNodeCardProps>(({ 
  type, 
  content,
  typeLabel
}) => {
  // 타입별 배지 스타일 - 메모이제이션
  const badgeStyles = useMemo(() => ({
    backgroundColor: `var(--node-badge-${type}-bg)`,
    color: `var(--node-badge-${type}-text)`,
  }), [type]);

  // 컨테이너 스타일 - 메모이제이션
  const containerStyles = useMemo(() => ({
    width: CANVAS_CONSTANTS.NODE_WIDTH,
    minHeight: CANVAS_CONSTANTS.NODE_HEIGHT,
    backgroundColor: 'var(--color-glass-bg)',
    borderColor: 'var(--color-glass-border)',
    backdropFilter: 'blur(var(--blur-glass))',
    WebkitBackdropFilter: 'blur(var(--blur-glass))',
  }), []);

  return (
    <div 
      className="border rounded-lg overflow-hidden"
      style={containerStyles}
    >
      {/* 상단 - 타입 배지 */}
      <div className="px-1.5 py-1 flex items-center justify-center">
        <div 
          className="px-2 py-0.5 rounded-lg text-xs backdrop-blur-sm"
          style={badgeStyles}
        >
          {typeLabel}
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      {content && (
        <div className="px-1.5 py-1">
          <div className="text-xs text-foreground/80 line-clamp-2">
            {content}
          </div>
        </div>
      )}

      {/* upload/process 타입은 아이콘만 표시 */}
      {(type === 'upload' || type === 'process') && (
        <div className="px-1.5 py-2 flex items-center justify-center">
          <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
            {type === 'upload' ? (
              <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

MiniNodeCard.displayName = "MiniNodeCard";

/**
 * 캔버스 썸네일 컴포넌트
 * 시나리오의 실제 노드 워크플로우를 작은 크기로 미리보기
 */
export const CanvasThumbnail = React.memo<CanvasThumbnailProps>(({ scenarioId }) => {
  const { t } = useLanguage();
  const scenario = getScenarioTemplate(scenarioId);

  // 빈 캔버스 또는 시나리오 없음
  if (!scenario) {
    return (
      <div className="absolute inset-0 bg-muted/50 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-2 bg-muted-foreground/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="text-xs text-muted-foreground">{t('canvas.emptyTitle')}</p>
        </div>
      </div>
    );
  }

  // 캔버스 영역 계산 (모든 노드를 포함하는 최소 영역) - 메모이제이션
  const bounds = useMemo(() => scenario.nodes.reduce(
    (acc, node) => ({
      minX: Math.min(acc.minX, node.x),
      minY: Math.min(acc.minY, node.y),
      maxX: Math.max(acc.maxX, node.x + CANVAS_CONSTANTS.NODE_WIDTH),
      maxY: Math.max(acc.maxY, node.y + CANVAS_CONSTANTS.NODE_HEIGHT),
    }),
    { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
  ), [scenario.nodes]);

  // 캔버스 크기 및 스케일 계산 - 메모이제이션
  const { canvasWidth, canvasHeight, scale } = useMemo(() => {
    const width = bounds.maxX - bounds.minX + 100; // 여백 추가
    const height = bounds.maxY - bounds.minY + 100; // 여백 추가

    // 스케일 계산 (컨테이너에 맞추기)
    const containerWidth = 400; // 갤러리 카드 평균 너비
    const containerHeight = 300; // 갤러리 카드 평균 높이
    const calculatedScale = Math.min(
      containerWidth / width,
      containerHeight / height,
      0.25 // 최대 스케일 제한
    );

    return { canvasWidth: width, canvasHeight: height, scale: calculatedScale };
  }, [bounds]);

  // 엣지용 노드 정보 메모이제이션
  const edgeNodes = useMemo(() => scenario.nodes.map(node => ({
    id: node.id,
    x: node.x,
    y: node.y,
  })), [scenario.nodes]);

  // 타입 라벨 가져오는 헬퍼 함수
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'text': return t('canvas.nodeTypes.text');
      case 'image': return t('canvas.nodeTypes.image');
      case 'video': return t('canvas.nodeTypes.video');
      case 'upload': return t('canvas.nodeTypes.upload');
      case 'process': return t('canvas.nodeTypes.process');
      default: return type;
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div 
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          width: canvasWidth,
          height: canvasHeight,
          position: 'relative',
          pointerEvents: 'none', // 인터랙션 비활성화
        }}
      >
        {/* 노드 렌더링 */}
        {scenario.nodes.map((node) => (
          <div
            key={node.id}
            style={{
              position: 'absolute',
              left: node.x - bounds.minX + 50,
              top: node.y - bounds.minY + 50,
            }}
          >
            <MiniNodeCard 
              type={node.type} 
              content={node.content}
              typeLabel={getTypeLabel(node.type)}
            />
          </div>
        ))}

        {/* 연결선 렌더링 */}
        <div 
          style={{
            position: 'absolute',
            left: -bounds.minX + 50,
            top: -bounds.minY + 50,
            width: canvasWidth,
            height: canvasHeight,
          }}
        >
          <NodeEdgesContainer
            edges={scenario.edges}
            nodes={edgeNodes}
          />
        </div>
      </div>
    </div>
  );
});

CanvasThumbnail.displayName = "CanvasThumbnail";
