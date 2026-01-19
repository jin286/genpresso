import React, { useState } from "react";
import { Settings, Ban, Pencil, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../../contexts/LanguageContext";
import { VisuallyHidden } from "../ui/visually-hidden";
import { CloseButton } from "../ui/close-button";

interface AgentSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// 추천 에이전트 타입
interface RecommendedAgent {
  id: string;
  nameKey: string; // 번역 키
  descKey: string; // 번역 키
  icon: string; // 이모지
}

// 맞춤형 에이전트 타입
interface CustomAgent {
  id: string;
  name: string;
  description: string;
  agentGoal: string;
  focusTags: string[];
  avoidTags: string[];
  createdAt: Date;
}

// 추천 에이전트 목록 (7개)
const RECOMMENDED_AGENTS: RecommendedAgent[] = [
  { id: 'product-design', nameKey: 'agentSettings.productDesign', descKey: 'agentSettings.productDesignDesc', icon: '🎨' },
  { id: 'brand-design', nameKey: 'agentSettings.brandDesign', descKey: 'agentSettings.brandDesignDesc', icon: '🏢' },
  { id: 'ad-design', nameKey: 'agentSettings.adDesign', descKey: 'agentSettings.adDesignDesc', icon: '📢' },
  { id: 'fashion', nameKey: 'agentSettings.fashion', descKey: 'agentSettings.fashionDesc', icon: '👗' },
  { id: 'film', nameKey: 'agentSettings.film', descKey: 'agentSettings.filmDesc', icon: '🎬' },
  { id: 'space-design', nameKey: 'agentSettings.spaceDesign', descKey: 'agentSettings.spaceDesignDesc', icon: '🏠' },
  { id: 'character', nameKey: 'agentSettings.character', descKey: 'agentSettings.characterDesc', icon: '🎭' },
];

export function AgentSettingsDialog({ isOpen, onClose }: AgentSettingsDialogProps) {
  const { t } = useLanguage();
  
  // 화면 모드 state
  const [mode, setMode] = useState<'select' | 'create'>('select');
  
  // 선택 모드 state
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [customAgents, setCustomAgents] = useState<CustomAgent[]>([]);
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  
  // 생성 모드 state
  const [customName, setCustomName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [agentGoal, setAgentGoal] = useState("");
  const [focusTags, setFocusTags] = useState<string[]>(['']);
  const [avoidTags, setAvoidTags] = useState<string[]>(['']);
  const [newFocusTag, setNewFocusTag] = useState("");
  const [newAvoidTag, setNewAvoidTag] = useState("");
  
  // 구버전 폼 state (제거 예정)
  const [customRole, setCustomRole] = useState("");
  const [customPersonality, setCustomPersonality] = useState("");
  const [customSystemPrompt, setCustomSystemPrompt] = useState("");

  const handleSave = () => {
    if (!selectedAgent) {
      toast.error(t('agentSettings.nameRequired'));
      return;
    }

    // 저장 로직 (추후 구현)
    toast.success(t('agentSettings.saveSuccess'));
    onClose();
  };
  
  const handleCreateCustomAgent = () => {
    if (!customName.trim()) {
      toast.error(t('agentSettings.nameRequired'));
      return;
    }
    
    // 새 맞춤형 에이전트 생성
    const newAgent: CustomAgent = {
      id: `custom-${Date.now()}`,
      name: customName,
      description: agentGoal || `${focusTags.join(', ')} 전문`,
      agentGoal: agentGoal,
      focusTags: focusTags,
      avoidTags: avoidTags,
      createdAt: new Date(),
    };
    
    setCustomAgents([...customAgents, newAgent]);
    setSelectedAgent(newAgent.id);
    
    // 폼 초기화
    setCustomName("");
    setSelectedTemplate(null);
    setAgentGoal("");
    setFocusTags([]);
    setAvoidTags([]);
    setNewFocusTag("");
    setNewAvoidTag("");
    
    // 선택 화면으로 돌아가기
    setMode('select');
    
    toast.success(t('agentSettings.createSuccess'));
  };
  
  const handleBackToSelect = () => {
    // 폼 초기화
    setCustomName("");
    setSelectedTemplate(null);
    setAgentGoal("");
    setFocusTags([]);
    setAvoidTags([]);
    setNewFocusTag("");
    setNewAvoidTag("");
    
    // 선택 화면으로 돌아가기
    setMode('select');
  };

  const handleEditAgent = (agent: CustomAgent) => {
    // 편집 모드로 진입 - 에이전트 데이터 로드
    setCustomName(agent.name);
    setAgentGoal(agent.agentGoal);
    setFocusTags(agent.focusTags.length > 0 ? agent.focusTags : ['']);
    setAvoidTags(agent.avoidTags.length > 0 ? agent.avoidTags : ['']);
    setMode('create');
  };

  const handleDeleteAgent = (agentId: string) => {
    setCustomAgents(customAgents.filter(a => a.id !== agentId));
    if (selectedAgent === agentId) {
      setSelectedAgent(null);
    }
    toast.success(t('agentSettings.deleteSuccess') || 'Agent deleted successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl mx-auto max-h-[85vh] flex flex-col p-0 gap-0 border-[0.5px] overflow-hidden [&>button]:hidden"
        style={{
          backgroundColor: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--glass-backdrop))',
          WebkitBackdropFilter: 'blur(var(--glass-backdrop))',
          borderColor: 'var(--glass-border)',
          boxShadow: 'var(--glass-shadow)',
        }}
      >
        <VisuallyHidden>
          <DialogTitle>
            {t('agentSettings.title')}
          </DialogTitle>
          <DialogDescription>
            {t('agentSettings.description')}
          </DialogDescription>
        </VisuallyHidden>

        {/* X 닫기 버튼 */}
        <div className="absolute right-2.5 top-2.5 z-50">
          <CloseButton onClick={onClose} size="sm" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-2 px-6 py-4 border-b shrink-0" style={{ borderColor: 'var(--glass-border)' }}>
          <Settings className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">{t('agentSettings.title')}</h2>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {mode === 'select' ? (
            <>
              {/* 상단 설명 */}
              <div className="space-y-1 text-center">
                <p className="text-sm text-foreground">
                  {t('agentSettings.selectDescription')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('agentSettings.selectSubDescription')}
                </p>
              </div>

              {/* 추천 에이전트 섹션 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {t('agentSettings.recommendedAgents')}
                </h3>
                
                {/* 추천 에이전트 그리드 */}
                <div className="grid grid-cols-4 gap-3">
                  {RECOMMENDED_AGENTS.map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent.id)}
                      className="text-left p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                      style={{
                        backgroundColor: selectedAgent === agent.id 
                          ? 'var(--agent-user-message-bg)' 
                          : 'var(--color-glass-bg)',
                        borderColor: selectedAgent === agent.id
                          ? 'var(--color-primary)'
                          : 'var(--color-glass-border)',
                        borderWidth: selectedAgent === agent.id ? '2px' : '0.5px',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedAgent !== agent.id) {
                          e.currentTarget.style.backgroundColor = 'var(--color-glass-hover-bg)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedAgent !== agent.id) {
                          e.currentTarget.style.backgroundColor = 'var(--color-glass-bg)';
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">{agent.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-foreground mb-1">
                            {t(agent.nameKey)}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {t(agent.descKey)}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 구분선 */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-glass-border)' }} />
                <span className="text-xs text-muted-foreground">{t('agentSettings.orDivider')}</span>
                <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-glass-border)' }} />
              </div>

              {/* 맞춤형 에이전트 섹션 */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {t('agentSettings.customAgents')}
                </h3>

                {/* 맞춤형 에이전트 만들기 버튼 */}
                <button
                  onClick={() => setMode('create')}
                  className="w-full p-4 rounded-2xl border-2 border-dashed transition-all duration-200 hover:border-primary hover:bg-primary/5"
                  style={{
                    borderColor: 'var(--color-glass-border)',
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5 text-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {t('agentSettings.createCustom')}
                    </span>
                  </div>
                </button>

                {/* 빈 상태 안내 */}
                {customAgents.length === 0 && !isCreatingCustom && (
                  <div className="text-center py-6">
                    <p className="text-xs text-muted-foreground">
                      {t('agentSettings.noCustomAgents')}
                    </p>
                  </div>
                )}

                {/* 맞춤형 에이전트 리스트 (있을 경우) */}
                {customAgents.map((agent) => {
                  const focusCount = agent.focusTags.filter(tag => tag.trim()).length;
                  const avoidCount = agent.avoidTags.filter(tag => tag.trim()).length;
                  
                  return (
                    <div
                      key={agent.id}
                      className="relative w-full p-4 rounded-2xl border transition-all duration-200"
                      style={{
                        backgroundColor: selectedAgent === agent.id 
                          ? 'var(--agent-user-message-bg)' 
                          : 'var(--color-glass-bg)',
                        borderColor: selectedAgent === agent.id
                          ? 'var(--color-primary)'
                          : 'var(--color-glass-border)',
                        borderWidth: selectedAgent === agent.id ? '2px' : '0.5px',
                      }}
                    >
                      {/* 메인 콘텐츠 영역 (클릭 가능) */}
                      <button
                        onClick={() => setSelectedAgent(agent.id)}
                        className="w-full text-left"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl shrink-0">✒️</span>
                          <div className="flex-1 min-w-0 space-y-2">
                            {/* 에이전트 이름 */}
                            <h4 className="text-sm font-semibold text-foreground">
                              {agent.name}
                            </h4>
                            
                            {/* 에이전트 목표 */}
                            {agent.agentGoal && (
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {agent.agentGoal}
                              </p>
                            )}
                            
                            {/* 배지: 집중할 것 / 피해야 할 것 갯수 */}
                            <div className="flex items-center gap-2">
                              {focusCount > 0 && (
                                <span 
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium"
                                  style={{
                                    backgroundColor: 'var(--agent-user-message-bg)',
                                    color: 'var(--color-primary)',
                                  }}
                                >
                                  ✓ {focusCount} {t('agentSettings.focusLabel').replace('에이전트가 ', '').replace('What the Agent Should ', '').replace('エージェントが', '')}
                                </span>
                              )}
                              {avoidCount > 0 && (
                                <span 
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium"
                                  style={{
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                  }}
                                >
                                  ✗ {avoidCount} {t('agentSettings.avoidLabel').replace('에이전트가 ', '').replace('What the Agent Should ', '').replace('エージェントが', '')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                      
                      {/* 편집/삭제 버튼 (우측 상단) */}
                      <div className="absolute right-3 top-3 flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAgent(agent);
                          }}
                          className="p-1.5 rounded-lg transition-colors"
                          style={{
                            backgroundColor: 'var(--color-glass-bg)',
                          }}
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5 text-primary" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAgent(agent.id);
                          }}
                          className="p-1.5 rounded-lg transition-colors"
                          style={{
                            backgroundColor: 'var(--color-glass-bg)',
                          }}
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-destructive" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {/* 생성 화면 */}
              {/* 상단 제목 + 설명 */}
              <div className="space-y-1 text-center">
                <p className="text-sm text-foreground">
                  {t('agentSettings.createTitle')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('agentSettings.createDescription')}
                </p>
              </div>

              {/* 에이전트 이름 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  {t('agentSettings.agentNameLabel')}
                </Label>
                <Input
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={t('agentSettings.agentNamePlaceholder')}
                  className="rounded-2xl"
                  style={{
                    borderColor: 'var(--color-glass-border)',
                    backgroundColor: 'var(--color-glass-bg)',
                  }}
                />
              </div>

              {/* 에이전트 템플릿 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  {t('agentSettings.templateLabel')}
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {/* "없음" 버튼 */}
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="p-3 rounded-2xl border transition-all duration-200 text-left hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      backgroundColor: selectedTemplate === null
                        ? 'var(--agent-user-message-bg)'
                        : 'var(--color-glass-bg)',
                      borderColor: selectedTemplate === null
                        ? 'var(--color-primary)'
                        : 'var(--color-glass-border)',
                      borderWidth: selectedTemplate === null ? '2px' : '0.5px',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTemplate !== null) {
                        e.currentTarget.style.backgroundColor = 'var(--color-glass-hover-bg)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTemplate !== null) {
                        e.currentTarget.style.backgroundColor = 'var(--color-glass-bg)';
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Ban className="w-4 h-4 shrink-0 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {t('agentSettings.templateNone')}
                      </span>
                    </div>
                  </button>
                  
                  {/* 추천 에이전트 템플릿 7개 */}
                  {RECOMMENDED_AGENTS.map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedTemplate(agent.id)}
                      className="p-3 rounded-2xl border transition-all duration-200 text-left hover:scale-[1.02] hover:shadow-lg"
                      style={{
                        backgroundColor: selectedTemplate === agent.id
                          ? 'var(--agent-user-message-bg)'
                          : 'var(--color-glass-bg)',
                        borderColor: selectedTemplate === agent.id
                          ? 'var(--color-primary)'
                          : 'var(--color-glass-border)',
                        borderWidth: selectedTemplate === agent.id ? '2px' : '0.5px',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedTemplate !== agent.id) {
                          e.currentTarget.style.backgroundColor = 'var(--color-glass-hover-bg)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedTemplate !== agent.id) {
                          e.currentTarget.style.backgroundColor = 'var(--color-glass-bg)';
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg shrink-0">{agent.icon}</span>
                        <span className="text-sm font-medium text-foreground">
                          {t(agent.nameKey).replace(' 에이전트', '').replace(' Agent', '').replace('エージェント', '')}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 에이전트 목표 + 집중/피해야 할 것 (1/2 레이아웃) */}
              <div className="grid grid-cols-2 gap-4 items-start">
                {/* 왼쪽: 에이전트 목표 */}
                <div className="flex flex-col h-full space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    {t('agentSettings.goalLabel')}
                  </Label>
                  <Textarea
                    value={agentGoal}
                    onChange={(e) => setAgentGoal(e.target.value)}
                    placeholder={t('agentSettings.goalPlaceholder')}
                    className="rounded-2xl flex-1 resize-none"
                    style={{
                      borderColor: 'var(--color-glass-border)',
                      backgroundColor: 'var(--color-glass-bg)',
                    }}
                  />
                </div>

                {/* 오른쪽: 집중할 것 + 피해야 할 것 (세로 배치) */}
                <div className="space-y-4">
                  {/* 집중할 것 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-foreground">
                        {t('agentSettings.focusLabel')}
                      </Label>
                      <button
                        onClick={() => setFocusTags([...focusTags, ''])}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors"
                        style={{
                          backgroundColor: 'var(--agent-user-message-bg)',
                          color: 'var(--color-primary)',
                        }}
                      >
                        + {t('agentSettings.addButton')}
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {focusTags.map((tag, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={tag}
                            onChange={(e) => {
                              const newTags = [...focusTags];
                              newTags[index] = e.target.value;
                              setFocusTags(newTags);
                            }}
                            placeholder={t('agentSettings.focusPlaceholder')}
                            className="rounded-2xl flex-1"
                            style={{
                              borderColor: 'var(--color-glass-border)',
                              backgroundColor: 'var(--color-glass-bg)',
                            }}
                          />
                          <button
                            onClick={() => setFocusTags(focusTags.filter((_, i) => i !== index))}
                            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-muted/50"
                            style={{
                              backgroundColor: 'var(--history-item-bg)',
                            }}
                          >
                            <span className="text-muted-foreground">−</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 피해야 할 것 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-foreground">
                        {t('agentSettings.avoidLabel')}
                      </Label>
                      <button
                        onClick={() => setAvoidTags([...avoidTags, ''])}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-colors"
                        style={{
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          color: '#ef4444',
                        }}
                      >
                        + {t('agentSettings.addButton')}
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {avoidTags.map((tag, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={tag}
                            onChange={(e) => {
                              const newTags = [...avoidTags];
                              newTags[index] = e.target.value;
                              setAvoidTags(newTags);
                            }}
                            placeholder={t('agentSettings.avoidPlaceholder')}
                            className="rounded-2xl flex-1"
                            style={{
                              borderColor: 'var(--color-glass-border)',
                              backgroundColor: 'var(--color-glass-bg)',
                            }}
                          />
                          <button
                            onClick={() => setAvoidTags(avoidTags.filter((_, i) => i !== index))}
                            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-muted/50"
                            style={{
                              backgroundColor: 'var(--history-item-bg)',
                            }}
                          >
                            <span className="text-muted-foreground">−</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div 
          className="px-6 py-4 border-t shrink-0 flex justify-end gap-2" 
          style={{ 
            borderColor: 'var(--color-glass-border)',
            backgroundColor: 'var(--color-glass-bg)',
            backdropFilter: 'blur(var(--blur-glass))',
            WebkitBackdropFilter: 'blur(var(--blur-glass))',
            boxShadow: '0px -2px 8px 0px rgba(0, 0, 0, 0.05)'
          }}
        >
          {mode === 'select' ? (
            <>
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="hover:bg-muted/50"
              >
                {t('common.cancel')}
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {t('agentSettings.selectAndApply')}
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                onClick={handleBackToSelect}
                className="hover:bg-muted/50"
              >
                {t('agentSettings.backToSelect')}
              </Button>
              <Button 
                onClick={handleCreateCustomAgent}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {t('agentSettings.createButton')}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}