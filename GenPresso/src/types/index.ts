/**
 * GenPresso 공통 타입 정의
 * 
 * 프로젝트 전체에서 사용되는 타입들을 중앙 집중식으로 관리합니다.
 */

// ============================================================================
// 기본 타입
// ============================================================================

export type ViewMode = "grid" | "gallery";
export type SortOption = "recent" | "name" | "modified";
export type StatusFilter = "all" | "active" | "completed";

// ============================================================================
// 프로젝트 관련 타입
// ============================================================================

export interface Project {
  id: number | string;
  name: string;
  lastModified: string;
  status: "진행중" | "완료" | "대기";
  bookmarked: boolean;
  participants: Participant[];
  images: string[];
  thumbnail?: string;
}

export interface Participant {
  name: string;
  avatar: string;
  role?: "Owner" | "Manager" | "Member";
}

export interface Workspace {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
}

// ============================================================================
// 설정 관련 타입
// ============================================================================

export type SettingsTabType = "profile" | "general" | "subscription" | "credit" | "workspace";
export type WorkspaceTabType = "members" | "teams";

export interface Member {
  id: number;
  name: string;
  email: string;
  role: "Owner" | "Manager" | "Member";
  status: "Active" | "Invited";
  teams: string[];
  joinDate: string;
  avatar?: string;
}

export interface TeamInfo {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  createdDate: string;
}

export interface MemberStats {
  total: number;
  administrators: number;
  managers: number;
  members: number;
  invited: number;
  withTeam: number;
  withoutTeam: number;
}

// ============================================================================
// 캔버스 관련 타입
// ============================================================================

export type CanvasToolId = 
  | "select" 
  | "hand" 
  | "node" 
  | "files" 
  | "gallery" 
  | "explore" 
  | "comment";

export type AIToolId = 
  | "upscale" 
  | "remove-bg" 
  | "outpaint" 
  | "inpaint" 
  | "palette" 
  | "lock";

export interface CanvasTool {
  id: CanvasToolId;
  icon: React.ComponentType<{ className?: string }>;
  label: string | React.ReactNode;
}

export interface AITool {
  id: AIToolId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Point {
  x: number;
  y: number;
}

// ============================================================================
// 노드 시나리오 타입
// ============================================================================

export type NodeType = 'text' | 'image' | 'video' | 'process' | 'mix';

export type ScenarioId = 
  | 'blank'                    // 빈 캔버스
  | 'text-to-video'            // 01. Text to Video
  | 'text-to-image'            // 02. Text to Image
  | 'image-text-to-image'      // 03. Image+Text to Image
  | 'image-text-to-video'      // 04. Image+Text to Video
  | 'video-audio-generation'   // 05. Video Audio Generation
  | 'complex-workflow'         // 06. Complex Workflow
  | 'workflow-chain'           // 07. Workflow Chain
  | 'segmentation-workflow'    // 08. Segmentation Workflow
  | 'segmentation-test'        // 09. Segmentation Workflow Test
  | 'grouping-test'            // 10. Grouping Test + Temporary Workspace
  | 'agent-conversation'       // 11. Agent Conversation Scenario
  | 'simple-group'             // 12. Simple Group Scenario
  | 'editorial-fashion';       // 13. Editorial Fashion - 화보 디자인

export interface NodeData {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  prompt?: string;
  isOutput?: boolean;
  segments?: any[];
  metadata?: Record<string, any>;
}

export interface EdgeData {
  id: string;
  sourceId: string;
  targetId: string;
}

export interface NodeGroup {
  id: string;
  name: string;
  nodeIds: string[];
  color: 'yellow' | 'blue' | 'pink' | 'green' | 'purple' | 'orange';
  symbolImage?: string; // AI 생성 또는 선택된 그룹 대표 이미지
  echo: number; // 0-100: 입력 반영 가중치 (사용자 입력 모사)
  insight: number; // 0-100: 분석·추론 반영 가중치 (AI 지식 활용)
  spark: number; // 0-100: 창의성·생성적 사고 가중치 (새로운 아이디어)
  description?: string; // AI 생성 그룹 설명
  selectedImageNodeIds?: string[]; // 선택된 이미지 노드 ID (최대 3개, 가중치 높음)
  createdAt?: number;
  updatedAt?: number;
}

export interface ScenarioTemplate {
  id: ScenarioId;
  name: string;
  description: string;
  nodes: NodeData[];
  edges: EdgeData[];
  groups?: NodeGroup[];
}

// ============================================================================
// 워크스페이스 탭 시스템
// ============================================================================

export interface WorkspaceTab {
  id: string;
  name: string;
  type: 'main' | 'detail'; // 메인 캔버스 or 세부편집 캔버스
  nodes: NodeData[];
  edges: EdgeData[];
  createdAt: number;
}

// ============================================================================
// Agent 관련 타입
// ============================================================================

export type AgentTabType = "chat" | "history" | "comment";

export interface ChatMessage {
  id: number | string;
  type: "user" | "agent";
  content: string;
  timestamp: string;
}

export interface HistoryItem {
  id: number | string;
  action: string;
  name: string;
  time: string;
  thumbnail?: string;
}

export interface CommentItem {
  id: number | string;
  content: string;
  author: string;
  timestamp: string;
  replies?: CommentItem[];
}

// ============================================================================
// 캔버스 코멘트 타입
// ============================================================================

export interface CanvasComment {
  id: string;
  x: number;  // 캔버스 좌표 (pan/zoom 영향받지 않음)
  y: number;
  content: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  createdAt: string;
  isEditing?: boolean;  // 작성 중인지 여부
  isExpanded?: boolean;  // 코멘트 내용 표시 여부
}

// ============================================================================
// UI 컴포넌트 관련 타입
// ============================================================================

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariant = "default" | "outline" | "ghost" | "secondary";

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export interface CloseButtonProps {
  onClick: () => void;
  size?: ButtonSize;
  className?: string;
}

export interface RoundButtonProps {
  icon: React.ReactNode;
  iconActive?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  ariaLabel?: string;
  className?: string;
}

// ============================================================================
// 레이아웃 관련 타입
// ============================================================================

export type SidebarExpansionLevel = 0 | 1 | 2;

export interface SidebarState {
  isOpen: boolean;
  expansionLevel: SidebarExpansionLevel;
}

// ============================================================================
// 폼 관련 타입
// ============================================================================

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "select" | "textarea";
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
}

export interface SelectOption {
  value: string;
  label: string;
}

// ============================================================================
// 파일 업로드 관련 타입
// ============================================================================

export type FileType = "image" | "video";

export interface UploadedFile {
  id: string;
  name: string;
  type: FileType;
  size: number;
  url: string;
  uploadedAt: string;
}

// ============================================================================
// 갤러리 관련 타입
// ============================================================================

export interface GalleryImage {
  id: number | string;
  src: string;
  alt: string;
  likes?: number;
  views?: number;
  isBookmarked?: boolean;
  author?: string;
  createdAt?: string;
}

// ============================================================================
// 통계 관련 타입
// ============================================================================

export interface DashboardStats {
  label: string;
  value: number | string;
  color: string;
}

export interface ActivityItem {
  id: number | string;
  action: string;
  name: string;
  time: string;
  icon?: React.ReactNode;
}

// ============================================================================
// 이벤트 핸들러 타입
// ============================================================================

export type ClickHandler = () => void;
export type ChangeHandler<T = string> = (value: T) => void;
export type SubmitHandler = (data: any) => void;

// ============================================================================
// 유틸리티 타입
// ============================================================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncFunction<T = void> = () => Promise<T>;
